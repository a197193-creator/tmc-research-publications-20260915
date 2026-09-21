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
  const visitSteps = [
    {
      image: '/assets/visit-questionnaire.jpg',
      title: lang === 'en' ? 'Health Questionnaire' : 'Soal Selidik Kesihatan',
      description: lang === 'en' ? 'Review health, lifestyle and follow-up information with the recruitment team.' : 'Semak maklumat kesihatan, gaya hidup dan susulan bersama pasukan pengambilan peserta.',
    },
    {
      image: '/assets/visit-biophysical-measurement.jpg',
      title: lang === 'en' ? 'Biophysical Measurements' : 'Pengukuran Biofizikal',
      description: lang === 'en' ? 'Record standard measurements such as height and other physical indicators.' : 'Rekod ukuran standard seperti ketinggian dan petunjuk fizikal yang lain.',
    },
    {
      image: '/assets/visit-blood-taking.jpg',
      title: lang === 'en' ? 'Blood Sample Collection' : 'Pengambilan Sampel Darah',
      description: lang === 'en' ? 'Collect fasting blood samples according to the scheduled clinical protocol.' : 'Ambil sampel darah berpuasa mengikut protokol klinikal yang dijadualkan.',
    },
    {
      image: '/assets/visit-dexa.jpg',
      title: lang === 'en' ? 'DEXA Scan' : 'Imbasan DEXA',
      description: lang === 'en' ? 'Assess body composition and bone mineral density where required.' : 'Nilai komposisi badan dan ketumpatan mineral tulang apabila diperlukan.',
    },
    {
      image: '/assets/visit-spirometry.jpg',
      title: lang === 'en' ? 'Spirometry' : 'Spirometri',
      description: lang === 'en' ? 'Measure lung function through a guided breathing assessment.' : 'Ukur fungsi paru-paru melalui penilaian pernafasan berpandu.',
    },
    {
      image: '/assets/visit-fundus-photography.jpg',
      title: lang === 'en' ? 'Fundus Photography' : 'Fotografi Fundus',
      description: lang === 'en' ? 'Capture retinal images for relevant follow-up and research assessments.' : 'Rakam imej retina untuk penilaian susulan dan penyelidikan yang berkaitan.',
    },
    {
      image: '/assets/visit-swab-collection.jpg',
      title: lang === 'en' ? 'Swab Collection' : 'Pengambilan Swab',
      description: lang === 'en' ? 'Collect a swab sample when it is part of the participant’s study protocol.' : 'Ambil sampel swab apabila ia termasuk dalam protokol kajian peserta.',
    },
  ];

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
              {lang === 'en' ? 'Screening Hours, Sampling & Directions' : 'Waktu Saringan, Persampelan & Arahan Laluan'}
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
            {lang === 'en' ? 'Screening Appointment Hours, Biological Sampling & Directions' : 'Waktu Janji Temu Saringan, Persampelan Biologi & Arahan Laluan'}
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
        <div data-scroll-reveal className="group bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 transition-all duration-300 motion-safe:hover:-translate-y-2 hover:border-[#6EC1E4] hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#007bff] flex items-center justify-center transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#003366]">
                {lang === 'en' ? 'Screening Schedule' : 'Jadual Saringan'}
              </h2>
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
              {lang === 'en'
                ? 'Please note that blood collection is only available between 8:00 AM and 10:30 AM.'
                : 'Sila ambil perhatian bahawa pengambilan darah hanya tersedia antara 8:00 pagi hingga 10:30 pagi.'}
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
        <div data-scroll-reveal className="group bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 transition-all duration-300 motion-safe:hover:-translate-y-2 hover:border-[#6EC1E4] hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#007bff] flex items-center justify-center transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
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
        <div data-scroll-reveal className="group bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 transition-all duration-300 motion-safe:hover:-translate-y-2 hover:border-[#6EC1E4] hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#007bff] flex items-center justify-center transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
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

      {/* PARTICIPANT VISIT JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" aria-labelledby="visit-journey-title">
        <div className="mb-5">
          <div>
            <span className="text-xs font-bold uppercase text-[#007bff] tracking-wider">
              {lang === 'en' ? 'Participant Visit Journey' : 'Perjalanan Lawatan Peserta'}
            </span>
            <h2 id="visit-journey-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#003366] mt-1">
              {lang === 'en' ? 'Recruitment Visit Activities' : 'Aktiviti Lawatan Pengambilan Peserta'}
            </h2>
          </div>
        </div>

        <aside
          role="note"
          aria-label={lang === 'en' ? 'Important information about recruitment assessments' : 'Maklumat penting tentang penilaian pengambilan peserta'}
          className="mb-6 flex items-start gap-3 rounded-xl border border-[#6EC1E4]/60 bg-blue-50 px-4 py-4 sm:px-5 text-[#003366] shadow-xs"
        >
          <span className="material-symbols-outlined text-[#007bff] text-2xl shrink-0" aria-hidden="true">info</span>
          <p className="text-sm sm:text-base leading-relaxed">
            {lang === 'en'
              ? 'The activities shown below represent the range of assessments that may be conducted during a recruitment visit. You may not be required to undergo all the activities listed, as the assessments will vary depending on the study or sub-study in which you are participating. For example, spirometry, fundus photography and swab collection are conducted only for selected studies. Our team will inform you of the assessments applicable to your visit.'
              : 'Aktiviti yang ditunjukkan di bawah mewakili pelbagai penilaian yang mungkin dijalankan semasa lawatan pengambilan peserta. Anda mungkin tidak perlu menjalani semua aktiviti yang disenaraikan kerana penilaian akan berbeza mengikut kajian atau subkajian yang anda sertai. Contohnya, spirometri, fotografi fundus dan pengambilan swab hanya dijalankan untuk kajian terpilih. Pasukan kami akan memaklumkan penilaian yang berkaitan dengan lawatan anda.'}
          </p>
        </aside>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visitSteps.map((step) => (
            <article
              key={step.image}
              data-scroll-reveal
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1 hover:border-[#6EC1E4]/70 hover:shadow-lg"
            >
              <img
                src={step.image}
                alt={step.title}
                loading="lazy"
                decoding="async"
                className="w-full aspect-video object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-[#003366] transition-colors duration-300 group-hover:text-[#007bff]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#54595F] leading-relaxed mt-2">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
