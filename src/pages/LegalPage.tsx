import React, { useState } from 'react';
import { Language } from '../types';

interface LegalPageProps {
  initialSection?: string | null;
  lang: Language;
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialSection,
  lang,
  onBack,
}) => {
  const [activeSection, setActiveSection] = useState<'ethics' | 'pdpa' | 'terms' | 'governance'>(
    initialSection === 'pdpa' ? 'pdpa' : initialSection === 'terms' ? 'terms' : 'ethics'
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      {/* BREADCRUMB */}
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
              {lang === 'en' ? 'Ethics, Privacy & Legal Governance' : 'Etika, Privasi & Tadbir Urus'}
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

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#00274c] via-[#003366] to-[#00274c] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6EC1E4]/15 border border-[#6EC1E4]/30 text-[#6EC1E4] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">gavel</span>
            <span>Institutional Governance</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {lang === 'en'
              ? 'Institutional Ethics, Privacy (PDPA) & Data Access Governance'
              : 'Etika Institusi, Privasi (PDPA) & Tadbir Urus Akses Data'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">
            The Malaysian Cohort operates under stringent medical ethics clearance, national privacy legislation, and international biobanking standards.
          </p>
        </div>
      </section>

      {/* NAVIGATION TABS & CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-slate-200 bg-white rounded-t-lg px-4 pt-2 overflow-x-auto">
          {[
            { id: 'ethics', label: 'Research Ethics (UKM REC)', icon: 'verified' },
            { id: 'pdpa', label: 'Privacy Policy (PDPA 2010)', icon: 'lock' },
            { id: 'terms', label: 'Data Access Terms & MTA', icon: 'description' },
            { id: 'governance', label: 'Institutional Governance & Oversight', icon: 'account_balance' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`inline-flex items-center gap-2 py-3.5 px-5 font-sans text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeSection === tab.id
                  ? 'border-[#007bff] text-[#007bff]'
                  : 'border-transparent text-[#54595F] hover:text-[#003366]'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-b-lg p-6 sm:p-10 border border-t-0 border-slate-200 shadow-xs space-y-6 text-[#54595F] text-sm leading-relaxed">
          {activeSection === 'ethics' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#003366]">
                Universiti Kebangsaan Malaysia Research Ethics Committee (UKM REC)
              </h2>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-slate-800 space-y-1">
                <strong>Primary Ethics Clearance Reference:</strong>
                <p className="font-mono text-sm font-bold text-[#003366]">UKM 1.21.3/244/FF-044-2007 (Renewed Annually)</p>
              </div>
              <p>
                The Malaysian Cohort project was approved by the UKM Research Ethics Committee and operates in accordance with the Declaration of Helsinki. All protocols involving biological sampling, anthropometric testing, electrocardiography, and genomic sequencing are reviewed annually.
              </p>
              <h3 className="font-serif text-lg font-bold text-[#003366]">Participant Consent Standards</h3>
              <p>
                Every participant enrolled in The Malaysian Cohort provides written, signed informed consent. Participants retain the autonomy to withdraw their consent at any time without penalty or impact on their standard clinical care at any hospital.
              </p>
            </div>
          )}

          {activeSection === 'pdpa' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#003366]">
                Personal Data Protection Act (PDPA 2010) Compliance
              </h2>
              <p>
                We adhere strictly to the Personal Data Protection Act 2010 (Act 709) of Malaysia. All participant demographic data, national identity card numbers (MyKad), clinical measurements, and genetic sequencing files are stored within air-gapped, encrypted servers hosted on sovereign Malaysian territory.
              </p>
              <h3 className="font-serif text-lg font-bold text-[#003366]">De-Identification & Pseudonymization</h3>
              <p>
                All biological aliquots and genomic datasets are referenced solely by randomized 2D alphanumeric codes (e.g. TMC-24-XXXX). Direct personal identifiers are sequestered behind dual-key administrative encryption and are never released to third-party researchers or commercial pharmaceutical entities.
              </p>
            </div>
          )}

          {activeSection === 'terms' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#003366]">
                Material Transfer Agreements (MTA) & Data Use Terms
              </h2>
              <p>
                Scientific access to TMC biospecimens and epidemiologic datasets is regulated by the UKM-UMBI Data Access Committee (DAC). Any collaborating institution (domestic or international) must sign a binding Material Transfer Agreement (MTA) guaranteeing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-slate-700">
                <li>Non-commercial public health utilization exclusively for the approved scientific protocol.</li>
                <li>Absolute prohibition on attempting to re-identify any individual participant.</li>
                <li>Mandatory co-authorship recognition and citation of The Malaysian Cohort Study Group in peer-reviewed outputs.</li>
                <li>Immediate return or destruction of residual biological samples upon study completion.</li>
              </ul>
            </div>
          )}

          {activeSection === 'governance' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#003366]">
                Institutional Oversight & Steering Committee
              </h2>
              <p>
                The Malaysian Cohort is directed by an overarching National Steering Committee comprising representatives from:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-[#003366] block">Ministry of Higher Education (MOHE)</strong>
                  <span>Main funding body and strategic research governance.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-[#003366] block">Ministry of Health Malaysia (MOH)</strong>
                  <span>Clinical epidemiology translation and National NCD policy alignment.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-[#003366] block">Universiti Kebangsaan Malaysia (UKM)</strong>
                  <span>Institutional custodian of UMBI biobanking facility and screening clinic.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-[#003366] block">International Cohort Consortia (IHCC)</strong>
                  <span>Global interoperability benchmarks and genomic data harmonization.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
