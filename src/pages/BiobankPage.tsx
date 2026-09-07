import React, { useState } from 'react';
import { Language } from '../types';

interface BiobankPageProps {
  lang: Language;
  onBack: () => void;
  onNavigatePortal: () => void;
}

export const BiobankPage: React.FC<BiobankPageProps> = ({ lang, onBack, onNavigatePortal }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specimens' | 'infrastructure' | 'access'>('overview');
  const [selectedSpecimen, setSelectedSpecimen] = useState<string | null>(null);

  const specimenTypes = [
    {
      id: 'dna',
      name: lang === 'en' ? 'Genomic DNA' : 'DNA Genomik',
      count: '106,000+ Donors',
      storage: '-80°C & -196°C Vapor',
      description: lang === 'en'
        ? 'High-molecular-weight double-stranded DNA extracted via automated magnetic bead protocols. Average yield 35–50 µg/mL with DIN > 8.0.'
        : 'DNA untai ganda berat molekul tinggi diekstrak melalui protokol manik magnetik automatik. Purata hasil 35–50 µg/mL dengan DIN > 8.0.',
      applications: ['Whole Genome Sequencing (WGS)', 'SNP Microarray Genotyping', 'Targeted Gene Panels', 'Pharmacogenomics']
    },
    {
      id: 'plasma',
      name: lang === 'en' ? 'Blood Plasma' : 'Plasma Darah',
      count: '620,000+ Aliquots',
      storage: '-196°C Liquid Nitrogen',
      description: lang === 'en'
        ? 'EDTA-anticoagulated blood processed within 2 hours of phlebotomy. Separated at 3,000 RPM at 4°C into multiple 0.5 mL barcoded cryovials.'
        : 'Darah antikoagulan EDTA diproses dalam masa 2 jam selepas flebotomi. Diasingkan pada 3,000 RPM pada 4°C ke dalam pelbagai kriovial berbarcod 0.5 mL.',
      applications: ['Proteomics', 'Metabolomics', 'Endocrine Profiles', 'Circulating Cell-Free DNA']
    },
    {
      id: 'serum',
      name: lang === 'en' ? 'Blood Serum' : 'Serum Darah',
      count: '540,000+ Aliquots',
      storage: '-196°C Liquid Nitrogen',
      description: lang === 'en'
        ? 'Clotted whole blood spun after 30-minute ambient coagulation. Ideal for clinical biochemistry, inflammatory panels, and antibody titrations.'
        : 'Darah beku diputar selepas pembekuan ambien 30 minit. Sesuai untuk biokimia klinikal, panel keradangan, dan titrasi antibodi.',
      applications: ['Lipid Subfractions', 'Cytokines (IL-6, TNF-alpha)', 'Cardiac Troponins', 'Tumor Markers']
    },
    {
      id: 'buffy',
      name: lang === 'en' ? 'Buffy Coat (Leukocytes)' : 'Lapisan Buffy (Leukosit)',
      count: '210,000+ Aliquots',
      storage: '-196°C Liquid Nitrogen',
      description: lang === 'en'
        ? 'Concentrated white blood cells containing peripheral blood mononuclear cells (PBMCs), vital for future cellular reprogramming and secondary DNA isolations.'
        : 'Sel darah putih pekat mengandungi PBMC, penting untuk pengaturcaraan semula sel masa hadapan dan pengasingan DNA sekunder.',
      applications: ['Cellular Epigenetics', 'Telomere Biology', 'Immunogenomics', 'Mitochondrial DNA']
    },
    {
      id: 'urine',
      name: lang === 'en' ? 'Urine Aliquots' : 'Aliquot Urin',
      count: '180,000+ Aliquots',
      storage: '-80°C Mechanical Freezers',
      description: lang === 'en'
        ? 'Mid-stream urine collected without preservatives, centrifuged and stored in 1.8 mL cryotubes for renal proteomic and environmental exposome screening.'
        : 'Urin aliran tengah dikumpul tanpa pengawet, diempar dan disimpan dalam kriotiub 1.8 mL untuk penyaringan proteomik buah pinggang dan eksposom alam sekitar.',
      applications: ['Microalbuminuria Proteomics', 'Heavy Metal Exposome', 'Nutritional Metabolites', 'Renal Biomarkers']
    },
    {
      id: 'rna',
      name: lang === 'en' ? 'Total RNA & miRNA' : 'Jumlah RNA & miRNA',
      count: '35,000+ Pre-extracted',
      storage: '-80°C Ultra-Low',
      description: lang === 'en'
        ? 'Stabilized in PAXgene or TRIzol solutions to prevent ribonuclease degradation, with RIN scores consistently exceeding 7.5.'
        : 'Distabilkan dalam larutan PAXgene atau TRIzol untuk mengelakkan degradasi ribonuklease, dengan skor RIN melebihi 7.5.',
      applications: ['Transcriptomics (RNA-Seq)', 'Liquid Biopsy miRNA', 'Gene Expression Profiling']
    }
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      {/* BREADCRUMB HEADER */}
      <div className="bg-[#00274c] text-white py-4 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-300 hover:text-[#6EC1E4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>{lang === 'en' ? 'Home' : 'Laman Utama'}</span>
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-[#6EC1E4] font-semibold">
              {lang === 'en' ? 'National Biobank Facility' : 'Fasiliti Biobank Kebangsaan'}
            </span>
          </nav>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/20"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{lang === 'en' ? 'Back to Overview' : 'Kembali ke Gambaran Keseluruhan'}</span>
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#00274c] via-[#003366] to-[#00274c] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6EC1E4]/15 border border-[#6EC1E4]/30 text-[#6EC1E4] text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">ac_unit</span>
                <span>ISO 15189 & ISO 9001 Certified Biobank</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {lang === 'en'
                  ? 'UMBI National Cryogenic Biobank Repository'
                  : 'Repositori Biobank Kriogenik Kebangsaan UMBI'}
              </h1>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
                {lang === 'en'
                  ? 'Southeast Asia’s largest automated biological specimen archive. Preserving over 1.4 million aliquots of multi-ethnic Malaysian DNA, plasma, serum, buffy coat, and urine at cryogenic temperatures (-196°C) for precision medicine breakthroughs.'
                  : 'Arkib spesimen biologi automatik terbesar di Asia Tenggara. Menyimpan lebih 1.4 juta aliquot DNA, plasma, serum, buffy coat, dan urin pelbagai etnik Malaysia pada suhu kriogenik (-196°C) untuk penemuan perubatan kejituan.'}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#specimens"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#007bff] hover:bg-[#0069d9] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-base">inventory_2</span>
                  <span>{lang === 'en' ? 'Browse Specimen Catalog' : 'Semak Katalog Spesimen'}</span>
                </a>
                <button
                  type="button"
                  onClick={onNavigatePortal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">how_to_reg</span>
                  <span>{lang === 'en' ? 'Participant Sample Status' : 'Status Sampel Peserta'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 rounded-xl p-5 border border-white/15 backdrop-blur-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs uppercase text-slate-300 font-bold">Facility Telemetry</span>
                  <span className="flex items-center gap-1.5 text-xs text-[#28a745] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#28a745] animate-ping"></span>
                    Online • Monitored
                  </span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Storage Core:</span>
                    <span className="text-[#6EC1E4] font-bold">-196°C Liquid N2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Stored Aliquots:</span>
                    <span className="text-white font-bold">1,428,500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Cataloged Donors:</span>
                    <span className="text-white font-bold">106,522</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Retrieval Cycle:</span>
                    <span className="text-white font-bold">&lt; 90 Seconds Robotic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Quality Audit:</span>
                    <span className="text-[#28a745] font-bold">100% DIN Compliance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-slate-200 bg-white rounded-t-lg px-4 pt-2 overflow-x-auto">
          {[
            { id: 'overview', label: lang === 'en' ? 'Facility Overview' : 'Gambaran Keseluruhan', icon: 'info' },
            { id: 'specimens', label: lang === 'en' ? 'Specimen Inventory' : 'Inventori Spesimen', icon: 'biotech' },
            { id: 'infrastructure', label: lang === 'en' ? 'Cryogenic Systems' : 'Sistem Kriogenik', icon: 'ac_unit' },
            { id: 'access', label: lang === 'en' ? 'Researcher Access Protocol' : 'Protokol Akses Penyelidik', icon: 'assignment' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 py-3.5 px-5 font-sans text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#007bff] text-[#007bff]'
                  : 'border-transparent text-[#54595F] hover:text-[#003366]'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: FACILITY OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-b-lg p-6 sm:p-10 border border-t-0 border-slate-200 shadow-xs space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-sm text-[#54595F] leading-relaxed">
                <h3 className="font-serif text-2xl font-bold text-[#003366]">
                  {lang === 'en' ? 'Safeguarding Generational Health Data' : 'Melindungi Khazanah Kesihatan Generasi'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Established in 2006 under the National Flagship Research Programme, the UMBI Cryogenic Biobank is the biological bedrock of The Malaysian Cohort. Specimen collection covers urban, rural, and indigenous populations across all 14 states of Malaysia.'
                    : 'Ditubuhkan pada tahun 2006 di bawah Program Penyelidikan Utama Negara, Biobank Kriogenik UMBI merupakan tunjang biologi bagi The Malaysian Cohort. Pengumpulan spesimen merangkumi populasi bandar, luar bandar, dan orang asli di semua 14 negeri di Malaysia.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'Each participant’s biological samples are aliquoted via high-speed robotics within 2 hours of phlebotomy. 2D DataMatrix barcoding ensures zero identity mix-up, enabling prospective health tracking over decades.'
                    : 'Setiap sampel biologi peserta dialikot melalui robotik berkelajuan tinggi dalam masa 2 jam selepas flebotomi. Kod bar DataMatrix 2D memastikan ketepatan mutlak identiti, membolehkan penjejakan kesihatan prospektif selama berdekad-dekad.'}
                </p>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#003366] text-xs uppercase">
                    <span className="material-symbols-outlined text-sm text-[#007bff]">shield</span>
                    <span>Ethical Governance & Consent</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Approved by the UKM Research Ethics Committee (Ref: UKM 1.21.3/244/FF-044-2007). All participants provide broad informed consent with strict genomic anonymity safeguards.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQdiqBYSxg8rgOuIprTBGVc8Dlv24jtYki_2O6P-5bSr0UYJQ3222uwTEFBNBgXJ5uzEMOLU_DcvSFTOnMVJCXZdXQZ3pI7EiTU2g9GfBipsRalgEqz0xJVgsVmKRAEu3oRX-0cyLaradzhA8YasWNYdvZbLxr7tWTDgSM3rI3lgozfsnK1Z6rmxjGADjJWFlIs-UqOxPuuvvq6lyluneHjkF6BeF3lyx8kRplaaY9Q01Cc72rHEr6"
                  alt="Automated Cryogenic Liquid Nitrogen Tanks"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white text-xs">
                  <span className="font-bold block text-sm">UMBI Liquid Nitrogen Cryogenic Hall</span>
                  <span>Automated bulk tanks with continuous vacuum insulation and telemetry backup</span>
                </div>
              </div>
            </div>

            {/* STATS CALLOUT */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-8">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="font-serif text-3xl font-bold text-[#003366]">1.4M+</div>
                <div className="text-xs text-[#54595F] font-semibold mt-1">Total Aliquots</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="font-serif text-3xl font-bold text-[#007bff]">106,522</div>
                <div className="text-xs text-[#54595F] font-semibold mt-1">Registered Citizens</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="font-serif text-3xl font-bold text-[#28a745]">18 Years</div>
                <div className="text-xs text-[#54595F] font-semibold mt-1">Continuous Storage</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <div className="font-serif text-3xl font-bold text-[#007ca8]">0.0%</div>
                <div className="text-xs text-[#54595F] font-semibold mt-1">Degradation Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPECIMEN INVENTORY */}
        {activeTab === 'specimens' && (
          <div className="bg-white rounded-b-lg p-6 sm:p-10 border border-t-0 border-slate-200 shadow-xs space-y-8" id="specimens">
            <div>
              <span className="text-xs font-bold uppercase text-[#007bff] tracking-wider">Biological Catalog</span>
              <h3 className="font-serif text-2xl font-bold text-[#003366] mt-1">
                {lang === 'en' ? 'Archived Specimen Fractions' : 'Pecahan Spesimen Arkib'}
              </h3>
              <p className="text-sm text-[#54595F] mt-1">
                {lang === 'en'
                  ? 'All specimens are preserved in 2D barcoded cryovials within temperature-regulated vapor or liquid phases.'
                  : 'Semua spesimen disimpan dalam kriovial kod bar 2D di dalam fasa wap atau cecair terkawal suhu.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specimenTypes.map((spec) => (
                <div
                  key={spec.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={selectedSpecimen === spec.id}
                  onClick={() => setSelectedSpecimen(selectedSpecimen === spec.id ? null : spec.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedSpecimen(selectedSpecimen === spec.id ? null : spec.id);
                    }
                  }}
                  className={`p-5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all cursor-pointer ${
                    selectedSpecimen === spec.id
                      ? 'border-[#007bff] bg-blue-50/50 shadow-md ring-1 ring-[#007bff]'
                      : 'border-slate-200 bg-white hover:border-[#007bff]/60 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#003366]">{spec.name}</h4>
                      <span className="text-xs font-mono font-bold text-[#007bff]">{spec.count}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-700">
                      {spec.storage}
                    </span>
                  </div>
                  <p className="text-xs text-[#54595F] mt-3 leading-relaxed">
                    {spec.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Key Research Applications:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {spec.applications.map((app, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-blue-100/60 text-[#003366]">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INFRASTRUCTURE & DISASTER RECOVERY */}
        {activeTab === 'infrastructure' && (
          <div className="bg-white rounded-b-lg p-6 sm:p-10 border border-t-0 border-slate-200 shadow-xs space-y-8">
            <div>
              <span className="text-xs font-bold uppercase text-[#007bff] tracking-wider">Engineering Safeguards</span>
              <h3 className="font-serif text-2xl font-bold text-[#003366] mt-1">
                {lang === 'en' ? 'Cryogenic Engineering & Disaster Resilience' : 'Kejuruteraan Kriogenik & Ketahanan Bencana'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#007bff] flex items-center justify-center">
                  <span className="material-symbols-outlined">autorenew</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#003366]">Automated Liquid N2 Supply</h4>
                <p className="text-xs text-[#54595F] leading-relaxed">
                  Bulk external vacuum-jacketed tanks deliver pressurized liquid nitrogen to internal holding units automatically. Automated sensors trigger filling cycles without manual handling.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-[#f59e0b] flex items-center justify-center">
                  <span className="material-symbols-outlined">power</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#003366]">Triple-Redundant Power</h4>
                <p className="text-xs text-[#54595F] leading-relaxed">
                  Facility is powered by twin industrial diesel generators that engage within 8 seconds of grid disruption, supported by an uninterrupted power supply (UPS) battery array.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#28a745] flex items-center justify-center">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#003366]">Biometric Access Control</h4>
                <p className="text-xs text-[#54595F] leading-relaxed">
                  Multi-tier iris and fingerprint verification with 24/7 CCTV monitoring. Only authorized cryogenic curators are certified to enter storage vaults.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RESEARCHER ACCESS */}
        {activeTab === 'access' && (
          <div className="bg-white rounded-b-lg p-6 sm:p-10 border border-t-0 border-slate-200 shadow-xs space-y-8">
            <div>
              <span className="text-xs font-bold uppercase text-[#007bff] tracking-wider">Collaboration Framework</span>
              <h3 className="font-serif text-2xl font-bold text-[#003366] mt-1">
                {lang === 'en' ? 'How Researchers Can Request Biospecimens' : 'Cara Penyelidik Memohon Spesimen Biologi'}
              </h3>
              <p className="text-sm text-[#54595F] mt-1">
                {lang === 'en'
                  ? 'Access is granted to verified academic and clinical investigators through the UKM-UMBI Data and Sample Access Committee (DAC).'
                  : 'Akses diberikan kepada penyelidik akademik dan klinikal yang disahkan melalui Jawatankuasa Akses Data dan Sampel (DAC) UKM-UMBI.'}
              </p>
            </div>

            <div className="space-y-4">
              {[
                { step: '01', title: 'Submit Research Concept & Ethics Approval', desc: 'Provide institutional ethics clearance and scientific justification matching non-commercial public health utility.' },
                { step: '02', title: 'DAC Scientific Feasibility Review', desc: 'The Data Access Committee evaluates aliquot availability, sample volume feasibility, and methodological rigor within 21 working days.' },
                { step: '03', title: 'Material Transfer Agreement (MTA)', desc: 'Execute binding MTA ensuring strict compliance with the Personal Data Protection Act (PDPA 2010) and non-redistribution.' },
                { step: '04', title: 'Cold-Chain Cryogenic Courier Delivery', desc: 'Aliquots are picked via robotics, packed in dry vapor shippers at -150°C, and dispatched with continuous temperature data loggers.' }
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-serif text-2xl font-bold text-[#007bff] shrink-0">{s.step}</span>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#003366]">{s.title}</h4>
                    <p className="text-xs text-[#54595F] mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-[#003366] to-[#00274c] text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold">Ready to submit a biospecimen proposal?</h4>
                <p className="text-xs text-slate-300 mt-1">Download the official UMBI Specimen Request Dossier and DAC guideline form.</p>
              </div>
              <a
                href="mailto:cohort@ukm.edu.my?subject=Biospecimen%20Access%20Inquiry%20-%20UMBI%20Biobank"
                className="px-5 py-2.5 rounded bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold whitespace-nowrap shadow-sm transition-all"
              >
                Contact DAC Secretariat
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
