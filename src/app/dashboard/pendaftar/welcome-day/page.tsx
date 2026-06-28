"use client";

import { useState, useEffect } from "react";
import { Loader2, Calendar, CheckCircle2, Save, Users, AlertCircle, Edit, Home } from "lucide-react";
import Link from "next/link";

export default function WelcomeDayPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    statusKehadiran: "HADIR",
    jumlahPendamping: 2, // Default max
    totalPengantar: 3,   // Default 2 wali + 1 santri
    catatanTambahan: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/pendaftar/welcome-day?t=${Date.now()}`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          const dataJson = result.data.data_penginap;
          if (dataJson) {
            setFormData({
              statusKehadiran: dataJson.statusKehadiran || "HADIR",
              jumlahPendamping: dataJson.jumlahPendamping !== undefined ? Number(dataJson.jumlahPendamping) : 2,
              totalPengantar: dataJson.totalPengantar !== undefined ? Number(dataJson.totalPengantar) : 3,
              catatanTambahan: dataJson.catatanTambahan || "",
            });
            setIsEditing(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching welcome day status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/pendaftar/welcome-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal menyimpan konfirmasi");

      setMessage({ type: "success", text: "Konfirmasi kehadiran Welcome Day berhasil disimpan!" });
      setIsEditing(false);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Terjadi kesalahan" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 md:p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-ink-100 flex items-start gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100px] -z-0"></div>
        <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="relative z-10">
          <h1 className="text-xl font-black text-primary-950">Konfirmasi Kehadiran Welcome Day</h1>
          <p className="text-sm font-medium text-ink-500 mt-1">
            Welcome Day & Serah Terima Santri Baru akan dilaksanakan pada <strong className="text-primary-700">Sabtu, 18 Juli 2026</strong>. 
            Mohon isi form konfirmasi di bawah ini untuk membantu kami mempersiapkan konsumsi, ruang sarasehan, dan kamar asrama.
          </p>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-bold ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Ketentuan Banner */}
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2 text-sm text-amber-900">
        <h3 className="font-black flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          Ketentuan Wali & Konsumsi:
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-amber-800 font-medium">
          <li>Kursi di dalam ruang acara utama sarasehan serta kupon makan siang/snack disediakan khusus untuk <strong>maksimal 3 orang</strong> (1 Santri + 2 Wali/Pendamping Terdekat).</li>
          <li>Keluarga atau pengantar lain diperkenankan ikut mendampingi masuk ke area pesantren, namun tidak diperkenankan memasuki ruang acara utama sarasehan dan tidak mendapatkan kupon konsumsi.</li>
        </ul>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-ink-100">
          <h2 className="text-lg font-black text-ink-950 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-ink-400" />
            Formulir Konfirmasi
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Kehadiran */}
            <div className="space-y-2">
              <label className="text-xs font-black text-ink-500 uppercase tracking-widest block">
                Konfirmasi Kehadiran *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, statusKehadiran: "HADIR" })}
                  className={`p-4 rounded-xl border font-bold text-sm text-center transition-all ${
                    formData.statusKehadiran === "HADIR"
                      ? "bg-primary-900 border-primary-900 text-white shadow-md"
                      : "bg-ink-50 border-ink-200 text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  Ya, Kami Akan Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, statusKehadiran: "TIDAK_HADIR" })}
                  className={`p-4 rounded-xl border font-bold text-sm text-center transition-all ${
                    formData.statusKehadiran === "TIDAK_HADIR"
                      ? "bg-red-950 border-red-900 text-white shadow-md"
                      : "bg-ink-50 border-ink-200 text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  Berhalangan Hadir
                </button>
              </div>
            </div>

            {formData.statusKehadiran === "HADIR" && (
              <>
                {/* Jumlah Pendamping di Acara Utama */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-ink-500 uppercase tracking-widest block">
                    Jumlah Wali Pendamping di Acara Utama & Penerima Kupon *
                  </label>
                  <select
                    value={formData.jumlahPendamping}
                    onChange={(e) => setFormData({ ...formData, jumlahPendamping: Number(e.target.value) })}
                    className="w-full bg-ink-50 border border-ink-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                    required
                  >
                    <option value={1}>1 Pendamping (Total 2 orang bersama santri)</option>
                    <option value={2}>2 Pendamping (Total 3 orang bersama santri - MAKSIMAL)</option>
                  </select>
                  <p className="text-xs text-ink-400 font-bold mt-1">
                    Kursi sarasehan dan kupon konsumsi disiapkan sesuai pilihan ini.
                  </p>
                </div>

                {/* Total Pengantar ke Area Pesantren */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-ink-500 uppercase tracking-widest block">
                    Total Seluruh Pengantar yang ikut ke Pesantren *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.totalPengantar}
                    onChange={(e) => setFormData({ ...formData, totalPengantar: Math.max(1, Number(e.target.value)) })}
                    className="w-full bg-ink-50 border border-ink-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                    required
                  />
                  <p className="text-xs text-ink-400 font-bold mt-1">
                    Isi dengan total jumlah orang dalam rombongan keluarga yang ikut mengantar (termasuk santri dan seluruh pendamping).
                  </p>
                </div>
              </>
            )}

            {/* Catatan Tambahan */}
            <div className="space-y-2">
              <label className="text-xs font-black text-ink-500 uppercase tracking-widest block">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                value={formData.catatanTambahan}
                onChange={(e) => setFormData({ ...formData, catatanTambahan: e.target.value })}
                placeholder="Tuliskan catatan khusus jika ada (misal: rombongan menggunakan Bus/Microbus, atau rencana kedatangan terlambat, dll.)"
                className="w-full bg-ink-50 border border-ink-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-bold min-h-[100px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-ink-100">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary-900 hover:bg-primary-950 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Konfirmasi</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Summary Card (Read Only) */
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-ink-100 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-[100px] -z-0"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-ink-950">Konfirmasi Berhasil Dikirim</h2>
              <p className="text-xs text-ink-500 font-bold mt-0.5">Terima kasih atas kerja samanya. Berikut ringkasan data kehadiran Anda:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-ink-100">
            <div className="p-4 bg-ink-50 rounded-2xl border border-ink-100">
              <p className="text-[10px] uppercase tracking-widest font-black text-ink-400 mb-1">Status Kehadiran</p>
              <p className={`font-black text-sm ${formData.statusKehadiran === 'HADIR' ? 'text-green-700' : 'text-red-700'}`}>
                {formData.statusKehadiran === "HADIR" ? "YA, KAMI AKAN HADIR" : "BERHALANGAN HADIR"}
              </p>
            </div>

            {formData.statusKehadiran === "HADIR" && (
              <>
                <div className="p-4 bg-ink-50 rounded-2xl border border-ink-100">
                  <p className="text-[10px] uppercase tracking-widest font-black text-ink-400 mb-1">Wali di Acara Utama</p>
                  <p className="font-black text-sm text-ink-950">
                    {formData.jumlahPendamping} Pendamping (Kupon + Kursi)
                  </p>
                </div>

                <div className="p-4 bg-ink-50 rounded-2xl border border-ink-100">
                  <p className="text-[10px] uppercase tracking-widest font-black text-ink-400 mb-1">Total Rombongan Pengantar</p>
                  <p className="font-black text-sm text-ink-950">
                    {formData.totalPengantar} Orang (Termasuk Santri)
                  </p>
                </div>
              </>
            )}

            <div className="p-4 bg-ink-50 rounded-2xl border border-ink-100 md:col-span-2">
              <p className="text-[10px] uppercase tracking-widest font-black text-ink-400 mb-1">Catatan Tambahan</p>
              <p className="font-medium text-sm text-ink-950 whitespace-pre-wrap">
                {formData.catatanTambahan || "-"}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-ink-100">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white hover:bg-ink-50 text-ink-700 border border-ink-200 font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Ubah Konfirmasi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
