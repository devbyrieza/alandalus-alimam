"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CreditCard,
  Building2,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  RefreshCw,
  Copy,
  FileText,
  Image,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Wallet,
  Banknote,
  Shield,
  Calendar,
  Info,
  Phone,
  MessageCircle,
  ArrowRight,
  Check,
  Download,
} from "lucide-react";

// ============================================
// TYPES
// ============================================

type PaymentStatus = "unpaid" | "pending" | "verified" | "rejected" | "expired";

interface PembayaranData {
  id: string;
  metode_pembayaran: string;
  jumlah: number;
  status_pembayaran: string;
  bukti_transfer_path?: string;
  bukti_transfer_filename?: string;
  midtrans_order_id?: string;
  midtrans_payment_type?: string;
  verified_at?: string;
  catatan_verifikasi?: string;
  created_at: string;
  updated_at: string;
}

interface PaymentStatusResponse {
  pendaftar: {
    id: string;
    nomor_pendaftaran: string;
    nama_lengkap: string;
    status_pendaftaran: string;
  };
  tahun_ajaran: {
    id: string;
    nama: string;
    biaya_pendaftaran: number;
    tanggal_tutup_pendaftaran: string;
  };
  pembayaran: PembayaranData | null;
  status: PaymentStatus;
  deadline: string;
  is_deadline_passed: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const BANK_INFO = {
  nama_bank: "BSI (Bank Syariah Indonesia)",
  nomor_rekening: "4222224441",
  atas_nama: "Ponpes Al-Imam Al-Islami",
  kode_bank: "451",
};

const STATUS_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: any;
    description: string;
  }
> = {
  unpaid: {
    label: "Menunggu Pembayaran",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: Clock,
    description: "Silakan lakukan pembayaran untuk melanjutkan pendaftaran",
  },
  pending: {
    label: "Menunggu Verifikasi",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: Clock,
    description: "Pembayaran sedang diverifikasi oleh tim kami (1x24 jam)",
  },
  verified: {
    label: "Pembayaran Terverifikasi",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: CheckCircle,
    description: "Alhamdulillah! Pembayaran Anda telah terverifikasi",
  },
  rejected: {
    label: "Pembayaran Ditolak",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: XCircle,
    description: "Mohon upload ulang bukti pembayaran yang valid",
  },
  expired: {
    label: "Batas Waktu Habis",
    color: "text-stone-700",
    bgColor: "bg-surface-200",
    borderColor: "border-stone-200",
    icon: AlertCircle,
    description: "Maaf, batas waktu pembayaran telah berakhir",
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ============================================
// COPY BUTTON COMPONENT
// ============================================

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-ink-200 hover:bg-surface-50 text-ink-600 text-xs font-bold rounded-lg transition-all active:scale-95 shadow-sm"
      title={`Salin ${label}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-emerald-600">Disalin</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Salin</span>
        </>
      )}
    </button>
  );
}

// ============================================
// TIMELINE COMPONENT
// ============================================

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

function PaymentTimeline({ paymentStatus }: { paymentStatus: PaymentStatus }) {
  const steps: TimelineStep[] = [
    {
      id: 1,
      title: "Upload Bukti",
      description: "Kirim bukti transfer",
      status: paymentStatus === "unpaid" || paymentStatus === "expired" ? "current" : "completed",
    },
    {
      id: 2,
      title: "Verifikasi Admin",
      description: "Pemeriksaan 1x24 jam",
      status:
        paymentStatus === "pending"
          ? "current"
          : paymentStatus === "verified"
            ? "completed"
            : paymentStatus === "rejected"
              ? "current"
              : "upcoming",
    },
    {
      id: 3,
      title: "Selesai",
      description: "Pembayaran valid",
      status: paymentStatus === "verified" ? "completed" : "upcoming",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-surface-200 -z-10 rounded-full" />
      <div className="flex justify-between items-start">
        {steps.map((step, index) => {
          let statusColor = "bg-surface-100 border-surface-300 text-ink-300"; // default upcoming
          if (step.status === "completed") statusColor = "bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/30";
          if (step.status === "current") statusColor = "bg-white border-teal-500 text-teal-600 shadow-lg shadow-teal-500/20";

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500 z-10 ${statusColor}`}>
                {step.status === "completed" ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-black">{step.id}</span>
                )}
              </div>
              <div className="mt-3 text-center">
                <p className={`text-xs font-bold transition-colors ${step.status === "upcoming" ? "text-ink-300" : "text-ink-900"}`}>{step.title}</p>
                <p className="text-[10px] text-ink-400 mt-0.5 font-medium hidden sm:block">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

// ============================================
// UPLOAD AREA COMPONENT
// ============================================

interface UploadAreaProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
  uploadProgress: number;
  currentFile?: { name: string; path: string } | null;
  isRejected?: boolean;
}

function UploadArea({
  onUpload,
  isUploading,
  uploadProgress,
  currentFile,
  isRejected,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onUpload(files[0]);
      }
    },
    [onUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onUpload(files[0]);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onUpload]
  );

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Current file info */}
      {currentFile && !isRejected && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-blue-100 shadow-sm">
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-0.5">File Terupload</p>
            <p className="font-bold text-ink-900 truncate">{currentFile.name}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Check className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      )}

      {/* Upload area */}
      <div
        className={`relative overflow-hidden group border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${isDragging
          ? "border-teal-500 bg-teal-50/50"
          : isRejected
            ? "border-red-300 bg-red-50 hover:border-red-400"
            : "border-ink-200 hover:border-teal-400 hover:bg-surface-50"
          } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,application/pdf"
          onChange={handleFileSelect}
        />

        <div className="flex flex-col items-center gap-5 relative z-10">
          {isUploading ? (
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-teal-100 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-teal-600">{uploadProgress}%</span>
              </div>
            </div>
          ) : (
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isRejected
                ? "bg-red-100 text-red-600"
                : "bg-teal-50 text-teal-600"
                }`}
            >
              <Upload className="w-8 h-8" />
            </div>
          )}

          <div>
            <p className={`font-bold text-lg ${isRejected ? "text-red-700" : "text-ink-900"}`}>
              {isRejected
                ? "Upload Ulang Bukti Transfer"
                : currentFile
                  ? "Ganti Bukti Transfer"
                  : "Klik atau Seret File ke Sini"}
            </p>
            <p className="text-sm text-ink-500 mt-1 font-medium">
              Format: JPG, PNG, atau PDF (Maks. 2MB)
            </p>
          </div>
        </div>

        {/* Progress bar background for visual feedback */}
        {isUploading && (
          <div className="absolute bottom-0 left-0 h-1 bg-teal-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
        )}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PembayaranPendaftaranTab({
  view = "payment",
}: {
  view?: "payment" | "status";
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaymentStatusResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMidtransLoading, setIsMidtransLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [activePaymentMethod, setActivePaymentMethod] = useState<
    "midtrans" | "manual" | null
  >(null);

  // Fetch payment status
  const fetchPaymentStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/pembayaran/status");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Gagal memuat data pembayaran");
      }

      setData(result.data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaymentStatus();
  }, [fetchPaymentStatus]);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleManualUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      if (file.size > 2 * 1024 * 1024) throw new Error("Ukuran file terlalu besar! Maksimal 2MB");
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) throw new Error("Format file tidak didukung! Gunakan JPG, PNG, atau PDF");

      const formData = new FormData();
      formData.append("file", file);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => (prev >= 90 ? prev : prev + 10));
      }, 200);

      const response = await fetch("/api/pembayaran/manual/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (!result.success) throw new Error(result.error || "Gagal mengupload bukti pembayaran");

      showToast("success", "Bukti pembayaran berhasil diupload!");
      setActivePaymentMethod(null); // Close modal/section
      await fetchPaymentStatus();
    } catch (err: any) {
      showToast("error", err.message || "Gagal mengupload file");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleMidtransPayment = async () => {
    try {
      setIsMidtransLoading(true);
      const response = await fetch("/api/pembayaran/midtrans/create", { method: "POST" });
      const result = await response.json();

      if (!result.success) throw new Error(result.error || "Gagal membuat transaksi");

      if (result.data.redirect_url) {
        window.location.href = result.data.redirect_url;
      } else if (result.data.snap_token && (window as any).snap) {
        (window as any).snap.pay(result.data.snap_token, {
          onSuccess: () => {
            showToast("success", "Pembayaran berhasil!");
            fetchPaymentStatus();
          },
          onPending: () => {
            showToast("info", "Pembayaran pending. Silakan selesaikan pembayaran.");
            fetchPaymentStatus();
          },
          onError: () => {
            showToast("error", "Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            showToast("info", "Anda menutup popup pembayaran.");
          },
        });
      } else {
        throw new Error("Tidak dapat membuka halaman pembayaran");
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memproses pembayaran");
    } finally {
      setIsMidtransLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-teal-500 animate-spin mb-4" />
        <p className="text-ink-500 font-medium">Memuat data pembayaran...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center max-w-lg mx-auto">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-red-900 mb-2">Gagal Memuat Data</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button onClick={fetchPaymentStatus} className="btn-primary bg-red-600 hover:bg-red-700 shadow-red-500/20">
          <RefreshCw className="w-4 h-4 mr-2" /> Coba Lagi
        </button>
      </div>
    );
  }

  if (!data) return null;

  // Treat "expired" as "unpaid" for UI so user can tetap bayar
  const effectiveStatus =
    data.status === "expired" ? ("unpaid" as PaymentStatus) : data.status;

  // Hard-set biaya pendaftaran sesuai ketentuan (Rp 200.000)
  const biayaPendaftaran = 200_000;

  const statusConfig = STATUS_CONFIG[effectiveStatus];
  const StatusIcon = statusConfig.icon;
  const daysRemaining = Math.max(0, getDaysRemaining(data.deadline));
  const isPaymentCompleted = effectiveStatus === "verified";
  const isPaymentPending = effectiveStatus === "pending";
  const isPaymentRejected = effectiveStatus === "rejected";
  const canMakePayment =
    effectiveStatus === "unpaid" ||
    effectiveStatus === "rejected" ||
    data.status === "expired";

  const isStatusOnly = view === "status";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-clay-lg flex items-center gap-3 animate-in slide-in-from-right duration-300 ${toast.type === "success" ? "bg-emerald-500" : toast.type === "error" ? "bg-red-500" : "bg-blue-500"
          } text-white shadow-lg`}>
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:bg-white/20 p-1 rounded-lg">&times;</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-600 to-emerald-800 p-8 md:p-10 text-white shadow-xl shadow-teal-900/10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              {isStatusOnly ? (
                <Shield className="w-8 h-8 text-white" />
              ) : (
                <CreditCard className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black mb-2 tracking-tight text-white">
                {isStatusOnly ? "Status Pembayaran" : "Pembayaran Pendaftaran"}
              </h1>
              <p className="text-emerald-50 font-medium max-w-lg">
                {isStatusOnly
                  ? "Lihat status verifikasi pembayaran Anda dan riwayat bukti transfer."
                  : "Selesaikan pembayaran untuk membuka akses pengisian data santri lengkap."}
              </p>
            </div>
          </div>
          <button
            onClick={fetchPaymentStatus}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Status Card */}
          <div className="glass-panel p-8 rounded-[2rem] shadow-clay-md relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-2 h-full ${statusConfig.bgColor.replace("bg-", "bg-")}`} /> {/* Accent Bar */}

            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold text-ink-400 uppercase tracking-widest mb-1">Status Pembayaran</p>
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
                  <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                  <span className={`font-black text-lg ${statusConfig.color}`}>{statusConfig.label}</span>
                </div>
              </div>

              {!data.is_deadline_passed && daysRemaining > 0 && !isPaymentCompleted && (
                <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-500 uppercase">Sisa Waktu</p>
                    <p className="text-amber-800 font-bold">{daysRemaining} Hari Lagi</p>
                  </div>
                </div>
              )}
              {data.is_deadline_passed && !isPaymentCompleted && (
                <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-500 uppercase">Masa Pembayaran Terlewati</p>
                    <p className="text-amber-800 font-bold">Silakan selesaikan pembayaran secepatnya.</p>
                  </div>
                </div>
              )}
            </div>

            <PaymentTimeline paymentStatus={data.status} />

            {isPaymentRejected && data.pembayaran?.catatan_verifikasi && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Pembayaran Ditolak</h4>
                  <p className="text-red-700 text-sm leading-relaxed">{data.pembayaran.catatan_verifikasi}</p>
                </div>
              </div>
            )}

            {/* Ringkasan pembayaran (khusus halaman Status Pembayaran) */}
            {isStatusOnly && (
              <div className="mt-8 bg-white border border-ink-100 rounded-2xl p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-widest">Nomor Pendaftaran</p>
                    <p className="font-black text-ink-900">{data.pendaftar.nomor_pendaftaran}</p>
                    <p className="text-sm text-ink-500 mt-1">{data.pendaftar.nama_lengkap}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-ink-400 uppercase tracking-widest">Metode</p>
                    <p className="font-black text-ink-900">{data.pembayaran?.metode_pembayaran || "-"}</p>
                    <p className="text-sm text-ink-500 mt-1">
                      {data.pembayaran?.updated_at ? `Update: ${formatDateTime(data.pembayaran.updated_at)}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Manual Transfer Instructions (hanya di halaman Pembayaran) */}
          {!isStatusOnly && canMakePayment && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-ink-900 px-2">Pilih Metode Pembayaran</h3>
                <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg font-bold text-sm border border-emerald-200">
                  Total: Rp 200.000
                </div>
              </div>


              {/* OPTION 1: MIDTRANS (DEV) */}
              <div
                className={`glass-panel p-6 rounded-[2rem] border transition-all cursor-pointer hover:border-indigo-300 hover:shadow-indigo-500/10 group ${activePaymentMethod === 'midtrans' ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-white/50'}`}
                onClick={() => setActivePaymentMethod(prev => prev === 'midtrans' ? null : 'midtrans')}
              >
                <div className="flex items-center justify-between relative overflow-hidden">
                  {/* DEV BADGE */}
                  <div className="absolute -top-3 -right-3 bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-amber-200 shadow-sm z-10">
                    Tahap Pengembangan
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      <span className="font-black text-xl text-indigo-300">1</span>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-ink-900 text-lg">Virtual Account / QRIS</h4>
                        <span className="bg-ink-100 text-ink-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Otomatis</span>
                      </div>
                      <p className="text-sm text-ink-500 font-medium">BCA, BNI, BRI, Mandiri & QRIS</p>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activePaymentMethod === 'midtrans' ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-ink-200'}`}>
                    {activePaymentMethod === 'midtrans' && <Check className="w-4 h-4" />}
                  </div>
                </div>

                {activePaymentMethod === 'midtrans' && (
                  <div className="mt-6 pt-6 border-t border-ink-100/50">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 flex gap-3">
                      <Info className="w-5 h-5 text-amber-600 shrink-0" />
                      <p className="text-sm text-amber-800">
                        <strong>Fitur Belum Siap:</strong> Metode pembayaran ini sedang dalam tahap pengembangan. Silakan gunakan Opsi 2 (Transfer Manual) untuk saat ini.
                      </p>
                    </div>

                    <p className="text-sm text-ink-600 mb-4 leading-relaxed opacity-50">
                      Metode ini mendukung Virtual Account (BCA, BNI, BRI, Mandiri) dan QRIS. Pembayaran akan terverifikasi secara otomatis tanpa perlu upload bukti.
                    </p>
                    <button
                      onClick={handleMidtransPayment}
                      disabled={true} // DISABLED FOR DEV
                      className="w-full py-4 bg-indigo-600/50 text-white rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Loader2 className="w-5 h-5 animate-spin hidden" />
                      <Wallet className="w-5 h-5" />
                      <span>Bayar via Midtrans (Coming Soon)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* OPTION 2: MANUAL TRANSFER */}
              <div
                className={`glass-panel p-6 rounded-[2rem] border transition-all cursor-pointer hover:border-teal-300 hover:shadow-teal-500/10 group ${activePaymentMethod === 'manual' ? 'border-teal-500 ring-4 ring-teal-500/10' : 'border-white/50'}`}
                onClick={() => setActivePaymentMethod(prev => prev === 'manual' ? null : 'manual')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <span className="font-black text-xl text-teal-600">2</span>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-ink-900 text-lg">Transfer Manual (BSI)</h4>
                        <span className="bg-teal-100 text-teal-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Rekomendasi</span>
                      </div>
                      <p className="text-sm text-ink-500 font-medium">Transfer ke Rekening Pesantren</p>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activePaymentMethod === 'manual' ? 'border-teal-500 bg-teal-500 text-white' : 'border-ink-200'}`}>
                    {activePaymentMethod === 'manual' && <Check className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Content */}
                {activePaymentMethod === 'manual' && (
                  <div className="mt-6 pt-6 border-t border-ink-100/50 animate-in slide-in-from-top-2">
                    <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl p-6 mb-6 shadow-sm">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          {/* Bank Logo Placeholder if needed */}
                          <div className="bg-white p-2 rounded-lg border border-ink-100">
                            <Building2 className="w-6 h-6 text-teal-700" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-ink-400 uppercase tracking-widest">Bank Tujuan</p>
                            <h4 className="font-black text-xl text-ink-900">{BANK_INFO.nama_bank}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-xl border border-teal-200 mb-4 shadow-sm gap-4">
                        <div className="text-center sm:text-left w-full">
                          <p className="text-xs text-ink-400 mb-1">Nomor Rekening</p>
                          <p className="font-mono text-2xl sm:text-3xl font-black text-teal-700 tracking-wider">{BANK_INFO.nomor_rekening}</p>
                          <p className="text-xs font-bold text-ink-500 mt-1">a.n {BANK_INFO.atas_nama}</p>
                        </div>
                        <CopyButton text={BANK_INFO.nomor_rekening} label="No. Rekening" />
                      </div>

                      <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                          <strong>Penting:</strong> Pastikan nominal transfer sesuai tagihan <strong>(Rp 200.000)</strong>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-bold text-ink-900 flex items-center gap-2 text-lg">
                        <Upload className="w-5 h-5 text-teal-600" />
                        Upload Bukti Transfer
                      </h5>
                      <UploadArea
                        onUpload={handleManualUpload}
                        isUploading={isUploading}
                        uploadProgress={uploadProgress}
                        currentFile={data.pembayaran?.bukti_transfer_filename ? { name: data.pembayaran.bukti_transfer_filename, path: '' } : null}
                        isRejected={isPaymentRejected}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Success View (hanya di halaman Pembayaran) */}
          {!isStatusOnly && isPaymentCompleted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-[2rem] p-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-emerald-900 mb-2">Pembayaran Lunas</h3>
              <p className="text-emerald-700 max-w-md mx-auto mb-8">
                Terima kasih telah melakukan pembayaran. Anda sekarang dapat melanjutkan ke tahap berikutnya yaitu mengisi formulir data diri lengkap.
              </p>
              <div className="flex justify-center">
                <a
                  href="/dashboard/pendaftar/kelengkapan-berkas"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span>Lanjut Isi Data Diri</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}

          {/* Status-only helper (jika belum bayar) */}
          {isStatusOnly && !isPaymentCompleted && (
            <div className="bg-white border border-ink-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-black text-ink-900 text-lg mb-1">Lakukan Pembayaran di Halaman Pembayaran</h3>
                <p className="text-sm text-ink-500">
                  Untuk upload bukti transfer atau memilih metode pembayaran, silakan buka menu <strong>Pembayaran</strong>.
                </p>
              </div>
              <a
                href="/dashboard/pendaftar/pembayaran-pendaftaran"
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>Ke Halaman Pembayaran</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[2rem] shadow-clay-sm border border-white/50">
            <h3 className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-600" />
              Rincian Biaya
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-500 font-medium">Biaya Pendaftaran</span>
                <span className="font-bold text-ink-900">{formatRupiah(biayaPendaftaran)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-500 font-medium">Biaya Admin</span>
                <span className="font-bold text-ink-900">Rp 0</span>
              </div>
              <div className="h-px bg-ink-100 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-ink-900 font-bold">Total Pembayaran</span>
                <span className="text-xl font-black text-teal-600">{formatRupiah(biayaPendaftaran)}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-100 rounded-[2rem] p-6 border border-white/50">
            <h4 className="font-bold text-ink-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-ink-400" />
              Bantuan Pembayaran
            </h4>
            <p className="text-sm text-ink-500 mb-4 leading-relaxed">
              Mengalami kendala saat melakukan pembayaran? Hubungi tim support kami.
            </p>
            <a href="https://wa.me/6285888871997" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-ink-100 hover:border-teal-200 transition-colors group">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink-400 uppercase">WhatsApp Admin</p>
                <p className="font-bold text-ink-900 text-sm">+62 858-8887-1997</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
