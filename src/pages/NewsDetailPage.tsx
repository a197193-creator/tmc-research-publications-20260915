import React from 'react';
import { Language, BulletinItem } from '../types';
import { researchBulletinNews } from '../data/portalData';

interface NewsDetailPageProps {
  news: BulletinItem;
  lang: Language;
  onBack: () => void;
  onNavigateHome: () => void;
  onSelectOtherNews: (item: BulletinItem) => void;
  onNavigateNews?: () => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  news,
  lang,
  onBack,
  onNavigateHome,
  onSelectOtherNews,
  onNavigateNews,
}) => {
  const otherNews = researchBulletinNews.filter((n) => n.id !== news.id);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      {/* BREADCRUMB */}
      <div className="bg-[#00274c] text-white py-4 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-slate-300 hover:text-[#6EC1E4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>{lang === 'en' ? 'Home' : 'Laman Utama'}</span>
            </button>
            <span className="text-slate-400">/</span>
            {onNavigateNews ? (
              <button
                type="button"
                onClick={onNavigateNews}
                className="text-slate-300 hover:text-[#6EC1E4] transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'News & Bulletins' : 'Berita & Buletin'}
              </button>
            ) : (
              <span className="text-slate-300">
                {lang === 'en' ? 'News & Bulletins' : 'Berita & Buletin'}
              </span>
            )}
            <span className="text-slate-400">/</span>
            <span className="text-[#6EC1E4] font-semibold truncate max-w-[220px] sm:max-w-none">
              {news.title}
            </span>
          </nav>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/20"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{lang === 'en' ? 'Back' : 'Kembali'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN ARTICLE */}
        <article className="lg:col-span-8 bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded text-xs font-bold ${news.tagBg} ${news.tagColor}`}>
              {news.tag}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Published: {news.date}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-[#007bff] font-semibold">Official UKM-UMBI Release</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003366] leading-tight">
            {news.title}
          </h1>

          <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-l-[#007bff] text-xs sm:text-sm text-slate-700 italic">
            "{news.snippet}"
          </div>

          <div className="space-y-4 text-sm text-[#54595F] leading-relaxed pt-2">
            <p>{news.body}</p>
            <p>
              The Malaysian Cohort (TMC), initiated under the mandate of the Ministry of Higher Education and Ministry of Science, Technology, and Innovation, continues its mission to provide evidence-based population health data for clinical translation across Southeast Asia.
            </p>
            <p>
              For additional clarifications, scheduling assistance, or media inquiries regarding this announcement, please contact the UMBI Public Relations Secretariat at <strong className="text-[#003366]">cohort@ukm.edu.my</strong> or via our nationwide toll-free helpline at <strong className="text-[#003366]">1800-88-2007</strong>.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007bff] hover:text-[#0056b3] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>{lang === 'en' ? 'Back to Overview' : 'Kembali ke Gambaran Keseluruhan'}</span>
            </button>
          </div>
        </article>

        {/* SIDEBAR: OTHER NEWS */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#003366] border-b border-slate-100 pb-3">
              Other Recent Bulletins
            </h3>
            <div className="space-y-4">
              {otherNews.map((item) => (
                <div
                  key={item.id}
                  role="link"
                  tabIndex={0}
                  aria-label={`${lang === 'en' ? 'Read bulletin' : 'Baca buletin'}: ${item.title}`}
                  onClick={() => onSelectOtherNews(item)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelectOtherNews(item);
                    }
                  }}
                  className="p-3.5 rounded-lg border border-slate-100 hover:border-[#007bff]/50 hover:bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={`px-2 py-0.5 rounded font-bold ${item.tagBg} ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-slate-400 font-mono">{item.date}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#003366] leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#54595F] line-clamp-2 leading-tight">
                    {item.snippet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
