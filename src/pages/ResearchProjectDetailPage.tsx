import React from 'react';
import { Language, ResearchInitiativeItem } from '../types';
import { getResearchVisual } from '../data/researchVisuals';

interface ResearchProjectDetailPageProps {
  project: ResearchInitiativeItem;
  lang: Language;
  onBack: () => void;
  onNavigateResearch: () => void;
}

export const ResearchProjectDetailPage: React.FC<ResearchProjectDetailPageProps> = ({
  project,
  lang,
  onBack,
  onNavigateResearch,
}) => {
  const visual = getResearchVisual(project.category, project.id);
  const isCompleted = project.status === 'Completed';

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      <div className="bg-[#00274c] text-white py-4 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs min-w-0">
            <button
              type="button"
              onClick={onNavigateResearch}
              className="text-slate-300 hover:text-[#6EC1E4] transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Research Projects' : 'Projek Penyelidikan'}
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-[#6EC1E4] font-semibold truncate">{project.title}</span>
          </nav>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/20"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{lang === 'en' ? 'Back to Research Projects' : 'Kembali ke Projek Penyelidikan'}</span>
          </button>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded bg-[#007bff] text-white text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span
              className={`px-3 py-1 rounded text-xs font-bold font-mono border ${
                isCompleted
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {project.status}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#54595F] leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </header>

        <figure className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white">
          <img
            src={visual.image}
            alt={visual.imageAlt}
            className="w-full h-72 sm:h-[28rem] object-cover"
          />
          <figcaption className="p-3 bg-slate-900 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>
              {visual.imageCaption?.[lang] ??
                (lang === 'en'
                  ? `TMC facility image supporting ${project.category.toLowerCase()} research`
                  : `Imej fasiliti TMC yang menyokong penyelidikan ${project.category.toLowerCase()}`)}
            </span>
            <span className="text-[#6EC1E4] font-mono">The Malaysian Cohort</span>
          </figcaption>
        </figure>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Project facts">
          {[
            [lang === 'en' ? 'Project status' : 'Status projek', project.status, 'task_alt'],
            [lang === 'en' ? 'Project period' : 'Tempoh projek', project.duration, 'calendar_month'],
            [lang === 'en' ? 'Target participants' : 'Sasaran peserta', project.targetedParticipants, 'groups'],
            [
              lang === 'en' ? 'Current participants' : 'Peserta semasa',
              lang === 'en' ? 'Pending Statistics Unit validation' : 'Menunggu pengesahan Unit Statistik',
              'group_add',
            ],
          ].map(([label, value, icon]) => (
            <div key={label} className="bg-white rounded-lg p-4 border border-slate-200 shadow-xs">
              <span className="material-symbols-outlined text-[#007bff] text-xl">{icon}</span>
              <span className="block mt-2 text-xs uppercase tracking-wider font-bold text-slate-500">{label}</span>
              <strong className="block mt-1 text-sm text-[#003366] leading-snug">{value}</strong>
            </div>
          ))}
        </section>

        <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8 text-[#54595F] leading-relaxed text-base">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#003366]">
              {lang === 'en' ? 'Project Overview' : 'Gambaran Keseluruhan Projek'}
            </h2>
            <p>{project.description}</p>
          </section>

          {project.subProjects && project.subProjects.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#003366]">
                  {lang === 'en' ? 'Sub-projects and Study Components' : 'Subprojek dan Komponen Kajian'}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {lang === 'en'
                    ? `${project.subProjects.length} components are recorded under this main project in the TMC project index.`
                    : `${project.subProjects.length} komponen direkodkan di bawah projek utama ini dalam indeks projek TMC.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.subProjects.map((subProject) => (
                  <article
                    key={subProject.sourceRow}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-base font-bold text-[#003366] leading-snug">
                        {subProject.title}
                      </h3>
                      <span className="shrink-0 text-[11px] font-mono text-slate-500">
                        {lang === 'en' ? `Row ${subProject.sourceRow}` : `Baris ${subProject.sourceRow}`}
                      </span>
                    </div>
                    {subProject.description && (
                      <p className="text-sm text-[#54595F] leading-relaxed">{subProject.description}</p>
                    )}
                    <dl className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-xs">
                      {subProject.duration && (
                        <div>
                          <dt className="font-bold uppercase tracking-wider text-slate-500">
                            {lang === 'en' ? 'Period' : 'Tempoh'}
                          </dt>
                          <dd className="mt-0.5 text-slate-700">{subProject.duration}</dd>
                        </div>
                      )}
                      {subProject.targetedParticipants && (
                        <div>
                          <dt className="font-bold uppercase tracking-wider text-slate-500">
                            {lang === 'en' ? 'Target' : 'Sasaran'}
                          </dt>
                          <dd className="mt-0.5 text-slate-700">{subProject.targetedParticipants}</dd>
                        </div>
                      )}
                      {subProject.currentParticipants && (
                        <div>
                          <dt className="font-bold uppercase tracking-wider text-slate-500">
                            {lang === 'en' ? 'Current' : 'Semasa'}
                          </dt>
                          <dd className="mt-0.5 text-slate-700">
                            {lang === 'en' ? 'Pending validation' : 'Menunggu pengesahan'}
                          </dd>
                        </div>
                      )}
                      {subProject.funding && (
                        <div>
                          <dt className="font-bold uppercase tracking-wider text-slate-500">
                            {lang === 'en' ? 'Funding' : 'Dana'}
                          </dt>
                          <dd className="mt-0.5 text-slate-700">{subProject.funding}</dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#003366]">
              {lang === 'en' ? 'Collaborators and Research Network' : 'Kolaborator dan Rangkaian Penyelidikan'}
            </h2>
            <p>
              {lang === 'en'
                ? `The collaborators recorded for this project are ${project.collaborators.replace(/[.]+$/, '')}.`
                : `Kolaborator yang direkodkan untuk projek ini ialah ${project.collaborators}.`}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#003366]">
              {lang === 'en' ? 'Funding and Participant Data Source' : 'Dana dan Sumber Data Peserta'}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'en' ? 'Funding' : 'Dana'}
                </dt>
                <dd className="mt-1 text-[#003366] font-semibold">{project.funding}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'en' ? 'Participant data source' : 'Sumber data peserta'}
                </dt>
                <dd className="mt-1 text-[#003366] font-semibold">{project.participantDataSource}</dd>
              </div>
            </dl>
            {project.referenceUrl && (
              <a
                href={project.referenceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#007bff] hover:text-[#0056b3]"
              >
                <span>{lang === 'en' ? 'Open reference page' : 'Buka halaman rujukan'}</span>
                <span className="material-symbols-outlined text-base">open_in_new</span>
              </a>
            )}
          </section>

          <aside className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 flex items-start gap-3">
            <span className="material-symbols-outlined shrink-0">fact_check</span>
            <p>
              {lang === 'en'
                ? `Source: “Index: Research Project under TMC”, Sheet1 row ${project.sourceRow}. Current participant counts remain hidden until the Statistics Unit validates them.`
                : `Sumber: “Index: Research Project under TMC”, Sheet1 baris ${project.sourceRow}. Bilangan peserta semasa disembunyikan sehingga disahkan oleh Unit Statistik.`}
            </p>
          </aside>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-200 hover:bg-slate-300 text-[#003366] font-semibold text-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{lang === 'en' ? 'Return to Project List' : 'Kembali ke Senarai Projek'}</span>
          </button>
          <button
            type="button"
            onClick={onNavigateResearch}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#007bff] hover:bg-[#0069d9] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
          >
            <span>{lang === 'en' ? 'Browse All Research Projects' : 'Lihat Semua Projek Penyelidikan'}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </article>
    </div>
  );
};
