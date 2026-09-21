import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { allResearchInitiatives } from '../data/researchInitiatives';

interface HeroCarouselProps {
  lang: Language;
  onOpenResearch: () => void;
  onOpenPublications: () => void;
}

const rightEdgeBlueFade = {
  background:
    'linear-gradient(270deg, rgba(0,43,73,0.62) 0%, rgba(0,59,113,0.38) 22%, rgba(0,59,113,0.14) 42%, transparent 62%)'
};

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  lang,
  onOpenResearch,
  onOpenPublications
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const totalSlides = 2;
  const t = translations[lang];

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);
    updateMotionPreference();
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section
      className="relative bg-[#071629] text-white overflow-hidden border-b-4 border-[#b91c1c]"
      aria-label={lang === 'en' ? 'Featured TMC research' : 'Penyelidikan pilihan TMC'}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
    >
      {/* Carousel Slides Container */}
      <div className="relative h-[700px] sm:h-[600px] lg:h-[640px] flex items-center overflow-hidden">
        {/* Slide 1 */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
          id="hero-slide-0"
          role="group"
          aria-roledescription="slide"
          aria-label={lang === 'en' ? '1 of 2' : '1 daripada 2'}
          aria-hidden={currentSlide !== 0}
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/TMCLaboratory.jpg"
              alt={t.hero.slide1.imageAlt}
              className="hero-media object-[70%_center]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #00274c 0%, rgba(0,43,73,0.96) 36%, rgba(0,43,73,0.68) 52%, rgba(0,43,73,0.12) 74%, transparent 100%)'
              }}
            ></div>
            <div className="absolute inset-0 bg-[#003b71]/20 mix-blend-multiply"></div>
            <div className="absolute inset-0" style={rightEdgeBlueFade}></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full flex flex-col justify-center py-12 sm:py-16">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003366]/90 border border-[#6EC1E4]/50 text-white font-sans text-xs uppercase tracking-widest font-bold backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#6EC1E4] animate-pulse"></span>
                <span>{t.hero.slide1.tag}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                {t.hero.slide1.title}
              </h1>
              <p className="font-sans text-base sm:text-lg lg:text-xl text-slate-200 font-light leading-relaxed max-w-2xl min-h-[64px] sm:min-h-[84px]">
                {t.hero.slide1.descriptionStart}{' '}
                <strong className="text-white font-semibold">{t.hero.slide1.descriptionHighlight}</strong>
                {t.hero.slide1.descriptionEnd}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenResearch}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded bg-gradient-to-r from-[#007bff] to-[#003366] hover:from-[#0069d9] hover:to-[#00274c] border border-blue-400/40 text-white font-sans font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <span>{t.hero.slide1.ctaPrimary}</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onOpenPublications}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-lg text-[#6EC1E4]">menu_book</span>
                  <span>{t.hero.slide1.ctaSecondary}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          }`}
          id="hero-slide-1"
          role="group"
          aria-roledescription="slide"
          aria-label={lang === 'en' ? '2 of 2' : '2 daripada 2'}
          aria-hidden={currentSlide !== 1}
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/myprecise-sequencing-laboratory.png"
              alt={t.hero.slide2.imageAlt}
              className="hero-media object-[74%_center]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #00274c 0%, rgba(0,43,73,0.96) 36%, rgba(0,43,73,0.68) 52%, rgba(0,43,73,0.12) 74%, transparent 100%)'
              }}
            ></div>
            <div className="absolute inset-0 bg-[#003b71]/20 mix-blend-multiply"></div>
            <div className="absolute inset-0" style={rightEdgeBlueFade}></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full flex flex-col justify-center py-12 sm:py-16">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003366]/90 border border-[#6EC1E4]/50 text-white font-sans text-xs uppercase tracking-widest font-bold backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm text-[#6EC1E4]">biotech</span>
                <span>{t.hero.slide2.tag}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                {t.hero.slide2.title}
              </h2>
              <p className="font-sans text-base sm:text-lg lg:text-xl text-slate-200 font-light leading-relaxed max-w-2xl min-h-[64px] sm:min-h-[84px]">
                {t.hero.slide2.descriptionStart}{' '}
                <strong className="text-white font-semibold">{t.hero.slide2.descriptionHighlight}</strong>
                {t.hero.slide2.descriptionEnd}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenPublications}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded bg-gradient-to-r from-[#007bff] to-[#003366] hover:from-[#0069d9] hover:to-[#00274c] border border-blue-400/40 text-white font-sans font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>{t.hero.slide2.ctaPrimary}</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onOpenResearch}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-lg text-[#6EC1E4]">science</span>
                  <span>{t.hero.slide2.ctaSecondary}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation & Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-auto sm:right-12 sm:translate-x-0 z-20 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <button
            type="button"
            id="hero-prev"
            aria-label={t.hero.controls.previousSlide}
            onClick={handlePrev}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">chevron_left</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="dot-0"
              aria-label={t.hero.controls.firstSlide}
              aria-current={currentSlide === 0 ? 'true' : undefined}
              onClick={() => setCurrentSlide(0)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === 0 ? 'w-6 bg-[#6EC1E4]' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
            <button
              type="button"
              id="dot-1"
              aria-label={t.hero.controls.secondSlide}
              aria-current={currentSlide === 1 ? 'true' : undefined}
              onClick={() => setCurrentSlide(1)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === 1 ? 'w-6 bg-[#6EC1E4]' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          </div>
          <button
            type="button"
            id="hero-next"
            aria-label={t.hero.controls.nextSlide}
            onClick={handleNext}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">chevron_right</span>
          </button>
        </div>
      </div>

      {/* UKM-STYLE HIGH IMPACT METRICS STRIP */}
      <div className="border-t border-blue-900/60 bg-[#00274c]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0 md:px-4">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#6EC1E4] tracking-tight">
                {t.hero.metrics.volunteers}
              </div>
              <div className="font-sans text-xs sm:text-sm uppercase font-semibold tracking-wider text-slate-300 mt-1">
                {t.hero.metrics.volunteersLabel}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{t.hero.metrics.volunteersDesc}</div>
            </div>

            <div className="pt-4 md:pt-0 md:px-4">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t.hero.metrics.years}
              </div>
              <div className="font-sans text-xs sm:text-sm uppercase font-semibold tracking-wider text-slate-300 mt-1">
                {t.hero.metrics.yearsLabel}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{t.hero.metrics.yearsDesc}</div>
            </div>

            <div className="pt-4 md:pt-0 md:px-4">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#6EC1E4] tracking-tight">
                {allResearchInitiatives.length}
              </div>
              <div className="font-sans text-xs sm:text-sm uppercase font-semibold tracking-wider text-slate-300 mt-1">
                {t.hero.metrics.samplesLabel}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{t.hero.metrics.samplesDesc}</div>
            </div>

            <div className="pt-4 md:pt-0 md:px-4">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t.hero.metrics.gens}
              </div>
              <div className="font-sans text-xs sm:text-sm uppercase font-semibold tracking-wider text-slate-300 mt-1">
                {t.hero.metrics.gensLabel}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{t.hero.metrics.gensDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
