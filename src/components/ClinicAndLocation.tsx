import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ClinicAndLocationProps {
  lang: Language;
  onNavigateClinic?: () => void;
}

export const ClinicAndLocation: React.FC<ClinicAndLocationProps> = ({ lang, onNavigateClinic }) => {
  const t = translations[lang];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" id="clinic-hours">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-300 pb-4 mb-10 gap-4">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#007bff]">
            {t.clinicSection.tag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#003366] mt-1">
            {t.clinicSection.title}
          </h2>
        </div>
        {onNavigateClinic && (
          <button
            type="button"
            onClick={onNavigateClinic}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007bff] hover:text-[#0056b3] cursor-pointer"
          >
            <span>{lang === 'en' ? 'View Full Directions & Parking Guide' : 'Lihat Panduan Arah & Tempat Letak Kereta Penuh'}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Operating Hours Card */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#007bff] border border-blue-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#003366]">
            {t.clinicSection.serviceHoursTitle}
          </h3>
          <dl className="space-y-3 text-sm divide-y divide-slate-100 font-sans">
            <div className="pt-2 flex justify-between">
              <dt className="font-semibold text-slate-700">{t.clinicSection.monThu}</dt>
              <dd className="text-slate-600 font-mono">8:00 AM – 4:30 PM</dd>
            </div>
            <div className="pt-3 flex justify-between">
              <dt className="font-semibold text-slate-700">{t.clinicSection.friMorning}</dt>
              <dd className="text-slate-600 font-mono">8:00 AM – 12:15 PM</dd>
            </div>
            <div className="pt-3 flex justify-between">
              <dt className="font-semibold text-slate-700">{t.clinicSection.friAfternoon}</dt>
              <dd className="text-slate-600 font-mono">2:45 PM – 4:30 PM</dd>
            </div>
            <div className="pt-3 flex justify-between text-[#007bff] font-semibold">
              <dt>{t.clinicSection.fastingSampling}</dt>
              <dd className="font-mono">8:00 AM – 10:30 AM</dd>
            </div>
            <div className="pt-3 flex justify-between text-slate-500">
              <dt>{t.clinicSection.weekendsHolidays}</dt>
              <dd className="font-mono">{t.clinicSection.closed}</dd>
            </div>
          </dl>
        </div>

        {/* Location & Parking */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#007bff] border border-blue-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">pin_drop</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#003366]">
            {t.clinicSection.physicalAddressTitle}
          </h3>
          <address className="not-italic text-sm text-[#54595F] leading-relaxed space-y-1 font-sans">
            <p className="font-semibold text-[#003366]">UKM Medical Molecular Biology Institute (UMBI)</p>
            <p>Jalan Yaacob Latif, Bandar Tun Razak</p>
            <p>56000 Cheras, Kuala Lumpur, Malaysia</p>
            <p className="pt-2 text-xs text-slate-500">
              {lang === 'en' ? 'Adjacent to Hospital Canselor Tuanku Muhriz (HCTM UKM)' : 'Bersebelahan Hospital Canselor Tuanku Muhriz (HCTM UKM)'}
            </p>
          </address>
          <div className="p-3.5 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 font-sans">
            <span className="material-symbols-outlined text-base text-[#007bff] shrink-0 mt-0.5">local_parking</span>
            <span>{t.clinicSection.parkingNotice}</span>
          </div>
        </div>

        {/* Public Transit Information */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#007bff] border border-blue-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">directions_transit</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#003366]">
            {t.clinicSection.publicTransitTitle}
          </h3>
          <ul className="space-y-3 text-sm text-[#54595F] font-sans">
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#007bff] text-lg flex-shrink-0 mt-0.5">subway</span>
              <span>
                <strong>{lang === 'en' ? 'MRT Sungai Buloh-Kajang Line:' : 'Laluan MRT Sungai Buloh-Kajang:'}</strong>{' '}
                {lang === 'en' ? (
                  <>Disembark at <em>Taman Midah MRT Station</em> (Exit B).</>
                ) : (
                  <>Turun di <em>Stesen MRT Taman Midah</em> (Pintu B).</>
                )}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#007bff] text-lg flex-shrink-0 mt-0.5">directions_bus</span>
              <span>
                <strong>{lang === 'en' ? 'Feeder Buses:' : 'Bas Perantara:'}</strong>{' '}
                RapidKL <strong>T400</strong> {lang === 'en' ? 'or' : 'atau'} <strong>T402</strong> {lang === 'en' ? 'stops directly at UMBI / HCTM Main Gate.' : 'berhenti di Pintu Utama UMBI / HCTM.'}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#007bff] text-lg flex-shrink-0 mt-0.5">local_taxi</span>
              <span>
                <strong>E-Hailing Drop-off:</strong>{' '}
                {lang === 'en' ? (
                  <>Set destination as <em>"UMBI UKM Cheras"</em> for front-lobby shelter arrival.</>
                ) : (
                  <>Tetapkan destinasi <em>"UMBI UKM Cheras"</em> untuk ketibaan lobi utama berbumbung.</>
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
