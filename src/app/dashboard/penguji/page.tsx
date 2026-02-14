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
          <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-stone-600">Memuat statistik dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Jadwal Ujian",
      value: stats.total_jadwal,
      icon: Calendar,
      color: "violet",
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Jadwal Hari Ini",
      value: stats.jadwal_hari_ini,
      icon: Clock,
      color: "blue",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Selesai Dinilai",
      value: stats.selesai_dinilai,
      icon: CheckCircle,
      color: "green",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Belum Dinilai",
      value: stats.belum_dinilai,
      icon: ClipboardCheck,
      color: "amber",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900">
              Ikhtisar Dashboard
            </h2>
            <p className="text-stone-600">
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
            className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100 hover:border-violet-300 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${card.bgColor} rounded-lg`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-stone-600 mb-1">{card.title}</p>
              <p className="text-3xl font-black text-violet-600">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-violet-100">
        <h3 className="text-lg font-bold text-stone-900 mb-4">
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/penguji/jadwal"
            className="flex items-center gap-3 p-4 bg-violet-50 hover:bg-violet-100 rounded-xl transition-colors border border-violet-200"
          >
            <Calendar className="w-6 h-6 text-violet-600" />
            <div>
              <p className="font-bold text-violet-900">Lihat Jadwal</p>
              <p className="text-xs text-violet-600">
                Jadwal ujian yang ditugaskan
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/penguji/input-nilai"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200"
          >
            <ClipboardCheck className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-bold text-green-900">Input Nilai</p>
              <p className="text-xs text-green-600">
                {stats.belum_dinilai} santri belum dinilai
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">
              Panduan Penilaian
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
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
