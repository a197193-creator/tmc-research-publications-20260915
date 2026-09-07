import React from 'react';
import { Language } from '../types';

interface ClinicLocationPageProps {
  lang: Language;
  onBack: () => void;
  onNavigatePortal: () => void;
}

export const ClinicLocationPage: React.FC<ClinicLocationPageProps> = ({
  lang,
  onBack,
  onNavigatePortal,
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
              {lang === 'en' ? 'Clinic Hours, Sampling & Directions' : 'Waktu Klinik, Persampelan & Arahan Laluan'}
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
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>UMBI Cheras Clinical Campus</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {lang === 'en' ? 'Clinic Hours, Biological Sampling & Directions' : 'Waktu Klinik, Persampelan Biologi & Arahan Laluan'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">
            {lang === 'en'
              ? 'Everything you need to know for your visit to the UKM Medical Molecular Biology Institute (UMBI) in Cheras, Kuala Lumpur. Fasting collection schedules, transit routes, and parking.'
              : 'Semua yang anda perlu tahu untuk lawatan ke Institut Biologi Molekul Perubatan UKM (UMBI) di Cheras, Kuala Lumpur. Jadual pengambilan darah berpuasa, laluan transit, dan tempat letak kereta.'}
          </p>
        </div>
      </section>

      {/* THREE KEY COLUMNS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COL 1: CLINIC HOURS & SAMPLING */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#007bff] flex items-center justify-center">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#003366]">Clinic Schedule</h2>
              <span className="text-xs text-[#7A7A7A]">Cheras Screening Suite</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#007bff] uppercase">
              <span className="material-symbols-outlined text-sm">bloodtype</span>
              <span>Fasting Blood Window</span>
            </div>
            <p className="font-serif text-xl font-bold text-[#003366]">8:00 AM – 10:30 AM</p>
            <p className="text-xs text-slate-600">
              Mandatory morning fasting blood draws must conclude before 10:30 AM to maintain biological biomarker integrity.
            </p>
          </div>

          <div className="space-y-3 text-xs text-[#54595F]">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Monday – Thursday:</span>
              <span className="font-mono">8:00 AM – 4:30 PM</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Friday (Prayer Break 12:15 - 2:45 PM):</span>
              <span className="font-mono">8:00 AM – 4:30 PM</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Saturday, Sunday & Public Holidays:</span>
              <span className="text-rose-600 font-semibold">Closed</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigatePortal}
            className="w-full py-2.5 rounded bg-[#007bff] hover:bg-[#0069d9] text-white font-semibold text-xs transition-colors text-center cursor-pointer shadow-xs"
          >
            Check My Appointment Slot
          </button>
        </div>

        {/* COL 2: PHYSICAL ADDRESS & PARKING */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#007bff] flex items-center justify-center">
              <span className="material-symbols-outlined">apartment</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#003366]">Address & Parking</h2>
              <span className="text-xs text-[#7A7A7A]">UMBI Headquarters</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#54595F] leading-relaxed">
            <div className="p-3 bg-slate-50 rounded border border-slate-100 font-mono text-slate-700">
              Institut Biologi Molekul Perubatan UKM (UMBI),<br />
              Jalan Yaacob Latif, Bandar Tun Razak,<br />
              56000 Cheras, Wilayah Persekutuan Kuala Lumpur
            </div>

            <h4 className="font-serif text-sm font-bold text-[#003366] pt-2">Visitor Parking Policy:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-emerald-600 shrink-0 mt-0.5">check</span>
                <span><strong>Complimentary Cohort Parking:</strong> Designated parking bays are allocated for active screening participants at the UMBI Multi-Level Car Park (Level 2).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-emerald-600 shrink-0 mt-0.5">check</span>
                <span>Present your appointment card or SMS confirmation to the security guard at Gate 1 for validated entry.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <a
              href="https://maps.google.com/?q=UMBI+UKM+Cheras"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded bg-slate-100 hover:bg-slate-200 text-[#003366] text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">map</span>
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* COL 3: PUBLIC TRANSIT DIRECTIONS */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#007bff] flex items-center justify-center">
              <span className="material-symbols-outlined">directions_bus</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#003366]">Public Transit</h2>
              <span className="text-xs text-[#7A7A7A]">MRT & Feeder Buses</span>
            </div>
          </div>

          <div className="space-y-4 text-xs text-[#54595F]">
            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <strong className="text-xs text-[#003366] font-bold block">1. MRT Sungai Buloh - Kajang Line</strong>
              <p>Alight at <strong>Taman Midah MRT Station (SBK24)</strong>, Gate B. Take RapidKL feeder bus T400 or take a 4-minute e-hailing ride directly to UMBI Main Gate.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <strong className="text-xs text-[#003366] font-bold block">2. RapidKL Feeder Buses</strong>
              <p>Bus <strong>T400</strong> (MRT Taman Midah &harr; Bandar Tun Razak) stops directly at the HCTM/UMBI Bus Hub. Bus <strong>T402</strong> connects from LRT Salak Selatan.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <strong className="text-xs text-[#003366] font-bold block">3. E-Hailing Drop-Off (Grab / AirAsia Ride)</strong>
              <p>Set destination pin to: <strong>"UMBI UKM - Institut Biologi Molekul Perubatan"</strong>. Drop-off lobby is fully sheltered and wheelchair-accessible.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-emerald-600">accessible</span>
            <span>Wheelchair assistance available at main reception lobby.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
