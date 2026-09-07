import React from 'react';
import { Language } from '../types';

interface LegalModalProps {
  title: string | null;
  onClose: () => void;
  lang: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({ title, onClose, lang }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#b91c1c]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#f59e0b] text-2xl">policy</span>
            <h3 className="font-serif text-xl font-bold">{title}</h3>
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

        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-slate-700 leading-relaxed text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-xs text-slate-600">
            <strong>UKM Ethics Approval:</strong> UKM 1.5.3.5/244/FF-205-2007 (Renewed for Phase 3)
          </div>

          <h4 className="font-serif text-base font-bold text-[#0c2340]">
            {lang === 'en' ? 'Institutional Commitment & Ethical Principles' : 'Komitmen Institusi & Prinsip Etika'}
          </h4>

          <p>
            {lang === 'en'
              ? 'The Malaysian Cohort operates in strict compliance with the Declaration of Helsinki and the Malaysian Personal Data Protection Act (PDPA) principles. All biological specimens and longitudinal epidemiological data collected are fully anonymized with dual-key cryptographic hashing prior to scientific utilization.'
              : 'The Malaysian Cohort beroperasi mematuhi Deklarasi Helsinki dan prinsip Akta Perlindungan Data Peribadi (PDPA) Malaysia. Semua spesimen biologi dan data epidemiologi yang dikumpul adalah tanpa nama sepenuhnya dengan penyulitan kriptografi dwi-kunci.'}
          </p>

          <p>
            {lang === 'en'
              ? 'Cohort volunteers maintain the explicit right to withdraw their consent or query their stored health records at any time through our designated participant care desk or by contacting the UKM Research Ethics Secretariat.'
              : 'Sukarelawan kohort mengekalkan hak mutlak untuk menarik balik kebenaran atau menyemak rekod kesihatan mereka pada bila-bila masa melalui kaunter perkhidmatan peserta atau menghubungi Sekretariat Etika Penyelidikan UKM.'}
          </p>
        </div>

        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#0c2340] text-white text-xs font-semibold rounded"
          >
            {lang === 'en' ? 'Close Window' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};
