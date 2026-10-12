import React, { useState } from 'react';
import { portalAsset } from '../utils/portalRuntime';
import { Language, BulletinItem } from '../types';
import { researchBulletinNews } from '../data/portalData';

interface NewsPageProps {
  lang: Language;
  onBack: () => void;
  onSelectNews: (news: BulletinItem) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ lang, onBack, onSelectNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...new Set(researchBulletinNews.map(item => item.tag))];

  const filteredNews = researchBulletinNews.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.tag.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredNews.length > 0 ? filteredNews[0] : null;
  const remaining = filteredNews.slice(1);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      {/* BREADCRUMB BAR */}
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
              {lang === 'en' ? 'News & Bulletins' : 'Berita & Buletin'}
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

      {/* HEADER HERO */}
      <div className="bg-white border-b border-slate-200 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-[#007bff] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">campaign</span>
              <span>{lang === 'en' ? 'The Malaysian Cohort Newsdesk' : 'Meja Berita The Malaysian Cohort'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003366]">
              {lang === 'en' ? 'Official News & Announcements' : 'Berita & Pengumuman Rasmi'}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {lang === 'en'
                ? 'Stay informed with the latest scientific discoveries, international research collaborations, and public health initiatives from UMBI UKM.'
                : 'Ikuti penemuan saintifik terkini, kerjasama penyelidikan antarabangsa, dan inisiatif kesihatan awam dari UMBI UKM.'}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* CATEGORY CHIPS */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#003366] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' && (lang === 'en' ? 'All Updates' : 'Semua Berita')}
                {cat === 'International' && (lang === 'en' ? 'International' : 'Antarabangsa')}
                {cat === 'Community' && (lang === 'en' ? 'Community' : 'Komuniti')}
              </button>
            ))}
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search bulletins, topics...' : 'Cari buletin, topik...'}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mt-4 mb-6 flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            {lang === 'en'
              ? `Showing ${filteredNews.length} news bulletin${filteredNews.length === 1 ? '' : 's'}`
              : `Menunjukkan ${filteredNews.length} buletin berita`}
          </span>
        </div>

        {/* FEATURED STORY CARD */}
        {featured && (
          <article data-scroll-reveal className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-[#6EC1E4] hover:shadow-lg mb-8">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${featured.tagBg} ${featured.tagColor}`}>
                  {featured.tag}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  {featured.date}
                </span>
                <span className="text-xs text-[#007bff] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {lang === 'en' ? 'Featured Announcement' : 'Pengumuman Utama'}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#003366]">
                <button
                  type="button"
                  onClick={() => onSelectNews(featured)}
                  className="text-left hover:text-[#007bff] transition-colors cursor-pointer"
                >
                  {featured.title}
                </button>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {featured.snippet}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectNews(featured)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold transition-all shadow-xs cursor-pointer group"
                >
                  <span>{lang === 'en' ? 'Read Full Announcement' : 'Baca Pengumuman Penuh'}</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <span className="text-xs text-slate-400">
                  UMBI Communications Unit
                </span>
              </div>
            </div>
          </article>
        )}

        {/* REMAINING ARTICLES GRID */}
        {remaining.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remaining.map((item) => (
              <article
                key={item.id}
                data-scroll-reveal
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-[#6EC1E4] hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${item.tagBg} ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#003366]">
                    <button
                      type="button"
                      onClick={() => onSelectNews(item)}
                      className="text-left hover:text-[#007bff] transition-colors cursor-pointer"
                    >
                      {item.title}
                    </button>
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectNews(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#007bff] hover:text-[#0056b3] cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Read Bulletin' : 'Baca Buletin'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ID: {item.id}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : !featured && (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-300">
              {researchBulletinNews.length === 0 ? 'inventory_2' : 'search_off'}
            </span>
            <h2 className="font-serif text-xl font-bold text-[#003366]">
              {researchBulletinNews.length === 0
                ? (lang === 'en' ? 'Approved research news required' : 'Berita penyelidikan yang diluluskan diperlukan')
                : (lang === 'en' ? 'No matching bulletins' : 'Tiada buletin yang sepadan')}
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              {researchBulletinNews.length === 0
                ? (lang === 'en'
                    ? 'Research news will appear here after the Communications Unit and management validate the title, date, summary, image and source link.'
                    : 'Berita penyelidikan akan dipaparkan di sini selepas Unit Komunikasi dan pihak pengurusan mengesahkan tajuk, tarikh, ringkasan, imej dan pautan sumber.')
                : (lang === 'en' ? 'No bulletins matched your search criteria.' : 'Tiada buletin sepadan dengan carian anda.')}
            </p>
            <a href={portalAsset('/cohort/news.html')} className="inline-flex min-h-11 items-center rounded bg-[#003366] px-4 py-2 text-sm font-semibold text-white">{lang === 'en' ? 'Browse all 249 archived TMC reports' : 'Layari semua 249 laporan arkib TMC'}</a>
            {researchBulletinNews.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs text-[#007bff] font-bold hover:underline cursor-pointer"
              >
                {lang === 'en' ? 'Clear filters and search' : 'Kosongkan penapis dan carian'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
