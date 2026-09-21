import React from 'react';
import { Language } from '../types';

interface ParticipantPortalPageProps {
  lang: Language;
  onBack: () => void;
  onOpenWhatsApp: () => void;
}

export const ParticipantPortalPage: React.FC<ParticipantPortalPageProps> = ({
  lang,
  onBack,
  onOpenWhatsApp,
}) => {
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
              {lang === 'en' ? 'Participant Portal & Screening Follow-up' : 'Portal Peserta & Susulan Saringan'}
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6EC1E4]/15 border border-[#6EC1E4]/30 text-[#6EC1E4] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">clinical_notes</span>
            <span>Dedicated Participant Gateway</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {lang === 'en'
              ? 'The Malaysian Cohort Health Screening Follow-Up Portal'
              : 'Portal Susulan Saringan Kesihatan The Malaysian Cohort'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">
            {lang === 'en'
              ? 'Welcome to the participant information portal. Online screening and result retrieval will be introduced only after secure integration with the TMC database and/or MyCohort mobile application is approved.'
              : 'Selamat datang ke portal maklumat peserta. Semakan saringan dan keputusan dalam talian hanya akan diperkenalkan selepas integrasi selamat dengan pangkalan data TMC dan/atau aplikasi mudah alih MyCohort diluluskan.'}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: IC LOOKUP TOOL & APPOINTMENT TRACKER */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase text-[#007bff] tracking-wider">
                {lang === 'en' ? 'Integration Required' : 'Integrasi Diperlukan'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#003366] mt-1">
                {lang === 'en' ? 'Check My Screening & Result Status' : 'Semak Status Saringan & Keputusan Saya'}
              </h2>
              <p className="text-xs text-[#54595F] mt-1">
                {lang === 'en'
                  ? 'This feature is not yet connected to the live TMC participant registry.'
                  : 'Ciri ini belum disambungkan kepada daftar peserta TMC sebenar.'}
              </p>
            </div>

            <div role="status" className="p-5 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-950 space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined shrink-0">database</span>
                <div>
                  <strong className="block">
                    {lang === 'en' ? 'Online result checking is not yet available.' : 'Semakan keputusan dalam talian belum tersedia.'}
                  </strong>
                  <p className="text-xs mt-1 leading-relaxed">
                    {lang === 'en'
                      ? 'Secure integration with the existing TMC database and/or MyCohort mobile application requires further discussion and approval by the TMC IT and data-governance teams.'
                      : 'Integrasi selamat dengan pangkalan data TMC sedia ada dan/atau aplikasi mudah alih MyCohort memerlukan perbincangan dan kelulusan lanjut daripada pasukan IT serta tadbir urus data TMC.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onOpenWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>{lang === 'en' ? 'Ask About My Follow-Up Appointment' : 'Tanya Tentang Janji Temu Susulan Saya'}</span>
                </button>
                <a
                  href="tel:1800882007"
                  className="inline-flex items-center justify-center gap-2 rounded border border-amber-300 bg-white px-4 py-2.5 text-xs font-bold text-[#003366] transition-colors hover:bg-amber-100"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>1800-88-2007</span>
                </a>
              </div>
            </div>
          </div>

          {/* WHAT WE TEST DURING SCREENING */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#003366]">
              {lang === 'en' ? 'Complimentary Clinical Tests Included in Follow-Up Screening' : 'Ujian Klinikal Percuma dalam Saringan Susulan'}
            </h3>
            <p className="text-xs text-[#54595F]">
              All tests are conducted free of charge by licensed UKM medical officers, nurses, and lab scientists:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Fasting Blood Profile', desc: 'Full blood count, fasting blood glucose, HbA1c, lipid subfractions (cholesterol, HDL, LDL, triglycerides).' },
                { title: 'Renal & Liver Function', desc: 'Urea, creatinine, eGFR kidney filtration rate, serum uric acid, AST, ALT liver enzymes.' },
                { title: 'Resting 12-Lead ECG', desc: 'Electrocardiogram to evaluate heart rate rhythms, conduction delays, and silent ischemia signs.' },
                { title: 'Body Composition (BIA)', desc: 'Visceral fat rating, skeletal muscle mass, total body water percentage, and basal metabolic rate.' },
                { title: 'Arterial Pulse Wave Velocity', desc: 'Non-invasive carotid-femoral stiffness check to assess cardiovascular vascular ageing.' },
                { title: 'Doctor Consultation', desc: 'One-on-one review with medical officer, immediate feedback report, and clinic referral if needed.' }
              ].map((t, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <strong className="text-xs font-bold text-[#003366] block">{t.title}</strong>
                  <p className="text-[11px] text-[#54595F] leading-tight">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FASTING GUIDELINES & CLINICAL HELPDESK */}
        <div className="lg:col-span-5 space-y-6">
          {/* FASTING PREPARATION */}
          <div className="bg-gradient-to-br from-[#003366] to-[#00274c] text-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#6EC1E4] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined">schedule</span>
              <span>Crucial Visit Preparation</span>
            </div>
            <h3 className="font-serif text-xl font-bold">10-Hour Fasting Instructions</h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              To ensure accurate blood glucose and lipid measurements, please follow these guidelines prior to your morning screening appointment:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#6EC1E4] shrink-0 mt-0.5">check_circle</span>
                <span>Fast for 10 to 12 hours (no food or sweetened beverages from 10:00 PM the night before).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#6EC1E4] shrink-0 mt-0.5">check_circle</span>
                <span>Plain water is allowed and encouraged to keep you well hydrated for phlebotomy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#6EC1E4] shrink-0 mt-0.5">check_circle</span>
                <span>
                  {lang === 'en'
                    ? 'Please note that blood collection is only available between 8:00 AM and 10:30 AM.'
                    : 'Sila ambil perhatian bahawa pengambilan darah hanya tersedia antara 8:00 pagi hingga 10:30 pagi.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#6EC1E4] shrink-0 mt-0.5">check_circle</span>
                <span>Complimentary light breakfast (tea/coffee & sandwich) is provided right after sampling.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-blue-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-300">Venue: UMBI UKM Cheras</span>
              <span className="text-[#6EC1E4] font-semibold">Level 6 Screening Suite</span>
            </div>
          </div>

          {/* NURSE & HELPDESK ASSISTANCE */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#003366]">Participant Nurse Helpline</h4>
            <p className="text-xs text-[#54595F]">
              Have questions about your appointment date or directions? Our research duty nurses are ready to assist you.
            </p>

            <div className="space-y-2 text-xs">
              <a
                href="tel:1800882007"
                className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200 hover:border-[#007bff] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#007bff]">call</span>
                  <span>Toll-Free Nationwide Line</span>
                </div>
                <strong className="text-[#003366] font-mono">1800-88-2007</strong>
              </a>

              <a
                href="tel:+60391459000"
                className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200 hover:border-[#007bff] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#007bff]">phone_in_talk</span>
                  <span>UMBI General Clinic</span>
                </div>
                <strong className="text-[#003366] font-mono">+603-9145 9000</strong>
              </a>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="w-full flex items-center justify-center gap-2 p-3 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">chat</span>
                <span>Chat with Duty Nurse on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
