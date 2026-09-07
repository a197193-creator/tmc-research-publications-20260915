import React, { useState } from 'react';
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
  const [icNumber, setIcNumber] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    status: 'found' | 'not_found' | 'error';
    name?: string;
    phase?: string;
    nextAppointment?: string;
    biomarkersReady?: boolean;
    center?: string;
    phone?: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const mockDatabase: Record<string, { name: string; phase: string; nextAppointment: string; biomarkersReady: boolean; center: string; phone: string }> = {
    '650812105423': {
      name: 'Haji Ahmad bin Zulkifli',
      phase: 'Phase 3 (Repeat Longitudinal Follow-up)',
      nextAppointment: 'Wednesday, 15 April 2026 at 8:30 AM',
      biomarkersReady: true,
      center: 'UKM UMBI Clinical Screening Suite, Level 1, Cheras KL',
      phone: '012-***4920'
    },
    '720419145612': {
      name: 'Tan Mei Ling',
      phase: 'Phase 3 (Repeat Longitudinal Follow-up)',
      nextAppointment: 'Monday, 20 April 2026 at 9:00 AM',
      biomarkersReady: true,
      center: 'UKM UMBI Clinical Screening Suite, Level 1, Cheras KL',
      phone: '016-***7712'
    },
    '810304085119': {
      name: 'Kavitha a/p Subramaniam',
      phase: 'Phase 2 (Completed) - Phase 3 Pending Schedule',
      nextAppointment: 'Invitation Pending Dispatch (May 2026)',
      biomarkersReady: false,
      center: 'UKM UMBI Screening Center, Cheras KL',
      phone: '019-***3381'
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = icNumber.replace(/\D/g, '');
    if (clean.length !== 12) {
      setLookupResult({ status: 'error' });
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (mockDatabase[clean]) {
        setLookupResult({ status: 'found', ...mockDatabase[clean] });
      } else {
        setLookupResult({ status: 'not_found' });
      }
    }, 600);
  };

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
              ? 'Phase 3 Health Screening Follow-Up Portal'
              : 'Portal Susulan Saringan Kesihatan Fasa 3'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">
            {lang === 'en'
              ? 'Welcome to the dedicated portal for our 106,000+ Malaysian Cohort participants. Check your screening appointment schedule, access your complimentary clinical biomarker reports, or update your contact details.'
              : 'Selamat datang ke portal khas untuk lebih 106,000 peserta The Malaysian Cohort. Semak jadual temujanji saringan anda, dapatkan laporan biomarker klinikal percuma, atau kemas kini maklumat perhubungan anda.'}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: IC LOOKUP TOOL & APPOINTMENT TRACKER */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase text-[#007bff] tracking-wider">Fast Verification</span>
              <h2 className="font-serif text-2xl font-bold text-[#003366] mt-1">
                {lang === 'en' ? 'Check My Screening & Result Status' : 'Semak Status Saringan & Keputusan Saya'}
              </h2>
              <p className="text-xs text-[#54595F] mt-1">
                {lang === 'en'
                  ? 'Enter your 12-digit Malaysian Identity Card Number (MyKad / IC) without dashes.'
                  : 'Masukkan 12 digit Nombor Kad Pengenalan (MyKad) tanpa tanda sempang.'}
              </p>
            </div>

            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label htmlFor="ic-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  {lang === 'en' ? 'Malaysian MyKad / IC Number' : 'Nombor MyKad / Kad Pengenalan'}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                    badge
                  </span>
                  <input
                    id="ic-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{12}"
                    maxLength={12}
                    placeholder="e.g. 650812105423"
                    value={icNumber}
                    onChange={(e) => setIcNumber(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-300 font-mono text-sm tracking-wider focus:ring-2 focus:ring-[#007bff] focus:outline-hidden"
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Example test ICs: 650812105423, 720419145612</span>
                  <span className="text-emerald-600 font-medium">Prototype lookup • no data transmitted</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-3 rounded bg-gradient-to-r from-[#007bff] to-[#003366] hover:from-[#0069d9] hover:to-[#00274c] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                    <span>Checking Prototype Records...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">search</span>
                    <span>{lang === 'en' ? 'Verify & View My Record' : 'Sahkan & Lihat Rekod Saya'}</span>
                  </>
                )}
              </button>
            </form>

            {/* LOOKUP RESULT DISPLAY */}
            {lookupResult && lookupResult.status === 'found' && (
              <div className="p-5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-blue-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <strong className="text-sm font-serif text-[#003366]">{lookupResult.name}</strong>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                    PROTOTYPE RECORD
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Phase:</span>
                    <strong className="text-slate-800">{lookupResult.phase}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Follow-up Appointment:</span>
                    <strong className="text-[#007bff]">{lookupResult.nextAppointment}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clinical Screening Venue:</span>
                    <span className="text-slate-700 font-medium text-right max-w-xs">{lookupResult.center}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Free Biomarkers Report:</span>
                    <span className="text-emerald-700 font-bold">Available at Consultation</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-200/80 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onOpenWhatsApp}
                    className="flex-1 py-2 px-3 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Confirm / Reschedule via WhatsApp</span>
                  </button>
                  <a
                    href="tel:1800882007"
                    className="py-2 px-3 rounded bg-white hover:bg-slate-50 text-[#003366] font-semibold border border-slate-300 text-center flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">call</span>
                    <span>1800-88-2007</span>
                  </a>
                </div>
              </div>
            )}

            {lookupResult && lookupResult.status !== 'found' && (
              <div className="p-5 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-950 flex items-start gap-3 animate-in fade-in">
                <span className="material-symbols-outlined shrink-0">info</span>
                <div>
                  <strong className="block">
                    {lookupResult.status === 'error'
                      ? (lang === 'en' ? 'Enter a valid 12-digit MyKad number.' : 'Masukkan nombor MyKad 12 digit yang sah.')
                      : (lang === 'en' ? 'No matching prototype record was found.' : 'Tiada rekod prototaip yang sepadan ditemui.')}
                  </strong>
                  <span className="text-xs">
                    {lang === 'en'
                      ? 'This demonstration does not connect to the live TMC participant registry. Please contact the TMC team for an official status check.'
                      : 'Demonstrasi ini tidak bersambung dengan daftar peserta TMC sebenar. Sila hubungi pasukan TMC untuk semakan status rasmi.'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* WHAT WE TEST DURING SCREENING */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#003366]">
              {lang === 'en' ? 'Complimentary Clinical Tests Included in Phase 3' : 'Ujian Klinikal Percuma Termasuk dalam Fasa 3'}
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
                <span>Blood collection is strictly between <strong>8:00 AM and 10:30 AM</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#6EC1E4] shrink-0 mt-0.5">check_circle</span>
                <span>Complimentary light breakfast (tea/coffee & sandwich) is provided right after sampling.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-blue-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-300">Venue: UMBI UKM Cheras</span>
              <span className="text-[#6EC1E4] font-semibold">Level 1 Screening Suite</span>
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
