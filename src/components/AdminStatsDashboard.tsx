import React, { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ADMIN_EMAIL } from '../firebase';
import {
  buildAdminStatsExcelContent,
  clearAllTelemetryEvents,
  fetchAndSyncAllTelemetryEvents,
  recordTelemetryActivity,
} from '../utils/telemetryClient';
import { updateCustomAdminPassword } from '../utils/adminAuth';
import {
  computeUsageStatistics,
  DistributionChartItem,
  formatEventTypeLabel,
  UsageEventRecord,
  UsageEventType,
} from '../utils/telemetryStats';
import { PRESET_PACKAGES } from '../data/presetPackages';
import {
  Activity,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Cloud,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  KeyRound,
  Layers,
  Loader2,
  LogOut,
  PlusCircle,
  Printer,
  RefreshCw,
  School,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';

const JENJANG_BAR_COLORS: Record<'SD' | 'SMP' | 'SMA', string> = {
  SD: '#047857', // Emerald 700
  SMP: '#d97706', // Amber 600
  SMA: '#1d4ed8', // Blue 700
};

interface CustomDistributionTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DistributionChartItem }>;
}

const CustomDistributionTooltip: React.FC<CustomDistributionTooltipProps> = ({
  active,
  payload,
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-slate-900 text-white border border-slate-700 rounded-xl p-3 shadow-lg text-xs space-y-1.5 min-w-[210px] tabular-nums">
      <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-1.5">
        <span className="font-bold text-amber-300">{data.fullLabel}</span>
        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-emerald-300">
          {data.percentage}%
        </span>
      </div>
      <div className="flex items-center justify-between text-slate-300">
        <span>Susun Paket Soal:</span>
        <strong className="text-emerald-400">{data.susunSoal}</strong>
      </div>
      <div className="flex items-center justify-between text-slate-300">
        <span>Unduhan (Word/Excel/PDF):</span>
        <strong className="text-amber-400">{data.unduhan}</strong>
      </div>
      <div className="flex items-center justify-between text-slate-300">
        <span>Kunjungan Sesi:</span>
        <strong className="text-sky-400">{data.kunjungan}</strong>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-slate-700/80 font-bold text-white">
        <span>Total Aktivitas:</span>
        <span>{data.total} log</span>
      </div>
    </div>
  );
};

interface AdminStatsDashboardProps {
  adminEmail: string;
  isGoogleAuthenticated: boolean;
  onBackToWorkspace: () => void;
  onLogoutAdmin: () => void;
}

export const AdminStatsDashboard: React.FC<AdminStatsDashboardProps> = ({
  adminEmail,
  isGoogleAuthenticated,
  onBackToWorkspace,
  onLogoutAdmin,
}) => {
  const [events, setEvents] = useState<UsageEventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cloudConnected, setCloudConnected] = useState(false);
  const [firestoreSyncedCount, setFirestoreSyncedCount] = useState(0);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterFase, setFilterFase] = useState<string>('ALL');
  const [searchSchool, setSearchSchool] = useState<string>('');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [chartViewMode, setChartViewMode] = useState<'total' | 'rincian'>('rincian');
  const [passwordChangeFeedback, setPasswordChangeFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const loadStats = async (showBanner = false) => {
    setIsLoading(true);
    try {
      const result = await fetchAndSyncAllTelemetryEvents();
      setEvents(result.events);
      setCloudConnected(result.cloudConnected);
      setFirestoreSyncedCount(result.firestoreSyncedCount);
      if (showBanner) {
        setBannerMessage(
          `Data statistik berhasil diperbarui (${result.events.length} total aktivitas tercatat).`
        );
      }
    } catch {
      setBannerMessage('Menampilkan data statistik dari penyimpanan server & lokal.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats(false);
  }, []);

  const stats = useMemo(() => computeUsageStatistics(events), [events]);

  const filteredRecentEvents = useMemo(() => {
    return stats.recentEvents.filter((ev) => {
      if (filterType !== 'ALL' && ev.eventType !== filterType) return false;
      if (filterFase !== 'ALL' && ev.fase !== filterFase) return false;
      if (
        searchSchool.trim() !== '' &&
        !ev.namaSekolah.toLowerCase().includes(searchSchool.toLowerCase()) &&
        !ev.topikMateri.toLowerCase().includes(searchSchool.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [stats.recentEvents, filterType, filterFase, searchSchool]);

  const handleDownloadStatsExcel = () => {
    const htmlContent = buildAdminStatsExcelContent(events);
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-statistik-pengguna-smart-pai-${new Date()
      .toISOString()
      .slice(0, 10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBannerMessage('Laporan Statistik Pengguna berhasil diunduh dalam format MS Excel (.xls).');
  };

  const handleSimulateTeacherActivity = async () => {
    const sampleSchools = [
      'SD Negeri 1 Lalembuu',
      'SMP Negeri 2 Konawe Selatan',
      'SD Negeri 3 Atari Jaya',
      'MIN 1 Konawe Selatan',
      'SMA Negeri 1 Andoolo',
      'MTsN 2 Konawe Selatan',
    ];
    const sampleTypes: UsageEventType[] = [
      'generate_soal',
      'export_word',
      'export_excel',
      'export_pdf',
    ];
    const randomPreset =
      PRESET_PACKAGES[Math.floor(Math.random() * PRESET_PACKAGES.length)] || PRESET_PACKAGES[0];
    const randomSchool = sampleSchools[Math.floor(Math.random() * sampleSchools.length)];
    const randomType = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];

    await recordTelemetryActivity({
      eventType: randomType,
      parameters: randomPreset.parameters,
      pkg: randomPreset,
      namaSekolah: randomSchool,
    });
    await loadStats(false);
    setBannerMessage(
      `Simulasi aktivitas guru (${formatEventTypeLabel(randomType)} · ${randomPreset.parameters.fase} · ${randomSchool}) berhasil ditambahkan secara real-time.`
    );
  };

  const handleConfirmClearStats = async () => {
    setConfirmResetOpen(false);
    setIsLoading(true);
    await clearAllTelemetryEvents();
    setEvents([]);
    setIsLoading(false);
    setBannerMessage('Seluruh catatan riwayat aktivitas statistik telah dikosongkan.');
  };

  const handleUpdateAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeFeedback(null);
    const result = updateCustomAdminPassword(currentPasswordInput, newPasswordInput);
    if (!result.ok) {
      setPasswordChangeFeedback(result);
      return;
    }

    // Sync to server if running backend
    try {
      await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput,
        }),
      });
    } catch {
      // Static host fallback handled via localStorage digest
    }

    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setPasswordChangeFeedback(result);
    setBannerMessage('Kata Sandi Rahasia Administrator berhasil diperbarui.');
  };

  const maxDailyTotal = Math.max(1, ...stats.dailyTrend.map((d) => d.total));

  return (
    <div data-testid="admin-stats-dashboard" className="space-y-6">
      {/* Top Admin Header Banner */}
      <section className="bg-emerald-950 text-white border border-emerald-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MENU KHUSUS ADMINISTRATOR</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-900/90 text-emerald-200 border border-emerald-700">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {cloudConnected
                    ? `Cloud Firestore Aktif (${firestoreSyncedCount} Dokumen Tersinkron)`
                    : isGoogleAuthenticated
                    ? 'Terhubung ke Firebase Auth'
                    : 'Mode Penyimpanan Server & Lokal Aktif'}
                </span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              📊 Statistik Pengguna &amp; Analitik Kurikulum PAIBP
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Memantau aktivitas penyusunan Kisi-Kisi, Naskah Soal, Kartu Soal, dan unduhan dokumen
              (Word, Excel, PDF) oleh guru PAI di seluruh jenjang (Fase A–F). Halaman ini hanya
              terlihat oleh Anda (<strong className="text-amber-300">{adminEmail || ADMIN_EMAIL}</strong>
              ); guru pengguna biasa tetap melihat tampilan standar penyusun soal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onBackToWorkspace}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Penyusun Soal</span>
            </button>

            <button
              type="button"
              onClick={() => loadStats(true)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Segarkan Data</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadStatsExcel}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Unduh Laporan (.xls)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPasswordModalOpen((prev) => !prev);
                setPasswordChangeFeedback(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-amber-300 border border-amber-400/40 rounded-xl transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Sandi Admin</span>
            </button>

            <button
              type="button"
              onClick={onLogoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-rose-900/70 hover:bg-rose-800 text-rose-100 border border-rose-700/60 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Admin</span>
            </button>
          </div>
        </div>

        {/* Panel Ubah Kata Sandi Rahasia Admin */}
        {isPasswordModalOpen && (
          <form
            onSubmit={handleUpdateAdminPassword}
            className="mt-5 pt-5 border-t border-emerald-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
          >
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-emerald-200 block">
                Kata Sandi Rahasia Saat Ini
              </label>
              <input
                type="password"
                required
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi saat ini..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-emerald-900/80 border border-emerald-700 text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-emerald-200 block">
                Kata Sandi Rahasia Baru (Min. 8 Karakter)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi baru..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-emerald-900/80 border border-emerald-700 text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
              >
                Simpan Sandi Baru
              </button>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-3 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-medium transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
            {passwordChangeFeedback && (
              <div
                className={`sm:col-span-3 text-xs font-medium px-3 py-2 rounded-lg ${
                  passwordChangeFeedback.ok
                    ? 'bg-emerald-900/90 text-amber-300 border border-emerald-700'
                    : 'bg-rose-950/90 text-rose-200 border border-rose-700'
                }`}
              >
                {passwordChangeFeedback.message}
              </div>
            )}
          </form>
        )}
      </section>

      {bannerMessage && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-medium">{bannerMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setBannerMessage(null)}
            className="text-emerald-800 hover:underline font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* 4 Primary KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Kunjungan &amp; Sesi</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div
            data-testid="kpi-total-visits"
            className="text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {stats.totalVisits}
          </div>
          <div className="text-xs text-slate-600">
            Dari <strong className="text-slate-900">{stats.uniqueVisitors}</strong> perangkat guru
            unik
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Paket Soal Disusun</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div
            data-testid="kpi-total-generated"
            className="text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {stats.totalGenerated}
          </div>
          <div className="text-xs text-slate-600">
            Kisi-kisi 9 kolom, naskah soal, kartu &amp; rubrik
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Unduhan Dokumen</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div
            data-testid="kpi-total-exports"
            className="text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {stats.totalExports}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 font-medium">
              Word: {stats.exportBreakdown.word}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 font-medium">
              Excel: {stats.exportBreakdown.excel}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-900 font-medium">
              PDF: {stats.exportBreakdown.pdf}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Sekolah / Madrasah Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center">
              <School className="w-4 h-4" />
            </div>
          </div>
          <div
            data-testid="kpi-total-schools"
            className="text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {stats.topSchools.length}
          </div>
          <div className="text-xs text-slate-600">
            Terdata otomatis dari identitas Kop Soal
          </div>
        </div>
      </section>

      {/* Visual Recharts BarCharts: Distribusi Jenjang (SD/SMP/SMA) & Distribusi Fase (A/B/C/D/E/F) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Grafik Batang Distribusi Penggunaan Berdasarkan Jenjang (SD / SMP / SMA) */}
        <div
          data-testid="jenjang-bar-chart"
          className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4 flex flex-col justify-between"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-800" />
                <span>Distribusi Penggunaan per Jenjang (SD / SMP / SMA)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Perbandingan aktivitas guru PAIBP pada jenjang SD/MI, SMP/MTs, dan SMA/SMK/MA
              </p>
            </div>

            <div className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px]">
              <button
                type="button"
                onClick={() => setChartViewMode('rincian')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  chartViewMode === 'rincian'
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rincian
              </button>
              <button
                type="button"
                onClick={() => setChartViewMode('total')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  chartViewMode === 'total'
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Total
              </button>
            </div>
          </div>

          <div className="h-[250px] w-full min-w-0 pt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart
                data={stats.byJenjang}
                margin={{ top: 10, right: 12, left: -16, bottom: 4 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="shortKey"
                  tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomDistributionTooltip />}
                  cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                  iconType="circle"
                />
                {chartViewMode === 'rincian' ? (
                  <>
                    <Bar
                      dataKey="susunSoal"
                      name="Susun Soal"
                      fill="#047857"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={28}
                    />
                    <Bar
                      dataKey="unduhan"
                      name="Unduhan Dokumen"
                      fill="#d97706"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={28}
                    />
                    <Bar
                      dataKey="kunjungan"
                      name="Kunjungan"
                      fill="#0284c7"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={28}
                    />
                  </>
                ) : (
                  <Bar
                    dataKey="total"
                    name="Total Aktivitas Jenjang"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  >
                    {stats.byJenjang.map((entry) => (
                      <Cell key={entry.key} fill={JENJANG_BAR_COLORS[entry.jenjang]} />
                    ))}
                  </Bar>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 tabular-nums">
            {stats.byJenjang.map((j) => (
              <div
                key={j.key}
                className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 space-y-0.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">{j.shortKey}</span>
                  <span className="font-semibold text-emerald-800">{j.percentage}%</span>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {j.total}{' '}
                  <span className="text-[11px] font-normal text-slate-500">aktivitas</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {j.susunSoal} soal · {j.unduhan} unduh
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Grafik Batang Distribusi Penggunaan Berdasarkan Fase (Fase A - Fase F) */}
        <div
          data-testid="fase-bar-chart"
          className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4 flex flex-col justify-between"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-800" />
                <span>Distribusi Penggunaan per Fase (Fase A – Fase F)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Tren penyusunan soal &amp; unduhan naskah berdasarkan Fase Kurikulum Merdeka (CP 020/2026)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-700" /> Fase A–C (SD/MI)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-600" /> Fase D (SMP/MTs)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-700" /> Fase E–F (SMA/SMK)
              </span>
            </div>
          </div>

          <div className="h-[250px] w-full min-w-0 pt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart
                data={stats.byFase}
                margin={{ top: 10, right: 12, left: -16, bottom: 4 }}
                barGap={3}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomDistributionTooltip />}
                  cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                  iconType="circle"
                />
                {chartViewMode === 'rincian' ? (
                  <>
                    <Bar
                      dataKey="susunSoal"
                      name="Susun Soal"
                      fill="#047857"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={22}
                    />
                    <Bar
                      dataKey="unduhan"
                      name="Unduhan Dokumen"
                      fill="#d97706"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={22}
                    />
                    <Bar
                      dataKey="kunjungan"
                      name="Kunjungan"
                      fill="#0284c7"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={22}
                    />
                  </>
                ) : (
                  <Bar
                    dataKey="total"
                    name="Total Aktivitas Fase"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={38}
                  >
                    {stats.byFase.map((entry) => (
                      <Cell key={entry.key} fill={JENJANG_BAR_COLORS[entry.jenjang]} />
                    ))}
                  </Bar>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 tabular-nums">
            {stats.byFase.map((item) => (
              <div
                key={item.key}
                className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 space-y-0.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">{item.label}</span>
                  <span className="font-semibold text-emerald-800">{item.percentage}%</span>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {item.total} <span className="font-normal text-slate-500">aktivitas</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.susunSoal} soal · {item.unduhan} unduh
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Row 3: 7-Day Activity Trend */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 tabular-nums">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-800" />
              <span>Tren Aktivitas Harian (7 Hari Terakhir)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Rincian kunjungan, penyusunan paket soal, dan unduhan naskah per hari
            </p>
          </div>
          <button
            type="button"
            onClick={handleSimulateTeacherActivity}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-800" />
            <span>+ Simulasi Aktivitas Guru</span>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-4 items-end h-40 border-b border-slate-200 pb-3">
          {stats.dailyTrend.map((day) => {
            const heightPct = Math.max(10, Math.round((day.total / maxDailyTotal) * 100));
            return (
              <div
                key={day.dateKey}
                className="flex flex-col items-center justify-end h-full gap-1.5"
              >
                <span className="text-[11px] font-bold text-slate-700">{day.total}</span>
                <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg h-24 flex items-end overflow-hidden">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 transition-all rounded-t-lg"
                    title={`${day.label}: ${day.visits} kunjungan, ${day.generations} susun soal, ${day.exports} unduhan`}
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-500 text-center">
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <span>Total Aktivitas Tercatat: {stats.totalEvents} log</span>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-700" /> Word: {stats.exportBreakdown.word}
            </span>
            <span className="inline-flex items-center gap-1">
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-700" /> Excel:{' '}
              {stats.exportBreakdown.excel}
            </span>
            <span className="inline-flex items-center gap-1">
              <Printer className="w-3.5 h-3.5 text-emerald-700" /> PDF:{' '}
              {stats.exportBreakdown.pdf}
            </span>
          </div>
        </div>
      </section>

      {/* Row 3: Semester & Jenis Ujian + 5 Elemen PAI + Daftar Sekolah Teraktif */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Semester & Jenis Ujian */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-800" />
              <span>Proporsi Semester &amp; Jenis Asesmen</span>
            </h3>
            <p className="text-xs text-slate-500">
              Pilihan semester dan jenis ujian yang paling sering disusun guru
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Berdasarkan Semester
            </div>
            {stats.bySemester.map((smt) => (
              <div
                key={smt.label}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
              >
                <span className="font-medium text-slate-800">{smt.label}</span>
                <span className="font-bold text-emerald-900">
                  {smt.count} ({smt.percentage}%)
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-200">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Berdasarkan Jenis Asesmen
            </div>
            {stats.byJenisUjian.slice(0, 5).map((uj) => (
              <div key={uj.label} className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-700 truncate pr-2">{uj.label}</span>
                <span className="font-semibold text-slate-900 shrink-0">
                  {uj.count} ({uj.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Elemen PAIBP & Kelas Terpopuler */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-800" />
              <span>5 Elemen PAIBP &amp; Kelas Teraktif</span>
            </h3>
            <p className="text-xs text-slate-500">
              Frekuensi penyusunan berdasarkan elemen CP 020/2026
            </p>
          </div>

          <div className="space-y-2.5">
            {stats.byElemen.map((el) => (
              <div key={el.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800">{el.label}</span>
                  <span className="text-slate-600">
                    {el.count} ({el.percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.max(el.count > 0 ? 5 : 0, el.percentage)}%` }}
                    className="h-full bg-amber-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-200">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              5 Kelas Paling Sering Disusun
            </div>
            <div className="flex flex-wrap gap-1.5">
              {stats.byKelas.slice(0, 5).map((k) => (
                <span
                  key={k.label}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium"
                >
                  {k.label}: <strong>{k.count}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Daftar Sekolah / Madrasah Pengguna */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-800" />
              <span>Sekolah / Madrasah Pengguna Teraktif</span>
            </h3>
            <p className="text-xs text-slate-500">
              Instansi yang tercatat menyusun atau mengunduh instrumen soal
            </p>
          </div>

          <div className="space-y-2">
            {stats.topSchools.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                Belum ada data sekolah yang tercatat.
              </p>
            ) : (
              stats.topSchools.map((sch, idx) => (
                <div
                  key={sch.label}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-emerald-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-800 truncate">{sch.label}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-semibold text-slate-800 shrink-0">
                    {sch.count} aktivitas
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Row 4: Real-Time Activity Log Table with Filters */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Riwayat Aktivitas Pengguna Real-Time ({filteredRecentEvents.length} Ditampilkan)
            </h2>
            <p className="text-xs text-slate-500">
              Setiap kali guru membuka aplikasi, menyusun soal, atau mengunduh Word/Excel/PDF, data
              otomatis masuk ke tabel ini.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select
                aria-label="Filter Jenis Aktivitas"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              >
                <option value="ALL">Semua Aktivitas</option>
                <option value="visit">Kunjungan Aplikasi</option>
                <option value="generate_soal">Susun Paket Soal Baru</option>
                <option value="preset_load">Muat Paket Kurikulum</option>
                <option value="export_word">Unduh MS Word (.doc)</option>
                <option value="export_excel">Unduh MS Excel (.xls)</option>
                <option value="export_pdf">Cetak / Simpan PDF</option>
                <option value="copy_naskah">Salin Naskah Soal</option>
              </select>
            </div>

            <select
              aria-label="Filter Fase Kurikulum"
              value={filterFase}
              onChange={(e) => setFilterFase(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            >
              <option value="ALL">Semua Fase (A–F)</option>
              <option value="Fase A">Fase A (Kelas 1–2)</option>
              <option value="Fase B">Fase B (Kelas 3–4)</option>
              <option value="Fase C">Fase C (Kelas 5–6)</option>
              <option value="Fase D">Fase D (Kelas 7–9)</option>
              <option value="Fase E">Fase E (Kelas 10)</option>
              <option value="Fase F">Fase F (Kelas 11–12)</option>
            </select>

            <input
              type="text"
              aria-label="Cari Nama Sekolah atau Topik"
              value={searchSchool}
              onChange={(e) => setSearchSchool(e.target.value)}
              placeholder="Cari sekolah / topik..."
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            />

            {!confirmResetOpen ? (
              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Log</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-300 px-2.5 py-1 rounded-lg">
                <span className="text-[11px] font-semibold text-rose-900">Hapus semua log?</span>
                <button
                  type="button"
                  onClick={handleConfirmClearStats}
                  className="px-2 py-0.5 text-[11px] font-bold bg-rose-700 text-white rounded cursor-pointer"
                >
                  Ya, Hapus
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="px-2 py-0.5 text-[11px] text-slate-700 hover:underline cursor-pointer"
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
            <span>Memuat &amp; menyinkronkan data statistik pengguna...</span>
          </div>
        ) : filteredRecentEvents.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-500">
            Tidak ada catatan aktivitas yang sesuai dengan filter pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-2.5 px-3">Waktu</th>
                  <th className="py-2.5 px-3">Aktivitas</th>
                  <th className="py-2.5 px-3">Sekolah / Instansi</th>
                  <th className="py-2.5 px-3">Fase &amp; Kelas</th>
                  <th className="py-2.5 px-3">Semester</th>
                  <th className="py-2.5 px-3">Topik Materi / Paket Soal</th>
                  <th className="py-2.5 px-3 text-center">Butir Soal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRecentEvents.map((ev) => (
                  <tr key={ev.eventId} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-500">
                      {new Date(ev.createdAtIso).toLocaleString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                          ev.eventType === 'generate_soal'
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                            : ev.eventType === 'export_excel'
                            ? 'bg-amber-50 text-amber-900 border border-amber-200'
                            : ev.eventType === 'export_word'
                            ? 'bg-blue-50 text-blue-900 border border-blue-200'
                            : ev.eventType === 'export_pdf'
                            ? 'bg-purple-50 text-purple-900 border border-purple-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {formatEventTypeLabel(ev.eventType)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{ev.namaSekolah}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-700">
                      {ev.fase} · {ev.kelas}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-600">{ev.semester}</td>
                    <td className="py-2.5 px-3 text-slate-700 max-w-xs truncate" title={ev.topikMateri}>
                      {ev.topikMateri}
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-900">
                      {ev.jumlahSoal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
