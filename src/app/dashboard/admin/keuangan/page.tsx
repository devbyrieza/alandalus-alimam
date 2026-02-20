"use client";

import { useState, useEffect } from "react";
import { Download, Search, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Alert from "@/components/ui/Alert";
import * as XLSX from "xlsx"; // Ensure xlsx is installed, if not, use csv generation manually

interface RekapItem {
    no: number;
    nama: string;
    nomor_pendaftaran: string;
    status_kelulusan: string;
    total_bayar: number;
    tipe_cicilan: string; // LUNAS, CICIL_50_LEBIH, CICIL_DIBAWAH_50, BELUM_BAYAR
    sisa_tagihan: number;
    last_updated: string;
}

export default function KeuanganPage() {
    const [data, setData] = useState<RekapItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRekap();
    }, []);

    const fetchRekap = async () => {
        try {
            setLoading(true);
            // We need a new endpoint for this: /api/admin/keuangan/rekap
            // Or we can fetch pendaftar list and payments then join client side?
            // Better to have backend endpoint.
            // But for speed, let's try fetching pendaftar list first if endpoint exists.
            // Since we don't have dedicated endpoint yet, let's mock or build one?
            // Wait, "ATUR SEBAIK MUNGKIN JUGA FITUR DOWNLOAD/UNDUH".
            // I should create a route for this data: /api/admin/rekap-keuangan

            const res = await fetch("/api/admin/rekap-keuangan"); // Will create this next
            if (!res.ok) throw new Error("Gagal mengambil data keuangan");

            const json = await res.json();
            setData(json.data);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        if (data.length === 0) return;

        const exportData = data.map(item => ({
            "No": item.no,
            "Nama Santri": item.nama,
            "Nomor Pendaftaran": item.nomor_pendaftaran,
            "Status Kelulusan": item.status_kelulusan,
            "Total Bayar (Rp)": item.total_bayar,
            "Status Bayar": item.tipe_cicilan.replace(/_/g, " "),
            "Sisa Tagihan (Rp)": item.sisa_tagihan,
            "Terakhir Update": item.last_updated
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Rekap Keuangan");
        XLSX.writeFile(wb, `Rekap_Keuangan_Daftar_Ulang_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.nomor_pendaftaran.includes(search)
    );

    if (loading) return <div className="p-8"><Loader2 className="animate-spin mx-auto" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Rekap Keuangan Daftar Ulang</h1>
                    <p className="text-slate-500">Monitoring status pembayaran santri yang lulus</p>
                </div>
                <button
                    onClick={handleExport}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-md transition-colors"
                >
                    <Download className="w-4 h-4" /> Export Excel
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari nama santri atau nomor pendaftaran..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>

            {error && <Alert type="error">{error}</Alert>}

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 w-16">No</th>
                                <th className="px-6 py-3">Nama Santri</th>
                                <th className="px-6 py-3">Status Kelulusan</th>
                                <th className="px-6 py-3">Total Bayar</th>
                                <th className="px-6 py-3">Status Bayar</th>
                                <th className="px-6 py-3">Sisa Tagihan</th>
                                <th className="px-6 py-3">Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.length > 0 ? (
                                filteredData.map((row) => (
                                    <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3 text-center">{row.no}</td>
                                        <td className="px-6 py-3 font-medium text-slate-900">
                                            {row.nama}
                                            <div className="text-xs text-slate-400 font-normal">{row.nomor_pendaftaran}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs font-bold">
                                                {row.status_kelulusan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 font-mono text-slate-700">{formatCurrency(row.total_bayar)}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold border ${row.tipe_cicilan === 'LUNAS' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                                    row.tipe_cicilan === 'BELUM_BAYAR' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                {row.tipe_cicilan.replace(/_/g, " ")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 font-mono text-slate-500">{formatCurrency(row.sisa_tagihan)}</td>
                                        <td className="px-6 py-3 text-xs text-slate-400">{new Date(row.last_updated).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                                        Tidak ada data ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
