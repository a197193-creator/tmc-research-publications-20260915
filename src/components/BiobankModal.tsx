import React from 'react';
import { Language } from '../types';

interface BiobankModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const BiobankModal: React.FC<BiobankModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#d97706]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d97706]/20 text-[#f59e0b] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">ac_unit</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold">
                {lang === 'en' ? 'UMBI National Cryogenic Biobank' : 'Biobank Kriogenik Kebangsaan UMBI'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'en' ? 'Southeast Asia’s Largest Automated Biological Repository' : 'Repositori Biologi Automatik Terbesar di Asia Tenggara'}
              </p>
            </div>
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

        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto text-slate-700">
          {/* Hero Banner inside modal */}
          <div className="relative h-64 rounded-lg overflow-hidden border border-slate-200">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQdiqBYSxg8rgOuIprTBGVc8Dlv24jtYki_2O6P-5bSr0UYJQ3222uwTEFBNBgXJ5uzEMOLU_DcvSFTOnMVJCXZdXQZ3pI7EiTU2g9GfBipsRalgEqz0xJVgsVmKRAEu3oRX-0cyLaradzhA8YasWNYdvZbLxr7tWTDgSM3rI3lgozfsnK1Z6rmxjGADjJWFlIs-UqOxPuuvvq6lyluneHjkF6BeF3lyx8kRplaaY9Q01Cc72rHEr6"
              alt="UMBI National Cryogenic Biobank"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2.5 py-1 rounded bg-[#d97706] text-[#071629] text-[10px] font-heading font-bold uppercase">
                ISO 15189 & ISO 9001
              </span>
              <h4 className="font-serif text-xl font-bold mt-1">
                {lang === 'en' ? 'Liquid Nitrogen Storage Tanks at -196°C' : 'Tangki Simpanan Cecair Nitrogen pada -196°C'}
              </h4>
            </div>
          </div>

          {/* Key Infrastructure Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] uppercase font-heading font-bold text-[#b91c1c] block">
                {lang === 'en' ? 'Preserved Samples' : 'Sampel Disimpan'}
              </span>
              <div className="font-serif text-2xl font-bold text-[#0c2340]">1.4+ Million</div>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'en' ? 'Aliquots of DNA, RNA, plasma, serum, buffy coat & urine.' : 'Aliquots DNA, RNA, plasma, serum, buffy coat & urin.'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] uppercase font-heading font-bold text-[#d97706] block">
                {lang === 'en' ? 'Temperature Control' : 'Kawalan Suhu'}
              </span>
              <div className="font-serif text-2xl font-bold text-[#0c2340]">-196°C LN2</div>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'en' ? 'Vapor phase nitrogen preventing cross-contamination.' : 'Fasa wap nitrogen menghalang pencemaran silang.'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] uppercase font-heading font-bold text-emerald-600 block">
                {lang === 'en' ? 'Tracking System' : 'Sistem Penjejakan'}
              </span>
              <div className="font-serif text-2xl font-bold text-[#0c2340]">2D Matrix Barcode</div>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'en' ? 'Automated robotic retrieval within 90 seconds.' : 'Pengambilan automatik robotik dalam masa 90 saat.'}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
            <h5 className="font-serif text-base font-bold text-[#0c2340]">
              {lang === 'en' ? 'Safeguarding Generational Health Data' : 'Melindungi Data Kesihatan Merentas Generasi'}
            </h5>
            <p>
              {lang === 'en'
                ? 'Established in 2006 under the National Flagship Research Programme, the UMBI Biobank serves as the central biological repository for The Malaysian Cohort. Each participant sample is processed through standardized robotics within 2 hours of phlebotomy to guarantee enzymatic and nucleic acid integrity.'
                : 'Ditubuhkan pada 2006 di bawah Program Penyelidikan Flagship Kebangsaan, Biobank UMBI berfungsi sebagai repositori biologi pusat untuk The Malaysian Cohort. Setiap sampel diproses menggunakan robotik piawai dalam tempoh 2 jam selepas pensampelan.'}
            </p>
            <p>
              {lang === 'en'
                ? 'The facility features dual backup power generators, vacuum-insulated liquid nitrogen bulk pipelines, and 24/7 automated telemetry alert systems to ensure uninterrupted cryogenic preservation across decades.'
                : 'Fasiliti ini dilengkapi penjana kuasa sandaran dwi, saluran paip pukal bertebat vakum, serta sistem telemetri amaran automatik 24/7 untuk memastikan pemeliharaan kriogenik tanpa gangguan.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0c2340] hover:bg-[#1a365d] text-white text-xs sm:text-sm font-semibold rounded"
          >
            {lang === 'en' ? 'Close Tour' : 'Tutup Lawatan'}
          </button>
        </div>
      </div>
    </div>
  );
};
