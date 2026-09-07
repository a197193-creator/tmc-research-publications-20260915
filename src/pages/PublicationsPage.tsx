import React, { useEffect, useRef, useState } from 'react';
import { Language, Publication } from '../types';
import { publicationsList } from '../data/portalData';
import { downloadPublicationAbstractPdf } from '../utils/pdfDownload';

interface PublicationsPageProps {
  lang: Language;
  onBack: () => void;
  selectedPublication?: Publication | null;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({
  lang,
  onBack,
  selectedPublication,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const downloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const years = ['All', '2024', '2023'];
  const categories = ['All', 'Genomic Medicine & Metabolics', 'Cardiovascular Epidemiology', 'Cardiovascular Imaging', 'Molecular Oncology'];

  const filteredPublications = publicationsList.filter((pub) => {
    const matchesYear = selectedYear === 'All' || pub.year.toString() === selectedYear;
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.doi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (!selectedPublication) return;
    const selectedCard = document.getElementById(`publication-${selectedPublication.id}`);
    selectedCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedPublication]);

  useEffect(() => () => {
    if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
  }, []);

  const handleDownload = (pub: Publication) => {
    downloadPublicationAbstractPdf(pub);
    setDownloadSuccess(pub.title);
    if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
    downloadTimerRef.current = setTimeout(() => setDownloadSuccess(null), 5000);
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
              {lang === 'en' ? 'Scientific Publications Index' : 'Indeks Penerbitan Saintifik'}
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
            <span className="material-symbols-outlined text-sm">menu_book</span>
            <span>Peer-Reviewed Literature & Impact</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {lang === 'en' ? 'Scientific Publications & Genomic Archives' : 'Penerbitan Saintifik & Arkib Genomik'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">
            {lang === 'en'
              ? 'Discover peer-reviewed discoveries published in Nature Genetics, The Lancet, and international journals based on longitudinal follow-ups of The Malaysian Cohort.'
              : 'Terokai penemuan berwasit yang diterbitkan dalam Nature Genetics, The Lancet, dan jurnal antarabangsa berdasarkan susulan membujur The Malaysian Cohort.'}
          </p>
        </div>
      </section>

      {/* DOWNLOAD TOAST */}
      {downloadSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="fixed z-[100] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-full sm:max-w-xl"
        >
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between gap-4 shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-emerald-600">check_circle</span>
              <span className="truncate"><strong>Abstract PDF Downloaded:</strong> "{downloadSuccess}"</span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadSuccess(null)}
              aria-label={lang === 'en' ? 'Dismiss download message' : 'Tutup mesej muat turun'}
              className="text-emerald-700 hover:text-emerald-950 shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search title, authors, DOI, abstract...' : 'Cari tajuk, pengarang, DOI...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-300 text-xs focus:ring-2 focus:ring-[#007bff] focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Year:</span>
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setSelectedYear(y)}
                    className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                      selectedYear === y
                        ? 'bg-[#007bff] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-semibold">Specialty Category:</span>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-blue-50 text-[#007bff] font-bold border border-blue-300'
                    : 'bg-slate-50 text-[#54595F] border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES LIST */}
        <div className="space-y-6 mt-8">
          {filteredPublications.map((pub) => (
            <article
              key={pub.id}
              id={`publication-${pub.id}`}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xs border border-slate-200 border-l-4 border-l-[#007bff] space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-50 text-[#007bff] font-sans text-xs font-bold uppercase border border-blue-200">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  {pub.journal}
                </span>
                <span className="text-xs font-mono text-[#7A7A7A]">DOI: {pub.doi}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#003366] leading-snug">
                "{pub.title}"
              </h2>

              <p className="text-xs text-[#54595F] font-mono">
                <strong>Authors:</strong> {pub.authors}
              </p>

              {/* Harvard Plain-Language Summary Box */}
              <div className="p-5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-slate-800">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#007bff] uppercase tracking-wider mb-1.5">
                  <span className="material-symbols-outlined text-base">lightbulb</span>
                  <span>Plain-Language Discovery Summary for the Public</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {pub.plainLanguageSummary}
                </p>
              </div>

              {/* Abstract */}
              <div className="space-y-1.5 text-xs text-[#54595F] leading-relaxed">
                <strong className="text-[#003366] uppercase text-[11px] block">Scientific Abstract:</strong>
                <p>{pub.abstract}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>Category: <strong>{pub.category}</strong></span>
                  {pub.impactFactor && (
                    <span>• Impact Factor: <strong className="text-[#003366]">{pub.impactFactor}</strong></span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://search.crossref.org/?q=${encodeURIComponent(pub.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={lang === 'en' ? 'Search for the publication source in a new tab' : 'Cari sumber penerbitan dalam tab baharu'}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#007bff]"
                  >
                    <span>{lang === 'en' ? 'Search Publication Source' : 'Cari Sumber Penerbitan'}</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDownload(pub)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>{lang === 'en' ? 'Download Abstract PDF' : 'Muat Turun PDF Abstrak'}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredPublications.length === 0 && (
            <div className="bg-white rounded-lg p-10 text-center border border-slate-200 text-sm text-slate-600">
              <span className="material-symbols-outlined text-3xl text-slate-300">search_off</span>
              <p className="mt-2">
                {lang === 'en'
                  ? 'No publications match the selected filters or search.'
                  : 'Tiada penerbitan sepadan dengan penapis atau carian yang dipilih.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
