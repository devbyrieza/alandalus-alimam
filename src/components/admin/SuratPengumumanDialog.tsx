"use client";

import { CheckCircle2, FileText, GraduationCap, Loader2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface PendaftarRingkas {
  id: string;
  nama_lengkap: string;
  nomor_pendaftaran: string;
  jenjang?: string;
}

/**
 * Dialog "Upload Surat Pengumuman Resmi":
 * Admin mengunggah file PDF/Scan surat hasil seleksi resmi yang sudah dibuat manual oleh panitia.
 * File ini yang menjadi dokumen resmi yang diunduh pendaftar di portal santri.
 */
export function SuratPengumumanDialog({
  pendaftar,
  onClose,
  onDone,
}: {
  pendaftar: PendaftarRingkas;
  initialTab?: "upload";
  onClose: () => void;
  onDone?: () => void;
}) {
  const isDaftarMA =
    (pendaftar.nomor_pendaftaran || "").toUpperCase().startsWith("MA") ||
    (pendaftar.jenjang || "").toUpperCase().includes("MA") ||
    (pendaftar.jenjang || "").toUpperCase().includes("SMA");

  const defaultKelas = (() => {
    const j = (pendaftar.jenjang || "").toUpperCase();
    if (j.includes("IL")) return "IL Putri";
    if (j.includes("MA") || j.includes("SMA")) return "X MA Putri";
    return "VII MTs Putri";
  })();

  const [file, setFile] = useState<File | null>(null);
  const [nomorSurat, setNomorSurat] = useState("");
  const [kelas, setKelas] = useState(defaultKelas);
  const [kirimWa, setKirimWa] = useState(true);
  const [uploading, setUploading] = useState(false);

  const isDialihkanKeIL = isDaftarMA && kelas.toUpperCase().includes("IL");

  // Body Scroll Lock (Mandatory UX Rule)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow || "unset";
    };
  }, []);

  async function handleUpload() {
    if (!file) {
      Swal.fire(
        "Pilih File Surat",
        "Silakan pilih file PDF surat pengumuman resmi yang akan diunggah.",
        "warning"
      );
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("pendaftar_id", pendaftar.id);
      fd.append("nomor_surat", nomorSurat.trim());
      fd.append("kelas_diterima", kelas);
      fd.append("kirim_wa", String(kirimWa));
      fd.append("file", file);

      const res = await fetch("/api/admin/surat-pengumuman/upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal upload");

      await Swal.fire(
        "Alhamdulillah, Tersimpan!",
        `Surat resmi berhasil dipublikasikan untuk ${pendaftar.nama_lengkap}${json.data?.wa_sent ? " dan telah dikirimkan ke WhatsApp" : ""}.`,
        "success"
      );
      onDone?.();
      onClose();
    } catch (e: any) {
      Swal.fire("Gagal", e.message, "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      data-modal="true"
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-start md:items-center pt-8 md:pt-0 pb-16 md:pb-0 justify-center bg-black/60 p-4 overflow-y-auto overscroll-contain custom-scrollbar backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-stone-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-stone-100 bg-stone-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-800">
                PSB 2027/2028
              </span>
              <h3 className="text-xl font-black text-stone-900 tracking-tight font-display">
                Upload Surat Pengumuman Resmi
              </h3>
            </div>
            <p className="text-sm font-semibold text-stone-600 mt-1">
              {pendaftar.nama_lengkap} <span className="text-stone-400">•</span>{" "}
              {pendaftar.nomor_pendaftaran}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-200/60 rounded-full transition-colors text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-emerald-950 text-sm leading-relaxed flex items-start gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl shrink-0 mt-0.5">
              <Upload className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-bold text-emerald-900 mb-0.5">
                Surat Keputusan Resmi (Format PDF)
              </p>
              <p className="text-xs text-emerald-800">
                Unggah file PDF surat pengumuman hasil seleksi yang sudah dibuat rapi oleh Panitia
                (lengkap dengan kop surat, tanda tangan Mudir, dan stempel). File asli ini yang akan
                langsung diunduh santri/wali di portal pendaftar.
              </p>
            </div>
          </div>

          {/* Quick Selector Kelas untuk Jalur MA */}
          {isDaftarMA ? (
            <div className="p-4 bg-stone-50 border border-stone-200/80 rounded-2xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary-700" />
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Kelas Kelulusan yang Diterima
                  </span>
                </div>
                {isDialihkanKeIL && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1 shadow-xs">
                    ⚡ Pengalihan MA ➔ IL
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setKelas("X MA Putri")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    kelas === "X MA Putri"
                      ? "bg-primary-50/80 border-primary-500 ring-2 ring-primary-500/20 shadow-xs"
                      : "bg-white border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-stone-900">X MA Putri</span>
                    {kelas === "X MA Putri" && (
                      <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Lulus Langsung MA Putri (Bahasa Arab Lulus)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setKelas("IL Putri")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    kelas === "IL Putri"
                      ? "bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 shadow-xs"
                      : "bg-white border-stone-200 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-stone-900">IL Putri (I&apos;dad Lughowi)</span>
                    {kelas === "IL Putri" && (
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Matrikulasi Persiapan Bahasa Arab 1 Tahun
                  </p>
                </button>
              </div>

              {isDialihkanKeIL && (
                <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                  <span className="text-base leading-none">💡</span>
                  <div>
                    <p className="font-bold">Otomatis Sinkronisasi Jenjang &amp; Catatan Kelulusan</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Santri mendaftar di jalur MA tetapi diterima di <b>I&apos;dad Lughowi (IL Putri)</b>.
                      Saat disimpan, sistem akan otomatis mengubah data jenjang menjadi <code>IL</code> di database agar kuota santri sinkron.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-xs font-bold text-stone-700 block">
              Nomor Surat (Opsional)
              <input
                value={nomorSurat}
                onChange={(e) => setNomorSurat(e.target.value)}
                placeholder="Nomor surat resmi panitia"
                className="mt-1 w-full border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </label>

            <label className="text-xs font-bold text-stone-700 block">
              Kelas Diterima
              <input
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Contoh: VII MTs"
                className="mt-1 w-full border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </label>
          </div>

          <label className="text-xs font-bold text-stone-700 block">
            File Surat Pengumuman Resmi (PDF / JPG / PNG) <span className="text-red-500">*</span>
            <div className="mt-1 border-2 border-dashed border-stone-300 hover:border-primary-500 rounded-2xl p-6 text-center transition-all bg-stone-50/50 hover:bg-primary-50/20 cursor-pointer relative">
              <input
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 mx-auto text-stone-400 mb-2" />
              {file ? (
                <div>
                  <p className="text-sm font-bold text-emerald-700">{file.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Ukuran: {(file.size / 1024).toFixed(1)} KB — Klik untuk mengganti file
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-bold text-stone-700">
                    Klik atau seret file PDF surat resmi ke sini
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Format yang didukung: .pdf, .jpg, .png (Maksimal 10MB)
                  </p>
                </div>
              )}
            </div>
          </label>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 flex items-center justify-between">
            <label className="flex items-center gap-3 text-sm font-semibold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={kirimWa}
                onChange={(e) => setKirimWa(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 accent-primary-600 focus:ring-primary-500 cursor-pointer"
              />
              <span>Kirim surat pengumuman langsung ke WhatsApp pendaftar via Wablas</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-stone-600 hover:bg-stone-100 rounded-xl text-sm font-bold transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white rounded-xl text-sm font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengunggah...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload &amp; Tetapkan Diterima</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
