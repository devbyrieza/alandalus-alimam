"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Loader2,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- Types ---

interface JadwalAssignment {
  id: string;
  pendaftar: {
    nama_lengkap: string;
    nomor_pendaftaran: string;
    jenjang: string;
    jenis_kelamin: string;
    nik?: string;
    tempat_lahir?: string;
    tanggal_lahir?: string;
    alamat?: string;
    no_hp?: string;
    asal_sekolah?: string;
    orang_tua?: {
      nama_ayah?: string;
      nama_ibu?: string;
      no_hp_ayah?: string;
      no_hp_ibu?: string;
      pekerjaan_ayah?: string;
      pekerjaan_ibu?: string;
    };
  };
  tanggal_ujian: string;
  waktu_mulai: string;
  waktu_selesai: string | null;
  lokasi: string | null;
  jenis_tugas: string;
  status: string;
  session_title?: string;
  // Granular Statuses
  status_santri?: string;
  status_quran?: string;
  status_ortu?: string;
  // Assignee IDs
  penguji_santri_id?: string;
  penguji_quran_id?: string;
  penguji_ortu_id?: string;
  session_created_by?: string;
}

interface ExamSession {
  id: string;
  title: string | null;
  start_time: string;
  end_time: string;
  quota: number;
  location: string | null;
  notes: string | null;
  _count?: { bookings: number };
}

// --- Component ---

export default function JadwalPengujiPage() {
  const [activeTab, setActiveTab] = useState<'assigned' | 'slots'>('assigned');
  const [userId, setUserId] = useState<string | null>(null);

  // State for Assignments
  const [assignments, setAssignments] = useState<JadwalAssignment[]>([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);

  // State for Slots
  const [slots, setSlots] = useState<ExamSession[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);

  // Detail Modal State
  const [selectedPendaftar, setSelectedPendaftar] = useState<JadwalAssignment['pendaftar'] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Common State
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State for Slot
  const [slotForm, setSlotForm] = useState({
    title: "",
    date: "",
    start_time: "08:00",
    quota: 1,
    location: "", // Default empty, falls back to "Online" on submit if empty
    notes: "",
  });
  const [submittingSlot, setSubmittingSlot] = useState(false);

  // --- Fetchers ---

  const fetchAssignments = async () => {
    try {
      setLoadingAssignments(true);
      const response = await fetch("/api/penguji/jadwal");
      if (response.ok) {
        const result = await response.json();
        setAssignments(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoadingAssignments(false);
    }
  };

  const fetchSlots = async () => {
    try {
      setLoadingSlots(true);
      const response = await fetch("/api/exam-sessions?creator_id=me");
      if (response.ok) {
        const result = await response.json();
        setSlots(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    // Fetch User Session ID
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          setUserId(data.user_id || data.id);
        }
      } catch (e) {
        console.error("Failed to fetch session", e);
      }
    };
    fetchSession();

    if (activeTab === 'assigned') fetchAssignments();
    if (activeTab === 'slots') fetchSlots();
  }, [activeTab]);

  // --- Handlers ---

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingSlot(true);
    setMessage(null);

    try {
      // Combine date and time
      const startDateTime = new Date(`${slotForm.date}T${slotForm.start_time}:00`);
      // Since end_time is removed from UI, automatically set it to 1 hour after start_time as a placeholder
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

      const payload = {
        title: slotForm.title,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        quota: 1, // Fixed quota to 1 as per requirement (Private/1-on-1)
        location: slotForm.location || "Online",
        notes: slotForm.notes,
      };

      const response = await fetch("/api/exam-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Slot waktu berhasil dibuat!" });
        setIsSlotModalOpen(false);
        fetchSlots();
        // Reset form partial
        setSlotForm(prev => ({ ...prev, title: "", notes: "" }));
      } else {
        throw new Error(result.error || "Gagal membuat slot");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSubmittingSlot(false);
    }
  };

  const handleDeleteSlot = async (id: string, count: number) => {
    if (count > 0) {
      alert("Tidak dapat menghapus slot yang sudah ada pendaftar!");
      return;
    }
    if (!confirm("Hapus slot waktu ini?")) return;

    try {
      const response = await fetch(`/api/exam-sessions?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setMessage({ type: "success", text: "Slot berhasil dihapus" });
        fetchSlots();
      } else {
        const res = await response.json();
        throw new Error(res.error || "Gagal menghapus");
      }
    } catch (error: any) {
    }
  };

  const handleCompleteExam = async (jadwalId: string) => {
    if (!confirm("Apakah Anda yakin ingin menandai ujian ini selesai? Status akan diperbarui.")) return;

    try {
      const response = await fetch("/api/penguji/jadwal/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jadwal_id: jadwalId }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: result.message });
        if (result.isAllDone) {
          alert("Semua rangkaian ujian santri ini telah SELESAI! Notifikasi telah dikirim.");
        }
        fetchAssignments(); // Refresh data
      } else {
        throw new Error(result.error || "Gagal update status");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    }
  };

  // --- Helpers ---

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split("T")[0];
    const checkDate = dateString.split("T")[0];
    return today === checkDate;
  };

  // --- Render ---

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">
                Jadwal & Slot Ujian
              </h2>
              <p className="text-stone-600">
                Kelola jadwal menguji dan ketersediaan waktu
              </p>
            </div>
          </div>
          <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'assigned' ? 'bg-white shadow text-violet-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Jadwal Saya
            </button>
            <button
              onClick={() => setActiveTab('slots')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'slots' ? 'bg-white shadow text-violet-700' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Kelola Slot Ketersediaan
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-xl border-2 flex items-center justify-between ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          <div className="flex items-center gap-2">
            {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium">{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)}><XCircle className="w-4 h-4 opacity-50 hover:opacity-100" /></button>
        </div>
      )}

      {/* TAB CONTENT: ASSIGNED */}
      {activeTab === 'assigned' && (
        <>
          {loadingAssignments ? (
            <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-500" /></div>
          ) : assignments.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border-2 border-stone-200 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="font-bold text-stone-900">Belum Ada Jadwal</h3>
              <p className="text-stone-500">Anda belum memiliki jadwal ujian yang ditugaskan.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {assignments.map(item => (
                <div key={item.id} className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${isToday(item.tanggal_ujian) ? "border-green-300 bg-green-50" : "border-violet-100"}`}>
                  <div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-violet-100 rounded-xl text-violet-600 font-bold text-center min-w-[60px]">
                        <div className="text-xs uppercase">{new Date(item.tanggal_ujian).toLocaleDateString('id-ID', { month: 'short' })}</div>
                        <div className="text-2xl">{new Date(item.tanggal_ujian).getDate()}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-xs font-bold uppercase">{item.pendaftar.jenjang}</span>
                          <span className="text-xs text-stone-500">{item.pendaftar.nomor_pendaftaran}</span>
                        </div>
                        <h3 className="text-lg font-bold text-stone-900">{item.pendaftar.nama_lengkap}</h3>
                        <div className="flex items-center gap-2 text-sm text-stone-600 mt-1">
                          <FileText className="w-4 h-4" />
                          Assignments: <span className="font-semibold text-violet-700">{item.jenis_tugas}</span>
                          Assignments: <span className="font-semibold text-violet-700">{item.jenis_tugas}</span>
                        </div>

                        {/* Action Buttons: Status Completion */}
                        {(() => {
                          // Determine which roles this penguji has for this jadwal
                          const isSantri = item.penguji_santri_id === userId;
                          const isQuran = item.penguji_quran_id === userId;
                          const isOrtu = item.penguji_ortu_id === userId;
                          const isCreator = item.session_created_by === userId;

                          // Fallback: if matched via session creator, derive from jenis_tugas
                          let showSantri = isSantri;
                          let showQuran = isQuran;
                          let showOrtu = isOrtu;
                          if (!isSantri && !isQuran && !isOrtu && isCreator) {
                            const tugas = (item.jenis_tugas || "").toLowerCase();
                            if (tugas.includes("calsan") || tugas.includes("santri")) showSantri = true;
                            if (tugas.includes("qur")) showQuran = true;
                            if (tugas.includes("cawalsan") || tugas.includes("ortu")) showOrtu = true;
                          }

                          return (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {userId && showSantri && (
                                item.status_santri === 'completed' ? (
                                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Wawancara Calsan Selesai
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleCompleteExam(item.id)}
                                    className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg transition-colors"
                                  >
                                    Tandai Wawancara Selesai
                                  </button>
                                )
                              )}

                              {userId && showQuran && (
                                item.status_quran === 'completed' ? (
                                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Tes Al-Qur'an Selesai
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleCompleteExam(item.id)}
                                    className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg transition-colors"
                                  >
                                    Tandai Tes Al-Qur'an Selesai
                                  </button>
                                )
                              )}

                              {userId && showOrtu && (
                                item.status_ortu === 'completed' ? (
                                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Wawancara Cawalsan Selesai
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleCompleteExam(item.id)}
                                    className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg transition-colors"
                                  >
                                    Tandai Wawancara Cawalsan Selesai
                                  </button>
                                )
                              )}
                            </div>
                          );
                        })()}

                        <button
                          onClick={() => {
                            setSelectedPendaftar(item.pendaftar);
                            setIsDetailModalOpen(true);
                          }}
                          className="mt-2 text-xs font-bold text-violet-600 hover:text-violet-800 underline"
                        >
                          Lihat Data Pendaftar
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[200px] border-l pl-0 md:pl-6 border-stone-100">
                      <div className="flex items-center gap-2 text-sm text-stone-600">
                        <Clock className="w-4 h-4 text-violet-500" />
                        {formatTime(item.waktu_mulai)} WIB
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone-600">
                        <MapPin className="w-4 h-4 text-violet-500" />
                        {item.lokasi || "Lokasi belum ditentukan"}
                      </div>
                      {item.session_title && (
                        <div className="text-xs text-stone-400 mt-1">Sesi: {item.session_title}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* TAB CONTENT: SLOTS */}
      {activeTab === 'slots' && (
        <>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200">
            <div>
              <h3 className="font-bold text-stone-900">Slot Ketersediaan Anda</h3>
              <p className="text-sm text-stone-500">Buat slot waktu dimana Anda bersedia menguji.</p>
            </div>
            <button
              onClick={() => setIsSlotModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold shadow-lg shadow-violet-200 transition-all"
            >
              <Plus className="w-4 h-4" /> Buat Slot
            </button>
          </div>

          {loadingSlots ? (
            <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-500" /></div>
          ) : slots.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p>Belum ada slot waktu yang dibuat.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map(slot => (
                <div key={slot.id} className="bg-white rounded-xl shadow-sm p-5 border-2 border-stone-100 hover:border-violet-200 transition-all group relative">
                  <button
                    onClick={() => handleDeleteSlot(slot.id, slot._count?.bookings || 0)}
                    className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <h4 className="font-bold text-stone-900 mb-1">{slot.title || "Sesi Tanpa Judul"}</h4>
                  <div className="space-y-2 mt-3 text-sm">
                    <div className="flex items-center gap-2 text-stone-600">
                      <Calendar className="w-4 h-4 text-violet-500" />
                      {formatDate(slot.start_time)}
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <Clock className="w-4 h-4 text-violet-500" />
                      {formatTime(slot.start_time)} WIB
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <MapPin className="w-4 h-4 text-violet-500" />
                      {slot.location || "-"}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* MODAL CREATE SLOT */}
      {isSlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h3 className="font-bold text-stone-900">Buat Slot Ketersediaan</h3>
              <button onClick={() => setIsSlotModalOpen(false)}><XCircle className="w-6 h-6 text-stone-400 hover:text-stone-600" /></button>
            </div>
            <form onSubmit={handleCreateSlot} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Jenis Ujian</label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none bg-white"
                  value={slotForm.title}
                  onChange={e => setSlotForm({ ...slotForm, title: e.target.value })}
                >
                  <option value="" disabled>Pilih Jenis Ujian</option>
                  <option value="Tes Al-Quran">Tes Al-Quran</option>
                  <option value="Wawancara Calsan">Wawancara Calsan</option>
                  <option value="Wawancara Cawalsan">Wawancara Cawalsan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Tanggal</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                  value={slotForm.date}
                  onChange={e => setSlotForm({ ...slotForm, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Mulai Ujian</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                  value={slotForm.start_time}
                  onChange={e => setSlotForm({ ...slotForm, start_time: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Link Google Meet / Lokasi</label>
                <input
                  type="text"
                  placeholder="Paste Link Google Meet di sini (Contoh: https://meet.google.com/abc-xyz-123)"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                  value={slotForm.location}
                  onChange={e => setSlotForm({ ...slotForm, location: e.target.value })}
                />
              </div>


              {/* Hidden/Fixed Quota Note */}
              <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-100 flex gap-2 items-start">
                <div className="mt-0.5 min-w-[16px]">ℹ️</div>
                <p className="text-xs text-blue-800">
                  Setiap slot waktu yang dibuat otomatis memiliki <strong>Kuota 1 Pendaftar</strong> (Private/1-on-1).
                </p>
              </div>

              <button
                type="submit"
                disabled={submittingSlot}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors flex justify-center gap-2"
              >
                {submittingSlot && <Loader2 className="w-5 h-5 animate-spin" />}
                Simpan Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PENDAFTAR */}
      {isDetailModalOpen && selectedPendaftar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50 rounded-t-2xl shrink-0">
              <h3 className="font-bold text-stone-900">Data Pendaftar</h3>
              <button onClick={() => setIsDetailModalOpen(false)}><XCircle className="w-6 h-6 text-stone-400 hover:text-stone-600" /></button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Data Diri */}
              <div>
                <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Identitas Santri</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-stone-500 text-xs">Nama Lengkap</label>
                    <p className="font-bold text-stone-900">{selectedPendaftar.nama_lengkap}</p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">Nomor Pendaftaran</label>
                    <p className="font-mono font-bold text-stone-900">{selectedPendaftar.nomor_pendaftaran}</p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">NIK</label>
                    <p className="font-mono text-stone-700">{selectedPendaftar.nik || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">Jenis Kelamin</label>
                    <p className="text-stone-700">{selectedPendaftar.jenis_kelamin}</p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">Tempat, Tanggal Lahir</label>
                    <p className="text-stone-700">
                      {selectedPendaftar.tempat_lahir}, {selectedPendaftar.tanggal_lahir ? new Date(selectedPendaftar.tanggal_lahir).toLocaleDateString('id-ID') : '-'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">Jenjang</label>
                    <p className="text-stone-700">{selectedPendaftar.jenjang}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-stone-500 text-xs">No. WA / HP (Wali/Utama)</label>
                    <p className="font-mono font-bold text-green-700">{selectedPendaftar.no_hp || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-stone-500 text-xs">Alamat</label>
                    <p className="text-stone-700">{selectedPendaftar.alamat || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-stone-500 text-xs">Asal Sekolah</label>
                    <p className="text-stone-700 font-medium">{selectedPendaftar.asal_sekolah || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-stone-100" />

              {/* Data Orang Tua */}
              <div>
                <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Data Orang Tua</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-stone-500 text-xs">Nama Ayah</label>
                    <p className="font-bold text-stone-900">{selectedPendaftar.orang_tua?.nama_ayah || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">No. HP Ayah</label>
                    <p className="font-mono text-stone-700">{selectedPendaftar.orang_tua?.no_hp_ayah || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">Pekerjaan Ayah</label>
                    <p className="text-stone-700">{selectedPendaftar.orang_tua?.pekerjaan_ayah || "-"}</p>
                  </div>
                  <div>
                    {/* Empty spacer or Mother info */}
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">Nama Ibu</label>
                    <p className="font-bold text-stone-900">{selectedPendaftar.orang_tua?.nama_ibu || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs">No. HP Ibu</label>
                    <p className="font-mono text-stone-700">{selectedPendaftar.orang_tua?.no_hp_ibu || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-stone-100 bg-stone-50 rounded-b-2xl shrink-0">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-full py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
