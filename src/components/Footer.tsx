import { portalAsset } from '../utils/portalRuntime';
import React from 'react';
import { Language, PageType } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageType, extra?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
}) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#00274c] text-white pt-16 pb-12 border-t-4 border-[#007bff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-900/60 font-sans">
          {/* Col 1: About TMC */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7Cgz6jgnULMpxLU38lSRu2Y2BFUZuB8glBQBISbSm9e5ENfPFRyGKTT4s70Uje7gCJeV08H6UiPMZGvqrnxG9J9Jcu_C8E30LA7Wffghj_07u2mrfJORfuDljwHVp-P_Y03xPz8YzDUalyOl6BcrwX7g-hGmMKsyjvNxQUDC4oS9AcpErEAGW67kcdiJg2zL_d-h1jteZhsRP3Y-Wji0pc8sI_ccwXsHkMd5I9JfCU4fg-VysDL1yhaOKS910FVF2A"
                alt="TMC Emblem"
                className="h-12 w-auto object-contain"
              />
              <span className="font-serif font-bold text-lg text-white">The Malaysian Cohort</span>
            </button>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.footer.aboutDesc}
            </p>
            <div className="text-[11px] font-mono text-[#6EC1E4]">
              {t.footer.ethicsNotice}
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#007bff] pl-3">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#6EC1E4] transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'Cohort Overview & History' : 'Gambaran Keseluruhan & Sejarah'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('research')}
                  className="hover:text-[#6EC1E4] transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'Research Projects & Consortia' : 'Projek & Konsortium Penyelidikan'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('publications')}
                  className="hover:text-[#6EC1E4] transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'Scientific Publications Index' : 'Indeks Penerbitan Saintifik'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('news')}
                  className="hover:text-[#6EC1E4] transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'News & Cohort Bulletins' : 'Berita & Buletin Kohort'}
                </button>
              </li>
              <li><a href={portalAsset('/cohort/introduction.html')} className="hover:text-[#6EC1E4]">{lang === 'en' ? 'Introduction & infographics' : 'Pengenalan & infografik'}</a></li>
              <li><a href={portalAsset('/cohort/participants.html')} className="hover:text-[#6EC1E4]">{lang === 'en' ? 'Participant guidance' : 'Panduan peserta'}</a></li>
              <li><a href={portalAsset('/cohort/news.html')} className="hover:text-[#6EC1E4]">{lang === 'en' ? 'Full TMC news archive' : 'Arkib berita TMC'}</a></li>
              <li><a href={portalAsset('/cohort/resources.html')} className="hover:text-[#6EC1E4]">{lang === 'en' ? 'Media & downloads' : 'Media & muat turun'}</a></li>
              <li><a href={portalAsset('/cohort/contact.html')} className="hover:text-[#6EC1E4]">{lang === 'en' ? 'Contact Us' : 'Hubungi Kami'}</a></li>
            </ul>
          </div>

          {/* Col 3: Institutional Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#007bff] pl-3">
              {t.footer.headquartersTitle}
            </h4>
            <address className="not-italic text-xs text-slate-300 leading-relaxed space-y-1 font-sans">
              <p className="font-semibold text-white">UKM Medical Molecular Biology Institute (UMBI)</p>
              <p>Universiti Kebangsaan Malaysia</p>
              <p>Jalan Yaacob Latif, Bandar Tun Razak</p>
              <p>56000 Cheras, Kuala Lumpur</p>
              <p className="pt-2">
                Toll-Free: <strong className="text-[#6EC1E4]">1800-88-2007</strong>
              </p>
              <p>Telephone: <a href="tel:+60391459135">+603-9145 9135</a> / <a href="tel:+60391710415">+603-9171 0415</a></p>
              <p>
                Email:{' '}
                <a className="underline hover:text-[#6EC1E4]" href="mailto:managementcohort@gmail.com">
                  managementcohort@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Col 4: Quality Accreditation */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#007bff] pl-3">
              {t.footer.accreditationTitle}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.footer.accreditationDesc}
            </p>
            <a href={portalAsset("/documents/tmc-samm-537-accreditation.pdf")} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-[#6EC1E4] hover:text-white underline underline-offset-4">
              {lang === 'en' ? 'View accreditation certificate (PDF)' : 'Lihat sijil akreditasi (PDF)'}
              <span className="sr-only">{lang === 'en' ? ' (opens in a new tab)' : ' (dibuka dalam tab baharu)'}</span>
            </a>
            <div className="p-3 rounded bg-white/5 border border-blue-400/20 text-[11px] text-slate-300 font-sans">
              <span className="block font-bold text-white mb-0.5">{t.footer.govProjectBadge}</span>
              {t.footer.ministry}
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => onNavigate('legal', { section: 'pdpa' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.privacyNotice}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('legal', { section: 'terms' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.termsOfUse}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('legal', { section: 'governance' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.dataGovernance}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('legal', { section: 'ethics' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.contactEthics}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
