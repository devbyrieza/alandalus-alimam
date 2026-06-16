"use client";

import { useState, useEffect } from "react";
import { HandCoins, CreditCard, Clock, CheckCircle2, FileText, Upload, RefreshCw, AlertCircle } from "lucide-react";

export default function KeuanganPendaftarPage() {
  const [activeTab, setActiveTab] = useState<'dompet' | 'tagihan'>('dompet');
  
  // States for Real Data API
  const [dompet, setDompet] = useState<any>(null);
  const [transaksiList, setTransaksiList] = useState<any[]>([]);
  const [tagihanList, setTagihanList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/user/keuangan");
      const json = await res.json();
      if (json.success) {
        setDompet(json.data.dompet);
        setTransaksiList(json.data.transaksiList);
        setTagihanList(json.data.tagihanList);
      }
    } catch (error) {
      console.error("Gagal mengambil data keuangan", error);
    } finally {
      setLoading(false);
    }
  };

  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUploadStruk = (id: number) => {
    setUploadingId(id);
    setTimeout(() => {
      setTagihanList(tagihanList.map(t => t.id === id ? { ...t, status: 'verifikasi' } : t));
      setUploadingId(null);
      alert("Struk berhasil diupload, menunggu verifikasi Admin.");
    }, 2000);
  };

  const handleUnlockLimit = () => {
    setIsUnlocking(true);
    // In real app: call API /api/dompet/unlock
    setTimeout(() => {
      setDompet({ ...dompet, is_limit_terbuka: true });
      setIsUnlocking(false);
      alert("Limit jajan berhasil DIBUKA khusus untuk hari ini! Besok akan terkunci kembali secara otomatis.");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="animate-spin w-8 h-8 border-4 border-maroon-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Pusat Keuangan Santri</h1>
        <p className="text-slate-500 mt-1">Kelola uang jajan dan pembayaran tagihan bulanan dalam satu pintu.</p>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('dompet')}
          className={`pb-4 px-4 font-bold text-sm transition-colors border-b-4 ${activeTab === 'dompet' ? 'border-maroon-600 text-maroon-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          E-Money (Kartu Jajan)
        </button>
        <button 
          onClick={() => setActiveTab('tagihan')}
          className={`pb-4 px-4 font-bold text-sm transition-colors border-b-4 ${activeTab === 'tagihan' ? 'border-maroon-600 text-maroon-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Tagihan & SPP
        </button>
      </div>

      {/* TAB CONTENT: DOMPET */}
      {activeTab === 'dompet' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-maroon-700 to-maroon-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CreditCard className="w-48 h-48 -rotate-12 translate-x-8 -translate-y-8" />
              </div>
              <div className="relative z-10">
                <p className="text-gold-200 font-bold uppercase tracking-widest text-xs mb-2">Sisa Saldo ZAD</p>
                <h2 className="text-4xl font-black tracking-tight mb-4">
                  Rp {dompet?.saldo?.toLocaleString("id-ID") || 0}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <span className="px-3 py-1.5 bg-green-500/20 text-green-200 border border-green-500/30 rounded-lg text-xs font-bold">
                    ZAD AKTIF
                  </span>
                  {!dompet?.is_limit_terbuka ? (
                    <button 
                      onClick={handleUnlockLimit}
                      disabled={isUnlocking}
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
                    >
                      {isUnlocking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                      Buka Limit ZAD 1 Hari
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-amber-500/20 text-amber-200 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> LIMIT TERBUKA HARI INI
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200 text-center">
               <HandCoins className="w-12 h-12 text-maroon-600 mx-auto mb-4" />
               <h3 className="font-bold text-slate-800 mb-2">Top Up Saldo</h3>
               <p className="text-sm text-slate-500 mb-6">Silakan transfer ke BSI 712345678 a.n Pesantren Al Imam, lalu konfirmasi ke Admin.</p>
               <button className="w-full bg-maroon-600 text-white font-bold py-3 rounded-xl hover:bg-maroon-700 transition-colors">
                 Konfirmasi Top Up via WA
               </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-500" />
              Riwayat Transaksi ZAD
            </h3>
            <table className="w-full">
              <tbody className="divide-y divide-slate-100">
                {transaksiList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">Belum ada riwayat transaksi ZAD.</td>
                  </tr>
                ) : (
                  transaksiList.map((tx: any) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-600">{tx.tanggal}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          tx.jenis === 'TOPUP' ? 'bg-green-100 text-green-800' : 'bg-gold-100 text-gold-800'
                        }`}>
                          {tx.jenis === 'TOPUP' ? 'Isi Saldo' : 'Jajan Kantin'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-700">{tx.keterangan}</td>
                      <td className={`p-4 text-sm font-black text-right ${
                        tx.jenis === 'TOPUP' ? 'text-green-600' : 'text-slate-900'
                      }`}>
                        {tx.jenis === 'TOPUP' ? '+' : '-'} Rp {tx.nominal.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TAGIHAN */}
      {activeTab === 'tagihan' && (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold-500" />
              Daftar Tagihan & Pembayaran
           </h3>

           <div className="space-y-4">
             {tagihanList.map((tagihan) => (
               <div key={tagihan.id} className={`p-5 rounded-2xl border ${tagihan.status === 'lunas' ? 'bg-slate-50 border-slate-200' : 'bg-white border-maroon-200 shadow-sm'} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                 <div>
                   <div className="flex items-center gap-2 mb-1">
                     <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${tagihan.status === 'lunas' ? 'bg-green-100 text-green-700' : tagihan.status === 'verifikasi' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                       {tagihan.status === 'lunas' ? 'LUNAS' : tagihan.status === 'verifikasi' ? 'MENUNGGU VERIFIKASI' : 'BELUM DIBAYAR'}
                     </span>
                     {tagihan.status !== 'lunas' && (
                       <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Jatuh Tempo: {tagihan.dueDate}</span>
                     )}
                   </div>
                   <p className={`font-bold text-lg ${tagihan.status === 'lunas' ? 'text-slate-500' : 'text-slate-900'}`}>{tagihan.jenis}</p>
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                   <p className={`font-black text-xl ${tagihan.status === 'lunas' ? 'text-slate-400' : 'text-maroon-600'}`}>
                     Rp {tagihan.nominal.toLocaleString("id-ID")}
                   </p>
                   
                   {tagihan.status === 'pending' && (
                     <button 
                       onClick={() => handleUploadStruk(tagihan.id)}
                       disabled={uploadingId === tagihan.id}
                       className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
                     >
                       {uploadingId === tagihan.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                       Upload Bukti
                     </button>
                   )}
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

    </div>
  );
}
