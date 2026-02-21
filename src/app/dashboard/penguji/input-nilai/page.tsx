"use client";

import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Search,
  Save,
  Loader2,
  CheckCircle,
  User,
  Hash,
  FileSpreadsheet,
  FileText,
  AlertCircle,
} from "lucide-react";
import { exportToExcel, exportToPDF } from "@/lib/utils/export";

interface Peserta {
  id: string; // Pendaftar ID
  jadwal_id: string;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  jenjang: string;
  roles: string[]; // ['wawancara', 'quran', 'ortu']
  nilai_wawancara_santri: number | null;
  nilai_tes_quran: number | null;
  nilai_wawancara_ortu: number | null;
  catatan_santri: string | null;
  catatan_quran: string | null;
  catatan_ortu: string | null;
  nilai_id: string | null;
}

export default function InputNilaiPage() {
  const [peserta, setPeserta] = useState<Peserta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Dynamic form data
  const [formData, setFormData] = useState<Partial<Peserta>>({});
  const [userRole, setUserRole] = useState<string | null>(null);

  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSession();
    fetchPeserta();
  }, []);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        const role = data.session?.role || data.user?.user_metadata?.role;
        setUserRole(role);
      }
    } catch (e) {
      console.error("Failed to fetch session", e);
    }
  };

  const fetchPeserta = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/penguji/peserta");
      if (response.ok) {
        const result = await response.json();
        setPeserta(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching peserta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: "excel" | "pdf") => {
    try {
      setExporting(true);
      const dataToExport = search
        ? peserta.filter(p => p.nama_lengkap.toLowerCase().includes(search.toLowerCase()))
        : peserta;

      const data = dataToExport.map((item) => ({
        "Nama": item.nama_lengkap,
        "No. Daftar": item.nomor_pendaftaran,
        "Wawancara Santri": item.nilai_wawancara_santri || "-",
        "Tes Al-Qur'an": item.nilai_tes_quran || "-",
        "Wawancara Ortu": item.nilai_wawancara_ortu || "-",
        "Catatan Santri": item.catatan_santri || "-",
        "Catatan Ortu": item.catatan_ortu || "-"
      }));

      const filename = `nilai-ujian-${new Date().toISOString().split("T")[0]}`;
      if (type === "excel") exportToExcel(data, filename, "Nilai");
      else exportToPDF("Rekap Nilai", Object.keys(data[0] || {}), data.map((i: any) => Object.values(i)), filename, "landscape");

    } catch (error) {
      alert("Gagal export data");
    } finally {
      setExporting(false);
    }
  };

  const handleEdit = (item: Peserta) => {
    setEditingId(item.id);
    setFormData({
      nilai_wawancara_santri: item.nilai_wawancara_santri,
      nilai_tes_quran: item.nilai_tes_quran,
      nilai_wawancara_ortu: item.nilai_wawancara_ortu,
      catatan_santri: item.catatan_santri,
      catatan_quran: item.catatan_quran,
      catatan_ortu: item.catatan_ortu,
    });
    setMessage(null);
  };

  const handleSave = async (id: string, canEdit: { wawancara: boolean; quran: boolean; ortu: boolean }) => {
    try {
      setSaving(id);

      // Filter payload to only send what user is authorized to edit + generic notes
      const payload: any = {};
      if (canEdit.wawancara) {
        if (formData.nilai_wawancara_santri !== undefined) payload.nilai_wawancara_santri = formData.nilai_wawancara_santri;
        if (formData.catatan_santri !== undefined) payload.catatan_santri = formData.catatan_santri;
      }
      if (canEdit.quran) {
        if (formData.nilai_tes_quran !== undefined) payload.nilai_tes_quran = formData.nilai_tes_quran;
        // If both roles exist, last one wins for note. Ideally separate.
        if (formData.catatan_santri !== undefined && !canEdit.wawancara) payload.catatan_santri = formData.catatan_santri;
      }
      if (canEdit.ortu) {
        if (formData.nilai_wawancara_ortu !== undefined) payload.nilai_wawancara_ortu = formData.nilai_wawancara_ortu;
        if (formData.catatan_ortu !== undefined) payload.catatan_ortu = formData.catatan_ortu;
      }

      const response = await fetch(`/api/penguji/nilai/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchPeserta();
        setEditingId(null);
        setFormData({});
        setMessage({ type: "success", text: "Nilai berhasil disimpan" });
      } else {
        throw new Error("Gagal menyimpan");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Gagal menyimpan nilai" });
    } finally {
      setSaving(null);
    }
  };

  const filteredPeserta = peserta.filter(
    (p) =>
      p.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      p.nomor_pendaftaran.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl">
            <ClipboardCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900">Input Nilai Ujian</h2>
            <p className="text-stone-600">Total: {peserta.length} peserta</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport("excel")} disabled={exporting} className="btn-sm bg-emerald-600 text-white px-3 py-1 rounded">Excel</button>
          <button onClick={() => handleExport("pdf")} disabled={exporting} className="btn-sm bg-rose-600 text-white px-3 py-1 rounded">PDF</button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border-2 flex items-center gap-2 ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {loading ? <div className="text-center py-10"><Loader2 className="animate-spin inline text-violet-600" /></div> :
          filteredPeserta.length === 0 ? <p className="text-center text-stone-500 py-10">Tidak ada data.</p> :
            filteredPeserta.map((item) => {
              const isEditing = editingId === item.id;

              // RBAC Logic: 
              // 1. Roles from Schedule (item.roles)
              // 2. Roles from Session (userRole)
              const isSuper = userRole === 'admin_super' || userRole === 'tim_it';
              const canDoQuran = item.roles.includes('quran') || (isSuper) || (userRole === 'penguji_santri') || (userRole === 'penguji_umum');
              const canDoWawancaraSantri = item.roles.includes('wawancara') || (isSuper) || (userRole === 'penguji_santri') || (userRole === 'penguji_umum');
              const canDoWawancaraOrtu = item.roles.includes('ortu') || (isSuper) || (userRole === 'pewawancara_ortu') || (userRole === 'penguji_umum');

              // Determine visibility
              const showQuran = canDoQuran || item.nilai_tes_quran;
              const showWawancaraSantri = canDoWawancaraSantri || item.nilai_wawancara_santri;
              const showWawancaraOrtu = canDoWawancaraOrtu || item.nilai_wawancara_ortu;

              // Determine editability
              const editQuran = isEditing && canDoQuran;
              const editWawancaraSantri = isEditing && canDoWawancaraSantri;
              const editWawancaraOrtu = isEditing && canDoWawancaraOrtu;

              return (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-violet-100 rounded-lg"><User className="w-5 h-5 text-violet-600" /></div>
                      <div>
                        <h3 className="font-bold text-lg text-stone-900">{item.nama_lengkap}</h3>
                        <div className="flex items-center gap-2 text-sm text-stone-600">
                          <Hash className="w-3 h-3" /> {item.nomor_pendaftaran}
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{item.jenjang}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {!isEditing && (
                        <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">Input / Edit Nilai</button>
                      )}
                    </div>
                  </div>

                  {/* Form / View */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Wawancara Santri */}
                    {showWawancaraSantri && (
                      <div className={`p-4 rounded-lg border content-section ${canDoWawancaraSantri ? 'bg-blue-50 border-blue-100' : 'bg-gray-50'}`}>
                        <h4 className="font-bold text-blue-900 mb-2">Wawancara Santri</h4>
                        {editWawancaraSantri ? (
                          <div className="space-y-2">
                            <label className="text-xs font-bold">Nilai (0-100)</label>
                            <input
                              type="number"
                              className="w-full p-2 border rounded"
                              value={formData.nilai_wawancara_santri ?? ''}
                              onChange={e => setFormData({ ...formData, nilai_wawancara_santri: Number(e.target.value) })}
                            />
                            <label className="text-xs font-bold">Catatan</label>
                            <textarea
                              className="w-full p-2 border rounded"
                              rows={2}
                              value={formData.catatan_santri ?? ''}
                              onChange={e => setFormData({ ...formData, catatan_santri: e.target.value })}
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-sm">Nilai: <span className="font-bold">{item.nilai_wawancara_santri || '-'}</span></div>
                            <div className="text-sm text-stone-500 italic">{item.catatan_santri || 'Tidak ada catatan'}</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Al-Qur'an */}
                    {showQuran && (
                      <div className={`p-4 rounded-lg border content-section ${canDoQuran ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50'}`}>
                        <h4 className="font-bold text-emerald-900 mb-2">Tes Al-Qur'an</h4>
                        {editQuran ? (
                          <div className="space-y-2">
                            <label className="text-xs font-bold">Nilai (0-100)</label>
                            <input
                              type="number"
                              className="w-full p-2 border rounded"
                              value={formData.nilai_tes_quran ?? ''}
                              onChange={e => setFormData({ ...formData, nilai_tes_quran: Number(e.target.value) })}
                            />
                            {!editWawancaraSantri && (
                              <>
                                <label className="text-xs font-bold">Catatan</label>
                                <textarea
                                  className="w-full p-2 border rounded"
                                  rows={2}
                                  value={formData.catatan_quran ?? ''}
                                  onChange={e => setFormData({ ...formData, catatan_quran: e.target.value })}
                                />
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-sm">Nilai: <span className="font-bold">{item.nilai_tes_quran || '-'}</span></div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Wawancara Ortu */}
                    {showWawancaraOrtu && (
                      <div className={`p-4 rounded-lg border content-section ${canDoWawancaraOrtu ? 'bg-amber-50 border-amber-100' : 'bg-gray-50'}`}>
                        <h4 className="font-bold text-amber-900 mb-2">Wawancara Wali</h4>
                        {editWawancaraOrtu ? (
                          <div className="space-y-2">
                            <label className="text-xs font-bold">Nilai (0-100)</label>
                            <input
                              type="number"
                              className="w-full p-2 border rounded"
                              value={formData.nilai_wawancara_ortu ?? ''}
                              onChange={e => setFormData({ ...formData, nilai_wawancara_ortu: Number(e.target.value) })}
                            />
                            <label className="text-xs font-bold">Catatan</label>
                            <textarea
                              className="w-full p-2 border rounded"
                              rows={2}
                              value={formData.catatan_ortu ?? ''}
                              onChange={e => setFormData({ ...formData, catatan_ortu: e.target.value })}
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-sm">Nilai: <span className="font-bold">{item.nilai_wawancara_ortu || '-'}</span></div>
                            <div className="text-sm text-stone-500 italic">{item.catatan_ortu || 'Tidak ada catatan'}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 mt-4 justify-end">
                      <button onClick={() => setEditingId(null)} className="px-4 py-2 border rounded-lg hover:bg-stone-50">Batal</button>
                      <button
                        onClick={() => handleSave(item.id, {
                          wawancara: canDoWawancaraSantri,
                          quran: canDoQuran,
                          ortu: canDoWawancaraOrtu
                        })}
                        disabled={saving === item.id}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                      >
                        {saving === item.id && <Loader2 className="animate-spin w-4 h-4" />} Simpan
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}
