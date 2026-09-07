import React, { useState } from 'react';
import { Language, ResearchInitiativeItem } from '../types';
import { allResearchInitiatives } from '../data/researchInitiatives';

interface ResearchProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ResearchProjectsModal: React.FC<ResearchProjectsModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(allResearchInitiatives.map((project) => project.category)))];

  const filteredProjects = allResearchInitiatives.filter((project) => {
    const matchesCat = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.collaborators.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.funding.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.participantDataSource.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#b91c1c]">
          <div>
            <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#f59e0b]">
              {lang === 'en' ? 'TMC Research Consortia Portfolio' : 'Portfolio Konsortium Penyelidikan TMC'}
            </span>
            <h3 className="font-serif text-2xl font-bold mt-0.5">
              {lang === 'en' ? 'All Research Initiatives (18 Projects)' : 'Semua Inisiatif Penyelidikan (18 Projek)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {/* Controls: Filter Categories & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-heading font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#0c2340] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-lg">search</span>
              <input
                type="text"
                placeholder={lang === 'en' ? 'Filter by keyword...' : 'Tapis kata kunci...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
              />
            </div>
          </div>

          {/* Initiatives List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredProjects.map((project: ResearchInitiativeItem) => {
              const isExpanded = expandedId === project.id;
              return (
                <div
                  key={project.id}
                  className="bg-slate-50/70 border border-slate-200 rounded-lg p-5 hover:border-[#0c2340] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase bg-[#0c2340]/10 text-[#0c2340]">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{project.duration}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#0c2340] leading-snug">
                      {project.title}
                    </h4>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {project.description}
                    </p>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-700 animate-in fade-in duration-150">
                        <div>
                          <strong className="text-[#0c2340]">{lang === 'en' ? 'Collaborators:' : 'Kolaborator:'}</strong>{' '}
                          {project.collaborators}
                        </div>
                        <div>
                          <strong className="text-[#0c2340]">{lang === 'en' ? 'Target / Current:' : 'Sasaran / Semasa:'}</strong>{' '}
                          {project.samplesCount}
                        </div>
                        <div>
                          <strong className="text-[#b91c1c]">{lang === 'en' ? 'Funding:' : 'Dana:'}</strong>{' '}
                          {project.funding}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 font-medium">{project.samplesCount}</span>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="text-[#b91c1c] font-heading font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>{isExpanded ? (lang === 'en' ? 'Show Less' : 'Tutup') : (lang === 'en' ? 'View Details' : 'Lihat Butiran')}</span>
                      <span className="material-symbols-outlined text-sm">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              {lang === 'en' ? 'No research initiatives match your search.' : 'Tiada inisiatif sepadan dengan carian anda.'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0c2340] hover:bg-[#1a365d] text-white text-xs sm:text-sm font-semibold rounded"
          >
            {lang === 'en' ? 'Close Catalog' : 'Tutup Katalog'}
          </button>
        </div>
      </div>
    </div>
  );
};
