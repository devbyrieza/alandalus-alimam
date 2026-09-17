const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const pagePath = path.join(baseDir, repo, 'src/app/dashboard/penguji/jadwal/page.tsx');
    let code = fs.readFileSync(pagePath, 'utf8');

    if (!code.includes('Ajukan Ubah Jadwal')) {
      const modalRegex = /\{\/\*\s*MODAL DETAIL PENDAFTAR\s*\*\/\}/g;
      const rescheduleModalCode = `
      {/* Reschedule Modal */}
      <AnimatePresence>
        {rescheduleModalOpen && rescheduleItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setRescheduleModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-ink-950">
                    Ajukan Ubah Jadwal
                  </h3>
                  <button
                    onClick={() => setRescheduleModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-sm text-ink-600 mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 font-medium">
                  Pengajuan perubahan jadwal ini akan dikirim ke Admin Super. Jadwal Anda di sistem baru akan berubah setelah Admin menyetujuinya.
                </p>

                <form onSubmit={handleRescheduleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink-600 uppercase tracking-wider">Tanggal Baru</label>
                    <input 
                      type="date" 
                      value={rescheduleForm.date}
                      onChange={e => setRescheduleForm({...rescheduleForm, date: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium text-ink-900"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink-600 uppercase tracking-wider">Jam Mulai</label>
                      <input 
                        type="time" 
                        value={rescheduleForm.start_time}
                        onChange={e => setRescheduleForm({...rescheduleForm, start_time: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium text-ink-900"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ink-600 uppercase tracking-wider">Jam Selesai</label>
                      <input 
                        type="time" 
                        value={rescheduleForm.end_time}
                        onChange={e => setRescheduleForm({...rescheduleForm, end_time: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium text-ink-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink-600 uppercase tracking-wider">Alasan Perubahan</label>
                    <textarea 
                      rows={3}
                      value={rescheduleForm.reason}
                      onChange={e => setRescheduleForm({...rescheduleForm, reason: e.target.value})}
                      placeholder="Contoh: Ada udzur syar'i mendadak / bentrok dengan kegiatan lain..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-medium text-ink-900 resize-none"
                      required
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRescheduleModalOpen(false)}
                      className="px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={submittingReschedule}
                      className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submittingReschedule ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                      AJUKAN SEKARANG
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
`;
      code = code.replace(modalRegex, match => rescheduleModalCode + '\n        ' + match);
      fs.writeFileSync(pagePath, code);
      console.log(`Injected Modal to ${repo}`);
    }
  } catch (e) { console.error(`Error on ${repo}:`, e.message); }
}
