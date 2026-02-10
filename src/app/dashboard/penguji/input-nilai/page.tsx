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
} from "lucide-react";
import { exportToExcel, exportToPDF } from "@/lib/utils/export";

interface Peserta {
  id: string;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  jenjang: string;
  nilai_tulis: number | null;
  nilai_wawancara: number | null;
  nilai_tahfidz: number | null;
  catatan: string | null;
}

export default function InputNilaiPage() {
  const [peserta, setPeserta] = useState<Peserta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Peserta>>({});
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchPeserta();
  }, []);

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
      // Use filtered data if searching, otherwise all data
      const dataToExport = search
        ? peserta.filter(p =>
          p.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
          p.nomor_pendaftaran.toLowerCase().includes(search.toLowerCase())
        )
        : peserta;

      const data = dataToExport.map((item) => ({
        "Nama Lengkap": item.nama_lengkap || "-",
        "Nomor Pendaftaran": item.nomor_pendaftaran || "-",
        "Jenjang": item.jenjang || "-",
        "Nilai Tulis": item.nilai_tulis ?? 0,
        "Nilai Wawancara": item.nilai_wawancara ?? 0,
        "Nilai Tahfidz": item.nilai_tahfidz ?? 0,
        "Catatan": item.catatan || "-"
      }));

      const filename = `nilai-ujian-${new Date().toISOString().split("T")[0]}`;

      if (type === "excel") {
        exportToExcel(data, filename, "Nilai Ujian");
      } else {
        const headers = Object.keys(data[0] || {});
        const rows = data.map((item: any) => Object.values(item));
        exportToPDF("Rekap Nilai Ujian", headers, rows, filename, "landscape");
      }
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Gagal export data");
    } finally {
      setExporting(false);
    }
  };

  const handleEdit = (item: Peserta) => {
    setEditingId(item.id);
    setFormData({
      nilai_tulis: item.nilai_tulis,
      nilai_wawancara: item.nilai_wawancara,
      nilai_tahfidz: item.nilai_tahfidz,
      catatan: item.catatan,
    });
  };

  const handleSave = async (id: string) => {
    try {
      setSaving(id);
      const response = await fetch(`/api/penguji/nilai/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchPeserta();
        setEditingId(null);
        setFormData({});
      }
    } catch (error) {
      console.error("Error saving nilai:", error);
      alert("Gagal menyimpan nilai");
    } finally {
      setSaving(null);
    }
  };

  const filteredPeserta = peserta.filter(
    (p) =>
      p.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      p.nomor_pendaftaran.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-stone-600">Memuat daftar peserta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
            <ClipboardCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900">Input Nilai</h2>
            <p className="text-stone-600">
              Total: {peserta.length} peserta ujian
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport("excel")}
              disabled={exporting}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              title="Download Excel"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="w-4 h-4" />
              )}
              Excel
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={exporting}
              className="flex items-center gap-2 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              title="Download PDF"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-violet-100">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau nomor pendaftaran..."
            className="flex-1 px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-violet-500 focus:outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredPeserta.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border-2 border-stone-200 shadow-sm">
            <div className="text-center">
              <ClipboardCheck className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600">Tidak ada peserta ditemukan</p>
            </div>
          </div>
        ) : (
          filteredPeserta.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100"
            >
              {/* Peserta Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <User className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-900">
                    {item.nama_lengkap}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                    <span className="flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {item.nomor_pendaftaran}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                      {item.jenjang}
                    </span>
                  </div>
                </div>
                {item.nilai_tulis !== null &&
                  item.nilai_wawancara !== null &&
                  item.nilai_tahfidz !== null && (
                    <div className="ml-auto">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  )}
              </div>

              {editingId === item.id ? (
                /* Edit Mode */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">
                      Nilai Tulis (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilai_tulis ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nilai_tulis: parseFloat(e.target.value) || null,
                        })
                      }
                      className="w-full px-3 py-2 border-2 border-stone-200 rounded-lg focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">
                      Nilai Wawancara (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilai_wawancara ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nilai_wawancara: parseFloat(e.target.value) || null,
                        })
                      }
                      className="w-full px-3 py-2 border-2 border-stone-200 rounded-lg focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">
                      Nilai Tahfidz (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilai_tahfidz ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nilai_tahfidz: parseFloat(e.target.value) || null,
                        })
                      }
                      className="w-full px-3 py-2 border-2 border-stone-200 rounded-lg focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs text-stone-600 mb-1">
                      Catatan
                    </label>
                    <textarea
                      value={formData.catatan ?? ""}
                      onChange={(e) =>
                        setFormData({ ...formData, catatan: e.target.value })
                      }
                      className="w-full px-3 py-2 border-2 border-stone-200 rounded-lg focus:border-violet-500 focus:outline-none resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                /* Display Mode */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-stone-500">Nilai Tulis</p>
                    <p className="font-bold text-lg text-violet-600">
                      {item.nilai_tulis ?? "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Nilai Wawancara</p>
                    <p className="font-bold text-lg text-violet-600">
                      {item.nilai_wawancara ?? "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Nilai Tahfidz</p>
                    <p className="font-bold text-lg text-violet-600">
                      {item.nilai_tahfidz ?? "-"}
                    </p>
                  </div>
                  {item.catatan && (
                    <div className="md:col-span-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>Catatan:</strong> {item.catatan}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              {editingId === item.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(item.id)}
                    disabled={saving === item.id}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {saving === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({});
                    }}
                    className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-colors"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
                >
                  {item.nilai_tulis !== null ? "Edit Nilai" : "Input Nilai"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
