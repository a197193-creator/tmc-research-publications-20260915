import React, { useEffect, useRef, useState } from 'react';
import { Language, ResearchInitiativeItem } from '../types';
import { translations } from '../data/translations';
import { allResearchInitiatives } from '../data/researchInitiatives';
import { HeroAction, heroSlides } from '../data/heroSlides';

interface HeroCarouselProps {
  lang: Language;
  onOpenResearch: () => void;
  onOpenPublications: () => void;
  onOpenProject: (project: ResearchInitiativeItem) => void;
}

const totalSlides = heroSlides.length;
const wrapSlide = (index: number) => (index + totalSlides) % totalSlides;

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  lang, onOpenResearch, onOpenPublications, onOpenProject,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  // Keep the visible slide until the requested photograph finishes loading.
  const [selection, setSelection] = useState({ requested: 0, displayed: 0 });
  const [readyImages, setReadyImages] = useState<Set<number>>(() => new Set());
  const [failedImages, setFailedImages] = useState<Set<number>>(() => new Set());
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => !document.hidden);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const t = translations[lang].hero;
  const currentSlide = selection.displayed;
  const isRotating = !isPaused && !isHovered && !prefersReducedMotion
    && isVisible && isDocumentVisible && selection.requested === currentSlide;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(preference.matches);
    preference.addEventListener('change', updatePreference);
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.15 },
    );
    if (stageRef.current) observer.observe(stageRef.current);
    return () => {
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isRotating) return;
    const timer = window.setTimeout(() => {
      setSelection((previous) => {
        const requested = wrapSlide(previous.requested + 1);
        return { requested, displayed: readyImages.has(requested) ? requested : previous.displayed };
      });
    }, 10_000);
    return () => window.clearTimeout(timer);
  }, [isRotating, currentSlide, readyImages]);

  const selectSlide = (index: number | ((previous: number) => number)) => {
    setIsPaused(true);
    setSelection((previous) => {
      const requested = wrapSlide(typeof index === 'function' ? index(previous.requested) : index);
      return { requested, displayed: readyImages.has(requested) ? requested : previous.displayed };
    });
  };

  const imageReady = (index: number) => {
    setReadyImages((previous) => previous.has(index) ? previous : new Set(previous).add(index));
    setSelection((previous) => previous.requested === index && previous.displayed !== index
      ? { ...previous, displayed: index } : previous);
  };

  const openAction = (action: HeroAction) => {
    if (action.kind === 'source') return;
    if (action.kind === 'publications') return onOpenPublications();
    if (action.kind === 'project') {
      const project = allResearchInitiatives.find((item) => item.id === action.projectId);
      if (project) return onOpenProject(project);
    }
    onOpenResearch();
  };

  const handleKeys = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (direction !== undefined) selectSlide((previous) => previous + direction);
    else if (event.key === 'Home') selectSlide(0);
    else if (event.key === 'End') selectSlide(totalSlides - 1);
    else return;
    event.preventDefault();
  };

  const controlClass = 'w-11 h-11 shrink-0 rounded-full flex items-center justify-center hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EC1E4] transition-colors cursor-pointer';

  return (
    <section
      className="relative bg-[#071629] text-white overflow-hidden border-b-4 border-[#b91c1c]"
      aria-label={lang === 'en' ? 'Featured TMC research' : 'Penyelidikan pilihan TMC'}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={(event) => {
        if ((event.target as HTMLElement).id !== 'hero-toggle') setIsPaused(true);
      }}
      onKeyDown={handleKeys}
    >
      <h1 className="sr-only">{lang === 'en' ? 'TMC Research & Publications' : 'Penyelidikan & Penerbitan TMC'}</h1>
      <div ref={stageRef} className="hero-stage relative h-[760px] sm:h-[680px] lg:h-[640px] overflow-hidden">
        <div aria-live={isPaused || prefersReducedMotion ? 'polite' : 'off'} aria-atomic="false">
          {heroSlides.map((slide, index) => {
            const active = currentSlide === index;
            const fallback = failedImages.has(index);
            const certificate = slide.presentation === 'certificate' && !fallback;
            const copy = slide.copy[lang];
            const imageCopy = fallback ? heroSlides[0].copy[lang] : copy;
            const shouldLoad = index === 0 || index === selection.requested
              || index === wrapSlide(currentSlide + 1) || readyImages.has(index);
            const primaryLabel = slide.action.kind === 'project' ? t.actions.viewProject
              : slide.action.kind === 'source' ? (slide.action.pdf ? t.actions.viewCertificate : t.actions.readSource)
                : slide.action.kind === 'publications' ? t.actions.browsePublications : t.actions.exploreResearch;
            const secondaryIsResearch = slide.action.kind !== 'research';
            const primaryClass = 'hero-primary inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded bg-gradient-to-r from-[#0069d9] to-[#003366] hover:from-[#0056b3] text-white hover:text-white border border-blue-400/40 font-sans font-semibold text-sm sm:text-base shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer';
            return (
              <div key={slide.id} id={`hero-slide-${index}`} data-slide-id={slide.id}
                className={`hero-slide absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${active ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
                role="group" aria-roledescription="slide"
                aria-label={`${index + 1} ${lang === 'en' ? 'of' : 'daripada'} ${totalSlides}`}
                aria-hidden={!active} inert={!active}>
                <div className="absolute inset-0 z-0">
                  {shouldLoad && !(fallback && failedImages.has(0)) && (
                    <img src={fallback ? heroSlides[0].image : slide.image} alt={imageCopy.imageAlt}
                      width={fallback ? heroSlides[0].width : slide.width} height={fallback ? heroSlides[0].height : slide.height}
                      fetchPriority={index === 0 ? 'high' : 'low'} decoding="async"
                      onLoad={() => imageReady(index)}
                      onError={() => {
                        setFailedImages((previous) => new Set(previous).add(index));
                        if (fallback || index === 0 || failedImages.has(0)) imageReady(index);
                      }}
                      className={certificate ? 'hero-certificate hidden lg:block absolute right-6 top-6 h-[470px] w-[34%] object-contain z-10' : 'hero-media object-[72%_center]'} />
                  )}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #00274c 0%, rgba(0,43,73,0.96) 36%, rgba(0,43,73,0.68) 52%, rgba(0,43,73,0.12) 74%, transparent 100%)' }} />
                  <div className="absolute inset-0 bg-[#003b71]/20 mix-blend-multiply" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, rgba(0,43,73,0.62) 0%, rgba(0,59,113,0.38) 22%, rgba(0,59,113,0.14) 42%, transparent 62%)' }} />
                </div>
                <div className="hero-copy relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full flex flex-col justify-center pt-8 pb-44 sm:pt-10 sm:pb-28 lg:pb-24">
                  <div className={`${certificate ? 'lg:max-w-[55%]' : 'max-w-[680px]'} space-y-5 sm:space-y-6`}>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003366]/90 border border-[#6EC1E4]/50 font-sans text-xs uppercase tracking-wider font-bold">
                      <span aria-hidden="true" className="w-2 h-2 shrink-0 rounded-full bg-[#6EC1E4]" /><span>{copy.tag}</span>
                      </div>
                      {certificate && shouldLoad && <img src={slide.image} alt={copy.imageAlt} width={slide.width} height={slide.height} decoding="async" className="lg:hidden w-[72px] h-[102px] shrink-0 object-contain rounded shadow-lg" />}
                    </div>
                    <h2 className={`font-serif text-[28px] sm:text-[42px] ${certificate ? 'lg:text-[42px]' : 'lg:text-[52px]'} font-bold tracking-tight leading-[1.15]`}>{copy.title}</h2>
                    <p className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed max-w-[620px]">{copy.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      {slide.action.kind === 'source' ? (
                        <a href={slide.action.href} target="_blank" rel="noopener noreferrer" className={primaryClass}>
                          <span>{primaryLabel}</span><span aria-hidden="true" className="material-symbols-outlined text-lg">{slide.action.pdf ? 'description' : 'open_in_new'}</span>
                          <span className="sr-only">{lang === 'en' ? '(opens in a new tab)' : '(dibuka dalam tab baharu)'}</span>
                        </a>
                      ) : <button type="button" onClick={() => openAction(slide.action)} className={primaryClass}>
                        <span>{primaryLabel}</span><span aria-hidden="true" className="material-symbols-outlined text-lg">arrow_forward</span>
                      </button>}
                      <button type="button" onClick={secondaryIsResearch ? onOpenResearch : onOpenPublications} className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded bg-white/10 hover:bg-white/20 font-sans font-semibold text-sm sm:text-base border border-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer">
                        <span aria-hidden="true" className="material-symbols-outlined text-lg text-[#6EC1E4]">{secondaryIsResearch ? 'science' : 'menu_book'}</span><span>{secondaryIsResearch ? t.actions.exploreResearch : t.actions.browsePublications}</span>
                      </button>
                    </div>
                    <p className="hero-caption text-xs leading-relaxed text-slate-200 max-w-[620px]">{fallback && failedImages.has(0) ? t.controls.imageUnavailable : imageCopy.imageCaption}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hero-controls absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 z-20 flex flex-col sm:flex-row items-center gap-1 bg-[#001b35]/90 backdrop-blur-md px-2 py-2 rounded-2xl sm:rounded-full border border-white/25">
          <div className="flex items-center gap-1">
            <button type="button" id="hero-toggle" className={controlClass} aria-label={prefersReducedMotion ? t.controls.reducedMotion : isPaused ? t.controls.resumeSlides : t.controls.pauseSlides}
              disabled={prefersReducedMotion} onClick={() => setIsPaused((previous) => !previous)} title={prefersReducedMotion ? t.controls.reducedMotion : undefined}>
              <span aria-hidden="true" className="material-symbols-outlined text-xl">{isPaused || prefersReducedMotion ? 'play_arrow' : 'pause'}</span>
            </button>
            <button type="button" id="hero-prev" className={controlClass} aria-label={t.controls.previousSlide} onClick={() => selectSlide((previous) => previous - 1)}>
              <span aria-hidden="true" className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <span className="hero-counter min-w-12 whitespace-nowrap text-center text-sm tabular-nums" aria-hidden="true">{currentSlide + 1} / {totalSlides}</span>
            <button type="button" id="hero-next" className={controlClass} aria-label={t.controls.nextSlide} onClick={() => selectSlide((previous) => previous + 1)}>
              <span aria-hidden="true" className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
          <div className="grid w-[202px] sm:w-[406px] shrink-0 grid-cols-6 sm:grid-cols-12 gap-0.5" role="group" aria-label={t.controls.chooseSlide}>
            {heroSlides.map((slide, index) => (
              <button key={slide.id} type="button" id={`dot-${index}`} aria-label={`${t.controls.goToSlide} ${index + 1}: ${slide.copy[lang].title}`}
                aria-controls={`hero-slide-${index}`} aria-current={currentSlide === index ? 'true' : undefined} onClick={() => selectSlide(index)}
                className="w-8 h-8 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#6EC1E4] hover:bg-white/10 cursor-pointer">
                <span aria-hidden="true" className={`h-2 rounded-full transition-[width] motion-reduce:transition-none ${currentSlide === index ? 'w-6 bg-[#6EC1E4]' : 'w-2 bg-white/60'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#00274c] border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center divide-x divide-white/10">
            {[
              [t.metrics.volunteers, t.metrics.volunteersLabel, t.metrics.volunteersDesc],
              [t.metrics.years, t.metrics.yearsLabel, t.metrics.yearsDesc],
              [allResearchInitiatives.length, t.metrics.samplesLabel, t.metrics.samplesDesc],
              [t.metrics.gens, t.metrics.gensLabel, t.metrics.gensDesc],
            ].map(([value, label, description], index) => (
              <div key={label} className={`${index > 1 ? 'pt-4 md:pt-0' : ''} md:px-4`}>
                <div className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${index % 2 === 0 ? 'text-[#6EC1E4]' : 'text-white'}`}>{value}</div>
                <div className="font-sans text-xs sm:text-sm uppercase font-semibold tracking-wider text-slate-300 mt-1">{label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
