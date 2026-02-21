"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  ClipboardCheck,
  Users,
  CheckCircle,
  Clock,
  Loader2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  total_jadwal: number;
  selesai_dinilai: number;
  belum_dinilai: number;
  jadwal_hari_ini: number;
}

export default function PengujiDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    total_jadwal: 0,
    selesai_dinilai: 0,
    belum_dinilai: 0,
    jadwal_hari_ini: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/penguji/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brown-600 mx-auto mb-4" />
          <p className="text-ink-600 font-medium">Memuat statistik dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Jadwal Ujian",
      value: stats.total_jadwal,
      icon: Calendar,
      color: "brown",
      bgColor: "bg-brown-50",
      iconColor: "text-brown-600",
    },
    {
      title: "Jadwal Hari Ini",
      value: stats.jadwal_hari_ini,
      icon: Clock,
      color: "teal",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "Selesai Dinilai",
      value: stats.selesai_dinilai,
      icon: CheckCircle,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Belum Dinilai",
      value: stats.belum_dinilai,
      icon: ClipboardCheck,
      color: "gold",
      bgColor: "bg-gold-50",
      iconColor: "text-gold-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="bg-white rounded-[2rem] shadow-premium-lg p-8 border border-surface-100">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-black text-ink-950">
              Ikhtisar Dashboard
            </h2>
            <p className="text-ink-600 font-medium">
              Ringkasan tugas penilaian ujian seleksi
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-[1.5rem] shadow-premium-md p-6 border border-surface-100 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${card.bgColor} rounded-xl`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-ink-500 mb-2 uppercase tracking-wide">{card.title}</p>
              <p className={`text-3xl font-display font-black text-${card.color}-600`}>
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-[2rem] shadow-premium-lg p-8 border border-surface-100">
        <h3 className="text-xl font-display font-black text-ink-950 mb-6">
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/dashboard/penguji/jadwal"
            className="flex items-center gap-4 p-6 bg-brown-50 hover:bg-brown-100 rounded-2xl transition-all duration-300 border border-brown-100 hover:shadow-premium-md group"
          >
            <div className="p-3 bg-brown-600 rounded-xl group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-display font-black text-brown-900">Lihat Jadwal</p>
              <p className="text-xs font-bold text-brown-600">
                Jadwal ujian yang ditugaskan
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/penguji/input-nilai"
            className="flex items-center gap-4 p-6 bg-teal-50 hover:bg-teal-100 rounded-2xl transition-all duration-300 border border-teal-100 hover:shadow-premium-md group"
          >
            <div className="p-3 bg-teal-600 rounded-xl group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-display font-black text-teal-900">Input Nilai</p>
              <p className="text-xs font-bold text-teal-600">
                {stats.belum_dinilai} santri belum dinilai
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-[1.5rem] p-8">
        <div className="flex gap-5">
          <div className="flex-shrink-0">
            <div className="p-3 bg-blue-200 rounded-xl">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <div>
            <h4 className="font-display font-black text-blue-900 mb-3 text-lg">
              Panduan Penilaian
            </h4>
            <ul className="text-sm text-blue-800 font-medium space-y-2">
              <li>• Nilai harus objektif dan sesuai rubrik penilaian</li>
              <li>• Pastikan semua aspek dinilai dengan lengkap</li>
              <li>• Berikan catatan jika diperlukan untuk referensi</li>
              <li>
                • Nilai yang sudah diinput dapat diubah sebelum finalisasi
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
