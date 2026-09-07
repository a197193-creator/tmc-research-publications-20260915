import React, { useState } from 'react';
import { Language, ResearchInitiativeItem } from '../types';
import { allResearchInitiatives } from '../data/researchInitiatives';

interface ResearchProjectsPageProps {
  lang: Language;
  onBack: () => void;
  onSelectInitiative: (project: ResearchInitiativeItem) => void;
}

export const ResearchProjectsPage: React.FC<ResearchProjectsPageProps> = ({
  lang,
  onBack,
  onSelectInitiative,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(allResearchInitiatives.map((item) => item.category)))];

  const filteredInitiatives = allResearchInitiatives.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.collaborators.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.funding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.participantDataSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subProjects?.some(
        (subProject) =>
          subProject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subProject.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#007bff] text-white shadow-xs'
                    : 'bg-slate-100 text-[#54595F] hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search projects, collaborators...' : 'Cari projek, kolaborator...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-300 text-xs focus:ring-2 focus:ring-[#007bff] focus:outline-hidden"
            />
          </div>
        </div>

        {/* INITIATIVES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {filteredInitiatives.map((item) => (
            <article
              key={item.id}
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
              className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs hover:border-[#007bff]/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2 transition-all flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-50 text-[#007bff] border border-blue-200">
                    {item.category}
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border font-semibold ${
                    item.status === 'Completed'
                      ? 'text-slate-700 bg-slate-100 border-slate-300'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#003366] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#54595F] leading-relaxed">
                  {item.description}
                </p>

                <div className="bg-slate-50 p-3 rounded text-xs space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#007bff]">person</span>
                    <span className="text-slate-600">Collaborators:</span>
                    <strong className="text-slate-800">{item.collaborators}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#007bff]">database</span>
                    <span className="text-slate-600">Target / Current:</span>
                    <strong className="text-slate-800">{item.samplesCount}</strong>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-slate-500">{item.duration}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/60 rounded border border-blue-100/70 text-xs">
                  <strong className="text-[#003366] block mb-0.5">Funding:</strong>
                  <span className="text-slate-700">{item.funding}</span>
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
        </div>
      </div>
    </div>
  );
};
