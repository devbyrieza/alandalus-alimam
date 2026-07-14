"use client";

import { useState, useEffect } from "react";
import { Users, Wallet, Loader2, RefreshCw, Clock, FileCheck, CheckCircle2, ClipboardCheck, TrendingUp, ChevronRight, Activity, FileSpreadsheet, FileText, CheckSquare } from "lucide-react";
import { UserRole } from "@/lib/access-control";
import { exportToExcelProfessional, exportToPDF } from "@/lib/utils/export";
import Swal from "sweetalert2";
import { BRANDING } from "@/config/branding";

const StatWidget = ({ label, value, icon: Icon, color, trend, breakdown, onDownload, isDownloading, onPromote, isPromoting }: any) => {
  return (
    <div className="stat-card" style={{ flexDirection: "column", alignItems: "stretch", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="stat-icon" style={{ 
            background: color === 'emerald' ? '#dcfce7' : color === 'rose' ? '#fee2e2' : color === 'amber' ? '#fef9c3' : color === 'purple' ? '#f3e8ff' : '#e0f2fe',
            color: color === 'emerald' ? '#15803d' : color === 'rose' ? '#b91c1c' : color === 'amber' ? '#a16207' : color === 'purple' ? '#7e22ce' : '#0369a1'
          }}>
            <Icon size={24} />
          </div>
          <div>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
          </div>
        </div>

        {onDownload && (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={(e) => { e.stopPropagation(); onDownload("excel"); }}
              disabled={!!isDownloading}
              className="btn btn-ghost btn-sm"
              title="Unduh Excel"
            >
              {isDownloading === "excel" ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDownload("pdf"); }}
              disabled={!!isDownloading}
              className="btn btn-ghost btn-sm"
              title="Unduh PDF"
            >
              {isDownloading === "pdf" ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
            </button>
          </div>
        )}
      </div>

      {onPromote && value > 0 && (
        <div style={{ marginTop: "12px" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onPromote(); }}
            disabled={isPromoting}
            className="btn btn-primary btn-sm"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {isPromoting ? <Loader2 size={14} className="animate-spin" /> : <CheckSquare size={14} />}
            Promosikan Semua
          </button>
        </div>
      )}

      {breakdown && (
        <div style={{ 
          marginTop: "16px", 
          paddingTop: "16px", 
          borderTop: "1px solid var(--border)",
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "16px",
          fontSize: "12px"
        }}>
          <div>
            <div style={{ fontWeight: 700, color: "var(--text-muted)", marginBottom: 4 }}>MTs</div>
            <div>Putra: {breakdown.mts_l || 0}</div>
            <div>Putri: {breakdown.mts_p || 0}</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "var(--text-muted)", marginBottom: 4 }}>IL</div>
            <div>Putra: {breakdown.il_l || 0}</div>
            <div>Putri: {breakdown.il_p || 0}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);
  const [stats, setStats] = useState<any>({ total_pendaftar: 0, sudah_bayar: 0, sedang_seleksi: 0, diterima: 0, daftar_ulang: 0, daftar_ulang_sedang: 0, daftar_ulang_selesai: 0, sudah_isi_data: 0, berkas_lengkap: 0, cadangan: 0, ditolak: 0, waiting_payment: 0, waiting_docs: 0, stats_per_jenjang: [] });
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [isPromotingCadangan, setIsPromotingCadangan] = useState(false);

  const handleSingleCardExport = async (statusKey: string, cardLabel: string, type: "excel" | "pdf") => {
    try {
      setDownloadingKey(`${statusKey}_${type}`);
      const params = new URLSearchParams();
      if (statusKey) params.append("status", statusKey);
      
      const response = await fetch(`/api/admin/pendaftar/export?${params}`);
      if (!response.ok) throw new Error("Failed to export");

      const result = await response.json();
      const rawData: any[] = result.data;
      const filename = `Data_${cardLabel.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}`;

      if (rawData.length === 0) {
        alert("Tidak ada data untuk diunduh");
        return;
      }

      const translateStatus = (st: string) => {
        const map: Record<string, string> = {
          draft: "Draft",
          awaiting_payment: "Draft",
          payment_verification: "Verifikasi Bayar",
          sudah_bayar: "Bayar Pendaftaran",
          sudah_isi_data: "Data Lengkap",
          docs_verified: "Berkas Lengkap",
          selection: "Proses Seleksi",
          accepted: "Diterima",
          announced: "Cadangan",
          rejected: "Ditolak",
          enrolled: "Proses Daftar Ulang",
          enrolled_full: "Lunas Daftar Ulang",
          sudah_daftar_ulang: "Proses Daftar Ulang"
        };
        return map[st] || st;
      };

      const data = rawData.map((item, idx) => ({
        "No.": idx + 1,
        ...item,
        Status: translateStatus(item.Status || "")
      }));

      if (type === "excel") {
        const header = Object.keys(data[0] || {});
        const jenjangGroups: Record<string, any[]> = {};
        data.forEach((item) => {
          const j = item["Jenjang"] || "LAINNYA";
          if (!jenjangGroups[j]) jenjangGroups[j] = [];
          jenjangGroups[j].push(item);
        });

        const sheets = [
          {
            name: "SEMUA PENDAFTAR",
            title: `DATA ${cardLabel.toUpperCase()}`,
            subTitle: `Tanggal Ekspor: ${new Date().toLocaleDateString("id-ID")}`,
            header,
            data: data.map((item) => Object.values(item)),
          },
        ];

        Object.keys(jenjangGroups).sort().forEach((j) => {
          const sheetData = jenjangGroups[j].map((item, idx) => ({ ...item, "No.": idx + 1 }));
          sheets.push({
            name: j.substring(0, 31),
            title: `DATA ${cardLabel.toUpperCase()} - ${j}`,
            subTitle: `Jenjang: ${j} | Tanggal Ekspor: ${new Date().toLocaleDateString("id-ID")}`,
            header,
            data: sheetData.map((item) => Object.values(item)),
          });
        });

        await exportToExcelProfessional({ fileName: filename, sheets });
      } else {
        const headers = ["No.", "No. Pendaftaran", "Nama Lengkap", "JK", "Jenjang", "Asal Sekolah", "No. HP", "Email", "Status"];
        const rows = data.map((item: any, idx: number) => [
          idx + 1,
          item["Nomor Pendaftaran"] || "-",
          item["Nama Lengkap"] || "-",
          (item["Jenis Kelamin"] || "-") === "Laki-laki" ? "L" : "P",
          item["Jenjang"] || "-",
          item["Asal Sekolah"] || "-",
          String(item["No HP"] || "-").replace(/^'/, ""),
          item["Email"] || "-",
          item["Status"] || "-"
        ]);
        exportToPDF(`Data ${cardLabel}`, headers, rows, filename, "landscape");
      }
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setDownloadingKey(null);
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [sR, sesR] = await Promise.all([fetch("/api/admin/stats"), fetch("/api/auth/session")]);
      if (sR.ok) setStats(await sR.json());
      if (sesR.ok) { const d = await sesR.json(); setRole(d.session?.role); }
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchStats(); }, []);

  const isAdminSuper = role === "admin_super" || role === "admin";
  const isAdminKeuangan = role === "admin_keuangan";
  const isAdminBerkas = role === "admin_berkas";

  const handlePromoteAllCadangan = async () => {
    const result = await Swal.fire({
      title: "Promosikan Semua Cadangan",
      text: `Yakin ingin memindahkan semua ${stats.cadangan} Pendaftar Cadangan ke status Diterima?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Ya, Promosikan Semua!`,
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      setIsPromotingCadangan(true);
      const response = await fetch("/api/admin/pendaftar/promote-cadangan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal");

      Swal.fire("Berhasil!", data.message || `${data.updated_count} Pendaftar berhasil dipindahkan ke Diterima.`, "success");
      fetchStats();
    } catch (error: any) {
      Swal.fire("Gagal!", error.message || "Terjadi kesalahan.", "error");
    } finally {
      setIsPromotingCadangan(false);
    }
  };

  const getBreakdown = (type: string) => {
    const mts = stats.stats_per_jenjang?.find((j: any) => j.jenjang === "MTS") || {};
    const il = stats.stats_per_jenjang?.find((j: any) => j.jenjang === "IL") || {};
    if (type === "total") return { mts_l: mts.pendaftar_putra || 0, mts_p: mts.pendaftar_putri || 0, il_l: il.pendaftar_putra || 0, il_p: il.pendaftar_putri || 0 };
    if (type === "lulus") return { mts_l: mts.diterima_putra || 0, mts_p: mts.diterima_putri || 0, il_l: il.diterima_putra || 0, il_p: il.diterima_putri || 0 };
    if (type === "ulang") return { mts_l: mts.ulang_putra || 0, mts_p: mts.ulang_putri || 0, il_l: il.ulang_putra || 0, il_p: il.ulang_putri || 0 };
    if (type === "ulang_sedang") return { mts_l: mts.ulang_sedang_putra || 0, mts_p: mts.ulang_sedang_putri || 0, il_l: il.ulang_sedang_putra || 0, il_p: il.ulang_sedang_putri || 0 };
    if (type === "ulang_selesai") return { mts_l: mts.ulang_selesai_putra || 0, mts_p: mts.ulang_selesai_putri || 0, il_l: il.ulang_selesai_putra || 0, il_p: il.ulang_selesai_putri || 0 };
    if (type === "cadangan") return { mts_l: mts.cadangan_putra || 0, mts_p: mts.cadangan_putri || 0, il_l: il.cadangan_putra || 0, il_p: il.cadangan_putri || 0 };
    if (type === "ditolak") return { mts_l: mts.ditolak_putra || 0, mts_p: mts.ditolak_putri || 0, il_l: il.ditolak_putra || 0, il_p: il.ditolak_putri || 0 };
    if (type === "berkas") return { mts_l: mts.berkas_putra || 0, mts_p: mts.berkas_putri || 0, il_l: il.berkas_putra || 0, il_p: il.berkas_putri || 0 };
    if (type === "seleksi") return { mts_l: mts.seleksi_putra || 0, mts_p: mts.seleksi_putri || 0, il_l: il.seleksi_putra || 0, il_p: il.seleksi_putri || 0 };
    if (type === "bayar") return { mts_l: mts.bayar_putra || 0, mts_p: mts.bayar_putri || 0, il_l: il.bayar_putra || 0, il_p: il.bayar_putri || 0 };
    if (type === "data") return { mts_l: mts.data_putra || 0, mts_p: mts.data_putri || 0, il_l: il.data_putra || 0, il_p: il.data_putri || 0 };
    return null;
  };

  if (loading && stats.total_pendaftar === 0) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <Loader2 size={32} className="animate-spin" style={{ color: "var(--primary)" }} />
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, margin: 0 }}>Dashboard Admin {BRANDING.schoolShortName}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>Pantau perkembangan pendaftaran santri secara langsung.</p>
        </div>
        <button onClick={fetchStats} className="btn btn-secondary btn-sm" disabled={loading}>
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="card" style={{ marginBottom: "24px", background: "linear-gradient(135deg, var(--primary-dark), var(--primary))", color: "white" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "20px", color: "white" }}>Pantau Pendaftaran</h2>
        
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Total Pendaftar</div>
            <div style={{ fontSize: "36px", fontWeight: 800 }}>{stats.total_pendaftar}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Bayar Pendaftaran</div>
            <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--secondary)" }}>{stats.sudah_bayar}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Diterima</div>
            <div style={{ fontSize: "36px", fontWeight: 800 }}>{stats.diterima}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Lunas Daftar Ulang</div>
            <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--secondary)" }}>{stats.daftar_ulang_selesai}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        {isAdminSuper && (
          <>
            <StatWidget label="Total Pendaftar" value={stats.total_pendaftar} icon={Users} color="blue" breakdown={getBreakdown("total")} onDownload={(type: any) => handleSingleCardExport("", "Total Pendaftar", type)} isDownloading={downloadingKey?.startsWith("_") ? downloadingKey.split("_")[1] : null} />
            <StatWidget label="Bayar Pendaftaran" value={stats.sudah_bayar} icon={Wallet} color="emerald" breakdown={getBreakdown("bayar")} onDownload={(type: any) => handleSingleCardExport("sudah_bayar", "Bayar Pendaftaran", type)} isDownloading={downloadingKey?.startsWith("sudah_bayar_") ? downloadingKey.split("_")[2] : null} />
            <StatWidget label="Data Lengkap" value={stats.sudah_isi_data} icon={FileCheck} color="purple" breakdown={getBreakdown("data")} onDownload={(type: any) => handleSingleCardExport("sudah_isi_data", "Data Lengkap", type)} isDownloading={downloadingKey?.startsWith("sudah_isi_data_") ? downloadingKey.split("_")[3] : null} />
            <StatWidget label="Berkas Lengkap" value={stats.berkas_lengkap} icon={ClipboardCheck} color="purple" breakdown={getBreakdown("berkas")} onDownload={(type: any) => handleSingleCardExport("dokumen_terverifikasi", "Berkas Lengkap", type)} isDownloading={downloadingKey?.startsWith("dokumen_terverifikasi_") ? downloadingKey.split("_")[2] : null} />
            <StatWidget label="Proses Seleksi" value={stats.sedang_seleksi} icon={Loader2} color="blue" breakdown={getBreakdown("seleksi")} onDownload={(type: any) => handleSingleCardExport("selection", "Proses Seleksi", type)} isDownloading={downloadingKey?.startsWith("selection_") ? downloadingKey.split("_")[1] : null} />
            <StatWidget label="Diterima" value={stats.diterima} icon={CheckCircle2} color="emerald" breakdown={getBreakdown("lulus")} onDownload={(type: any) => handleSingleCardExport("diterima", "Diterima", type)} isDownloading={downloadingKey?.startsWith("diterima_") ? downloadingKey.split("_")[1] : null} />
            <StatWidget label="Cadangan" value={stats.cadangan} icon={Clock} color="amber" breakdown={getBreakdown("cadangan")} onDownload={(type: any) => handleSingleCardExport("announced", "Cadangan", type)} isDownloading={downloadingKey?.startsWith("announced_") ? downloadingKey.split("_")[1] : null} onPromote={handlePromoteAllCadangan} isPromoting={isPromotingCadangan} />
            <StatWidget label="Ditolak" value={stats.ditolak} icon={Activity} color="rose" breakdown={getBreakdown("ditolak")} onDownload={(type: any) => handleSingleCardExport("pembayaran_ditolak", "Ditolak", type)} isDownloading={downloadingKey?.startsWith("pembayaran_ditolak_") ? downloadingKey.split("_")[2] : null} />
            <StatWidget label="Proses Daftar Ulang" value={stats.daftar_ulang_sedang} icon={Wallet} color="amber" breakdown={getBreakdown("ulang_sedang")} onDownload={(type: any) => handleSingleCardExport("enrolled", "Proses Daftar Ulang", type)} isDownloading={downloadingKey?.startsWith("enrolled_") ? downloadingKey.split("_")[1] : null} />
            <StatWidget label="Lunas Daftar Ulang" value={stats.daftar_ulang_selesai} icon={CheckCircle2} color="emerald" breakdown={getBreakdown("ulang_selesai")} onDownload={(type: any) => handleSingleCardExport("enrolled_full", "Lunas Daftar Ulang", type)} isDownloading={downloadingKey?.startsWith("enrolled_full_") ? downloadingKey.split("_")[1] : null} />
          </>
        )}
        {isAdminBerkas && (
          <>
            <StatWidget label="Total Pendaftar" value={stats.total_pendaftar} icon={Users} color="blue" />
            <StatWidget label="Lengkap Berkas" value={stats.sudah_isi_data} icon={FileCheck} color="purple" />
            <StatWidget label="Menunggu Verifikasi" value={stats.waiting_docs} icon={Clock} color="amber" />
          </>
        )}
        {isAdminKeuangan && (
          <>
            <StatWidget label="Total Pendaftar" value={stats.total_pendaftar} icon={Users} color="blue" />
            <StatWidget label="Sudah Bayar" value={stats.sudah_bayar} icon={Wallet} color="emerald" />
            <StatWidget label="Menunggu Verifikasi" value={stats.waiting_payment} icon={Clock} color="amber" />
          </>
        )}
      </div>

      {(isAdminSuper || isAdminBerkas || isAdminKeuangan) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="card">
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={20} color="var(--primary)" />
              Statistik Pendaftaran
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Total Lunas</div>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)" }}>{stats.sudah_bayar}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Data Komplit</div>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)" }}>{stats.sudah_isi_data}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Antrean Aktif</div>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)" }}>{stats.waiting_payment + stats.waiting_docs}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Tingkat Kelulusan</div>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--success)" }}>
                  {stats.total_pendaftar > 0 ? Math.round((stats.diterima / stats.total_pendaftar) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={20} color="var(--primary)" />
              Aksi Cepat
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "var(--bg)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 40, height: 40, background: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 800 }}>Cek Dokumen</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Verifikasi berkas santri baru</div>
                  </div>
                </div>
                <div style={{ fontSize: "24px", fontWeight: 800 }}>{stats.waiting_docs}</div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "var(--bg)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 40, height: 40, background: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--success)" }}>
                    <Wallet size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 800 }}>Cek Pembayaran</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Konfirmasi bukti transfer</div>
                  </div>
                </div>
                <div style={{ fontSize: "24px", fontWeight: 800 }}>{stats.waiting_payment}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
