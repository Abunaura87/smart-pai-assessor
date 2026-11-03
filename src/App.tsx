/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AssessmentPackage, AssessmentParameters, FaseCode } from './types/assessment';
import { buildCustomFallbackPackage, PRESET_PACKAGES } from './data/presetPackages';
import { getFaseProfile } from './utils/paiRules';
import { Sidebar } from './components/Sidebar';
import { ParameterPanel } from './components/ParameterPanel';
import { AssessmentDocument } from './components/AssessmentDocument';
import { KaidahValidatorSection } from './components/KaidahValidatorSection';
import { BookCheck, Layers, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function App() {
  const [activePackage, setActivePackage] = useState<AssessmentPackage>(PRESET_PACKAGES[0]);
  const [parameters, setParameters] = useState<AssessmentParameters>(PRESET_PACKAGES[0].parameters);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('bagian-1');

  const handleSelectPresetPackage = (pkg: AssessmentPackage) => {
    setActivePackage(pkg);
    setParameters(pkg.parameters);
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
    setStatusMessage(`Memuat instrumen asesmen adaptasi ${fase} (${profile.kelasRange}).`);
  };

  const handleParametersChange = (nextParams: AssessmentParameters) => {
    const faseChanged = nextParams.fase !== parameters.fase;
    setParameters(nextParams);

    if (faseChanged) {
      const matchingPreset = PRESET_PACKAGES.find((p) => p.parameters.fase === nextParams.fase);
      if (matchingPreset) {
        setActivePackage(matchingPreset);
      } else {
        setActivePackage(buildCustomFallbackPackage(nextParams));
      }
      setStatusMessage(
        `Parameter dan pratinjau dokumen disesuaikan ke ${nextParams.fase} (${nextParams.kelas}).`
      );
    }
  };

  const handleGenerateAssessment = async (paramsToGenerate: AssessmentParameters) => {
    setIsGenerating(true);
    // Immediately synthesize deterministic blueprint & items so UI updates with zero latency
    const immediatePkg = buildCustomFallbackPackage(paramsToGenerate);
    setActivePackage(immediatePkg);
    setStatusMessage(
      `Instrumen asesmen "${immediatePkg.judulAsesmen}" (${paramsToGenerate.fase} · ${paramsToGenerate.kelas}) berhasil disusun secara berurutan (5 Bagian Resmi: Kisi-Kisi, Naskah Soal, Kartu Soal, Kunci & Pembahasan, Rubrik & Praktik).`
    );

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

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
          setStatusMessage(
            `Instrumen asesmen "${data.package.judulAsesmen}" (${paramsToGenerate.fase} · ${paramsToGenerate.kelas}) berhasil disusun secara berurutan (5 Bagian Resmi: Kisi-Kisi, Naskah Soal, Kartu Soal, Kunci & Pembahasan, Rubrik & Praktik).`
          );
        }
      }
    } catch {
      // Immediate package is already active and valid
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
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
      />

      {/* Main Content Area — Automatically expands horizontally when sidebar is collapsed */}
      <div className="flex-1 min-w-0 flex flex-col transition-all duration-200">
        <main
          id="workspace"
          className={`flex-1 w-full mx-auto py-8 space-y-8 transition-all duration-200 ${
            isSidebarOpen
              ? 'max-w-[1440px] px-4 sm:px-6'
              : 'max-w-full px-4 sm:px-8 pt-16 lg:pt-8'
          }`}
        >
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
                  , terintegrasi dengan <strong className="font-semibold text-slate-900">5 Dimensi Cinta</strong>,
                  kaidah <strong className="font-semibold text-slate-900">Strict Anti-Robotic</strong> sesuai usia
                  murid Fase A–F, serta menghasilkan 5 bagian dokumen resmi siap cetak.
                </p>
              </div>

              {/* Inline Sidebar Toggle Shortcut inside Workspace Header */}
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

          {/* Status Notification */}
          {statusMessage && (
            <div
              role="status"
              className="no-print flex items-center justify-between gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900"
            >
              <div className="flex items-center gap-2">
                <BookCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>{statusMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setStatusMessage(null)}
                className="text-emerald-800 hover:underline font-medium shrink-0 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          )}

          {/* Two-Zone Sandbox Layout: Left Parameter Protocol Deck + Right 5-Part Output Document */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="no-print lg:col-span-4 lg:sticky lg:top-6">
              <ParameterPanel
                parameters={parameters}
                onChangeParameters={handleParametersChange}
                onGenerate={handleGenerateAssessment}
                isGenerating={isGenerating}
              />
            </aside>

            <div className="lg:col-span-8 space-y-8 min-w-0">
              <AssessmentDocument pkg={activePackage} onPrint={handlePrint} />
            </div>
          </div>

          {/* Kaidah PAIBP Validator & Fase A-F Reference Matrix */}
          <KaidahValidatorSection
            pkg={activePackage}
            onSelectFasePreset={handleSelectFaseFromMatrix}
          />
        </main>

        <footer className="no-print border-t border-slate-200 bg-white py-6 px-6 mt-12">
          <div className="w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              Smart PAI Assessor — Instrumen Evaluasi Pembelajaran Pendidikan Agama Islam & Budi
              Pekerti
            </div>
            <div>
              Acuan: Kepka Nomor 020 Tahun 2026 · 5 Dimensi Cinta · Standar KKG/MGMP PAI & Kemenag
              RI
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
