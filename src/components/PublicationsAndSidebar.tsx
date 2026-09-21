import React from 'react';
import { Language, Publication, BulletinItem } from '../types';
import { translations } from '../data/translations';
import { researchBulletinNews } from '../data/portalData';
import { publicationsList } from '../data/publications';

interface PublicationsAndSidebarProps {
  lang: Language;
  onSelectPublication: (pub: Publication) => void;
  onBrowseArchive: () => void;
  onBrowseNews: () => void;
  onSelectNews: (item: BulletinItem) => void;
}

export const PublicationsAndSidebar: React.FC<PublicationsAndSidebarProps> = ({
  lang,
  onSelectPublication,
  onBrowseArchive,
  onBrowseNews,
  onSelectNews
}) => {
  const t = translations[lang];
  const featuredPublications = publicationsList
    .filter((publication) => publication.publicationStatus === 'Published' && publication.articleType === 'Research article')
    .slice(0, 2);

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

            {featuredPublications.map((publication) => (
              <article key={publication.id} data-scroll-reveal className="rounded-lg border border-slate-200 border-l-4 border-l-[#007bff] bg-white p-6 shadow-xs hover-lift sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded bg-[#003366] px-2.5 py-1 font-bold text-white">{publication.year}</span>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 font-semibold text-[#0056b3]">{publication.category}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-[#003366] sm:text-2xl">
                  <button type="button" onClick={() => onSelectPublication(publication)} className="cursor-pointer text-left transition-colors hover:text-[#007bff]">
                    {publication.title}
                  </button>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#54595F]">
                  <strong>{t.publicationsSection.authorsLabel}:</strong> {publication.authors}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500"><strong>{publication.journal}</strong></span>
                  <a href={publication.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-[#007bff] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0056b3]">
                    <span>{lang === 'en' ? 'Original article' : 'Artikel asal'}</span>
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                </div>
              </article>
            ))}

            {/* Participant Gratitude Callout */}
            <div data-scroll-reveal className="bg-gradient-to-r from-[#00274c] via-[#003366] to-[#00274c] text-white rounded-lg p-6 sm:p-8 flex items-start sm:items-center gap-5 shadow-md border border-blue-800 transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-xl">
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

          {/* RIGHT COLUMN: RESEARCH NEWS (4 cols) */}
          <aside className="lg:col-span-4 space-y-8" id="news">
            {/* News & Bulletins Card */}
            <div data-scroll-reveal className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-[#6EC1E4] hover:shadow-lg">
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
                {researchBulletinNews.length > 0 ? (
                  researchBulletinNews.map((news, idx) => (
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
                  ))
                ) : (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
                    <span className="material-symbols-outlined mb-2 text-xl">fact_check</span>
                    <p className="font-semibold">
                      {lang === 'en' ? 'Research news pending approval' : 'Berita penyelidikan menunggu kelulusan'}
                    </p>
                    <p className="mt-1">
                      {lang === 'en'
                        ? 'Only validated research news will be published here after confirmation by UMBI Communications and management.'
                        : 'Hanya berita penyelidikan yang disahkan akan diterbitkan di sini selepas pengesahan Komunikasi UMBI dan pihak pengurusan.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
};
