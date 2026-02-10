"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  FileText,
  Calendar,
  Phone,
  Mail,
  Hash,
  CheckSquare,
  Square,
  Download,
  Edit,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { UserRole } from "@/lib/access-control";

// Filter labels for dashboard categories
const FILTER_LABELS: Record<string, string> = {
  belum_bayar: "Belum Bayar",
  menunggu_verifikasi_pembayaran: "Menunggu Verifikasi Pembayaran",
  sudah_bayar: "Sudah Bayar",
  pembayaran_ditolak: "Pembayaran Ditolak",
  belum_isi_data: "Belum Isi Data Lengkap",
  sudah_isi_data: "Sudah Isi Data Lengkap",
  belum_upload_dokumen: "Belum Upload Dokumen",
  menunggu_verifikasi_dokumen: "Menunggu Verifikasi Dokumen",
  dokumen_terverifikasi: "Dokumen Terverifikasi",
  dokumen_ditolak: "Dokumen Ditolak",
  terjadwal_ujian: "Terjadwal Ujian & Wawancara",
  belum_ujian: "Belum Ujian & Wawancara",
  sudah_ujian: "Sudah Ujian & Wawancara",
  hasil_ujian: "Hasil Ujian & Wawancara",
  diterima: "Diterima",
  belum_daftar_ulang: "Belum Daftar Ulang",
  sudah_daftar_ulang: "Sudah Daftar Ulang",
};

interface Pendaftar {
  id: string;
  nomor_pendaftaran: string;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  jenjang: string;
  tanggal_lahir: string | null;
  no_hp: string | null;
  email: string | null;
  status_pendaftaran: string;
  created_at: string;
  tahun_ajaran: {
    nama: string;
  } | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TahunAjaran {
  id: string;
  nama: string;
  tahun_mulai: number;
  tahun_selesai: number;
  is_active: boolean;
}

function AdminPendaftarContent() {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get("filter") || "";

  const [pendaftar, setPendaftar] = useState<Pendaftar[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState(urlFilter);
  const [jenjangFilter, setJenjangFilter] = useState("");
  const [tahunAjaranFilter, setTahunAjaranFilter] = useState("");
  const [tahunAjaranList, setTahunAjaranList] = useState<TahunAjaran[]>([]);
  // Location filters
  const [provinsiFilter, setProvinsiFilter] = useState("");
  const [kabupatenFilter, setKabupatenFilter] = useState("");
  const [kecamatanFilter, setKecamatanFilter] = useState("");
  const [kelurahanFilter, setKelurahanFilter] = useState("");

  // Update filter when URL changes
  useEffect(() => {
    if (urlFilter) {
      setStatusFilter(urlFilter);
    }
  }, [urlFilter]);

  const [provinsiList, setProvinsiList] = useState<string[]>([]);
  const [kabupatenList, setKabupatenList] = useState<string[]>([]);
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const [kelurahanList, setKelurahanList] = useState<string[]>([]);
  // Loading states for location dropdowns
  const [provinsiLoading, setProvinsiLoading] = useState(false);
  const [kabupatenLoading, setKabupatenLoading] = useState(false);
  const [kecamatanLoading, setKecamatanLoading] = useState(false);
  const [kelurahanLoading, setKelurahanLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState("");
  const [bulkUpdating, setBulkUpdating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchPendaftar = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (jenjangFilter) params.append("jenjang", jenjangFilter);
      if (tahunAjaranFilter) params.append("tahun_ajaran", tahunAjaranFilter);
      if (provinsiFilter) params.append("provinsi", provinsiFilter);
      if (kabupatenFilter) params.append("kabupaten", kabupatenFilter);
      if (kecamatanFilter) params.append("kecamatan", kecamatanFilter);
      if (kelurahanFilter) params.append("kelurahan", kelurahanFilter);

      const response = await fetch(`/api/admin/pendaftar/list?${params}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setPendaftar(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching pendaftar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendaftar();
  }, [
    pagination.page,
    search,
    statusFilter,
    jenjangFilter,
    tahunAjaranFilter,
    provinsiFilter,
    kabupatenFilter,
    kecamatanFilter,
    kelurahanFilter,
  ]);

  useEffect(() => {
    // Fetch tahun ajaran list
    const fetchTahunAjaran = async () => {
      try {
        const response = await fetch("/api/admin/tahun-ajaran");
        if (response.ok) {
          const result = await response.json();
          setTahunAjaranList(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching tahun ajaran:", error);
      }
    };
    fetchTahunAjaran();
    // Fetch provinsi list
    const fetchProvinsi = async () => {
      try {
        setProvinsiLoading(true);
        const response = await fetch("/api/admin/locations/provinsi");
        if (response.ok) {
          const result = await response.json();
          setProvinsiList(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching provinsi:", error);
      } finally {
        setProvinsiLoading(false);
      }
    };
    fetchProvinsi();

    // Fetch Role
    const fetchRole = async () => {
      try {
        setIsRoleLoading(true);
        const sessionRes = await fetch("/api/auth/session");
        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();
          // Fix: Read from session.role based on API structure
          if (sessionData.session?.role) {
            setRole(sessionData.session.role as UserRole);
          } else if (sessionData.user?.user_metadata?.role) {
            // Fallback for standard supabase session
            setRole(sessionData.user.user_metadata.role as UserRole);
          }
        }
      } catch (e) {
        console.error("Error fetching role", e);
      } finally {
        setIsRoleLoading(false);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    // when provinsi changes, load kabupaten and reset lower selections
    if (!provinsiFilter) {
      setKabupatenList([]);
      setKabupatenFilter("");
      setKecamatanList([]);
      setKecamatanFilter("");
      setKelurahanList([]);
      setKelurahanFilter("");
      return;
    }

    const fetchKabupaten = async () => {
      try {
        setKabupatenLoading(true);
        const response = await fetch(
          `/api/admin/locations/kabupaten?provinsi=${encodeURIComponent(provinsiFilter)}`
        );
        if (response.ok) {
          const result = await response.json();
          setKabupatenList(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching kabupaten:", error);
      } finally {
        setKabupatenLoading(false);
      }
    };
    fetchKabupaten();
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [provinsiFilter]);

  useEffect(() => {
    if (!kabupatenFilter || !provinsiFilter) {
      setKecamatanList([]);
      setKecamatanFilter("");
      setKelurahanList([]);
      setKelurahanFilter("");
      return;
    }

    const fetchKecamatan = async () => {
      try {
        setKecamatanLoading(true);
        const params = new URLSearchParams({
          provinsi: provinsiFilter,
          kabupaten: kabupatenFilter,
        });
        const response = await fetch(`/api/admin/locations/kecamatan?${params}`);
        if (response.ok) {
          const result = await response.json();
          setKecamatanList(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching kecamatan:", error);
      } finally {
        setKecamatanLoading(false);
      }
    };
    fetchKecamatan();
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [kabupatenFilter, provinsiFilter]);

  useEffect(() => {
    if (!kecamatanFilter || !kabupatenFilter || !provinsiFilter) {
      setKelurahanList([]);
      setKelurahanFilter("");
      return;
    }

    const fetchKelurahan = async () => {
      try {
        setKelurahanLoading(true);
        const params = new URLSearchParams({
          provinsi: provinsiFilter,
          kabupaten: kabupatenFilter,
          kecamatan: kecamatanFilter,
        });
        const response = await fetch(`/api/admin/locations/kelurahan?${params}`);
        if (response.ok) {
          const result = await response.json();
          setKelurahanList(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching kelurahan:", error);
      } finally {
        setKelurahanLoading(false);
      }
    };
    fetchKelurahan();
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [kecamatanFilter, kabupatenFilter, provinsiFilter]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    setSelectedIds([]); // Clear selections when changing page
  };

  const handleSelectAll = () => {
    if (selectedIds.length === pendaftar.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendaftar.map((p) => p.id));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkUpdate = async () => {
    if (!bulkStatus || selectedIds.length === 0) {
      alert("Pilih status dan minimal 1 pendaftar");
      return;
    }

    if (!confirm(`Update status ${selectedIds.length} pendaftar menjadi ${bulkStatus}?`)) {
      return;
    }

    try {
      setBulkUpdating(true);
      const response = await fetch("/api/admin/pendaftar/bulk-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, status_pendaftaran: bulkStatus }),
      });

      if (!response.ok) throw new Error("Failed to update");

      alert("Berhasil update status!");
      setSelectedIds([]);
      setBulkStatus("");
      fetchPendaftar();
    } catch (error) {
      console.error("Error bulk updating:", error);
      alert("Gagal update status");
    } finally {
      setBulkUpdating(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (jenjangFilter) params.append("jenjang", jenjangFilter);
      if (tahunAjaranFilter) params.append("tahun_ajaran", tahunAjaranFilter);

      const response = await fetch(`/api/admin/pendaftar/export?${params}`);
      if (!response.ok) throw new Error("Failed to export");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pendaftar-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Gagal export data");
    } finally {
      setExporting(false);
    }
  };

  // Role Helpers
  // Default to false if loading or no role found, to prevent unauthorized view
  const canViewKeuangan = !isRoleLoading && role !== null && (role === 'admin_keuangan' || role === 'admin_super' || role === 'admin');
  const canViewBerkas = !isRoleLoading && role !== null && (role === 'admin_berkas' || role === 'admin_super' || role === 'admin');
  const canViewSeleksi = !isRoleLoading && role !== null && (role === 'admin_super' || role === 'admin' || role === 'penguji');
  // Note: If role is null after loading, user shouldn't see sensitive columns.

  const formatStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      draft: { label: "Draft", color: "bg-stone-100 text-stone-700" },
      waiting_payment: { label: "Menunggu Pembayaran", color: "bg-amber-100 text-amber-700" },
      awaiting_payment: { label: "Menunggu Pembayaran", color: "bg-amber-100 text-amber-700" },
      payment_verification: { label: "Verifikasi Pembayaran", color: "bg-orange-100 text-orange-700" },
      payment_rejected: { label: "Pembayaran Ditolak", color: "bg-red-100 text-red-700" },
      paid: { label: "Sudah Bayar", color: "bg-blue-100 text-blue-700" },
      data_completed: { label: "Data Lengkap", color: "bg-teal-100 text-teal-700" },
      docs_uploaded: { label: "Dokumen Terupload", color: "bg-indigo-100 text-indigo-700" },
      docs_verified: { label: "Dokumen Terverifikasi", color: "bg-green-100 text-green-700" },
      docs_rejected: { label: "Dokumen Ditolak", color: "bg-red-100 text-red-700" },
      scheduled: { label: "Terjadwal Ujian", color: "bg-purple-100 text-purple-700" },
      exam_scheduled: { label: "Terjadwal Ujian", color: "bg-purple-100 text-purple-700" },
      exam_completed: { label: "Sudah Ujian", color: "bg-violet-100 text-violet-700" },
      tested: { label: "Sudah Ujian", color: "bg-violet-100 text-violet-700" },
      announced: { label: "Diumumkan", color: "bg-cyan-100 text-cyan-700" },
      accepted: { label: "Diterima", color: "bg-green-100 text-green-700" },
      rejected: { label: "Ditolak", color: "bg-red-100 text-red-700" },
      enrolled: { label: "Terdaftar", color: "bg-emerald-100 text-emerald-700" },
      // Fix for legacy/seed data
      verified: { label: "Terverifikasi", color: "bg-green-100 text-green-700" },
    };

    const statusInfo = statusMap[status] || { label: status, color: "bg-stone-100 text-stone-700" };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get active filter label
  const activeFilterLabel = FILTER_LABELS[statusFilter] || "";

  return (
    <div className="space-y-6">
      {/* Back to Dashboard link when filtered */}
      {urlFilter && (
        <Link
          href="/dashboard/admin"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-stone-900">
                {activeFilterLabel || "Daftar Pendaftar"}
              </h2>
              <p className="text-stone-600">
                Total: {pagination.total} pendaftar
                {activeFilterLabel && " (difilter)"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Export CSV
            </button>
            <button
              onClick={fetchPendaftar}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Cari Pendaftar
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Cari nama, NIK, atau nomor pendaftaran..."
                className="flex-1 px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Cari
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Filter Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Semua Status</option>

              {canViewKeuangan && (
                <optgroup label="--- Pembayaran ---">
                  <option value="belum_bayar">Belum Bayar</option>
                  <option value="menunggu_verifikasi_pembayaran">Menunggu Verifikasi Pembayaran</option>
                  <option value="sudah_bayar">Sudah Bayar</option>
                  <option value="pembayaran_ditolak">Pembayaran Ditolak</option>
                </optgroup>
              )}

              {canViewBerkas && (
                <>
                  <optgroup label="--- Data Lengkap ---">
                    <option value="belum_isi_data">Belum Isi Data Lengkap</option>
                    <option value="sudah_isi_data">Sudah Isi Data Lengkap</option>
                  </optgroup>
                  <optgroup label="--- Dokumen ---">
                    <option value="belum_upload_dokumen">Belum Upload Dokumen</option>
                    <option value="menunggu_verifikasi_dokumen">Menunggu Verifikasi Dokumen</option>
                    <option value="dokumen_terverifikasi">Dokumen Terverifikasi</option>
                    <option value="dokumen_ditolak">Dokumen Ditolak</option>
                  </optgroup>
                </>
              )}

              {canViewSeleksi && (
                <>
                  <optgroup label="--- Ujian & Wawancara ---">
                    <option value="terjadwal_ujian">Terjadwal Ujian</option>
                    <option value="belum_ujian">Belum Ujian</option>
                    <option value="sudah_ujian">Sudah Ujian</option>
                    <option value="hasil_ujian">Hasil Ujian</option>
                  </optgroup>
                  <optgroup label="--- Penerimaan ---">
                    <option value="diterima">Diterima</option>
                    <option value="belum_daftar_ulang">Belum Daftar Ulang</option>
                    <option value="sudah_daftar_ulang">Sudah Daftar Ulang</option>
                  </optgroup>
                </>
              )}

              <optgroup label="--- Status Individual ---">
                <option value="draft">Draft</option>
                {canViewKeuangan && (
                  <>
                    <option value="payment_verification">Verifikasi Pembayaran</option>
                    <option value="paid">Sudah Bayar (paid)</option>
                  </>
                )}
                <option value="data_completed">Data Lengkap</option>
                <option value="docs_uploaded">Dokumen Terupload</option>
                <option value="docs_verified">Dokumen Terverifikasi</option>
                <option value="scheduled">Terjadwal Ujian</option>
                <option value="accepted">Diterima</option>
                <option value="rejected">Ditolak</option>
                <option value="enrolled">Terdaftar</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Jenjang Filter */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Filter Jenjang
            </label>
            <select
              value={jenjangFilter}
              onChange={(e) => {
                setJenjangFilter(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Semua Jenjang</option>
              <option value="MTs">MTs (Madrasah Tsanawiyah)</option>
              <option value="IL">I'dadiyah Lughawiy</option>
            </select>
          </div>

          {/* Tahun Ajaran Filter */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Filter Tahun Ajaran
            </label>
            <select
              value={tahunAjaranFilter}
              onChange={(e) => {
                setTahunAjaranFilter(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Semua Tahun Ajaran</option>
              {tahunAjaranList.map((ta) => (
                <option key={ta.id} value={ta.id}>
                  {ta.nama} {ta.is_active && "⭐"}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(search || statusFilter || jenjangFilter || tahunAjaranFilter) && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                  setStatusFilter("");
                  setJenjangFilter("");
                  setTahunAjaranFilter("");
                  // Clear location filters
                  setProvinsiFilter("");
                  setKabupatenFilter("");
                  setKecamatanFilter("");
                  setKelurahanFilter("");
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Location cascading filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Provinsi {provinsiLoading && <span className="inline-block ml-2 text-xs text-stone-500">Memuat...</span>}
            </label>
            <select
              value={provinsiFilter}
              onChange={(e) => setProvinsiFilter(e.target.value)}
              aria-label="Filter provinsi"
              aria-busy={provinsiLoading}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Semua Provinsi</option>
              {provinsiList.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Kabupaten / Kota {kabupatenLoading && <span className="inline-block ml-2 text-xs text-stone-500">Memuat...</span>}
            </label>
            <select
              value={kabupatenFilter}
              onChange={(e) => setKabupatenFilter(e.target.value)}
              disabled={kabupatenList.length === 0 || kabupatenLoading}
              aria-label="Filter kabupaten atau kota"
              aria-busy={kabupatenLoading}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none disabled:opacity-50"
            >
              <option value="">Semua Kabupaten / Kota</option>
              {kabupatenList.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Kecamatan {kecamatanLoading && <span className="inline-block ml-2 text-xs text-stone-500">Memuat...</span>}
            </label>
            <select
              value={kecamatanFilter}
              onChange={(e) => setKecamatanFilter(e.target.value)}
              disabled={kecamatanList.length === 0 || kecamatanLoading}
              aria-label="Filter kecamatan"
              aria-busy={kecamatanLoading}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none disabled:opacity-50"
            >
              <option value="">Semua Kecamatan</option>
              {kecamatanList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Kelurahan {kelurahanLoading && <span className="inline-block ml-2 text-xs text-stone-500">Memuat...</span>}
            </label>
            <select
              value={kelurahanFilter}
              onChange={(e) => setKelurahanFilter(e.target.value)}
              disabled={kelurahanList.length === 0 || kelurahanLoading}
              aria-label="Filter kelurahan"
              aria-busy={kelurahanLoading}
              className="w-full px-4 py-2 border-2 border-stone-200 rounded-lg focus:border-blue-500 focus:outline-none disabled:opacity-50"
            >
              <option value="">Semua Kelurahan</option>
              {kelurahanList.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-4 border-2 border-purple-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-900">
                  {selectedIds.length} item terpilih
                </span>
              </div>
              <button
                onClick={() => setSelectedIds([])}
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                Batalkan pilihan
              </button>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
                className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="" disabled={bulkStatus !== ""}>Pilih status baru...</option>
                <option value="draft">Draft</option>
                <option value="awaiting_payment">Menunggu Pembayaran</option>
                <option value="paid">Sudah Bayar</option>
                <option value="data_completed">Data Lengkap</option>
                <option value="docs_uploaded">Dokumen Terupload</option>
                <option value="docs_verified">Dokumen Terverifikasi</option>
                <option value="scheduled">Terjadwal Ujian</option>
                <option value="tested">Sudah Ujian</option>
                <option value="announced">Diumumkan</option>
                <option value="accepted">Diterima</option>
                <option value="rejected">Ditolak</option>
                <option value="enrolled">Terdaftar</option>
              </select>

              <button
                onClick={handleBulkUpdate}
                disabled={!bulkStatus || bulkUpdating}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bulkUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Update Status
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-stone-600">Memuat data pendaftar...</p>
            </div>
          </div>
        ) : pendaftar.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-600 text-lg font-medium">
              Tidak ada pendaftar ditemukan
            </p>
            <p className="text-stone-500 text-sm mt-2">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
                  <tr>
                    <th className="px-4 py-3 text-center">
                      <button
                        onClick={handleSelectAll}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {selectedIds.length === pendaftar.length ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      No. Pendaftaran
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Nama Lengkap
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      NIK
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Jenjang
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Status
                    </th>
                    {canViewKeuangan && (
                      <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                        Pembayaran
                      </th>
                    )}
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Kontak
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Tanggal Daftar
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {pendaftar.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-blue-50 transition-colors ${selectedIds.includes(item.id) ? "bg-purple-50" : ""
                        }`}
                    >
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleSelectOne(item.id)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          {selectedIds.includes(item.id) ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-blue-600" />
                          <span className="font-mono text-sm font-bold text-blue-700">
                            {item.nomor_pendaftaran}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-bold text-stone-900">
                            {item.nama_lengkap}
                          </div>
                          <div className="text-xs text-stone-500">
                            {item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm text-stone-700">
                          {item.nik}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                          {item.jenjang}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {formatStatus(item.status_pendaftaran)}
                      </td>
                      {canViewKeuangan && (
                        <td className="px-4 py-3">
                          {/* @ts-ignore */}
                          {item.pembayaran?.length > 0 ? (
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              /* @ts-ignore */
                              item.pembayaran[0].status_pembayaran === 'verified' ? 'bg-green-100 text-green-700' :
                                /* @ts-ignore */
                                item.pembayaran[0].status_pembayaran === 'pending' ? 'bg-amber-100 text-amber-700' :
                                  'bg-stone-100 text-stone-700'
                              }`}>
                              {/* @ts-ignore */}
                              {item.pembayaran[0].status_pembayaran === 'verified' ? 'Lunas' :
                                /* @ts-ignore */
                                item.pembayaran[0].status_pembayaran === 'pending' ? 'Cek' : 'Belum'}
                            </span>
                          ) : (
                            <span className="text-stone-400 text-xs">-</span>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <div className="text-sm space-y-1">
                          {item.no_hp && (
                            <div className="flex items-center gap-1 text-stone-600">
                              <Phone className="w-3 h-3" />
                              <span className="text-xs">{item.no_hp}</span>
                            </div>
                          )}
                          {item.email && (
                            <div className="flex items-center gap-1 text-stone-600">
                              <Mail className="w-3 h-3" />
                              <span className="text-xs truncate max-w-[150px]">
                                {item.email}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-stone-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {formatDate(item.created_at)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link
                          href={`/dashboard/admin/pendaftar/${item.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Buka Detail</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-stone-50 px-6 py-4 border-t-2 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-stone-600">
                  Menampilkan{" "}
                  <span className="font-bold text-stone-900">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-bold text-stone-900">
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  dari{" "}
                  <span className="font-bold text-stone-900">
                    {pagination.total}
                  </span>{" "}
                  pendaftar
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-white border-2 border-stone-200 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Show first, last, current, and adjacent pages
                        return (
                          page === 1 ||
                          page === pagination.totalPages ||
                          Math.abs(page - pagination.page) <= 1
                        );
                      })
                      .map((page, idx, arr) => (
                        <div key={page} className="flex items-center gap-2">
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="text-stone-500">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${page === pagination.page
                              ? "bg-blue-600 text-white"
                              : "bg-white border-2 border-stone-200 hover:bg-blue-50 hover:border-blue-300"
                              }`}
                          >
                            {page}
                          </button>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 bg-white border-2 border-stone-200 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminPendaftarPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-stone-600 font-medium">Memuat halaman...</p>
        </div>
      </div>
    }>
      <AdminPendaftarContent />
    </Suspense>
  );
}
