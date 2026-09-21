import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Phase3SupportStripProps {
  lang: Language;
  onOpenPortal: () => void;
  onOpenWhatsApp: () => void;
}

export const Phase3SupportStrip: React.FC<Phase3SupportStripProps> = ({
  lang,
  onOpenPortal,
  onOpenWhatsApp
}) => {
  const t = translations[lang];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 mb-2 relative z-20" id="portal-section">
      <div className="bg-white rounded-lg shadow-md border border-slate-200 border-t-4 border-t-[#007bff] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <button
            type="button"
            onClick={onOpenPortal}
            className="w-14 h-14 rounded-full bg-blue-50 text-[#007bff] border border-blue-200 flex items-center justify-center flex-shrink-0 shadow-xs hover:scale-105 transition-transform cursor-pointer"
            title={t.supportStrip.openPortalTitle}
          >
            <span className="material-symbols-outlined text-3xl">how_to_reg</span>
          </button>
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#007bff]">
              {t.supportStrip.tag}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#003366] mt-0.5">
              {t.supportStrip.title}
            </h2>
            <p className="text-sm text-[#54595F] mt-1 max-w-2xl leading-relaxed">
              {t.supportStrip.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <a
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-gradient-to-r from-[#007bff] to-[#003366] hover:from-[#0069d9] hover:to-[#00274c] text-white font-sans font-semibold text-sm transition-all shadow-sm"
            href="tel:1800882007"
            id="strip-phone-btn"
          >
            <span className="material-symbols-outlined text-lg text-[#6EC1E4]">call</span>
            <span>{t.supportStrip.call}</span>
          </a>

          <button
            type="button"
            onClick={onOpenWhatsApp}
            id="strip-whatsapp-btn"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#28a745] hover:bg-[#218838] text-white font-sans font-semibold text-sm shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            <span>{t.supportStrip.whatsapp}</span>
          </button>

          <button
            type="button"
            onClick={onOpenPortal}
            id="strip-portal-check-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded border border-blue-300 hover:bg-blue-50 text-[#007bff] font-sans font-semibold text-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#007bff]">calendar_month</span>
            <span>{t.supportStrip.checkSchedule}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
