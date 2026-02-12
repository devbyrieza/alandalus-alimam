"use client";

import { useState, useEffect, useCallback, use } from "react";
import {
    FileCheck,
    CheckCircle,
    XCircle,
    Loader2,
    RefreshCw,
    User,
    FileText,
    AlertCircle,
    Check,
    X,
    Image as ImageIcon,
    ExternalLink,
    ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Dokumen {
    id: string;
    jenis_dokumen: string;
    status_verifikasi: string;
    is_verified: boolean;
    catatan: string | null;
    file_url: string | null;
    file_type: string | null;
    created_at: string;
    updated_at: string;
    pendaftar_id: string;
}

interface PendaftarInfo {
    id: string;
    nomor_pendaftaran: string;
    nama_lengkap: string;
    jenjang: string;
    no_hp: string | null;
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

export default function VerifikasiDokumenDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [pendaftar, setPendaftar] = useState<PendaftarInfo | null>(null);
    const [dokumenList, setDokumenList] = useState<Dokumen[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingDocs, setProcessingDocs] = useState<Set<string>>(new Set());
    const [previewDoc, setPreviewDoc] = useState<{ url: string; type: string | null; label: string } | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            // We use status=all but filter by pendaftar_id
            const response = await fetch(
                `/api/admin/verifikasi/dokumen?pendaftar_id=${id}&status=all`
            );
            if (!response.ok) throw new Error("Failed to fetch");

            const result = await response.json();

            if (result.data && result.data.length > 0) {
                const firstDoc = result.data[0];
                setPendaftar(firstDoc.pendaftar);

                const docs = result.data.map((d: any) => ({
                    id: d.id,
                    jenis_dokumen: d.jenis_dokumen,
                    status_verifikasi: d.is_verified ? "verified" : (d.catatan ? "rejected" : "pending"),
                    is_verified: d.is_verified,
                    catatan: d.catatan,
                    file_url: d.file_url,
                    file_type: d.file_type,
                    created_at: d.created_at,
                    updated_at: d.updated_at,
                    pendaftar_id: id,
                }));

                // Sort documents
                docs.sort((a: any, b: any) => {
                    const aIndex = JENIS_DOKUMEN_ORDER.indexOf(a.jenis_dokumen);
                    const bIndex = JENIS_DOKUMEN_ORDER.indexOf(b.jenis_dokumen);
                    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
                });

                setDokumenList(docs);
            } else {
                // Handle case where no documents found or applicant doesn't exist/has no docs
                // We might want to fetch pendaftar info separately if needed, 
                // but for now let's assume if there are no docs, we just show empty
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleVerify = async (dokumenId: string, status: "verified" | "rejected", catatan?: string) => {
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

            // Update local state
            setDokumenList(prev => prev.map(d => {
                if (d.id === dokumenId) {
                    return {
                        ...d,
                        status_verifikasi: status,
                        is_verified: status === "verified",
                        catatan: status === "verified" ? null : (catatan || d.catatan)
                    };
                }
                return d;
            }));
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const isImageFile = (dok: Dokumen) => {
        if (dok.file_type) return dok.file_type.startsWith("image/");
        if (!dok.file_url) return false;
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(dok.file_url);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 animate-spin text-amber-600 mb-4" />
                <p className="text-stone-600">Memuat berkas pendaftar...</p>
            </div>
        );
    }

    if (!pendaftar && !loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-10 border-2 border-amber-100 text-center">
                <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Data Tidak Ditemukan</h2>
                <p className="text-stone-600 mb-6">Pendaftar ini belum mengunggah berkas apapun atau data salah.</p>
                <button
                    onClick={() => router.back()}
                    className="btn-secondary"
                >
                    Kembali ke Daftar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-stone-100 rounded-lg text-stone-500 transition-colors"
                            title="Kembali"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-stone-900">
                                {pendaftar?.nama_lengkap}
                            </h2>
                            <div className="flex items-center gap-3 text-stone-600">
                                <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-sm">{pendaftar?.nomor_pendaftaran}</span>
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold uppercase">
                                    {pendaftar?.jenjang}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dokumenList.map((dok) => (
                    <div
                        key={dok.id}
                        className={`bg-white border-2 rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md ${dok.status_verifikasi === "verified"
                            ? "border-emerald-100"
                            : dok.status_verifikasi === "rejected"
                                ? "border-rose-100"
                                : "border-amber-100"
                            }`}
                    >
                        {/* Document Preview */}
                        <div className="relative aspect-[4/3] bg-stone-100">
                            {dok.file_url ? (
                                isImageFile(dok) ? (
                                    <img
                                        src={dok.file_url}
                                        alt={dok.jenis_dokumen}
                                        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                                        onClick={() => setPreviewDoc({ url: dok.file_url!, type: dok.file_type, label: dok.jenis_dokumen })}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                                        <FileText className="w-16 h-16 mb-2" />
                                        <span className="text-sm font-medium">Dokumen PDF</span>
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={() => setPreviewDoc({ url: dok.file_url!, type: dok.file_type, label: dok.jenis_dokumen })}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
                                            >
                                                Pratinjau
                                            </button>
                                            <a
                                                href={dok.file_url}
                                                target="_blank"
                                                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg text-xs font-bold transition-all"
                                            >
                                                Tab Baru
                                            </a>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                                    <AlertCircle className="w-12 h-12 mb-2" />
                                    <span className="text-sm">File tidak tersedia</span>
                                </div>
                            )}

                            {/* View button overlay for images */}
                            {dok.file_url && isImageFile(dok) && (
                                <a
                                    href={dok.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-xl text-stone-700 shadow-sm transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>

                        {/* Document Info */}
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-stone-900 capitalize">{dok.jenis_dokumen.replace(/_/g, " ")}</h3>
                                {dok.status_verifikasi === "verified" ? (
                                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                                        <CheckCircle className="w-3 h-3" />
                                        Verified
                                    </div>
                                ) : dok.status_verifikasi === "rejected" ? (
                                    <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                                        <XCircle className="w-3 h-3" />
                                        Rejected
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                                        <RefreshCw className="w-3 h-3" />
                                        Pending
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-stone-500 mb-4">
                                Diupload: {formatDate(dok.created_at)}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleVerify(dok.id, "verified")}
                                    disabled={processingDocs.has(dok.id) || dok.status_verifikasi === "verified"}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${dok.status_verifikasi === "verified"
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default"
                                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
                                        }`}
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
                                        const catatan = prompt("Alasan penolakan:", dok.catatan || "");
                                        if (catatan !== null) {
                                            handleVerify(dok.id, "rejected", catatan || undefined);
                                        }
                                    }}
                                    disabled={processingDocs.has(dok.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${dok.status_verifikasi === "rejected"
                                        ? "bg-rose-50 text-rose-600 border border-rose-100"
                                        : "bg-white border-2 border-stone-100 hover:border-rose-200 hover:text-rose-600 text-stone-600 active:scale-95 disabled:opacity-50"
                                        }`}
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

                            {dok.catatan && (
                                <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                                    <p className="text-[10px] font-bold text-rose-800 uppercase mb-1">Catatan Penolakan:</p>
                                    <p className="text-xs text-rose-700">{dok.catatan}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Image/PDF Preview Modal */}
            {previewDoc && (
                <div
                    className="fixed inset-0 bg-stone-900/95 flex items-center justify-center z-[100] p-4 backdrop-blur-md"
                    onClick={() => setPreviewDoc(null)}
                >
                    <div className="relative max-w-6xl max-h-[95vh] w-full h-full bg-white/5 overflow-hidden rounded-3xl flex flex-col shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 bg-stone-900/50 backdrop-blur-sm border-b border-white/10 shrink-0">
                            <h3 className="text-white font-bold capitalize">{previewDoc.label.replace(/_/g, " ")}</h3>
                            <div className="flex gap-2">
                                <a
                                    href={previewDoc.url}
                                    target="_blank"
                                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md transition-all flex items-center gap-2 text-xs font-bold"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Buka Tab Baru
                                </a>
                                <button
                                    onClick={() => setPreviewDoc(null)}
                                    className="p-2.5 bg-rose-600/20 hover:bg-rose-600/40 rounded-xl text-rose-400 backdrop-blur-md transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-auto bg-stone-100 flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
                            {previewDoc.type === "application/pdf" ? (
                                <iframe
                                    src={`${previewDoc.url}#toolbar=0`}
                                    className="w-full h-full rounded-xl shadow-inner border-0"
                                    title="PDF Preview"
                                />
                            ) : (
                                <img
                                    src={previewDoc.url}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
