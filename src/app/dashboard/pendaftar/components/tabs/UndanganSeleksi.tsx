"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle,
  Download,
  Link as LinkIcon,
} from "lucide-react";

interface JadwalUjian {
  id: string;
  jenis_ujian: string;
  tanggal_ujian: string;
  waktu_mulai: string;
  waktu_selesai: string | null;
  lokasi: string | null;
  keterangan: string | null;
  online_test_link?: string;
}

interface ExamSession {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  quota: number;
  location: string;
  notes: string;
  _count: { bookings: number };
}

export default function UndanganSeleksiTab() {
  const [jadwal, setJadwal] = useState<JadwalUjian[]>([]);
  const [availableSlots, setAvailableSlots] = useState<ExamSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Check existing schedule
      const response = await fetch("/api/pendaftar/jadwal");
      if (response.ok) {
        const result = await response.json();
        const existing = result.data || [];
        setJadwal(existing);

        // 2. If no schedule, fetch available slots
        if (existing.length === 0) {
          const sessionsResponse = await fetch("/api/exam-sessions?is_active=true");
          if (sessionsResponse.ok) {
            const sessionsResult = await sessionsResponse.json();
            setAvailableSlots(sessionsResult.data || []);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (sessionId: string) => {
    if (!confirm("Apakah Anda yakin ingin memilih jadwal ini? Jadwal tidak dapat diubah setelah dipilih.")) return;

    try {
      setBookingId(sessionId);
      setMessage(null);

      const response = await fetch("/api/pendaftar/jadwal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam_session_id: sessionId })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Jadwal berhasil dipilih!" });
        // Refresh data to show assigned schedule
        fetchData();
      } else {
        throw new Error(result.error || "Gagal memilih jadwal");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setBookingId(null);
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

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-stone-600">Memuat info seleksi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-black mb-2">Undangan Seleksi</h1>
        <p className="text-purple-100">
          Jadwal ujian seleksi calon santri baru
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border-2 flex items-center gap-2 ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Logic: Show Schedule OR Show Slot Selection */}
      {jadwal.length > 0 ? (
        // View Assigned Schedule
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-bold text-green-900">Anda Sudah Terjadwal</h3>
              <p className="text-sm text-green-700">Silakan hadir sesuai waktu dan lokasi yang ditentukan.</p>
            </div>
          </div>

          {jadwal.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      {item.jenis_ujian}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-stone-500">Tanggal</p>
                    <p className="font-bold text-stone-900">
                      {formatDate(item.tanggal_ujian)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-stone-500">Waktu</p>
                    <p className="font-bold text-stone-900">
                      {formatTime(item.waktu_mulai)} - {item.waktu_selesai ? formatTime(item.waktu_selesai) : '?'} WIB
                    </p>
                  </div>
                </div>

                {item.lokasi && (
                  <div className="flex items-center gap-3 md:col-span-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-stone-500">Lokasi</p>
                      <p className="font-bold text-stone-900">{item.lokasi}</p>
                    </div>
                  </div>
                )}

                {/* Online Test Link */}
                {item.online_test_link && (
                  <div className="md:col-span-2 mt-2">
                    <a
                      href={item.online_test_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-200 rounded-lg group-hover:bg-indigo-300 transition-colors">
                            <LinkIcon className="w-5 h-5 text-indigo-700" />
                          </div>
                          <div>
                            <h4 className="font-bold text-indigo-900">Link Ujian Online</h4>
                            <p className="text-sm text-indigo-700">Klik di sini untuk mengerjakan tes online</p>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                          Wajib
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Info Box */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-amber-200 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-amber-700" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-2">
                  Persiapan Ujian
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Hadir 30 menit sebelum ujian dimulai</li>
                  <li>• Bawa kartu ujian dan identitas diri (KTP/Kartu Pelajar)</li>
                  <li>• Kenakan pakaian yang rapi dan sopan</li>
                  <li>• Bawa alat tulis (pulpen, pensil, penghapus)</li>
                  <li>• Jaga kesehatan dan istirahat yang cukup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // View Available Slots
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <h3 className="font-bold text-blue-900">Silakan Pilih Jadwal Ujian</h3>
            <p className="text-sm text-blue-700">Pilih salah satu sesi ujian yang tersedia di bawah ini. Pastikan Anda dapat hadir pada waktu yang dipilih.</p>
          </div>

          {availableSlots.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
              <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-500">Belum ada jadwal ujian yang tersedia.</p>
              <p className="text-sm text-stone-400">Silakan cek kembali secara berkala.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {availableSlots.map(slot => {
                const isFull = slot._count.bookings >= slot.quota;
                return (
                  <div key={slot.id} className={`bg-white rounded-xl shadow p-5 border-2 transition-all ${isFull ? 'opacity-75 border-stone-100' : 'border-stone-100 hover:border-purple-300 hover:shadow-md'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-stone-900 text-lg">{slot.title}</h4>
                      {isFull ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Penuh</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Tersedia</span>
                      )}
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-stone-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        {formatDate(slot.start_time)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-500" />
                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        {slot.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-500" />
                        <span>Sisa Kuota: {Math.max(0, slot.quota - slot._count.bookings)} / {slot.quota}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBooking(slot.id)}
                      disabled={isFull || bookingId !== null}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
                    >
                      {bookingId === slot.id && <Loader2 className="animate-spin w-4 h-4" />}
                      {isFull ? "Kuota Penuh" : "Pilih Jadwal Ini"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
