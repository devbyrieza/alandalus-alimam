"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  FileText,
  Send,
  Loader2,
  Lock,
  History,
  Copy,
  Building2,
  CreditCard as CreditCardIcon
} from "lucide-react";
import { Alert } from "@/components/ui";
import { formatCurrency } from "@/lib/utils"; // Ensure this utils exists or use Intl locally

export default function DaftarUlangTab() {
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState<any>(null);
  const [historyResult, setHistoryResult] = useState<any[]>([]);

  // Form states
  const [nominal, setNominal] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pernyataan, setPernyataan] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "va">("transfer");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Get User Status
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      const statusRes = await fetch(`/api/pendaftar/status?pendaftar_id=${sessionData.pendaftar_id}`);
      const statusData = await statusRes.json();
      setDataUser(statusData);

      // 2. Get Payment History (Daftar Ulang only)
      // Assuming a generic history endpoint exists or we filter client side
      // Currently allow multiple uploads? API blocks verified but allows pending updates.
      // Let's create a visual for "Sudah Lunas" or "Masih Cicilan".
      // Since API only handles creation, we assume dashboard handles history view?
      // For now, check if "Verified" payment exists.

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTipe = (amount: number) => {
    if (amount >= 8500000) return "LUNAS";
    if (amount >= 4250000) return "CICILAN 50% ATAU LEBIH";
    return "CICILAN DIBAWAH 50%";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pernyataan || !file || !nominal) return;

    const amount = parseInt(nominal.replace(/\D/g, ""));
    if (amount < 4250000) {
      setMessage({ type: "error", text: "Pembayaran cicilan pertama DAFTAR ULANG minimal adalah 50% dari total biaya (Minimal Rp 4.250.000)" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("jenis_pembayaran", "DAFTAR_ULANG");
    formData.append("jumlah", amount.toString());
    formData.append("file", file);

    try {
      const res = await fetch("/api/pembayaran/manual/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal upload");

      setMessage({ type: "success", text: "Bukti pembayaran berhasil dikirim! Menunggu verifikasi admin." });
      setFile(null);
      setNominal("");
      setPernyataan(false);

    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue-600" />
      </div>
    );
  }

  // Cek Status Kelulusan
  const statusKelulusan = dataUser?.hasil_kelulusan?.status;
  const isTestingAccount = dataUser?.nomor_pendaftaran === "ILI2600007";

  if (statusKelulusan !== "LULUS" && !isTestingAccount) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 px-4">
        <div className="bg-slate-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Lock className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-black text-brand-blue-950 mb-2">Belum Tersedia</h2>
        <p className="text-ink-500">
          Menu Daftar Ulang hanya tersedia bagi santri yang dinyatakan <strong>LULUS</strong> seleksi.
          <br />Silakan cek menu <strong>Pengumuman</strong> terlebih dahulu.
        </p>
      </div>
    );
  }

  const numericNominal = parseInt(nominal.replace(/\D/g, "") || "0");
  const tipeBayar = calculateTipe(numericNominal);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-linear-to-br from-brand-blue-700 to-brand-blue-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <CheckCircle className="w-32 h-32" />
        </div>
        <h1 className="text-3xl font-black mb-2 relative z-10 text-white">Daftar Ulang Santri Baru</h1>
        <p className="text-brand-yellow-100 relative z-10 text-lg font-medium">
          Tahap akhir administrasi penerimaan santri baru
        </p>
      </div>

      {/* Info Tagihan */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-brand-blue-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-black text-brand-blue-900 uppercase tracking-wider mb-2">Total Biaya Masuk</h3>
            <div className="text-3xl font-black text-brand-blue-600">Rp 8.500.000</div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-ink-500">Uang Pangkal:</span>
              <span className="font-bold text-ink-800">Rp 7.500.000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-500">SPP Bulan Pertama:</span>
              <span className="font-bold text-ink-800">Rp 1.000.000</span>
            </div>
          </div>
        </div>

        <div className="bg-brand-blue-50 p-6 rounded-xl border border-brand-blue-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-brand-blue-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Info Pembayaran & Metode
            </h3>
            
            {/* Opsi Metode Pembayaran */}
            <div className="grid grid-cols-2 gap-2 mb-4 bg-white p-1 rounded-xl shadow-sm border border-brand-blue-100">
              <button
                onClick={() => setPaymentMethod("transfer")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === "transfer" 
                    ? "bg-brand-blue-600 text-white shadow-md" 
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-4 h-4" /> Transfer Bank
              </button>
              <div
                className="py-2 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 bg-slate-50 border border-slate-100 text-slate-400 opacity-70 cursor-not-allowed relative overflow-hidden"
              >
                <div className="flex items-center gap-1.5"><CreditCardIcon className="w-4 h-4" /> Virtual Account</div>
                <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full leading-none mt-0.5">Segera Hadir</span>
              </div>
            </div>

            {paymentMethod === "transfer" && (
              <div className="mb-4 p-3 bg-white border border-brand-blue-100 rounded-lg animate-in fade-in slide-in-from-top-1">
                <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2 text-left">Rekening Tujuan</p>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="bg-[#009B9B] px-2 py-1 rounded text-[10px] text-white font-black leading-none flex items-center justify-center shadow-sm">BSI</div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Bank Syariah Indonesia</span>
                      </div>
                      <p className="font-black text-brand-blue-950 text-2xl tracking-tight leading-none mb-2">
                        4222224441
                      </p>
                      <p className="text-xs font-bold text-brand-blue-700/70 text-left italic">a.n PP Al-Andalus Al-Imam</p>
                    </div>
                  <button 
                    onClick={() => handleCopy("4222224441")}
                    className="p-2 hover:bg-brand-blue-50 text-brand-blue-600 rounded-lg transition-colors flex flex-col items-center gap-1 group"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    <span className="text-[9px] font-bold">{copied ? "Tersalin!" : "Salin"}</span>
                  </button>
                </div>
              </div>
            )}

            <ul className="text-sm text-brand-blue-700 space-y-1.5 list-disc list-inside font-medium mb-4">
              <li>Dapat dibayar <strong>Lunas</strong> atau <strong>Dicicil</strong>.</li>
              <li>Opsi cicil tahap pertama minimal <strong>50% (Rp 4.250.000)</strong>.</li>
              <li>Sisa cicilan bebas nominal dan bebas berapa kali namun wajib lunas sebelum <strong>Juli 2026</strong>.</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-brand-blue-200">
            <span className="text-xs text-brand-blue-600 block mb-1">Pertanyaan/Konfirmasi Biaya Daftar Ulang?</span>
            <a 
              href="https://wa.me/6281220636945" 
              target="_blank" 
              rel="noreferrer" 
              className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95 group"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Hubungi Finance (081220636945)
            </a>
          </div>
        </div>
      </div>

      {message && (
        <Alert type={message.type} title={message.type === 'success' ? 'Berhasil' : 'Gagal'}>
          {message.text}
        </Alert>
      )}

      {/* Form Upload */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-ink-100 bg-surface-50 flex justify-between items-center">
          <h3 className="font-black text-lg text-ink-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-blue-600" />
            Form Pembayaran & Konfirmasi
          </h3>
          {/* Badge Status Pembayaran User bisa ditaruh sini jika fetch history */}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Input Nominal */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nominal yang Dibayarkan (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
              <input
                type="text"
                value={nominal}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setNominal(new Intl.NumberFormat("id-ID").format(parseInt(val || "0")));
                }}
                className="w-full pl-12 pr-4 py-3 text-lg font-black text-ink-900 border border-ink-300 rounded-xl focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all shadow-inner"
                placeholder="0"
              />
            </div>

            {/* Dynamic Status Badge */}
            {numericNominal > 0 && (
              <div className="mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <span className="text-xs text-ink-500 font-medium">Status Pembayaran Anda akan tercatat sebagai:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${tipeBayar === 'LUNAS' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  tipeBayar.includes('50% ATAU LEBIH') ? 'bg-brand-blue-100 text-brand-blue-700 border-brand-blue-200' :
                    'bg-amber-100 text-amber-700 border-amber-200'
                  }`}>
                  {tipeBayar}
                </span>
              </div>
            )}
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Upload Bukti Transfer
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                {file ? (
                  <>
                    <FileText className="w-8 h-8 text-brand-blue-600" />
                    <span className="font-black text-brand-blue-700">{file.name}</span>
                    <span className="text-xs text-ink-400">Klik untuk ganti file</span>
                  </>
                ) : (
                  <>
                    <Send className="w-8 h-8 text-slate-400" />
                    <span className="font-medium text-slate-600">Klik atau tarik file ke sini</span>
                    <span className="text-xs text-slate-400">Format: JPG, PNG, PDF (Max 5MB)</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Pernyataan */}
          <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
            <input
              type="checkbox"
              checked={pernyataan}
              onChange={(e) => setPernyataan(e.target.checked)}
              className="mt-1 w-5 h-5 text-brand-blue-600 rounded border-ink-300 focus:ring-brand-blue-500"
            />
            <div className="text-sm text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">Konfirmasi Kebenaran Data</span>
              Saya menyatakan bukti transfer yang saya unggah adalah benar dan nominal sesuai dengan yang saya inputkan. Saya bersedia mengikuti aturan pembayaran yang berlaku.
            </div>
          </label>

          <button
            type="submit"
            disabled={submitting || !pernyataan || !file || !nominal}
            className="w-full py-4 bg-brand-yellow-400 hover:bg-brand-yellow-300 text-brand-blue-950 font-black rounded-xl shadow-xl shadow-brand-yellow-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-brand-yellow-500"
          >
            {submitting ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
            {submitting ? "Mengirim Data..." : "Kirim Konfirmasi Daftar Ulang"}
          </button>

        </form>
      </div>
    </div>
  );
}
