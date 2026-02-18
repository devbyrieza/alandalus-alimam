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
import Swal from "sweetalert2";

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
        if (true) {
          const sessionsResponse = await fetch("/api/exam-sessions?is_active=true");
          if (sessionsResponse.ok) {
            const sessionsResult = await sessionsResponse.json();
            // Filter only available slots (not full)
            const allSlots = sessionsResult.data || [];
            const openSlots = allSlots.filter((s: ExamSession) => s._count.bookings < s.quota);
            setAvailableSlots(openSlots);
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
    const result = await Swal.fire({
      title: 'Konfirmasi Jadwal',
      text: "Apakah Anda yakin ingin memilih jadwal ini? Jadwal tidak dapat diubah setelah dipilih.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7c3aed', // violet-600
      cancelButtonColor: '#ef4444', // red-500
      confirmButtonText: 'Ya, Pilih Jadwal',
      cancelButtonText: 'Batal',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    try {
      setBookingId(sessionId);
      setMessage(null);

      const response = await fetch("/api/pendaftar/jadwal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam_session_id: sessionId })
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Jadwal ujian Anda telah tersimpan.',
          confirmButtonColor: '#7c3aed'
        });
        fetchData();
      } else {
        throw new Error(data.error || "Gagal memilih jadwal");
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message,
        confirmButtonColor: '#ef4444'
      });
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
        <h1 className="text-2xl font-black mb-2 text-white">Undangan Seleksi</h1>
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

      {/* 1. View Assigned Schedule */}
      {jadwal.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-bold text-green-900">Jadwal Terkonfirmasi</h3>
              <p className="text-sm text-green-700">Berikut adalah sesi ujian yang telah Anda pilih.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jadwal.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 bg-purple-100 rounded-bl-xl">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-stone-900 mb-1">
                    {item.jenis_ujian}
                  </h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">Terjadwal</span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-stone-900">{formatDate(item.tanggal_ujian)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-stone-900">
                      {formatTime(item.waktu_mulai)} - {item.waktu_selesai ? formatTime(item.waktu_selesai) : '?'} WIB
                    </span>
                  </div>
                  {item.lokasi && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="font-bold text-stone-900">{item.lokasi}</p>
                        {/* Detection of Zoom/Meet Link */}
                        {(item.lokasi.includes('http') || item.lokasi.includes('zoom') || item.lokasi.includes('meet')) && (
                          <a href={item.lokasi.match(/https?:\/\/[^\s]+/)?.[0] || '#'} target="_blank" rel="noopener noreferrer" className="ml-1 text-xs text-blue-600 underline hover:text-blue-800">
                            Buka Link
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Explicit Online Test Link if available */}
                  {item.online_test_link && (
                    <div className="pt-2 border-t border-dashed border-stone-200 mt-2">
                      <a
                        href={item.online_test_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Link Ujian Online
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. View Available Slots */}
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
          <h3 className="font-bold text-blue-900">Pilih Jadwal Ujian</h3>
          <p className="text-sm text-blue-700">
            Silakan pilih sesi ujian untuk jenis ujian yang <strong>belum Anda ambil</strong>.
          </p>
        </div>

        {(() => {
          // Logic: Filter out slots where the type (title) is already in booked schedule
          const bookedTypes = jadwal.map(j => j.jenis_ujian);
          const filteredSlots = availableSlots.filter(slot => !bookedTypes.includes(slot.title));

          if (filteredSlots.length === 0) {
            return (
              <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
                <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500">
                  {jadwal.length > 0
                    ? "Anda sudah memilih semua jenis ujian yang tersedia."
                    : "Belum ada jadwal ujian yang tersedia."}
                </p>
              </div>
            );
          }

          return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSlots.map(slot => {
                const isFull = slot._count.bookings >= slot.quota;
                return (
                  <div key={slot.id} className={`bg-white rounded-xl shadow p-5 border-2 transition-all ${isFull ? 'opacity-75 border-stone-100 bg-stone-50' : 'border-stone-100 hover:border-purple-300 hover:shadow-md'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-stone-900 text-lg line-clamp-1" title={slot.title}>{slot.title}</h4>
                      {isFull ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold whitespace-nowrap">Penuh</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold whitespace-nowrap">Tersedia</span>
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
                        <span className="line-clamp-1">{slot.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-500" />
                        <span>Sisa Kuota: {Math.max(0, slot.quota - slot._count.bookings)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBooking(slot.id)}
                      disabled={isFull || bookingId !== null}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
                    >
                      {bookingId === slot.id && <Loader2 className="animate-spin w-4 h-4" />}
                      {isFull ? "Penuh" : "Pilih Jadwal"}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
