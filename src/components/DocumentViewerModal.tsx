import React, { useState } from 'react';
import { Language, ParticipantMaterial } from '../types';

interface DocumentViewerModalProps {
  material: ParticipantMaterial | null;
  onClose: () => void;
  lang: Language;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  material,
  onClose,
  lang
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!material) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#b91c1c]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#f59e0b] text-2xl">picture_as_pdf</span>
            <div>
              <h3 className="font-serif text-xl font-bold truncate max-w-[280px] sm:max-w-md">
                {material.title}
              </h3>
              <span className="text-xs text-slate-300 font-mono">
                {material.fileType} • {material.size}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <h4 className="font-serif text-base font-bold text-[#0c2340]">
              {lang === 'en' ? 'Document Abstract & Scope' : 'Abstrak Dokumen & Skop'}
            </h4>
            <p>
              {lang === 'en'
                ? `This official publication is issued by The Malaysian Cohort (TMC), Universiti Kebangsaan Malaysia (UKM). It is designated for participants, clinical healthcare providers, and accredited scientific researchers.`
                : `Penerbitan rasmi ini dikeluarkan oleh The Malaysian Cohort (TMC), Universiti Kebangsaan Malaysia (UKM). Ia ditujukan kepada peserta kohort, kakitangan kesihatan klinikal, dan penyelidik saintifik bertauliah.`}
            </p>
            <div className="p-3 bg-white rounded border border-slate-200 space-y-1 font-mono text-xs">
              <div><strong>Document ID:</strong> {material.id.toUpperCase()}-UKM-2024</div>
              <div><strong>Authentication:</strong> UKM Research Ethics Committee (UKMREC)</div>
              <div><strong>Security Status:</strong> Verified Public Access Distribution</div>
            </div>
          </div>

          {downloaded && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
              <span>
                {lang === 'en'
                  ? `"${material.title}" downloaded successfully!`
                  : `"${material.title}" berjaya dimuat turun!`}
              </span>
            </div>
          )}

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-heading font-semibold text-sm rounded shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">
                {downloading ? 'sync' : 'download'}
              </span>
              <span>
                {downloading
                  ? (lang === 'en' ? 'Preparing Download...' : 'Menyediakan Muat Turun...')
                  : (lang === 'en' ? `Download Document (${material.size})` : `Muat Turun Dokumen (${material.size})`)}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded transition-colors"
          >
            {lang === 'en' ? 'Close Preview' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};
