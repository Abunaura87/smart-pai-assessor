import React from 'react';
import {
  ChevronLeft,
  Menu,
  TableProperties,
  FileText,
  CreditCard,
  KeyRound,
  Scale,
  ShieldCheck,
  Printer,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onPrintDocument: () => void;
}

const NAV_ITEMS = [
  { id: 'bagian-1', label: '1. Kisi-Kisi Resmi', icon: TableProperties },
  { id: 'bagian-2', label: '2. Naskah Soal', icon: FileText },
  { id: 'bagian-3', label: '3. Kartu Soal Resmi', icon: CreditCard },
  { id: 'bagian-4', label: '4. Kunci & Pembahasan', icon: KeyRound },
  { id: 'bagian-5', label: '5. Rubrik & Praktik', icon: Scale },
  { id: 'kaidah-audit', label: 'Kaidah CP 020/2026', icon: ShieldCheck },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeSection,
  onNavigateSection,
  onPrintDocument,
}) => {
  return (
    <>
      {/* Mobile Backdrop when sidebar is open on small screens */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={onToggle}
          className="no-print fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Floating Toggle Button when Sidebar is Hidden */}
      {!isOpen && (
        <div className="no-print fixed top-4 left-4 z-40">
          <button
            type="button"
            onClick={onToggle}
            aria-label="Buka Sidebar Navigasi"
            aria-expanded={false}
            title="Buka Sidebar Navigasi"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:border-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4 text-emerald-800 shrink-0" />
            <span className="text-xs font-semibold whitespace-nowrap">Menu Navigasi</span>
          </button>
        </div>
      )}

      {/* Collapsible Sidebar Panel */}
      <aside
        aria-label="Sidebar Navigasi Utama"
        className={`no-print fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-200 ease-out shrink-0 ${
          isOpen
            ? 'w-64 translate-x-0 opacity-100'
            : 'w-0 -translate-x-full opacity-0 pointer-events-none overflow-hidden border-r-0'
        }`}
      >
        <div className="w-64 flex flex-col h-full justify-between p-5">
          {/* Top Brand + Collapse Toggle */}
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
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

              <button
                type="button"
                onClick={onToggle}
                aria-label="Sembunyikan Sidebar Navigasi"
                aria-expanded={true}
                title="Sembunyikan Sidebar"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1.5">
              <div className="px-2.5 text-[11px] font-semibold text-slate-400">
                Navigasi Dokumen
              </div>
              <nav aria-label="Navigasi Utama" className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateSection(item.id);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-900 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-emerald-800' : 'text-slate-500'
                        }`}
                      />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Primary Action Button in Sidebar Footer */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <button
              type="button"
              onClick={onPrintDocument}
              className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Cetak Naskah Asesmen</span>
            </button>
            <div className="text-[11px] text-slate-400 text-center">
              Kurikulum Merdeka · PAIBP
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
