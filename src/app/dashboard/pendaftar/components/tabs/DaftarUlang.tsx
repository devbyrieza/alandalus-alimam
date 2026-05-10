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
  CreditCard as CreditCardIcon,
  MessageCircle,
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
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "va">(
    "transfer",
  );
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

      const statusRes = await fetch(
        `/api/pendaftar/status?pendaftar_id=${sessionData.pendaftar_id}`,
      );
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
      setMessage({
        type: "error",
        text: "Pembayaran cicilan pertama DAFTAR ULANG minimal adalah 50% dari total biaya (Minimal Rp 4.250.000)",
      });
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

      setMessage({
        type: "success",
        text: "Bukti pembayaran berhasil dikirim! Menunggu verifikasi admin.",
      });
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
        <Loader2 className="w-8 h-8 animate-spin text-maroon-600" />
      </div>
    );
  }

  // Cek Status Kelulusan untuk Akses Daftar Ulang
  const statusProses = dataUser?.status_proses;
  const isTestingAccount = dataUser?.nomor_pendaftaran === "ILI2600007";
  const canAccess =
    statusProses === "accepted" ||
    statusProses === "enrolled" ||
    isTestingAccount;

  if (!canAccess) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 px-4">
        <div className="bg-slate-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Lock className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-black text-maroon-950 mb-2">
          Belum Tersedia
        </h2>
        <p className="text-ink-500">
          Menu Daftar Ulang hanya tersedia bagi santri yang dinyatakan{" "}
          <strong>LULUS</strong> seleksi.
          <br />
          Silakan cek menu <strong>Pengumuman</strong> terlebih dahulu.
        </p>
      </div>
    );
  }

  const numericNominal = parseInt(nominal.replace(/\D/g, "") || "0");
  const tipeBayar = calculateTipe(numericNominal);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-linear-to-br from-maroon-700 to-maroon-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <CheckCircle className="w-32 h-32" />
        </div>
        <h1 className="text-3xl font-black mb-2 relative z-10 text-white">
          Daftar Ulang Santri Baru
        </h1>
        <p className="text-gold-100 relative z-10 text-lg font-medium">
          Tahap akhir administrasi penerimaan santri baru
        </p>
      </div>

      {/* Info Tagihan */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-maroon-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-black text-maroon-900 uppercase tracking-wider mb-2">
              Total Biaya Masuk
            </h3>
            <div className="text-3xl font-black text-maroon-600">
              Rp 8.500.000
            </div>
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

        <div className="bg-maroon-50 p-6 rounded-xl border border-maroon-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-maroon-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Info Pembayaran & Metode
            </h3>

            {/* Opsi Metode Pembayaran */}
            <div className="grid grid-cols-2 gap-2 mb-4 bg-white p-1 rounded-xl shadow-sm border border-maroon-100">
              <button
                onClick={() => setPaymentMethod("transfer")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === "transfer"
                    ? "bg-maroon-600 text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-4 h-4" /> Transfer Bank
              </button>
              <div className="py-2 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 bg-slate-50 border border-slate-100 text-slate-400 opacity-70 cursor-not-allowed relative overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <CreditCardIcon className="w-4 h-4" /> Virtual Account
                </div>
                <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full leading-none mt-0.5">
                  Segera Hadir
                </span>
              </div>
            </div>

            {paymentMethod === "transfer" && (
              <div className="mb-4 p-3 bg-white border border-maroon-100 rounded-lg animate-in fade-in slide-in-from-top-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2 text-left">
                      Rekening Tujuan
                    </p>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="bg-[#009B9B] px-2 py-1 rounded text-[10px] text-white font-black leading-none flex items-center justify-center shadow-sm">
                        BSI
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Bank Syariah Indonesia
                      </span>
                    </div>
                    <p className="font-black text-maroon-950 text-2xl tracking-tight leading-none mb-2">
                      4222224441
                    </p>
                    <p className="text-xs font-bold text-maroon-700/70 text-left italic">
                      a.n PP Al Andalus Al Imam
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy("4222224441")}
                    className="p-2 hover:bg-maroon-50 text-maroon-600 rounded-lg transition-colors flex flex-col items-center gap-1 group"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-[9px] font-bold">
                      {copied ? "Tersalin!" : "Salin"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <ul className="text-sm text-maroon-700 space-y-1.5 list-disc list-inside font-medium mb-4">
              <li>
                Dapat dibayar <strong>Lunas</strong> atau{" "}
                <strong>Dicicil</strong>.
              </li>
              <li>
                Opsi cicil tahap pertama minimal{" "}
                <strong>50% (Rp 4.250.000)</strong>.
              </li>
              <li>
                Sisa cicilan bebas nominal dan bebas berapa kali namun wajib
                lunas sebelum <strong>Juli 2026</strong>.
              </li>
              <li className="text-emerald-700 font-bold">
                Tersedia kebijakan <strong>Keringanan Khusus</strong> bagi wali santri yang membutuhkan.
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-maroon-200">
            <span className="text-xs text-maroon-600 block mb-2 leading-tight">
              Butuh bantuan, keringanan, atau konfirmasi biaya?
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <a
                href="https://wa.me/6281220636945?text=Assalamualaikum%20Admin%20Finance%2C%20saya%20wali%20dari%20calon%20santri%20ingin%20berkonsultasi%2Fmengajukan%20keringanan%20terkait%20biaya%20Daftar%20Ulang."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[11px] sm:text-xs transition-all shadow-md hover:shadow-lg active:scale-95 group"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>Finance</span>
              </a>
              <a
                href="https://wa.me/6285111524441?text=Assalamualaikum%20Admin%20CS%2C%20saya%20wali%20dari%20calon%20santri%20ingin%20bertanya%20terkait%20biaya%20Daftar%20Ulang."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-[11px] sm:text-xs transition-all shadow-md hover:shadow-lg active:scale-95 group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Admin CS</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <Alert
          type={message.type}
          title={message.type === "success" ? "Berhasil" : "Gagal"}
        >
          {message.text}
        </Alert>
      )}

      {message && message.type === "success" && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h4 className="font-black text-emerald-900 mb-1 text-base">
              Ingin Verifikasi Lebih Cepat?
            </h4>
            <p className="text-emerald-700 text-sm leading-relaxed">
              Anda bisa menghubungi CS di nomor{" "}
              <a
                href="https://wa.me/6285111524441"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black underline hover:text-emerald-900 transition-colors"
              >
                0851-1152-4441
              </a>{" "}
              jika ingin cepat diverifikasi.
            </p>
          </div>
        </div>
      )}

      {/* Form Upload */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-ink-100 bg-surface-50 flex justify-between items-center">
          <h3 className="font-black text-lg text-ink-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-maroon-600" />
            Form Pembayaran & Konfirmasi
          </h3>
          {/* Badge Status Pembayaran User bisa ditaruh sini jika fetch history */}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Opsi Pembayaran Langsung */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Metode Pelunasan Daftar Ulang
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setNominal(new Intl.NumberFormat("id-ID").format(8500000))
                }
                className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col ${
                  numericNominal === 8500000
                    ? "border-maroon-500 bg-maroon-50/50 ring-2 ring-maroon-500/20 shadow-md"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-black text-slate-900">
                    Bayar Lunas
                  </span>
                  {numericNominal === 8500000 ? (
                    <CheckCircle className="w-5 h-5 text-maroon-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 leading-tight">
                  Pelunasan sekaligus seluruh biaya administrasi.
                </span>
                <span className="text-sm font-black text-maroon-600 mt-2">
                  Rp 8.500.000
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setNominal(new Intl.NumberFormat("id-ID").format(4250000))
                }
                className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col ${
                  numericNominal >= 4250000 && numericNominal < 8500000
                    ? "border-maroon-500 bg-maroon-50/50 ring-2 ring-maroon-500/20 shadow-md"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-black text-slate-900">
                    Bayar Dicicil
                  </span>
                  {numericNominal >= 4250000 && numericNominal < 8500000 ? (
                    <CheckCircle className="w-5 h-5 text-maroon-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 leading-tight">
                  Pembayaran bertahap minimal 50% di awal.
                </span>
                <span className="text-sm font-black text-maroon-600 mt-2">
                  Min. Rp 4.250.000
                </span>
              </button>
            </div>
          </div>

          {/* Input Nominal */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nominal yang Dibayarkan (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                Rp
              </span>
              <input
                type="text"
                value={nominal}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setNominal(
                    new Intl.NumberFormat("id-ID").format(parseInt(val || "0")),
                  );
                }}
                className="w-full pl-12 pr-4 py-3 text-lg font-black text-ink-900 border border-ink-300 rounded-xl focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 transition-all shadow-inner"
                placeholder="0"
              />
            </div>

            {/* Dynamic Status Badge */}
            {numericNominal > 0 && (
              <div className="mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <span className="text-xs text-ink-500 font-medium">
                  Status Pembayaran Anda akan tercatat sebagai:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black border ${
                    tipeBayar === "LUNAS"
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : tipeBayar.includes("50% ATAU LEBIH")
                        ? "bg-maroon-100 text-maroon-700 border-maroon-200"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                  }`}
                >
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
                    <FileText className="w-8 h-8 text-maroon-600" />
                    <span className="font-black text-maroon-700">
                      {file.name}
                    </span>
                    <span className="text-xs text-ink-400">
                      Klik untuk ganti file
                    </span>
                  </>
                ) : (
                  <>
                    <Send className="w-8 h-8 text-slate-400" />
                    <span className="font-medium text-slate-600">
                      Klik atau tarik file ke sini
                    </span>
                    <span className="text-xs text-slate-400">
                      Format: JPG, PNG, PDF (Max 5MB)
                    </span>
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
              className="mt-1 w-5 h-5 text-maroon-600 rounded border-ink-300 focus:ring-maroon-500"
            />
            <div className="text-sm text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">
                Konfirmasi Kebenaran Data
              </span>
              Saya menyatakan bukti transfer yang saya unggah adalah benar dan
              nominal sesuai dengan yang saya inputkan. Saya bersedia mengikuti
              aturan pembayaran yang berlaku.
            </div>
          </label>

          <button
            type="submit"
            disabled={submitting || !pernyataan || !file || !nominal}
            className="w-full py-4 bg-gold-400 hover:bg-gold-300 text-maroon-950 font-black rounded-xl shadow-xl shadow-gold-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-gold-500"
          >
            {submitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {submitting ? "Mengirim Data..." : "Kirim Konfirmasi Daftar Ulang"}
          </button>
        </form>
      </div>
    </div>
  );
}
