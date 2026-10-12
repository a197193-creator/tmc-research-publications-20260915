import { portalAsset } from '../utils/portalRuntime';
import { Language } from '../types';
import { allResearchInitiatives } from './researchInitiatives';
import { publicationsList } from './publications';

export type HeroAction =
  | { kind: 'research' | 'publications' }
  | { kind: 'project'; projectId: string }
  | { kind: 'source'; href: string; pdf?: boolean };

interface HeroCopy {
  tag: string;
  title: string;
  description: string;
  imageAlt: string;
  imageCaption: string;
}

interface HeroSlide {
  id: string;
  image: string;
  width: number;
  height: number;
  presentation?: 'certificate';
  action: HeroAction;
  copy: Record<Language, HeroCopy>;
}

// Project copy follows the supplied research index, not unvalidated recruitment totals.
// Historical/representative photographs are identified explicitly in both languages.
export const heroSlides: HeroSlide[] = [
  {
    id: 'research-overview',
    image: portalAsset("/assets/umbi-laboratory-research.webp"), width: 1084, height: 720,
    action: { kind: 'research' },
    copy: {
      en: {
        tag: 'TMC Research & Publications · UMBI UKM',
        title: 'Turning Samples into Health Discoveries',
        description: 'Participant biospecimens and long-term health data support research into genetic, lifestyle and environmental influences on health.',
        imageAlt: 'Archival UMBI laboratory with research benches and equipment, 2016',
        imageCaption: 'UMBI laboratory archive · 2016',
      },
      bm: {
        tag: 'Penyelidikan & Penerbitan TMC · UMBI UKM',
        title: 'Daripada Sampel kepada Penemuan Kesihatan',
        description: 'Biospesimen peserta dan data kesihatan jangka panjang menyokong kajian tentang pengaruh genetik, gaya hidup dan persekitaran terhadap kesihatan.',
        imageAlt: 'Arkib makmal UMBI dengan meja kerja dan peralatan penyelidikan, 2016',
        imageCaption: 'Arkib makmal UMBI · 2016',
      },
    },
  },
  {
    id: 'biobank',
    image: portalAsset("/assets/hero-biobank.webp"), width: 1600, height: 900,
    action: { kind: 'research' },
    copy: {
      en: {
        tag: 'Biobank · Research Infrastructure',
        title: 'Preserving Samples for Future Discovery',
        description: 'The TMC biobank connects preserved biospecimens with cohort health information, providing a foundation for collaborative population-health research.',
        imageAlt: 'Cryogenic storage tanks in the TMC biobank',
        imageCaption: 'TMC biobank · Cryogenic storage facilities',
      },
      bm: {
        tag: 'Biobank · Infrastruktur Penyelidikan',
        title: 'Memelihara Sampel untuk Penemuan Masa Hadapan',
        description: 'Biobank TMC menghubungkan biospesimen yang dipelihara dengan maklumat kesihatan kohort sebagai asas kerjasama penyelidikan kesihatan populasi.',
        imageAlt: 'Tangki penyimpanan kriogenik di biobank TMC',
        imageCaption: 'Biobank TMC · Kemudahan penyimpanan kriogenik',
      },
    },
  },
  {
    id: 'myprecise',
    image: portalAsset("/assets/hero-myprecise.webp"), width: 1600, height: 900,
    action: { kind: 'project', projectId: 'proj-3' },
    copy: {
      en: {
        tag: 'MyPrecise · Genomics',
        title: 'Understanding Malaysia’s Genetic Diversity',
        description: 'MyPrecise targets whole-genome sequencing of 4,000 individuals across 24 healthy, ancestry and disease clusters. This is a study target, not a completed recruitment count.',
        imageAlt: 'Genomic sequencing equipment in the MyPrecise laboratory image',
        imageCaption: 'MyPrecise · Sequencing laboratory image',
      },
      bm: {
        tag: 'MyPrecise · Genomik',
        title: 'Memahami Kepelbagaian Genetik Malaysia',
        description: 'MyPrecise menyasarkan penjujukan genom penuh bagi 4,000 individu merangkumi 24 kelompok kesihatan, keturunan dan penyakit. Angka ini ialah sasaran kajian, bukan jumlah pengambilan selesai.',
        imageAlt: 'Peralatan penjujukan genom dalam imej makmal MyPrecise',
        imageCaption: 'MyPrecise · Imej makmal penjujukan',
      },
    },
  },
  {
    id: 'myserobiome',
    image: portalAsset("/assets/hero-biospecimens.webp"), width: 1600, height: 900,
    action: { kind: 'project', projectId: 'proj-2' },
    copy: {
      en: {
        tag: 'MySerobiome · Infection & Microbiome',
        title: 'Connecting Infection, Microbes and Health',
        description: 'MySerobiome studies how infection exposure and the gut microbiome relate to chronic disease risk, combining microbiome profiling with serum antibody analysis.',
        imageAlt: 'Gloved laboratory hand handling stored biospecimen tubes',
        imageCaption: 'Representative TMC biospecimen handling · Not a project-specific photograph',
      },
      bm: {
        tag: 'MySerobiome · Jangkitan & Mikrobiom',
        title: 'Menghubungkan Jangkitan, Mikrob dan Kesihatan',
        description: 'MySerobiome mengkaji hubungan pendedahan jangkitan dan mikrobiom usus dengan risiko penyakit kronik melalui pemprofilan mikrobiom dan analisis antibodi serum.',
        imageAlt: 'Tangan bersarung makmal mengendalikan tiub biospesimen yang disimpan',
        imageCaption: 'Pengendalian biospesimen TMC sebagai ilustrasi · Bukan foto khusus projek',
      },
    },
  },
  {
    id: 'prime',
    image: portalAsset("/assets/hero-retinal-imaging.webp"), width: 1600, height: 900,
    action: { kind: 'project', projectId: 'proj-4' },
    copy: {
      en: {
        tag: 'PRIME · Completed Study · 2019–2023',
        title: 'A Precision Approach to Diabetes Research',
        description: 'The Malaysia–UK PRIME collaboration brought together retinal, clinical and genomic data to investigate diabetes risk and personalised treatment approaches.',
        imageAlt: 'TMC participant undergoing a retinal photography assessment',
        imageCaption: 'TMC retinal assessment · Representative image, not a PRIME study photograph',
      },
      bm: {
        tag: 'PRIME · Kajian Selesai · 2019–2023',
        title: 'Pendekatan Jitu dalam Penyelidikan Diabetes',
        description: 'Kerjasama PRIME Malaysia–UK menggabungkan data retina, klinikal dan genomik untuk mengkaji risiko diabetes serta pendekatan rawatan yang diperibadikan.',
        imageAlt: 'Peserta TMC menjalani penilaian fotografi retina',
        imageCaption: 'Penilaian retina TMC · Imej ilustrasi, bukan foto kajian PRIME',
      },
    },
  },
  {
    id: 'imaging',
    image: portalAsset("/assets/hero-body-imaging.webp"), width: 1600, height: 900,
    action: { kind: 'project', projectId: 'proj-5' },
    copy: {
      en: {
        tag: 'Imaging & Biomarkers · Completed Study',
        title: 'Looking Beyond Weight Alone',
        description: 'The UKM–Oxford imaging study combines DEXA, MRI and clinical information to investigate obesity and non-communicable disease in Malaysian adults.',
        imageAlt: 'TMC participant on a DEXA body composition scanner',
        imageCaption: 'TMC DEXA assessment · Representative image, not a study-specific photograph',
      },
      bm: {
        tag: 'Pengimejan & Biomarker · Kajian Selesai',
        title: 'Melihat Lebih daripada Berat Badan',
        description: 'Kajian pengimejan UKM–Oxford menggabungkan DEXA, MRI dan maklumat klinikal untuk mengkaji obesiti serta penyakit tidak berjangkit dalam kalangan dewasa Malaysia.',
        imageAlt: 'Peserta TMC pada pengimbas DEXA untuk komposisi badan',
        imageCaption: 'Penilaian DEXA TMC · Imej ilustrasi, bukan foto khusus kajian',
      },
    },
  },
  {
    id: 'project-index',
    image: portalAsset("/assets/hero-biobank-team.webp"), width: 1600, height: 900,
    action: { kind: 'research' },
    copy: {
      en: {
        tag: 'Explore the Research Index',
        title: `${allResearchInitiatives.length} Projects, One Connected Index`,
        description: 'Explore genomics, cardiometabolic health, infection, imaging and more. Project profiles bring together research aims, collaborators, study periods and subprojects.',
        imageAlt: 'TMC biobank staff working with cryogenic storage tanks',
        imageCaption: 'TMC biobank team · Supporting collaborative research',
      },
      bm: {
        tag: 'Terokai Indeks Penyelidikan',
        title: `${allResearchInitiatives.length} Projek dalam Satu Indeks`,
        description: 'Terokai genomik, kesihatan kardiometabolik, jangkitan, pengimejan dan bidang lain. Profil projek menghimpunkan tujuan kajian, rakan kerjasama, tempoh dan subprojek.',
        imageAlt: 'Kakitangan biobank TMC bekerja dengan tangki penyimpanan kriogenik',
        imageCaption: 'Pasukan biobank TMC · Menyokong kerjasama penyelidikan',
      },
    },
  },
  {
    id: 'bmcc-2024',
    image: portalAsset("/assets/hero-bmcc-2024.webp"), width: 1600, height: 1067,
    action: { kind: 'source', href: 'https://www.ukm.my/mycohort/ms/news/umbi-terima-pengiktirafan-di-6th-business-excellence-awards-anjuran-british-malaysian-chamber-of-commerce-bmcc/' },
    copy: {
      en: {
        tag: 'BMCC Recognition · 2024',
        title: 'An Award-Winning Research Partnership',
        description: 'The UKM–Oxford imaging collaboration received second place in the BMCC Partnership of the Year category in 2024, recognising Malaysia–UK research cooperation.',
        imageAlt: 'Group photograph at the BMCC Business Excellence Awards 2024 ceremony',
        imageCaption: 'BMCC Business Excellence Awards 2024 · Supplied event photograph',
      },
      bm: {
        tag: 'Pengiktirafan BMCC · 2024',
        title: 'Kerjasama Penyelidikan yang Diiktiraf',
        description: 'Kerjasama pengimejan UKM–Oxford meraih tempat kedua dalam kategori BMCC Partnership of the Year pada 2024, mengiktiraf kerjasama penyelidikan Malaysia–UK.',
        imageAlt: 'Foto berkumpulan pada majlis BMCC Business Excellence Awards 2024',
        imageCaption: 'BMCC Business Excellence Awards 2024 · Foto acara yang dibekalkan',
      },
    },
  },
  {
    id: 'bmcc-2025',
    image: portalAsset("/assets/hero-bmcc-2025.webp"), width: 1600, height: 1066,
    action: { kind: 'source', href: 'https://www.ukm.my/mycohort/ms/news/umbi-terima-pengiktirafan-di-6th-business-excellence-awards-anjuran-british-malaysian-chamber-of-commerce-bmcc/' },
    copy: {
      en: {
        tag: 'BMCC Recognition · 2025',
        title: 'Research Collaboration Recognised Again',
        description: 'UKM and UMBI received third place in the BMCC Partnership of the Year 2025 category for the UKM–Oxford imaging collaboration, following their 2024 recognition.',
        imageAlt: 'Group photograph at the sixth BMCC Business Excellence Awards in 2025',
        imageCaption: 'BMCC Business Excellence Awards 2025 · Supplied event photograph',
      },
      bm: {
        tag: 'Pengiktirafan BMCC · 2025',
        title: 'Kerjasama Penyelidikan Diiktiraf Lagi',
        description: 'UKM dan UMBI meraih tempat ketiga dalam kategori BMCC Partnership of the Year 2025 bagi kerjasama pengimejan UKM–Oxford, selepas pengiktirafan pada 2024.',
        imageAlt: 'Foto berkumpulan pada majlis BMCC Business Excellence Awards keenam pada 2025',
        imageCaption: 'BMCC Business Excellence Awards 2025 · Foto acara yang dibekalkan',
      },
    },
  },
  {
    id: 'inspira-2026',
    image: portalAsset("/assets/hero-inspira-2026.webp"), width: 910, height: 1286,
    presentation: 'certificate',
    action: { kind: 'source', href: portalAsset("/documents/umbi-biobank-inspira-2026.pdf"), pdf: true },
    copy: {
      en: {
        tag: 'INSPIRA UKM · 15 January 2026',
        title: 'Recognising Biobank Service Excellence',
        description: 'The UMBI Biobank received second place in the Anugerah Makmal Perkhidmatan Cemerlang INSPIRA 2026. View the supplied award certificate for the original details.',
        imageAlt: 'Original certificate awarding UMBI Biobank second place in INSPIRA 2026',
        imageCaption: 'UMBI Biobank · INSPIRA 2026 second-place award certificate',
      },
      bm: {
        tag: 'INSPIRA UKM · 15 Januari 2026',
        title: 'Mengiktiraf Kecemerlangan Perkhidmatan Biobank',
        description: 'Biobank UMBI meraih tempat kedua dalam Anugerah Makmal Perkhidmatan Cemerlang INSPIRA 2026. Lihat sijil anugerah yang dibekalkan untuk butiran asal.',
        imageAlt: 'Sijil asal yang menganugerahkan tempat kedua INSPIRA 2026 kepada Biobank UMBI',
        imageCaption: 'Biobank UMBI · Sijil anugerah tempat kedua INSPIRA 2026',
      },
    },
  },
  {
    id: 'samm-accreditation',
    image: portalAsset("/assets/hero-samm-accreditation.webp"), width: 910, height: 1287,
    presentation: 'certificate',
    action: { kind: 'source', href: portalAsset("/documents/tmc-samm-537-accreditation.pdf"), pdf: true },
    copy: {
      en: {
        tag: 'Laboratory Accreditation · SAMM 537',
        title: 'Accredited Laboratory Quality',
        description: 'The supplied Department of Standards Malaysia certificate identifies UMBI / The Malaysian Cohort under SAMM 537 and states validity until 1 November 2028. Accreditation applies to the approved laboratory scope.',
        imageAlt: 'SAMM 537 accreditation certificate for UMBI and The Malaysian Cohort, valid until 1 November 2028',
        imageCaption: 'Certificate issued 11 June 2025 · Refer to the current accredited scope',
      },
      bm: {
        tag: 'Akreditasi Makmal · SAMM 537',
        title: 'Kualiti Makmal Berakreditasi',
        description: 'Sijil Jabatan Standard Malaysia yang dibekalkan menamakan UMBI / The Malaysian Cohort di bawah SAMM 537 dan menyatakan sah hingga 1 November 2028. Akreditasi tertakluk kepada skop makmal yang diluluskan.',
        imageAlt: 'Sijil akreditasi SAMM 537 bagi UMBI dan The Malaysian Cohort, sah hingga 1 November 2028',
        imageCaption: 'Sijil dikeluarkan 11 Jun 2025 · Rujuk skop akreditasi semasa',
      },
    },
  },
  {
    id: 'publications',
    image: portalAsset("/assets/umbi-laboratory-bench.webp"), width: 1084, height: 720,
    action: { kind: 'publications' },
    copy: {
      en: {
        tag: 'Publications · Research Evidence',
        title: `${publicationsList.length} Publication Records to Explore`,
        description: 'Search the TMC publication register by title, research category and year, then follow the original article links. Access conditions remain with the original publishers.',
        imageAlt: 'Archival UMBI laboratory bench and research instruments, 2016',
        imageCaption: 'UMBI laboratory archive · 2016',
      },
      bm: {
        tag: 'Penerbitan · Bukti Penyelidikan',
        title: `${publicationsList.length} Rekod Penerbitan untuk Diterokai`,
        description: 'Cari daftar penerbitan TMC mengikut tajuk, kategori penyelidikan dan tahun, kemudian ikuti pautan artikel asal. Syarat akses tertakluk kepada penerbit asal.',
        imageAlt: 'Arkib meja makmal UMBI dan instrumen penyelidikan, 2016',
        imageCaption: 'Arkib makmal UMBI · 2016',
      },
    },
  },
];
