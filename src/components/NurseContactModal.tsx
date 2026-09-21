import React, { useState } from 'react';
import { Language } from '../types';

interface NurseContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const NurseContactModal: React.FC<NurseContactModalProps> = ({ isOpen, onClose, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mykad, setMykad] = useState('');
  const [inquiryType, setInquiryType] = useState('reschedule');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after brief celebration
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#b91c1c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600/20 text-[#f59e0b] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">support_agent</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">
                {lang === 'en' ? 'Contact TMC Clinical Nurse Team' : 'Hubungi Pasukan Jururawat Klinikal TMC'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'en' ? 'Health Screening Follow-Up Care Desk' : 'Kaunter Susulan Saringan Kesihatan'}
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

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">check</span>
              </div>
              <h4 className="font-serif text-xl font-bold text-[#0c2340]">
                {lang === 'en' ? 'Message Received!' : 'Mesej Berjaya Dihantar!'}
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'Our clinical coordinator will review your request and call you back on your registered phone within 1 working day.'
                  : 'Penyelaras klinikal kami akan menyemak permohonan anda dan menghubungi anda semula dalam tempoh 1 hari bekerja.'}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#0c2340] text-white text-sm font-semibold rounded"
              >
                {lang === 'en' ? 'Close' : 'Tutup'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nurse-contact-name" className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Full Name (as in MyKad)' : 'Nama Penuh (seperti dlm MyKad)'}
                  </label>
                  <input
                    id="nurse-contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Ahmad bin Abdullah' : 'cth. Ahmad bin Abdullah'}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
                <div>
                  <label htmlFor="nurse-contact-phone" className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Mobile Contact Number' : 'Nombor Telefon'}
                  </label>
                  <input
                    id="nurse-contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="012-345 6789"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nurse-contact-mykad" className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'MyKad / IC Number' : 'Nombor MyKad / KP'}
                  </label>
                  <input
                    id="nurse-contact-mykad"
                    type="text"
                    required
                    value={mykad}
                    onChange={(e) => setMykad(e.target.value)}
                    placeholder="700101-10-5123"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
                <div>
                  <label htmlFor="nurse-contact-inquiry-type" className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Reason for Contact' : 'Tujuan Hubungi'}
                  </label>
                  <select
                    id="nurse-contact-inquiry-type"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                  >
                    <option value="reschedule">
                      {lang === 'en' ? 'Reschedule Follow-Up Screening' : 'Jadual Semula Saringan Susulan'}
                    </option>
                    <option value="fasting">
                      {lang === 'en' ? 'Fasting & Medication Advice' : 'Nasihat Puasa & Ubat-ubatan'}
                    </option>
                    <option value="results">
                      {lang === 'en' ? 'Clarify Blood Test Results' : 'Pertanyaan Keputusan Darah'}
                    </option>
                    <option value="transport">
                      {lang === 'en' ? 'Directions & Parking at UMBI' : 'Panduan Lokasi & Parking'}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="nurse-contact-message" className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'en' ? 'Message or Question' : 'Mesej atau Soalan'}
                </label>
                <textarea
                  id="nurse-contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'en' ? 'Write your inquiry here...' : 'Tulis pertanyaan anda di sini...'}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="tel:1800882007"
                  className="text-xs font-heading font-semibold text-[#b91c1c] flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>{lang === 'en' ? 'Call 1800-88-2007 now' : 'Hubungi 1800-88-2007 sekarang'}</span>
                </a>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-heading font-semibold text-sm rounded shadow transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Send to Care Team' : 'Hantar kepada Pasukan'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
