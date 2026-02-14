"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Calendar,
  FileText,
  Download,
} from "lucide-react";
import { generateSuratKelulusan } from "@/lib/utils/pdf-generator";

interface Pengumuman {
  id: string;
  status_kelulusan: string;
  catatan: string | null;
  tanggal_pengumuman: string;
}

export default function PengumumanTab() {
  const [pengumuman, setPengumuman] = useState<Pengumuman | null>(null);
  const [docData, setDocData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const fetchPengumuman = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/pendaftar/pengumuman");
      if (response.ok) {
        const result = await response.json();
        setPengumuman(result.data);
      }
    } catch (error) {
      console.error("Error fetching pengumuman:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSurat = async () => {
    try {
      setIsGenerating(true);

      // If docData not yet fetched, fetch it now
      let currentDocData = docData;
      if (!currentDocData) {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session.pendaftar_id) {
          const res = await fetch(`/api/pendaftar/document-data?pendaftar_id=${session.pendaftar_id}`);
          const result = await res.json();
          currentDocData = result.data;
          setDocData(currentDocData);
        }
      }

      if (currentDocData) {
        generateSuratKelulusan(currentDocData);
      }
    } catch (error) {
      console.error("Error generating surat kelulusan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-stone-600">Memuat pengumuman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-black mb-2">Pengumuman</h1>
        <p className="text-cyan-100">
          Hasil seleksi penerimaan santri baru
        </p>
      </div>

      {!pengumuman ? (
        <div className="bg-white rounded-xl p-12 border-2 border-stone-200 shadow-sm">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">
              Pengumuman Belum Tersedia
            </h3>
            <p className="text-stone-600 max-w-md mx-auto mb-6">
              Hasil seleksi akan diumumkan setelah proses ujian selesai.
              Silakan cek kembali halaman ini secara berkala.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                Estimasi pengumuman: setelah ujian selesai
              </span>
            </div>
          </div>
        </div>
      ) : pengumuman.status_kelulusan === "diterima" ? (
        <div className="space-y-6">
          {/* Success Card */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Trophy className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white bg-opacity-20 rounded-2xl">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div>
                  <p className="text-green-100 text-sm mb-1">Selamat!</p>
                  <h2 className="text-3xl font-black">ANDA DITERIMA</h2>
                </div>
              </div>
              <p className="text-green-100 mb-8 max-w-xl">
                Berdasarkan hasil seleksi, Anda dinyatakan LULUS dan diterima
                sebagai santri baru Ponpes Al-Imam Al-Islami Sukabumi.
              </p>

              <button
                onClick={handleDownloadSurat}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                Download Surat Kelulusan
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Detail Pengumuman
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-stone-500 mb-1">
                  Tanggal Pengumuman
                </p>
                <p className="font-bold text-stone-900">
                  {formatDate(pengumuman.tanggal_pengumuman)}
                </p>
              </div>

              {pengumuman.catatan && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Catatan:</strong> {pengumuman.catatan}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-amber-200 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-amber-700" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-2">
                  Langkah Selanjutnya
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Segera lakukan daftar ulang melalui tab "Daftar Ulang"</li>
                  <li>• Siapkan dokumen yang diperlukan untuk daftar ulang</li>
                  <li>• Ikuti petunjuk yang diberikan oleh panitia</li>
                  <li>• Hubungi panitia jika ada pertanyaan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Failed Card */}
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-2xl">
                <XCircle className="w-12 h-12" />
              </div>
              <div>
                <p className="text-red-100 text-sm mb-1">Mohon Maaf</p>
                <h2 className="text-3xl font-black">BELUM BERHASIL</h2>
              </div>
            </div>
            <p className="text-red-100">
              Berdasarkan hasil seleksi, Anda belum dapat diterima pada periode
              ini. Tetap semangat dan jangan berkecil hati.
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Detail Pengumuman
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-stone-500 mb-1">
                  Tanggal Pengumuman
                </p>
                <p className="font-bold text-stone-900">
                  {formatDate(pengumuman.tanggal_pengumuman)}
                </p>
              </div>

              {pengumuman.catatan && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Catatan:</strong> {pengumuman.catatan}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Encouragement */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Trophy className="w-6 h-6 text-blue-700" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Tetap Semangat!</h4>
                <p className="text-sm text-blue-800">
                  Anda dapat mendaftar kembali pada periode pendaftaran
                  berikutnya. Gunakan kesempatan ini untuk mempersiapkan diri
                  dengan lebih baik. Jangan ragu untuk bertanya kepada panitia
                  mengenai hal yang perlu ditingkatkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
