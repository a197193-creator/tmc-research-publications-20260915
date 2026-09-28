import React, { useEffect, useMemo, useState } from 'react';
import { Language, Publication } from '../types';
import { publicationsList } from '../data/publications';

interface PublicationsPageProps {
  lang: Language;
  onBack: () => void;
  selectedPublication?: Publication | null;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ lang, onBack, selectedPublication }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const years = useMemo(
    () => [...new Set(publicationsList.map((publication) => publication.year))].sort((a, b) => b - a),
    [],
  );
  const categories = useMemo(
    () => [...new Set(publicationsList.map((publication) => publication.category))].sort(),
    [],
  );

  const filteredPublications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return publicationsList.filter((publication) => {
      const matchesYear = selectedYear === 'All' || publication.year === Number(selectedYear);
      const matchesCategory = selectedCategory === 'All' || publication.category === selectedCategory;
      const matchesSearch = query.length === 0 || [
        publication.title,
        publication.authors,
        publication.journal,
        publication.category,
        publication.doi,
        publication.articleType,
        String(publication.year),
      ].some((value) => value.toLowerCase().includes(query));

      return matchesYear && matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedYear !== 'All' || selectedCategory !== 'All';

  useEffect(() => {
    if (!selectedPublication) return;
    document.getElementById(`publication-${selectedPublication.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [selectedPublication]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('All');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      <div className="border-b border-blue-900/60 bg-[#00274c] py-4 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
            <button type="button" onClick={onBack} className="flex cursor-pointer items-center gap-1 text-slate-300 transition-colors hover:text-[#6EC1E4]">
              <span className="material-symbols-outlined text-sm">home</span>
              <span>{lang === 'en' ? 'Home' : 'Laman Utama'}</span>
            </button>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-[#6EC1E4]">
              {lang === 'en' ? 'Scientific Publications Index' : 'Indeks Penerbitan Saintifik'}
            </span>
          </nav>

          <button type="button" onClick={onBack} className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{lang === 'en' ? 'Back to Overview' : 'Kembali ke Gambaran Keseluruhan'}</span>
          </button>
        </div>
      </div>

      <section className="bg-gradient-to-r from-[#00274c] via-[#003366] to-[#00274c] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6EC1E4]/30 bg-[#6EC1E4]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6EC1E4]">
            <span className="material-symbols-outlined text-sm">menu_book</span>
            <span>{lang === 'en' ? '69 Publication Records' : '69 Rekod Penerbitan'}</span>
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {lang === 'en' ? 'Scientific Publications & Evidence' : 'Penerbitan & Bukti Saintifik'}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            {lang === 'en'
              ? 'Browse the official TMC publication titles, organised by research category and year.'
              : 'Layari tajuk penerbitan rasmi TMC mengikut kategori penyelidikan dan tahun.'}
          </p>
          <a
            href="https://www.ukm.my/malaysiancohort/publication_dashboard/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#6EC1E4]/50 bg-white px-5 py-2.5 text-sm font-bold text-[#003366] shadow-sm transition-colors hover:border-white hover:bg-[#eaf7fc] focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003366]"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">analytics</span>
            <span>{lang === 'en' ? 'View Publications Dashboard' : 'Lihat Papan Pemuka Penerbitan'}</span>
            <span className="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
          </a>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <aside className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-[#003366]">
          <span className="material-symbols-outlined shrink-0 text-[#007bff]">info</span>
          <p>
            {lang === 'en'
              ? 'The complete register is shown below. Original-source links are provided; direct article uploads will be reviewed later according to each paper’s access status.'
              : 'Daftar lengkap dipaparkan di bawah. Pautan sumber asal disediakan; muat naik terus artikel akan disemak kemudian mengikut status akses setiap penerbitan.'}
          </p>
        </aside>
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_13rem_19rem]">
            <div>
              <label htmlFor="publication-search" className="mb-1.5 block text-xs font-bold text-[#003366]">
                {lang === 'en' ? 'Search publications' : 'Cari penerbitan'}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">search</span>
                <input
                  id="publication-search"
                  type="search"
                  placeholder={lang === 'en' ? 'Title, author, journal or DOI' : 'Tajuk, penulis, jurnal atau DOI'}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="min-h-11 w-full rounded-md border border-slate-300 py-2 pl-10 pr-10 text-sm outline-hidden focus:border-[#007bff] focus:ring-2 focus:ring-blue-100"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} aria-label={lang === 'en' ? 'Clear search' : 'Kosongkan carian'} className="absolute right-1 top-1/2 flex min-h-9 min-w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-slate-400 hover:text-slate-700">
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="publication-year" className="mb-1.5 block text-xs font-bold text-[#003366]">
                {lang === 'en' ? 'Publication year' : 'Tahun penerbitan'}
              </label>
              <select id="publication-year" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} className="min-h-11 w-full cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-hidden focus:border-[#007bff] focus:ring-2 focus:ring-blue-100">
                <option value="All">{lang === 'en' ? 'All years' : 'Semua tahun'}</option>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="publication-category" className="mb-1.5 block text-xs font-bold text-[#003366]">
                {lang === 'en' ? 'Research category' : 'Kategori penyelidikan'}
              </label>
              <select id="publication-category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="min-h-11 w-full cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-hidden focus:border-[#007bff] focus:ring-2 focus:ring-blue-100">
                <option value="All">{lang === 'en' ? 'All categories' : 'Semua kategori'}</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600" aria-live="polite">
            <p>{lang === 'en' ? `Showing ${filteredPublications.length} of ${publicationsList.length} publications` : `Memaparkan ${filteredPublications.length} daripada ${publicationsList.length} penerbitan`}</p>
            {hasActiveFilters && (
              <button type="button" onClick={clearFilters} className="min-h-11 cursor-pointer px-2 font-semibold text-[#007bff] hover:text-[#0056b3] hover:underline">
                {lang === 'en' ? 'Clear search and filters' : 'Kosongkan carian dan penapis'}
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredPublications.map((publication, index) => (
            <article key={publication.id} id={`publication-${publication.id}`} className="rounded-lg border border-slate-200 border-l-4 border-l-[#007bff] bg-white p-5 shadow-xs transition-shadow hover:shadow-md sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded bg-[#003366] px-2.5 py-1 font-bold text-white">{publication.year}</span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 font-semibold text-[#0056b3]">{publication.category}</span>
                    {publication.publicationStatus && <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-600">{publication.publicationStatus}</span>}
                  </div>

                  <h2 className="font-serif text-xl font-bold leading-snug text-[#003366] sm:text-2xl">{publication.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    <span className="font-semibold text-slate-700">{lang === 'en' ? 'Authors:' : 'Penulis:'}</span>{' '}{publication.authors}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                    <span><strong className="text-slate-700">{lang === 'en' ? 'Journal:' : 'Jurnal:'}</strong> {publication.journal}</span>
                    {publication.articleType && <span><strong className="text-slate-700">{lang === 'en' ? 'Type:' : 'Jenis:'}</strong> {publication.articleType}</span>}
                    {publication.doi && <span className="break-all"><strong className="text-slate-700">DOI:</strong> {publication.doi}</span>}
                  </div>
                </div>

                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${lang === 'en' ? 'Open original article for' : 'Buka artikel asal untuk'} ${publication.title}`}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-md bg-[#007bff] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0056b3] focus:outline-hidden focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2"
                >
                  <span>{lang === 'en' ? 'Original article' : 'Artikel asal'}</span>
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                </a>
              </div>
              <span className="sr-only">{lang === 'en' ? `Publication ${index + 1}` : `Penerbitan ${index + 1}`}</span>
            </article>
          ))}

          {filteredPublications.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-600">
              <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
              <h2 className="mt-3 font-serif text-xl font-bold text-[#003366]">{lang === 'en' ? 'No publications match these filters' : 'Tiada penerbitan sepadan dengan penapis ini'}</h2>
              <p className="mt-2 text-sm">{lang === 'en' ? 'Try another search term, year or category.' : 'Cuba istilah carian, tahun atau kategori lain.'}</p>
              <button type="button" onClick={clearFilters} className="mt-5 min-h-11 cursor-pointer rounded-md bg-[#007bff] px-5 py-2 text-sm font-bold text-white hover:bg-[#0056b3]">
                {lang === 'en' ? 'Show all publications' : 'Paparkan semua penerbitan'}
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          {lang === 'en' ? 'Publication register source:' : 'Sumber daftar penerbitan:'}{' '}
          <a href="https://www.ukm.my/mycohort/ms/penyelidikan-kami/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007bff] hover:underline">
            The Malaysian Cohort, UKM
          </a>
        </p>
      </div>
    </div>
  );
};
