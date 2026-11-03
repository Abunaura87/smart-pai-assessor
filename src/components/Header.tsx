import React from 'react';

interface HeaderProps {
  onNavigateSection: (sectionId: string) => void;
  onPrintDocument: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection, onPrintDocument }) => {
  return (
    <header className="no-print sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-4 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Zone 1: Brand Title (single text element wordmark) */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onNavigateSection('workspace');
        }}
        className="text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
      >
        Smart PAI Assessor
      </a>

      {/* Zone 2: 4–5 concise single-line text navigation links */}
      <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <a
          href="#bagian-1"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('bagian-1');
          }}
          className="hover:text-emerald-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Matriks Kisi-Kisi
        </a>
        <a
          href="#bagian-2"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('bagian-2');
          }}
          className="hover:text-emerald-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Naskah Soal
        </a>
        <a
          href="#bagian-3"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('bagian-3');
          }}
          className="hover:text-emerald-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Kunci & Pembahasan
        </a>
        <a
          href="#bagian-4"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('bagian-4');
          }}
          className="hover:text-emerald-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Rubrik Penskoran
        </a>
        <a
          href="#kaidah-audit"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('kaidah-audit');
          }}
          className="hover:text-emerald-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Kaidah PAIBP
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onPrintDocument}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Cetak Naskah Asesmen
        </button>
      </div>
    </header>
  );
};
