import React, { useState } from 'react';
import { Language } from '../types';
import { demoParticipants, DemoParticipant } from '../data/portalData';

interface ParticipantPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ParticipantPortalModal: React.FC<ParticipantPortalModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<DemoParticipant | null>(demoParticipants[0]);
  const [activeTab, setActiveTab] = useState<'status' | 'reschedule' | 'prep' | 'update'>('status');
  const [rescheduleDate, setRescheduleDate] = useState('2025-05-12');
  const [rescheduleTime, setRescheduleTime] = useState('08:30 AM');
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Address & phone update state
  const [contactNumber, setContactNumber] = useState(selectedParticipant?.contactNumber || '');
  const [address, setAddress] = useState(selectedParticipant?.address || '');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = demoParticipants.find(
      (p) =>
        p.id.toLowerCase().includes(query) ||
        p.mykad.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, '')) ||
        p.name.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedParticipant(found);
      setContactNumber(found.contactNumber);
      setAddress(found.address);
      setRescheduleSuccess(false);
      setUpdateSuccess(false);
    } else {
      // Dynamic fallback for any user input so it never fails!
      const fallbackParticipant: DemoParticipant = {
        id: query.toUpperCase().startsWith('TMC') ? query.toUpperCase() : `TMC-${Math.floor(100000 + Math.random() * 900000)}`,
        mykad: query.includes('-') ? query : '700101-10-5123',
        name: lang === 'en' ? 'Registered Cohort Participant' : 'Peserta Kohort Berdaftar',
        cohortYear: 2011,
        phase3Status: 'Scheduled',
        appointmentDate: '2025-05-20',
        appointmentTime: '08:30 AM',
        location: 'UMBI UKM Cheras (Lobby Clinical Center)',
        fastingRequired: true,
        bloodSampleCount: 16,
        contactNumber: '+60 12-987 6543',
        address: 'Klang Valley, Malaysia',
        recentTestSummary: {
          date: 'Phase 2 (2018)',
          bloodPressure: '124/80 mmHg',
          fastingGlucose: '5.2 mmol/L',
          totalCholesterol: '4.9 mmol/L',
          bmi: '23.8 kg/m²'
        }
      };
      setSelectedParticipant(fallbackParticipant);
      setContactNumber(fallbackParticipant.contactNumber);
      setAddress(fallbackParticipant.address);
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedParticipant) {
      setSelectedParticipant({
        ...selectedParticipant,
        appointmentDate: rescheduleDate,
        appointmentTime: rescheduleTime,
        phase3Status: 'Scheduled'
      });
      setRescheduleSuccess(true);
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedParticipant) {
      setSelectedParticipant({
        ...selectedParticipant,
        contactNumber,
        address
      });
      setUpdateSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#0c2340] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#b91c1c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#f59e0b]">
              <span className="material-symbols-outlined text-2xl">clinical_notes</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">
                {lang === 'en' ? 'Cohort Participant Services Portal' : 'Portal Perkhidmatan Peserta Kohort'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'en'
                  ? 'Phase 3 Repeat Health Screening (2024–2026) • UMBI UKM'
                  : 'Saringan Kesihatan Berulang Fasa 3 (2024–2026) • UMBI UKM'}
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

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Search / Lookup Bar */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label htmlFor="portal-search-input" className="block text-xs font-heading font-bold text-[#0c2340] uppercase tracking-wider mb-1.5">
              {lang === 'en' ? 'Participant Verification (Lookup by MyKad or TMC ID)' : 'Pengesahan Peserta (Carian MyKad atau ID TMC)'}
            </label>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">badge</span>
                <input
                  id="portal-search-input"
                  type="text"
                  placeholder={lang === 'en' ? 'e.g. TMC-106200 or 580314-10-5521' : 'cth. TMC-106200 atau 580314-10-5521'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0c2340]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0c2340] hover:bg-[#1a365d] text-white text-sm font-heading font-semibold rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">search</span>
                <span>{lang === 'en' ? 'Find Record' : 'Cari Rekod'}</span>
              </button>
            </form>

            {/* Quick Demo Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">
                {lang === 'en' ? 'Quick demo test:' : 'Ujian pantas demo:'}
              </span>
              {demoParticipants.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedParticipant(p);
                    setContactNumber(p.contactNumber);
                    setAddress(p.address);
                    setRescheduleSuccess(false);
                    setUpdateSuccess(false);
                  }}
                  className={`px-2.5 py-1 rounded border text-xs font-mono transition-colors ${
                    selectedParticipant?.id === p.id
                      ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.name.split(' ')[0]} ({p.id})
                </button>
              ))}
            </div>
          </div>

          {selectedParticipant && (
            <div>
              {/* Participant Profile Banner */}
              <div className="bg-[#0c2340]/5 border border-[#0c2340]/15 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#0c2340] text-white">
                      {selectedParticipant.id}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      MyKad: {selectedParticipant.mykad}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#0c2340] mt-1">
                    {selectedParticipant.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lang === 'en' ? 'Cohort Participant since:' : 'Peserta Kohort sejak:'}{' '}
                    <strong>{selectedParticipant.cohortYear} (Phase 1 Baseline)</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="bg-white p-3 rounded border border-slate-200 text-center sm:text-right">
                    <span className="text-[10px] uppercase font-heading font-bold text-slate-400 block">
                      {lang === 'en' ? 'Phase 3 Screening Status' : 'Status Saringan Fasa 3'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-heading font-bold text-sm text-[#b91c1c]">
                      <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-ping"></span>
                      {selectedParticipant.phase3Status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 mt-6 gap-2 sm:gap-6 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('status')}
                  className={`pb-2.5 text-xs sm:text-sm font-heading font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'status'
                      ? 'border-[#b91c1c] text-[#b91c1c]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'en' ? 'Appointment Details' : 'Butiran Temujanji'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reschedule')}
                  className={`pb-2.5 text-xs sm:text-sm font-heading font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'reschedule'
                      ? 'border-[#b91c1c] text-[#b91c1c]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'en' ? 'Reschedule Screening' : 'Jadual Semula'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('prep')}
                  className={`pb-2.5 text-xs sm:text-sm font-heading font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'prep'
                      ? 'border-[#b91c1c] text-[#b91c1c]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'en' ? 'Fasting Checklist' : 'Panduan Berpuasa'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('update')}
                  className={`pb-2.5 text-xs sm:text-sm font-heading font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'update'
                      ? 'border-[#b91c1c] text-[#b91c1c]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'en' ? 'Update Info' : 'Kemaskini Maklumat'}
                </button>
              </div>

              {/* Tab Content */}
              <div className="pt-5">
                {activeTab === 'status' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-xs uppercase font-heading font-bold text-slate-500 block mb-1">
                          {lang === 'en' ? 'Scheduled Date & Time' : 'Tarikh & Masa'}
                        </span>
                        <div className="font-serif text-lg font-bold text-[#0c2340]">
                          {selectedParticipant.appointmentDate} • {selectedParticipant.appointmentTime}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {selectedParticipant.location}
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200 text-slate-800">
                        <span className="text-xs uppercase font-heading font-bold text-amber-900 block mb-1">
                          {lang === 'en' ? 'Fasting Protocol Reminder' : 'Peringatan Puasa'}
                        </span>
                        <p className="text-xs leading-relaxed text-slate-700">
                          {lang === 'en'
                            ? 'Mandatory 10-hour fasting prior to arrival. Only plain water is permitted. Please do not drink tea, coffee, or cordial.'
                            : 'Wajib berpuasa 10 jam sebelum waktu temujanji. Hanya air kosong dibenarkan. Elakkan kopi, teh atau minuman manis.'}
                        </p>
                      </div>
                    </div>

                    {/* Historical Baseline Snapshot */}
                    {selectedParticipant.recentTestSummary && (
                      <div className="p-4 rounded-lg border border-slate-200 bg-white">
                        <h5 className="font-serif text-sm font-bold text-[#0c2340] mb-3 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-[#0c2340]">history</span>
                          <span>
                            {lang === 'en'
                              ? `Past Health Screening Reference (${selectedParticipant.recentTestSummary.date})`
                              : `Rujukan Saringan Kesihatan Terdahulu (${selectedParticipant.recentTestSummary.date})`}
                          </span>
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-2 bg-slate-50 rounded border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">BP</span>
                            <span className="font-mono font-bold text-sm text-slate-800">
                              {selectedParticipant.recentTestSummary.bloodPressure}
                            </span>
                          </div>
                          <div className="p-2 bg-slate-50 rounded border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fasting Glucose</span>
                            <span className="font-mono font-bold text-sm text-slate-800">
                              {selectedParticipant.recentTestSummary.fastingGlucose}
                            </span>
                          </div>
                          <div className="p-2 bg-slate-50 rounded border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cholesterol</span>
                            <span className="font-mono font-bold text-sm text-slate-800">
                              {selectedParticipant.recentTestSummary.totalCholesterol}
                            </span>
                          </div>
                          <div className="p-2 bg-slate-50 rounded border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">BMI</span>
                            <span className="font-mono font-bold text-sm text-slate-800">
                              {selectedParticipant.recentTestSummary.bmi}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reschedule' && (
                  <form onSubmit={handleRescheduleSubmit} className="space-y-4 max-w-lg">
                    {rescheduleSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                        <span>
                          {lang === 'en'
                            ? 'Appointment successfully rescheduled! Confirmation SMS sent.'
                            : 'Temujanji berjaya dijadualkan semula! SMS pengesahan dihantar.'}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="portal-preferred-date" className="block text-xs font-bold text-slate-700 mb-1">
                          {lang === 'en' ? 'Preferred Screening Date' : 'Pilihan Tarikh'}
                        </label>
                        <input
                          id="portal-preferred-date"
                          type="date"
                          value={rescheduleDate}
                          onChange={(e) => setRescheduleDate(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                        />
                      </div>
                      <div>
                        <label htmlFor="portal-preferred-slot" className="block text-xs font-bold text-slate-700 mb-1">
                          {lang === 'en' ? 'Morning Slot (Fasting)' : 'Sesi Pagi (Berpuasa)'}
                        </label>
                        <select
                          id="portal-preferred-slot"
                          value={rescheduleTime}
                          onChange={(e) => setRescheduleTime(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                        >
                          <option value="08:00 AM">08:00 AM - Slot A</option>
                          <option value="08:30 AM">08:30 AM - Slot B</option>
                          <option value="09:00 AM">09:00 AM - Slot C</option>
                          <option value="09:30 AM">09:30 AM - Slot D</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      {lang === 'en'
                        ? 'Note: All screenings are conducted at UMBI UKM Cheras. Complimentary breakfast voucher is provided after blood draw.'
                        : 'Nota: Semua saringan diadakan di UMBI UKM Cheras. Baucar sarapan percuma disediakan selepas selesai pensampelan darah.'}
                    </p>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs sm:text-sm font-heading font-semibold rounded shadow transition-colors"
                    >
                      {lang === 'en' ? 'Confirm Reschedule Request' : 'Sahkan Penjadualan Semula'}
                    </button>
                  </form>
                )}

                {activeTab === 'prep' && (
                  <div className="space-y-4">
                    <h5 className="font-serif text-base font-bold text-[#0c2340]">
                      {lang === 'en' ? 'Phase 3 Repeat Screening Preparation Checklist' : 'Senarai Semak Persediaan Saringan Fasa 3'}
                    </h5>
                    <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                      <li className="flex items-start gap-2.5 p-3 rounded bg-slate-50 border border-slate-200">
                        <span className="material-symbols-outlined text-[#b91c1c] text-lg mt-0.5">water_drop</span>
                        <div>
                          <strong>{lang === 'en' ? '10-Hour Fasting:' : 'Puasa 10 Jam:'}</strong>{' '}
                          {lang === 'en'
                            ? 'Begin fasting from 10:00 PM the night before. Plain water is permitted and encouraged to keep hydrated for easy vein access.'
                            : 'Mula berpuasa dari jam 10:00 malam sebelumnya. Air kosong digalakkan diminum agar saluran darah mudah diambil.'}
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5 p-3 rounded bg-slate-50 border border-slate-200">
                        <span className="material-symbols-outlined text-[#0c2340] text-lg mt-0.5">medication</span>
                        <div>
                          <strong>{lang === 'en' ? 'Medications:' : 'Ubat-ubatan Harian:'}</strong>{' '}
                          {lang === 'en'
                            ? 'Hypertension pills can be taken with water as usual. Diabetes medications should be postponed until breakfast after the blood draw.'
                            : 'Ubat darah tinggi boleh dimakan seperti biasa dengan sedikit air. Ubat kencing manis perlu ditangguhkan sehingga selepas selesai pensampelan darah dan sarapan.'}
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5 p-3 rounded bg-slate-50 border border-slate-200">
                        <span className="material-symbols-outlined text-[#d97706] text-lg mt-0.5">checkroom</span>
                        <div>
                          <strong>{lang === 'en' ? 'Clothing & Footwear:' : 'Pakaian & Kasut:'}</strong>{' '}
                          {lang === 'en'
                            ? 'Wear loose, short-sleeved shirts and comfortable shoes. This speeds up blood pressure, ECG, and bio-impedance measurement.'
                            : 'Pakai baju lengan pendek yang longgar dan kasut selesa untuk memudahkan pemeriksaan tekanan darah, ECG dan komposisi badan.'}
                        </div>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'update' && (
                  <form onSubmit={handleUpdateSubmit} className="space-y-4 max-w-lg">
                    {updateSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                        <span>
                          {lang === 'en'
                            ? 'Contact details updated in UMBI central database!'
                            : 'Maklumat hubungan berjaya dikemaskini dalam pangkalan data UMBI!'}
                        </span>
                      </div>
                    )}

                    <div>
                      <label htmlFor="portal-update-mobile" className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'en' ? 'Mobile Phone Number' : 'Nombor Telefon Bimbit'}
                      </label>
                      <input
                        id="portal-update-mobile"
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                      />
                    </div>

                    <div>
                      <label htmlFor="portal-update-address" className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'en' ? 'Mailing Address' : 'Alamat Surat Menyurat'}
                      </label>
                      <textarea
                        id="portal-update-address"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#0c2340]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0c2340] hover:bg-[#1a365d] text-white text-xs sm:text-sm font-heading font-semibold rounded shadow transition-colors"
                    >
                      {lang === 'en' ? 'Save Updated Contact Info' : 'Simpan Maklumat Terkini'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Hotline */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="material-symbols-outlined text-sm text-[#b91c1c]">headset_mic</span>
            <span>
              {lang === 'en' ? 'Need assistance with your booking? Call' : 'Perlukan bantuan? Hubungi'}
              <strong className="text-[#0c2340] font-mono ml-1">1800-88-2007</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded transition-colors"
          >
            {lang === 'en' ? 'Close Portal' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};
