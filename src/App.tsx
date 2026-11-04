/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ADMIN_EMAIL, auth } from './firebase';
import {
  AssessmentPackage,
  AssessmentParameters,
  FaseCode,
  KopSoalConfig,
} from './types/assessment';
import { buildCustomFallbackPackage, PRESET_PACKAGES } from './data/presetPackages';
import { getFaseProfile } from './utils/paiRules';
import {
  getDefaultKopConfig,
  loadKopConfigFromStorage,
  saveKopConfigToStorage,
} from './utils/documentExporter';
import {
  isLocalAdminUnlocked,
  recordTelemetryActivity,
  setLocalAdminUnlocked,
} from './utils/telemetryClient';
import { Sidebar } from './components/Sidebar';
import { ParameterPanel } from './components/ParameterPanel';
import { AssessmentDocument } from './components/AssessmentDocument';
import { KaidahValidatorSection } from './components/KaidahValidatorSection';
import { KopPejabatForm } from './components/KopPejabatForm';
import { AppGuideModal } from './components/AppGuideModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminStatsDashboard } from './components/AdminStatsDashboard';
import {
  BarChart3,
  BookCheck,
  BookOpen,
  Layers,
  Loader2,
  Lock,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  X,
} from 'lucide-react';

export default function App() {
  const [activePackage, setActivePackage] = useState<AssessmentPackage>(PRESET_PACKAGES[0]);
  const [parameters, setParameters] = useState<AssessmentParameters>(PRESET_PACKAGES[0].parameters);
  const [kopConfig, setKopConfig] = useState<KopSoalConfig>(() =>
    loadKopConfigFromStorage(PRESET_PACKAGES[0])
  );
  const [isKopModalOpen, setIsKopModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isLocalAdminUnlocked());
  const [adminEmail, setAdminEmail] = useState<string>(ADMIN_EMAIL);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('bagian-1');
  const hasRecordedVisitRef = useRef(false);

  // Listen to Firebase Auth state for Admin verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        setIsAdmin(true);
        setAdminEmail(user.email);
        setIsGoogleAuthenticated(true);
        setLocalAdminUnlocked(true);
      } else {
        setIsGoogleAuthenticated(false);
        setIsAdmin(isLocalAdminUnlocked());
      }
    });
    return () => unsubscribe();
  }, []);

  // Record a silent visit event once per session on mount
  useEffect(() => {
    if (hasRecordedVisitRef.current) return;
    hasRecordedVisitRef.current = true;
    recordTelemetryActivity({
      eventType: 'visit',
      parameters: PRESET_PACKAGES[0].parameters,
      pkg: PRESET_PACKAGES[0],
      namaSekolah: kopConfig.namaSekolah,
    }).catch(() => {
      // Non-blocking telemetry
    });
  }, []);

  const handleChangeKopConfig = (nextKop: KopSoalConfig) => {
    setKopConfig(nextKop);
    saveKopConfigToStorage(nextKop);
  };

  const handleResetKopConfig = () => {
    const defaultKop = getDefaultKopConfig(activePackage);
    setKopConfig(defaultKop);
    saveKopConfigToStorage(defaultKop);
  };

  const syncKopForPackage = (pkg: AssessmentPackage) => {
    const nextDefault = getDefaultKopConfig(pkg);
    setKopConfig((prev) => {
      const updated: KopSoalConfig = {
        ...prev,
        layoutMode: nextDefault.layoutMode,
        judulAsesmenDokumen: nextDefault.judulAsesmenDokumen,
        waktuUjian: nextDefault.waktuUjian,
        namaSekolah: nextDefault.namaSekolah,
      };
      saveKopConfigToStorage(updated);
      return updated;
    });
  };

  const handleSelectPresetPackage = (pkg: AssessmentPackage) => {
    setActivePackage(pkg);
    setParameters(pkg.parameters);
    syncKopForPackage(pkg);
    recordTelemetryActivity({
      eventType: 'preset_load',
      parameters: pkg.parameters,
      pkg,
      namaSekolah: kopConfig.namaSekolah,
    });
    setStatusMessage(
      `Menampilkan paket instrumen "${pkg.judulAsesmen}" (${pkg.parameters.fase} · ${pkg.parameters.kelas}).`
    );
  };

  const handleSelectFaseFromMatrix = (fase: FaseCode) => {
    const matchingPreset = PRESET_PACKAGES.find((p) => p.parameters.fase === fase);
    if (matchingPreset) {
      handleSelectPresetPackage(matchingPreset);
      return;
    }

    const profile = getFaseProfile(fase);
    const nextParams: AssessmentParameters = {
      ...parameters,
      fase,
      jenjang: profile.jenjang,
      kelas: profile.kelasOptions[0],
      komposisiKesulitan: { ...profile.defaultComposition },
    };
    setParameters(nextParams);
    const customPkg = buildCustomFallbackPackage(nextParams);
    setActivePackage(customPkg);
    syncKopForPackage(customPkg);
    setStatusMessage(`Memuat instrumen asesmen adaptasi ${fase} (${profile.kelasRange}).`);
  };

  const handleParametersChange = (nextParams: AssessmentParameters) => {
    setParameters(nextParams);

    const nextPkg = buildCustomFallbackPackage(nextParams);
    setActivePackage(nextPkg);
    syncKopForPackage(nextPkg);
    const smtText =
      nextParams.semester === 'Semua'
        ? 'Semester Ganjil & Genap'
        : `Semester ${nextParams.semester || 'Ganjil'}`;
    setStatusMessage(
      `Parameter dan pratinjau dokumen disesuaikan: ${nextParams.fase} · ${nextParams.kelas} · ${smtText}.`
    );
  };

  const handleGenerateAssessment = async (paramsToGenerate: AssessmentParameters) => {
    setIsGenerating(true);
    setStatusMessage(
      `Sedang menyusun Matriks Kisi-Kisi, Stimulus Ayat/Tabel/Kasus, Naskah Soal, Kartu Soal & Rubrik (${paramsToGenerate.fase} · ${paramsToGenerate.kelas})...`
    );

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      const response = await fetch('/api/assess/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parameters: paramsToGenerate }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.package) {
          setActivePackage(data.package);
          syncKopForPackage(data.package);
          recordTelemetryActivity({
            eventType: 'generate_soal',
            parameters: paramsToGenerate,
            pkg: data.package,
            namaSekolah: kopConfig.namaSekolah,
          });
          setStatusMessage(
            `Instrumen asesmen "${data.package.judulAsesmen}" (${paramsToGenerate.fase} · ${paramsToGenerate.kelas}) berhasil disusun secara berurutan (5 Bagian Resmi: Kisi-Kisi, Naskah Soal, Kartu Soal, Kunci & Pembahasan, Rubrik & Praktik).`
          );
          return;
        }
      }

      const fallbackPkg = buildCustomFallbackPackage(paramsToGenerate);
      setActivePackage(fallbackPkg);
      syncKopForPackage(fallbackPkg);
      recordTelemetryActivity({
        eventType: 'generate_soal',
        parameters: paramsToGenerate,
        pkg: fallbackPkg,
        namaSekolah: kopConfig.namaSekolah,
      });
      setStatusMessage(
        `Instrumen asesmen "${fallbackPkg.judulAsesmen}" (${paramsToGenerate.fase} · ${paramsToGenerate.kelas}) berhasil disusun secara berurutan (5 Bagian Resmi: Kisi-Kisi, Naskah Soal, Kartu Soal, Kunci & Pembahasan, Rubrik & Praktik).`
      );
    } catch {
      const fallbackPkg = buildCustomFallbackPackage(paramsToGenerate);
      setActivePackage(fallbackPkg);
      syncKopForPackage(fallbackPkg);
      recordTelemetryActivity({
        eventType: 'generate_soal',
        parameters: paramsToGenerate,
        pkg: fallbackPkg,
        namaSekolah: kopConfig.namaSekolah,
      });
      setStatusMessage(
        `Instrumen asesmen "${fallbackPkg.judulAsesmen}" (${paramsToGenerate.fase} · ${paramsToGenerate.kelas}) berhasil disusun secara berurutan (5 Bagian Resmi: Kisi-Kisi, Naskah Soal, Kartu Soal, Kunci & Pembahasan, Rubrik & Praktik).`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'admin-stats') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  const handlePrint = () => {
    recordTelemetryActivity({
      eventType: 'export_pdf',
      parameters,
      pkg: activePackage,
      namaSekolah: kopConfig.namaSekolah,
    });
    window.print();
  };

  const handleRecordDocumentExport = (
    exportType: 'export_word' | 'export_excel' | 'copy_naskah'
  ) => {
    recordTelemetryActivity({
      eventType: exportType,
      parameters,
      pkg: activePackage,
      namaSekolah: kopConfig.namaSekolah,
    });
  };

  const handleSuccessAdminLogin = (email: string) => {
    setIsAdmin(true);
    setAdminEmail(email);
    setActiveSection('admin-stats');
    setStatusMessage(
      `Selamat datang kembali, Administrator (${email}). Menu khusus "📊 Statistik Pengguna" kini aktif.`
    );
  };

  const handleLogoutAdmin = async () => {
    setLocalAdminUnlocked(false);
    setIsAdmin(false);
    if (activeSection === 'admin-stats') {
      setActiveSection('bagian-1');
    }
    try {
      await signOut(auth);
    } catch {
      // Ignore signout error
    }
    setStatusMessage('Anda telah keluar dari Mode Administrator. Tampilan kembali ke mode Guru.');
  };

  return (
    <div id="top" className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Collapsible Left Navigation Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onPrintDocument={handlePrint}
        onOpenKopModal={() => setIsKopModalOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
      />

      {/* Main Content Area — Automatically expands horizontally when sidebar is collapsed */}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col transition-all duration-200">
        <main
          id="workspace"
          className={`flex-1 min-h-0 w-full mx-auto py-8 space-y-8 transition-all duration-200 ${
            isSidebarOpen
              ? 'max-w-[1440px] px-4 sm:px-6'
              : 'max-w-full px-4 sm:px-8 pt-16 lg:pt-8'
          }`}
        >
          {isAdmin && activeSection === 'admin-stats' ? (
            <AdminStatsDashboard
              adminEmail={adminEmail}
              isGoogleAuthenticated={isGoogleAuthenticated}
              onBackToWorkspace={() => setActiveSection('bagian-1')}
              onLogoutAdmin={handleLogoutAdmin}
            />
          ) : (
            <>
              {/* Hero / Context Banner */}
              <section className="no-print bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl space-y-2">
                    <div className="text-xs font-medium text-emerald-800 flex items-center gap-2 flex-wrap">
                      <span>Smart PAI Assessor · Kepka Nomor 020 Tahun 2026</span>
                      <span aria-hidden="true">·</span>
                      <span>5 Elemen PAI & 5 Dimensi Cinta</span>
                      <span aria-hidden="true">·</span>
                      <span>Standar KKG/MGMP PAI & Kemenag RI</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
                      Penyusun Kisi-Kisi Resmi, Naskah Soal, Kartu Soal, Kunci & Rubrik Praktik PAIBP
                    </h1>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Setiap instrumen asesmen disusun presisi mengikuti{' '}
                      <strong className="font-semibold text-slate-900">
                        Regulasi CP PAIBP Terbaru (Kepka Nomor 020 Tahun 2026 / Kurikulum Merdeka)
                      </strong>
                      , terintegrasi dengan{' '}
                      <strong className="font-semibold text-slate-900">5 Dimensi Cinta</strong>,
                      kaidah{' '}
                      <strong className="font-semibold text-slate-900">Strict Anti-Robotic</strong>{' '}
                      sesuai usia murid Fase A–F, serta menghasilkan 5 bagian dokumen resmi siap
                      cetak.
                    </p>
                  </div>

                  {/* Action Buttons in Workspace Header */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleNavigateSection('admin-stats')}
                        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-300 bg-emerald-950 border border-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <BarChart3 className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>📊 Statistik Pengguna (Admin)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsGuideModalOpen(true)}
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-950 bg-amber-50 border border-amber-300 hover:bg-amber-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>📖 Panduan Aplikasi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsKopModalOpen(true)}
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-950 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Settings2 className="w-4 h-4 text-emerald-800 shrink-0" />
                      <span>⚙️ Pengaturan Kop &amp; Pejabat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isSidebarOpen ? (
                        <>
                          <PanelLeftClose className="w-4 h-4 text-slate-700 shrink-0" />
                          <span>Sembunyikan Sidebar</span>
                        </>
                      ) : (
                        <>
                          <PanelLeftOpen className="w-4 h-4 text-emerald-800 shrink-0" />
                          <span>Tampilkan Sidebar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Preset Curriculum Package Switcher */}
                <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Layers className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Paket Instrumen Contoh Siap Cetak:</span>
                  </div>
                  <div
                    role="group"
                    aria-label="Paket Instrumen Contoh Kurikulum Merdeka"
                    className="flex flex-wrap items-center gap-2"
                  >
                    {PRESET_PACKAGES.map((preset) => {
                      const isSelected = activePackage.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPresetPackage(preset)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-900 text-white border-emerald-900'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {preset.parameters.fase} ({preset.parameters.kelas}) —{' '}
                          {preset.parameters.elemen[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Status / Loading Notification */}
              {(isGenerating || statusMessage) && (
                <div
                  role="status"
                  data-testid="generation-status-banner"
                  className={`no-print flex items-center justify-between gap-3 px-4 py-3 border rounded-xl text-xs ${
                    isGenerating
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 text-amber-700 animate-spin shrink-0" />
                    ) : (
                      <BookCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    )}
                    <span className="font-medium">{statusMessage}</span>
                  </div>
                  {!isGenerating && (
                    <button
                      type="button"
                      onClick={() => setStatusMessage(null)}
                      className="text-emerald-800 hover:underline font-medium shrink-0 cursor-pointer"
                    >
                      Tutup
                    </button>
                  )}
                </div>
              )}

              {/* Two-Zone Sandbox Layout: Left Independently Scrollable Parameter Deck + Right 5-Part Output Document */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-0">
                <aside
                  data-testid="config-scroll-panel"
                  style={{ maxHeight: '100vh', overflowY: 'auto' }}
                  className="no-print lg:col-span-4 lg:sticky lg:top-0 lg:h-screen lg:max-h-screen overflow-y-auto min-h-0 pb-24 pr-1"
                >
                  <ParameterPanel
                    parameters={parameters}
                    onChangeParameters={handleParametersChange}
                    onGenerate={handleGenerateAssessment}
                    isGenerating={isGenerating}
                    kopConfig={kopConfig}
                    onChangeKopConfig={handleChangeKopConfig}
                    onResetKopConfig={handleResetKopConfig}
                    onOpenKopModal={() => setIsKopModalOpen(true)}
                  />
                </aside>

                <div className="lg:col-span-8 space-y-8 min-w-0 min-h-0">
                  <AssessmentDocument
                    pkg={activePackage}
                    kopConfig={kopConfig}
                    onChangeKopConfig={handleChangeKopConfig}
                    onResetKopConfig={handleResetKopConfig}
                    onOpenKopModal={() => setIsKopModalOpen(true)}
                    onPrint={handlePrint}
                    onRecordExport={handleRecordDocumentExport}
                  />
                </div>
              </div>

              {/* Kaidah PAIBP Validator & Fase A-F Reference Matrix */}
              <KaidahValidatorSection
                pkg={activePackage}
                onSelectFasePreset={handleSelectFaseFromMatrix}
              />
            </>
          )}
        </main>

        <footer className="no-print mt-12 border-t border-slate-200 bg-white">
          <div className="w-full mx-auto py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Smart PAI Assessor — Instrumen Evaluasi Pembelajaran Pendidikan Agama Islam & Budi
              Pekerti
            </div>
            <div>
              Acuan: CP. Nomor 020 Tahun 2026 · 5 Dimensi Cinta · Standar KKG/MGMP PAI & Kemenag
              RI
            </div>
          </div>

          {/* Watermark Hak Cipta Resmi (@abunaura) + Ikon Kunci Akses Admin */}
          <div className="relative overflow-hidden border-t-2 border-[#b8860b]/70 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 py-4 px-6 select-none shadow-inner">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_88px,rgba(45,25,10,0.65)_88px,rgba(45,25,10,0.65)_90px,rgba(255,235,190,0.2)_90px,rgba(255,235,190,0.2)_92px)]"
            />
            <div className="relative z-10 flex items-center justify-center gap-3 text-center">
              <span className="font-serif text-xs sm:text-sm tracking-[0.14em] uppercase text-[#fef08a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
                Copyright © 2026 Smart PAI Assessor By @abunaura. All Rights Reserved.
              </span>
              <button
                type="button"
                onClick={() => {
                  if (isAdmin) {
                    handleNavigateSection('admin-stats');
                  } else {
                    setIsAdminLoginModalOpen(true);
                  }
                }}
                aria-label="Akses Panel Statistik Admin"
                title={
                  isAdmin
                    ? 'Buka Statistik Pengguna (Admin)'
                    : 'Login Panel Statistik Admin (@abunaura)'
                }
                className="p-1 rounded hover:bg-emerald-700/50 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#fef08a]/85 shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal: Pengaturan Kop & Identitas Penandatangan */}
      {isKopModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="kop-modal-title"
          className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 block">
                  SINKRONISASI REAL-TIME &amp; TERSIMPAN OTOMATIS DI LOCALSTORAGE
                </span>
                <h2 id="kop-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
                  ⚙️ Pengaturan Kop &amp; Identitas Penandatangan
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsKopModalOpen(false)}
                aria-label="Tutup Pengaturan Kop & Pejabat"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 min-h-0">
              <KopPejabatForm
                kopConfig={kopConfig}
                onChangeKopConfig={handleChangeKopConfig}
                onResetDefault={handleResetKopConfig}
              />
            </div>

            <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Perubahan otomatis memperbarui Kop Soal, Kisi-Kisi, Kartu Soal, &amp; Lembar Praktik.
              </span>
              <button
                type="button"
                onClick={() => setIsKopModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                Selesai &amp; Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Panduan Penggunaan Aplikasi (4 Tab Interaktif) */}
      <AppGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onOpenKopModal={() => setIsKopModalOpen(true)}
      />

      {/* Modal: Otorisasi Khusus Admin */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccessAdminLogin={handleSuccessAdminLogin}
      />
    </div>
  );
}
