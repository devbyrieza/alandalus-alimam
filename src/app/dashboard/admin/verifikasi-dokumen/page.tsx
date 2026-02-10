"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileCheck,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  User,
  Calendar,
  Phone,
  FileText,
  AlertCircle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  ExternalLink,
  CheckSquare,
  Square,
  FileSpreadsheet,
} from "lucide-react";
import { exportToExcel, exportToPDF } from "@/lib/utils/export";
import Link from "next/link";
import Image from "next/image";

interface Dokumen {
  id: string;
  jenis_dokumen: string;
  status_verifikasi: string;
  catatan: string | null;
  file_url: string | null;
  created_at: string;
  updated_at: string;
  pendaftar_id: string;
}

interface PendaftarWithDocs {
  id: string;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  jenjang: string;
  no_hp: string | null;
  dokumen: Dokumen[];
}

const JENIS_DOKUMEN_ORDER = [
  "Foto",
  "KTP Wali",
  "KK",
  "Akta Kelahiran",
  "Rapor",
  "Ijazah",
  "SKHUN",
  "Surat Keterangan Lulus",
];

export default function VerifikasiDokumenPage() {
  const [pendaftarList, setPendaftarList] = useState<PendaftarWithDocs[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [expandedPendaftar, setExpandedPendaftar] = useState<Set<string>>(new Set());
  const [processingDocs, setProcessingDocs] = useState<Set<string>>(new Set());
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedForBulk, setSelectedForBulk] = useState<Set<string>>(new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchDokumen = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/verifikasi/dokumen?status=${statusFilter}&grouped=true`
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();

      // Group documents by pendaftar
      const grouped: Record<string, PendaftarWithDocs> = {};

      for (const dok of result.data || []) {
        if (!dok.pendaftar) continue;

        const pendaftarId = dok.pendaftar.id;
        if (!grouped[pendaftarId]) {
          grouped[pendaftarId] = {
            id: dok.pendaftar.id,
            nomor_pendaftaran: dok.pendaftar.nomor_pendaftaran,
            nama_lengkap: dok.pendaftar.nama_lengkap,
            jenjang: dok.pendaftar.jenjang,
            no_hp: dok.pendaftar.no_hp,
            dokumen: [],
          };
        }
        grouped[pendaftarId].dokumen.push({
          id: dok.id,
          jenis_dokumen: dok.jenis_dokumen,
          status_verifikasi: dok.status_verifikasi,
          catatan: dok.catatan,
          file_url: dok.file_url,
          created_at: dok.created_at,
          updated_at: dok.updated_at,
          pendaftar_id: pendaftarId,
        });
      }

      // Sort documents by type order
      Object.values(grouped).forEach((p) => {
        p.dokumen.sort((a, b) => {
          const aIndex = JENIS_DOKUMEN_ORDER.indexOf(a.jenis_dokumen);
          const bIndex = JENIS_DOKUMEN_ORDER.indexOf(b.jenis_dokumen);
          return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
        });
      });

      setPendaftarList(Object.values(grouped));
      // Auto-expand all pendaftar for quick access
      setExpandedPendaftar(new Set(Object.keys(grouped)));
    } catch (error) {
      console.error("Error fetching dokumen:", error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchDokumen();
  }, [fetchDokumen]);

  const handleExport = async (type: "excel" | "pdf") => {
    try {
      setExporting(true);
      // Fetch ALL data
      const response = await fetch(`/api/admin/verifikasi/dokumen?status=all`);
      if (!response.ok) throw new Error("Failed to export");

      const result = await response.json();

      const data = result.data.map((item: any) => ({
        "Nama Pendaftar": item.pendaftar?.nama_lengkap || "-",
        "No Pendaftaran": item.pendaftar?.nomor_pendaftaran || "-",
        "Jenjang": item.pendaftar?.jenjang || "-",
        "Jenis Dokumen": item.jenis_dokumen || "-",
        "Status": item.is_verified ? "Terverifikasi" : "Belum Verifikasi",
        "Catatan": item.catatan || "-",
        "Tanggal Upload": new Date(item.created_at).toLocaleDateString("id-ID")
      }));

      const filename = `data-dokumen-${new Date().toISOString().split("T")[0]}`;

      if (type === "excel") {
        exportToExcel(data, filename, "Data Dokumen");
      } else {
        const headers = Object.keys(data[0] || {});
        const rows = data.map((item: any) => Object.values(item));
        exportToPDF("Laporan Verifikasi Dokumen", headers, rows, filename, "landscape");
      }
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Gagal export data");
    } finally {
      setExporting(false);
    }
  };

  const handleQuickVerify = async (dokumenId: string, status: "verified" | "rejected", catatan?: string) => {
    try {
      setProcessingDocs(prev => new Set(prev).add(dokumenId));

      const response = await fetch("/api/admin/verifikasi/dokumen", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dokumen_id: dokumenId,
          status_verifikasi: status,
          catatan: catatan || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to verify");

      // Remove from list locally for instant feedback
      setPendaftarList(prev =>
        prev.map(p => ({
          ...p,
          dokumen: p.dokumen.filter(d => d.id !== dokumenId)
        })).filter(p => p.dokumen.length > 0)
      );

      setSelectedForBulk(prev => {
        const next = new Set(prev);
        next.delete(dokumenId);
        return next;
      });
    } catch (error) {
      console.error("Error verifying dokumen:", error);
      alert("Gagal memverifikasi dokumen");
    } finally {
      setProcessingDocs(prev => {
        const next = new Set(prev);
        next.delete(dokumenId);
        return next;
      });
    }
  };

  const handleBulkVerify = async (status: "verified" | "rejected") => {
    if (selectedForBulk.size === 0) {
      alert("Pilih dokumen yang akan diverifikasi");
      return;
    }

    if (!confirm(`${status === "verified" ? "Terima" : "Tolak"} ${selectedForBulk.size} dokumen?`)) {
      return;
    }

    try {
      setBulkProcessing(true);

      // Process all selected documents
      const promises = Array.from(selectedForBulk).map(dokumenId =>
        fetch("/api/admin/verifikasi/dokumen", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dokumen_id: dokumenId,
            status_verifikasi: status,
            catatan: null,
          }),
        })
      );

      await Promise.all(promises);

      // Refresh data
      await fetchDokumen();
      setSelectedForBulk(new Set());
    } catch (error) {
      console.error("Error bulk verifying:", error);
      alert("Gagal memverifikasi beberapa dokumen");
    } finally {
      setBulkProcessing(false);
    }
  };

  const toggleSelectDoc = (dokumenId: string) => {
    setSelectedForBulk(prev => {
      const next = new Set(prev);
      if (next.has(dokumenId)) {
        next.delete(dokumenId);
      } else {
        next.add(dokumenId);
      }
      return next;
    });
  };

  const selectAllDocs = () => {
    const allDocIds = pendaftarList.flatMap(p => p.dokumen.map(d => d.id));
    if (selectedForBulk.size === allDocIds.length) {
      setSelectedForBulk(new Set());
    } else {
      setSelectedForBulk(new Set(allDocIds));
    }
  };

  const toggleExpand = (pendaftarId: string) => {
    setExpandedPendaftar(prev => {
      const next = new Set(prev);
      if (next.has(pendaftarId)) {
        next.delete(pendaftarId);
      } else {
        next.add(pendaftarId);
      }
      return next;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isImageFile = (url: string | null) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  const totalDocs = pendaftarList.reduce((sum, p) => sum + p.dokumen.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <FileCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">
                Verifikasi Dokumen
              </h2>
              <p className="text-stone-600">
                {pendaftarList.length} pendaftar, {totalDocs} dokumen
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport("excel")}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
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
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors disabled:opacity-50"
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
          <button
            onClick={fetchDokumen}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter & Bulk Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-amber-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-stone-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="pending">Menunggu Verifikasi</option>
              <option value="verified">Terverifikasi</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>

          {statusFilter === "pending" && totalDocs > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={selectAllDocs}
                className="flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm transition-colors"
              >
                {selectedForBulk.size === totalDocs ? (
                  <CheckSquare className="w-4 h-4" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
                Pilih Semua
              </button>

              {selectedForBulk.size > 0 && (
                <>
                  <span className="text-sm text-stone-500">
                    {selectedForBulk.size} dipilih
                  </span>
                  <button
                    onClick={() => handleBulkVerify("verified")}
                    disabled={bulkProcessing}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {bulkProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Terima Semua
                  </button>
                  <button
                    onClick={() => handleBulkVerify("rejected")}
                    disabled={bulkProcessing}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {bulkProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                    Tolak Semua
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-20 border-2 border-amber-100">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
              <p className="text-stone-600">Memuat data dokumen...</p>
            </div>
          </div>
        ) : pendaftarList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-20 border-2 border-amber-100">
            <div className="text-center">
              <FileCheck className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600 text-lg font-medium">
                {statusFilter === "pending"
                  ? "Tidak ada dokumen yang perlu diverifikasi"
                  : `Tidak ada dokumen ${statusFilter === "verified" ? "terverifikasi" : "ditolak"}`
                }
              </p>
            </div>
          </div>
        ) : (
          pendaftarList.map((pendaftar) => (
            <div
              key={pendaftar.id}
              className="bg-white rounded-xl shadow-lg border-2 border-amber-100 overflow-hidden"
            >
              {/* Pendaftar Header */}
              <div
                className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 cursor-pointer"
                onClick={() => toggleExpand(pendaftar.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <User className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/admin/pendaftar/${pendaftar.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-lg text-amber-700 hover:text-amber-800"
                      >
                        {pendaftar.nama_lengkap}
                      </Link>
                      <div className="flex items-center gap-3 text-sm text-stone-600">
                        <span className="font-mono">{pendaftar.nomor_pendaftaran}</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                          {pendaftar.jenjang}
                        </span>
                        <span className="text-amber-600 font-medium">
                          {pendaftar.dokumen.length} dokumen
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusFilter === "pending" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const docIds = pendaftar.dokumen.map(d => d.id);
                          const allSelected = docIds.every(id => selectedForBulk.has(id));
                          setSelectedForBulk(prev => {
                            const next = new Set(prev);
                            docIds.forEach(id => {
                              if (allSelected) {
                                next.delete(id);
                              } else {
                                next.add(id);
                              }
                            });
                            return next;
                          });
                        }}
                        className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        {pendaftar.dokumen.every(d => selectedForBulk.has(d.id)) ? "Batal Pilih" : "Pilih Semua"}
                      </button>
                    )}
                    {expandedPendaftar.has(pendaftar.id) ? (
                      <ChevronUp className="w-5 h-5 text-stone-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Documents Grid */}
              {expandedPendaftar.has(pendaftar.id) && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendaftar.dokumen.map((dok) => (
                    <div
                      key={dok.id}
                      className={`border-2 rounded-xl overflow-hidden transition-all ${selectedForBulk.has(dok.id)
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-200 hover:border-amber-300"
                        }`}
                    >
                      {/* Document Preview */}
                      <div className="relative aspect-[4/3] bg-stone-100">
                        {dok.file_url ? (
                          isImageFile(dok.file_url) ? (
                            <Image
                              src={dok.file_url}
                              alt={dok.jenis_dokumen}
                              fill
                              className="object-cover cursor-pointer"
                              onClick={() => setPreviewUrl(dok.file_url)}
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                              <FileText className="w-12 h-12 mb-2" />
                              <span className="text-sm">PDF/Dokumen</span>
                            </div>
                          )
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                            <AlertCircle className="w-12 h-12 mb-2" />
                            <span className="text-sm">File tidak tersedia</span>
                          </div>
                        )}

                        {/* Checkbox overlay */}
                        {statusFilter === "pending" && (
                          <button
                            onClick={() => toggleSelectDoc(dok.id)}
                            className={`absolute top-2 left-2 p-1 rounded-lg transition-colors ${selectedForBulk.has(dok.id)
                              ? "bg-amber-500 text-white"
                              : "bg-white/80 text-stone-600 hover:bg-white"
                              }`}
                          >
                            {selectedForBulk.has(dok.id) ? (
                              <CheckSquare className="w-5 h-5" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>
                        )}

                        {/* View button */}
                        {dok.file_url && (
                          <a
                            href={dok.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-lg text-stone-600 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Document Info */}
                      <div className="p-3">
                        <p className="font-bold text-stone-900 mb-1">{dok.jenis_dokumen}</p>
                        <p className="text-xs text-stone-500 mb-3">
                          Diupload: {formatDate(dok.created_at)}
                        </p>

                        {/* Quick Actions */}
                        {statusFilter === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleQuickVerify(dok.id, "verified")}
                              disabled={processingDocs.has(dok.id)}
                              className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                              {processingDocs.has(dok.id) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Check className="w-4 h-4" />
                                  Terima
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                const catatan = prompt("Alasan penolakan (opsional):");
                                if (catatan !== null) {
                                  handleQuickVerify(dok.id, "rejected", catatan || undefined);
                                }
                              }}
                              disabled={processingDocs.has(dok.id)}
                              className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                              {processingDocs.has(dok.id) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <X className="w-4 h-4" />
                                  Tolak
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Status badge for non-pending */}
                        {statusFilter !== "pending" && (
                          <div className={`flex items-center gap-2 py-2 px-3 rounded-lg ${dok.status_verifikasi === "verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}>
                            {dok.status_verifikasi === "verified" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            <span className="text-sm font-medium">
                              {dok.status_verifikasi === "verified" ? "Terverifikasi" : "Ditolak"}
                            </span>
                          </div>
                        )}

                        {dok.catatan && (
                          <p className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                            Catatan: {dok.catatan}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Image Preview Modal */}
      {
        previewUrl && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setPreviewUrl(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <Image
                src={previewUrl}
                alt="Preview"
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
              <button
                onClick={() => setPreviewUrl(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}
