import { ParticipantMaterial, Publication } from '../types';

interface PdfSection {
  heading: string;
  body: string;
}

interface PdfLine {
  text: string;
  font: 'F1' | 'F2';
  size: number;
  leading: number;
}

const toPdfText = (value: string) =>
  value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/•/g, '-')
    .replace(/[^\x20-\x7E\n]/g, '?');

const escapePdfText = (value: string) =>
  toPdfText(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

const wrapText = (value: string, maxCharacters: number) => {
  const paragraphs = toPdfText(value).split(/\r?\n/);
  const lines: string[] = [];

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    let currentLine = '';

    words.forEach((word) => {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (candidate.length <= maxCharacters) {
        currentLine = candidate;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);
    if (paragraphIndex < paragraphs.length - 1) lines.push('');
  });

  return lines;
};

const createPdfBlob = (title: string, metadata: string[], sections: PdfSection[]) => {
  const lines: PdfLine[] = [];

  wrapText(title, 58).forEach((text) => lines.push({ text, font: 'F2', size: 16, leading: 20 }));
  lines.push({ text: '', font: 'F1', size: 10, leading: 8 });

  metadata.forEach((item) => {
    wrapText(item, 88).forEach((text) => lines.push({ text, font: 'F1', size: 10, leading: 14 }));
  });

  sections.forEach((section) => {
    lines.push({ text: '', font: 'F1', size: 10, leading: 12 });
    lines.push({ text: section.heading, font: 'F2', size: 12, leading: 18 });
    wrapText(section.body, 88).forEach((text) => lines.push({ text, font: 'F1', size: 10, leading: 14 }));
  });

  const pages: PdfLine[][] = [];
  let currentPage: PdfLine[] = [];
  let remainingHeight = 720;

  lines.forEach((line) => {
    if (remainingHeight - line.leading < 0 && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [];
      remainingHeight = 720;
    }
    currentPage.push(line);
    remainingHeight -= line.leading;
  });
  if (currentPage.length > 0) pages.push(currentPage);

  const objects: string[] = [];
  const reserveObject = () => {
    objects.push('');
    return objects.length;
  };
  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  const pagesObjectId = reserveObject();
  const catalogObjectId = addObject(`<< /Type /Catalog /Pages ${pagesObjectId} 0 R >>`);
  const regularFontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const boldFontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
  const pageObjectIds: number[] = [];

  pages.forEach((pageLines) => {
    let y = 790;
    const commands = pageLines.map((line) => {
      y -= line.leading;
      if (!line.text) return '';
      return `BT /${line.font} ${line.size} Tf 1 0 0 1 54 ${y} Tm (${escapePdfText(line.text)}) Tj ET`;
    }).filter(Boolean).join('\n');

    const contentObjectId = addObject(`<< /Length ${commands.length} >>\nstream\n${commands}\nendstream`);
    const pageObjectId = addObject(
      `<< /Type /Page /Parent ${pagesObjectId} 0 R /MediaBox [0 0 612 842] ` +
      `/Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> ` +
      `/Contents ${contentObjectId} 0 R >>`
    );
    pageObjectIds.push(pageObjectId);
  });

  objects[pagesObjectId - 1] =
    `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageObjectIds.length} >>`;

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObjectId} 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
};

const saveBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const safeFilename = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .toLowerCase();

export const downloadPublicationAbstractPdf = (publication: Publication) => {
  const blob = createPdfBlob(
    publication.title,
    [publication.journal, `Authors: ${publication.authors}`, `DOI: ${publication.doi}`],
    [
      { heading: 'Plain-Language Summary', body: publication.plainLanguageSummary },
      { heading: 'Scientific Abstract', body: publication.abstract },
      {
        heading: 'Prototype Record Notice',
        body: 'This file contains the abstract information displayed in the TMC website prototype. It is not the publisher full-text article.',
      },
    ]
  );
  saveBlob(blob, `${safeFilename(publication.title) || publication.id}-abstract.pdf`);
};

export const downloadParticipantMaterialPdf = (material: ParticipantMaterial) => {
  const blob = createPdfBlob(
    material.title,
    [`Document type: ${material.fileType}`, 'The Malaysian Cohort participant material'],
    [
      { heading: 'Document Summary', body: material.description },
      { heading: 'Document Content', body: material.contentSnippet.join('\n\n') },
      {
        heading: 'Prototype Record Notice',
        body: 'This PDF contains the participant information currently displayed in the TMC website prototype.',
      },
    ]
  );
  saveBlob(blob, `${safeFilename(material.title) || material.id}.pdf`);
};
