import React from 'react';
import { Language, Publication, BulletinItem, ParticipantMaterial } from '../types';
import { translations } from '../data/translations';
import { publicationsList, bulletinNews, participantMaterialsList } from '../data/portalData';

interface PublicationsAndSidebarProps {
  lang: Language;
  onSelectPublication: (pub: Publication) => void;
  onDownloadPublication: (pub: Publication) => void;
  onBrowseArchive: () => void;
  onBrowseNews: () => void;
  onSelectNews: (item: BulletinItem) => void;
  onSelectMaterial: (mat: ParticipantMaterial) => void;
  onContactNurse: () => void;
}

export const PublicationsAndSidebar: React.FC<PublicationsAndSidebarProps> = ({
  lang,
  onSelectPublication,
  onDownloadPublication,
  onBrowseArchive,
  onBrowseNews,
  onSelectNews,
  onSelectMaterial,
  onContactNurse
}) => {
  const t = translations[lang];

  return (
    <section className="bg-[#f8f9fa] border-t border-b border-slate-200 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: FEATURED SCIENTIFIC PUBLICATIONS (8 cols) */}
          <div className="lg:col-span-8 space-y-10" id="publications">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#007bff]">
                {t.publicationsSection.tag}
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#003366] mt-1">
                {t.publicationsSection.title}
              </h2>
              <p className="text-sm text-[#54595F] mt-1 font-sans leading-relaxed">
                {t.publicationsSection.subtitle}
              </p>
            </div>

            {/* Publication 1: Nature Genetics */}
            <article className="bg-white p-6 sm:p-8 rounded-lg shadow-xs border-l-4 border-[#007bff] border-t border-r border-b border-slate-200 hover-lift">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-50 text-[#007bff] font-sans text-xs font-bold uppercase border border-blue-200/60">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Nature Genetics • 2024
                </span>
                <span className="text-xs font-mono text-[#7A7A7A]">DOI: 10.1038/s41588-024-01822-x</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#003366] mt-4 leading-snug">
                <button
                  type="button"
                  onClick={() => onSelectPublication(publicationsList[0])}
                  className="text-left hover:text-[#007bff] transition-colors cursor-pointer"
                >
                  "{publicationsList[0].title}"
                </button>
              </h3>
              <p className="text-xs text-[#54595F] mt-2 font-mono">
                <strong>Authors:</strong> {publicationsList[0].authors}
              </p>

              {/* Plain-Language Summary Box */}
              <div className="mt-5 p-5 rounded bg-blue-50/70 border border-blue-200/80 text-slate-800">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#007bff] uppercase tracking-wider mb-1.5">
                  <span className="material-symbols-outlined text-base text-[#007bff]">lightbulb</span>
                  <span>{t.publicationsSection.plainSummaryTitle}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {publicationsList[0].plainLanguageSummary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-sans text-slate-500">
                  Category: <strong>{publicationsList[0].category}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onDownloadPublication(publicationsList[0])}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#007bff] hover:text-[#0056b3] uppercase tracking-wider cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>{t.publicationsSection.downloadAbstract}</span>
                </button>
              </div>
            </article>

            {/* Publication 2: The Lancet Regional Health */}
            <article className="bg-white p-6 sm:p-8 rounded-lg shadow-xs border-l-4 border-[#007bff] border-t border-r border-b border-slate-200 hover-lift">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-50 text-[#007bff] font-sans text-xs font-bold uppercase border border-blue-200/60">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  The Lancet Regional Health • 2024
                </span>
                <span className="text-xs font-mono text-[#7A7A7A]">DOI: 10.1016/j.lanwpc.2023.100984</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#003366] mt-4 leading-snug">
                <button
                  type="button"
                  onClick={() => onSelectPublication(publicationsList[1])}
                  className="text-left hover:text-[#007bff] transition-colors cursor-pointer"
                >
                  "{publicationsList[1].title}"
                </button>
              </h3>
              <p className="text-xs text-[#54595F] mt-2 font-mono">
                <strong>Authors:</strong> {publicationsList[1].authors}
              </p>

              {/* Plain-Language Summary Box */}
              <div className="mt-5 p-5 rounded bg-blue-50/70 border border-blue-200/80 text-slate-800">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#007bff] uppercase tracking-wider mb-1.5">
                  <span className="material-symbols-outlined text-base text-[#007bff]">lightbulb</span>
                  <span>{t.publicationsSection.plainSummaryTitle}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {publicationsList[1].plainLanguageSummary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-sans text-slate-500">
                  Category: <strong>{publicationsList[1].category}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onDownloadPublication(publicationsList[1])}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#007bff] hover:text-[#0056b3] uppercase tracking-wider cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>{t.publicationsSection.downloadAbstract}</span>
                </button>
              </div>
            </article>

            {/* Participant Gratitude Callout */}
            <div className="bg-gradient-to-r from-[#00274c] via-[#003366] to-[#00274c] text-white rounded-lg p-6 sm:p-8 flex items-start sm:items-center gap-5 shadow-md border border-blue-800">
              <div className="w-14 h-14 rounded-full bg-[#6EC1E4]/20 text-[#6EC1E4] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-white">
                  {t.publicationsSection.gratitudeTitle}
                </h4>
                <p className="text-sm text-slate-200 mt-1 leading-relaxed font-sans">
                  {t.publicationsSection.gratitudeDesc}
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onBrowseArchive}
                id="browse-publications-archive-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-gradient-to-r from-[#007bff] to-[#003366] text-white hover:from-[#0069d9] hover:to-[#00274c] font-sans font-semibold text-sm transition-all cursor-pointer shadow-sm border border-blue-400/40"
              >
                <span className="material-symbols-outlined text-lg">menu_book</span>
                <span>{t.publicationsSection.browseArchive}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR (News, Helpdesk & Downloads) (4 cols) */}
          <aside className="lg:col-span-4 space-y-8" id="news">
            {/* News & Bulletins Card */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
                <h3 className="font-serif text-xl font-bold text-[#003366] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#007bff]">campaign</span>
                  <span>{t.sidebar.newsTitle}</span>
                </h3>
                <button
                  type="button"
                  onClick={onBrowseNews}
                  className="text-xs font-sans font-bold text-[#007bff] hover:text-[#0056b3] hover:underline cursor-pointer"
                >
                  {t.sidebar.viewAll}
                </button>
              </div>

              <div className="space-y-5 divide-y divide-slate-100">
                {bulletinNews.map((news, idx) => (
                  <article key={news.id} className={`group ${idx > 0 ? 'pt-4' : ''}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase ${news.tagBg} ${news.tagColor}`}>
                        {news.tag}
                      </span>
                      <span className="text-xs text-[#7A7A7A] font-mono">{news.date}</span>
                    </div>
                    <h4 className="font-sans font-bold text-sm text-[#003366] leading-snug">
                      <button
                        type="button"
                        onClick={() => onSelectNews(news)}
                        className="text-left group-hover:text-[#007bff] transition-colors cursor-pointer"
                      >
                        {news.title}
                      </button>
                    </h4>
                    <p className="text-xs text-[#54595F] mt-1.5 line-clamp-2 leading-relaxed font-sans">
                      {news.snippet}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* 24/7 Participant Helpdesk Card */}
            <div className="bg-[#00274c] text-white rounded-lg p-6 border-t-4 border-[#007bff] shadow-md space-y-4">
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#6EC1E4] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">support_agent</span>
                {t.sidebar.helpdeskTag}
              </span>
              <h3 className="font-serif text-xl font-bold leading-snug">
                {t.sidebar.helpdeskTitle}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {t.sidebar.helpdeskDesc}
              </p>
              <div className="bg-white/10 p-3.5 rounded space-y-1 border border-white/10">
                <span className="text-[11px] uppercase text-slate-300 block font-sans">
                  {t.sidebar.tollFreeLabel}
                </span>
                <a href="tel:1800882007" className="font-serif text-2xl font-bold text-white tracking-wide hover:text-[#6EC1E4] transition-colors block">
                  1800-88-2007
                </a>
                <span className="text-xs text-slate-300 block font-sans">{t.sidebar.directPhone}</span>
              </div>
              <button
                type="button"
                onClick={onContactNurse}
                id="contact-nurse-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded bg-gradient-to-r from-[#007bff] to-[#003366] hover:from-[#0069d9] hover:to-[#00274c] text-white font-sans font-semibold text-sm transition-all shadow-sm cursor-pointer border border-blue-400/40"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>{t.sidebar.contactNurse}</span>
              </button>
            </div>

            {/* Downloadable Participant Materials */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#003366] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007bff]">folder</span>
                <span>{t.sidebar.materialsTitle}</span>
              </h4>
              <ul className="space-y-2 text-xs font-sans">
                {participantMaterialsList.map((material) => (
                  <li key={material.id}>
                    <button
                      type="button"
                      onClick={() => onSelectMaterial(material)}
                      className="w-full flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-200/60 cursor-pointer text-left group"
                    >
                      <span className="flex items-center gap-2 text-[#003366] font-semibold group-hover:text-[#007bff] transition-colors">
                        <span className="material-symbols-outlined text-[#007bff] text-sm">picture_as_pdf</span>
                        <span className="truncate max-w-[210px] sm:max-w-[240px]">{material.title}</span>
                      </span>
                      <span className="text-[#7A7A7A] shrink-0">{material.fileType} • {material.size}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
