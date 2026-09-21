import React, { useState } from 'react';
import { Language, ResearchInitiativeItem } from '../types';
import { allResearchInitiatives } from '../data/researchInitiatives';

interface ResearchProjectsPageProps {
  lang: Language;
  onBack: () => void;
  onSelectInitiative: (project: ResearchInitiativeItem) => void;
}

const categoryLabels: Record<string, string> = {
  All: 'Semua',
  'Cohort Infrastructure': 'Infrastruktur Kohort',
  'Infection & Microbiome': 'Jangkitan & Mikrobiom',
  Genomics: 'Genomik',
  Cardiometabolic: 'Kardiometabolik',
  'Imaging & Biomarkers': 'Pengimejan & Penanda Biologi',
  'Lifestyle & Nutrition': 'Gaya Hidup & Pemakanan',
};

export const ResearchProjectsPage: React.FC<ResearchProjectsPageProps> = ({
  lang,
  onBack,
  onSelectInitiative,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(allResearchInitiatives.map((item) => item.category)))];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const hasActiveFilters = selectedCategory !== 'All' || normalizedQuery.length > 0;

  const filteredInitiatives = allResearchInitiatives.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = normalizedQuery.length === 0 ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.collaborators.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.funding.toLowerCase().includes(normalizedQuery) ||
      item.participantDataSource.toLowerCase().includes(normalizedQuery) ||
      item.subProjects?.some(
        (subProject) =>
          subProject.title.toLowerCase().includes(normalizedQuery) ||
          subProject.description?.toLowerCase().includes(normalizedQuery)
      );
    return matchesCategory && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
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
              {lang === 'en' ? 'Research Projects & Consortia' : 'Projek Penyelidikan & Konsortium'}
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
      <section className="bg-gradient-to-r from-[#00274c] via-[#003366] to-[#00274c] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6EC1E4]/15 border border-[#6EC1E4]/30 text-[#6EC1E4] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">science</span>
            <span>{lang === 'en' ? 'TMC Research Project Index' : 'Indeks Projek Penyelidikan TMC'}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {lang === 'en' ? 'Research Programs & Clinical Consortia' : 'Program Penyelidikan & Konsortium Klinikal'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">
            {lang === 'en'
              ? 'A selected mix of actual TMC projects, sub-projects and collaborations recorded in the latest research project index.'
              : 'Pilihan projek, subprojek dan kolaborasi TMC sebenar yang direkodkan dalam indeks projek penyelidikan terkini.'}
          </p>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#007bff] text-white shadow-xs'
                    : 'bg-slate-100 text-[#54595F] hover:bg-slate-200'
                }`}
              >
                {lang === 'en' ? cat : (categoryLabels[cat] ?? cat)}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
              search
            </span>
            <label htmlFor="research-project-search" className="sr-only">
              {lang === 'en' ? 'Search research projects' : 'Cari projek penyelidikan'}
            </label>
            <input
              id="research-project-search"
              type="search"
              placeholder={lang === 'en' ? 'Search projects, collaborators...' : 'Cari projek, kolaborator...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 rounded-md border border-slate-300 text-sm focus:ring-2 focus:ring-[#007bff] focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={lang === 'en' ? 'Clear project search' : 'Kosongkan carian projek'}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-slate-600" aria-live="polite">
          <p>
            {lang === 'en'
              ? `${filteredInitiatives.length} of ${allResearchInitiatives.length} research projects shown`
              : `${filteredInitiatives.length} daripada ${allResearchInitiatives.length} projek penyelidikan dipaparkan`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-semibold text-[#007bff] hover:text-[#0056b3] hover:underline cursor-pointer"
            >
              {lang === 'en' ? 'Clear search and filters' : 'Kosongkan carian dan penapis'}
            </button>
          )}
        </div>

        {/* INITIATIVES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {filteredInitiatives.map((item) => (
            <article
              key={item.id}
              data-scroll-reveal
              role="link"
              tabIndex={0}
              aria-label={`${lang === 'en' ? 'Open project profile' : 'Buka profil projek'}: ${item.title}`}
              onClick={() => onSelectInitiative(item)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectInitiative(item);
                }
              }}
              className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs hover:border-[#007bff]/60 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2 transition-all duration-300 motion-safe:hover:-translate-y-1 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-50 text-[#007bff] border border-blue-200">
                    {lang === 'en' ? item.category : (categoryLabels[item.category] ?? item.category)}
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border font-semibold ${
                    item.status === 'Completed'
                      ? 'text-slate-700 bg-slate-100 border-slate-300'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}>
                    {lang === 'en'
                      ? item.status
                      : (item.status === 'Completed' ? 'Selesai' : 'Sedang berjalan')}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#003366] leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#54595F] leading-relaxed">
                  {item.description}
                </p>

                <div className="bg-slate-50 p-3 rounded text-xs space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#007bff]">person</span>
                    <span className="text-slate-600">{lang === 'en' ? 'Collaborators:' : 'Kolaborator:'}</span>
                    <strong className="text-slate-800">{item.collaborators}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#007bff]">database</span>
                    <span className="text-slate-600">{lang === 'en' ? 'Target:' : 'Sasaran:'}</span>
                    <strong className="text-slate-800">{item.targetedParticipants}</strong>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-slate-500">{item.duration}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/60 rounded border border-blue-100/70 text-xs">
                  <strong className="text-[#003366] block mb-0.5">{lang === 'en' ? 'Funding:' : 'Dana:'}</strong>
                  <span className="text-slate-700">{item.funding}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-950">
                  {lang === 'en'
                    ? 'Current participant count pending Statistics Unit validation.'
                    : 'Bilangan peserta semasa menunggu pengesahan Unit Statistik.'}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007bff] group-hover:text-[#0056b3]">
                  <span>{lang === 'en' ? 'View full project profile' : 'Lihat profil penuh projek'}</span>
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
                <span className="material-symbols-outlined text-base text-slate-400">fact_check</span>
              </div>
            </article>
          ))}

          {filteredInitiatives.length === 0 && (
            <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-10 text-center shadow-xs">
              <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
              <h2 className="mt-3 font-serif text-xl font-bold text-[#003366]">
                {lang === 'en' ? 'No matching research projects' : 'Tiada projek penyelidikan yang sepadan'}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                {lang === 'en'
                  ? 'Try another keyword or clear the selected category to return to the complete 22-project index.'
                  : 'Cuba kata kunci lain atau kosongkan kategori yang dipilih untuk kembali ke indeks lengkap 22 projek.'}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-2 rounded bg-[#003366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#002244] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
                {lang === 'en' ? 'Show all projects' : 'Paparkan semua projek'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
