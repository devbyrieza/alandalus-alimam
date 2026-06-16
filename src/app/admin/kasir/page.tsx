"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, CreditCard, CheckCircle2, XCircle, Loader2, ArrowRight, Calculator, RefreshCcw } from "lucide-react";
import Script from "next/script";

export default function KasirKantinPage() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [nominal, setNominal] = useState<number>(0);
  const [keterangan, setKeterangan] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const scannerRef = useRef<any>(null); // Use any because it's loaded via CDN
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Play a beep sound on successful scan
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  useEffect(() => {
    if (scriptLoaded && !student && !scannerRef.current) {
      scannerRef.current = new (window as any).Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scannerRef.current.render(onScanSuccess, onScanFailure);
    }
    
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error: any) => console.error("Failed to clear html5QrcodeScanner. ", error));
        scannerRef.current = null;
      }
    };
  }, [student, scriptLoaded]);

  const onScanSuccess = async (decodedText: string, decodedResult: any) => {
    if (decodedText && decodedText !== scannedData && !loading) {
      playBeep();
      setScannedData(decodedText);
      setLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      // Stop scanner temporarily
      if (scannerRef.current) {
         scannerRef.current.clear();
         scannerRef.current = null;
      }

      try {
        const res = await fetch("/api/admin/kasir/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qr_code: decodedText }),
        });
        const data = await res.json();
        if (data.success) {
          setStudent(data.data);
        } else {
          setErrorMsg(data.message || "Gagal memindai kartu");
          setTimeout(() => {
             setScannedData(null);
             // Restart scanner
             setStudent(null);
          }, 3000);
        }
      } catch (err) {
        setErrorMsg("Koneksi error");
        setTimeout(() => {
           setScannedData(null);
           setStudent(null);
        }, 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const onScanFailure = (error: any) => {
    // handle scan failure, usually better to ignore and keep scanning
  };

  const handleCharge = async () => {
    if (!student || !nominal) return;
    
    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/kasir/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          dompet_id: student.dompet.id,
          nominal: nominal,
          keterangan: keterangan || "Jajan Kantin"
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccessMsg(`Berhasil memotong saldo Rp ${nominal.toLocaleString('id-ID')}`);
        setTimeout(() => {
          handleReset();
        }, 3000);
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg("Gagal memproses pembayaran");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setScannedData(null);
    setStudent(null);
    setNominal(0);
    setKeterangan("");
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const addNominal = (amount: number, itemLabel?: string) => {
    setNominal(prev => prev + amount);
    if (itemLabel) {
      setKeterangan(prev => prev ? `${prev}, ${itemLabel}` : itemLabel);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto h-full flex flex-col">
      <Script 
        src="https://unpkg.com/html5-qrcode" 
        onLoad={() => setScriptLoaded(true)}
      />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Kasir Kantin & Mart</h1>
        <p className="text-slate-500 mt-1">Arahkan kamera ke QR Code di kartu santri untuk memotong saldo.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 flex-1">
        
        {/* Kolom Kiri: Scanner */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl flex flex-col relative">
          {!student ? (
            <div className="flex-1 relative aspect-[4/3] lg:aspect-auto flex flex-col items-center justify-center p-4">
              <div id="reader" className="w-full max-w-sm overflow-hidden rounded-xl"></div>
              
              {loading && (
                <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center text-white backdrop-blur-sm z-20">
                  <Loader2 className="w-10 h-10 animate-spin text-gold-500 mb-4" />
                  <p className="font-bold animate-pulse">Memeriksa Data Santri...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-800 text-white text-center">
              <CheckCircle2 className="w-20 h-20 text-green-400 mb-6" />
              <h3 className="text-2xl font-black text-white">{student.nama_lengkap}</h3>
              <p className="text-slate-400 mt-2 text-lg">{student.jenjang} • {student.nomor_pendaftaran}</p>
              
              <div className="mt-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-700 w-full">
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">Sisa Saldo Saat Ini</p>
                <p className="text-4xl font-black text-gold-500">Rp {Number(student.dompet.saldo).toLocaleString('id-ID')}</p>
              </div>

              <button 
                onClick={handleReset}
                className="mt-8 text-slate-400 hover:text-white underline underline-offset-4 text-sm font-bold"
              >
                Batalkan & Scan Ulang
              </button>
            </div>
          )}

          {errorMsg && !student && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5">
              <XCircle className="w-6 h-6 shrink-0" />
              <p className="font-bold text-sm">{errorMsg}</p>
            </div>
          )}
        </div>

        {/* Kolom Kanan: Input Pembayaran */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col">
          <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <CreditCard className="text-maroon-600" /> Form Pembayaran
          </h2>

          {!student ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50">
              <Camera className="w-16 h-16 text-slate-300 mb-4" />
              <p className="font-bold text-lg text-slate-500">Silakan Scan Kartu Santri</p>
              <p className="text-sm mt-2">Form ini akan aktif setelah kartu berhasil terdeteksi oleh kamera.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-in fade-in duration-500">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-slate-700">Total Belanja (Rp)</label>
                    <button 
                      onClick={() => { setNominal(0); setKeterangan(""); }}
                      className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <RefreshCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 flex items-center justify-between">
                     <span className="text-slate-400 font-bold text-xl">Rp</span>
                     <span className="text-4xl font-black text-slate-900">{nominal.toLocaleString('id-ID')}</span>
                  </div>
                  {nominal > Number(student.dompet.saldo) && (
                    <p className="text-red-500 text-sm font-bold mt-2">⚠️ Saldo santri tidak mencukupi!</p>
                  )}
                </div>

                {/* POS QUICK BUTTONS */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5" /> Kalkulator Cepat
                  </p>
                  
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <button onClick={() => addNominal(1000)} className="py-2 bg-white border border-slate-200 hover:border-maroon-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm">+1k</button>
                    <button onClick={() => addNominal(2000)} className="py-2 bg-white border border-slate-200 hover:border-maroon-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm">+2k</button>
                    <button onClick={() => addNominal(5000)} className="py-2 bg-white border border-slate-200 hover:border-maroon-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm">+5k</button>
                    <button onClick={() => addNominal(10000)} className="py-2 bg-white border border-slate-200 hover:border-maroon-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm">+10k</button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => addNominal(15000, "Nasi Kotak")} className="py-2 bg-maroon-50 border border-maroon-100 hover:bg-maroon-100 rounded-xl text-xs font-bold text-maroon-800 flex items-center justify-between px-3">
                      <span>Nasi Kotak</span>
                      <span>15k</span>
                    </button>
                    <button onClick={() => addNominal(3000, "Susu Murni")} className="py-2 bg-maroon-50 border border-maroon-100 hover:bg-maroon-100 rounded-xl text-xs font-bold text-maroon-800 flex items-center justify-between px-3">
                      <span>Susu Murni</span>
                      <span>3k</span>
                    </button>
                    <button onClick={() => addNominal(5000, "Roti Bakery")} className="py-2 bg-maroon-50 border border-maroon-100 hover:bg-maroon-100 rounded-xl text-xs font-bold text-maroon-800 flex items-center justify-between px-3">
                      <span>Roti Bakery</span>
                      <span>5k</span>
                    </button>
                    <button onClick={() => addNominal(2000, "Air Mineral")} className="py-2 bg-maroon-50 border border-maroon-100 hover:bg-maroon-100 rounded-xl text-xs font-bold text-maroon-800 flex items-center justify-between px-3">
                      <span>Air Mineral</span>
                      <span>2k</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Isi Keranjang (Otomatis)</label>
                  <textarea 
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder="Keranjang belanja kosong..."
                    rows={2}
                    className="w-full text-sm font-medium text-slate-700 bg-white border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-maroon-500 resize-none"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-start gap-3">
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-bold">{errorMsg}</p>
                </div>
              )}

              {successMsg && (
                <div className="mt-6 bg-green-50 text-green-600 p-4 rounded-xl border border-green-100 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <p className="font-bold">{successMsg}</p>
                </div>
              )}

              <div className="mt-auto pt-8">
                <button
                  onClick={handleCharge}
                  disabled={!nominal || isProcessing || Number(nominal) > Number(student.dompet.saldo) || !!successMsg}
                  className="w-full bg-maroon-700 hover:bg-maroon-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xl font-black py-5 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>Bayar Sekarang <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
