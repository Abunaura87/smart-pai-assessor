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
  Settings2,
  BookOpen,
  BarChart3,
  Lock,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onPrintDocument: () => void;
  onOpenKopModal?: () => void;
  onOpenGuideModal?: () => void;
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
  onLogoutAdmin?: () => void;
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
  onOpenKopModal,
  onOpenGuideModal,
  isAdmin = false,
  onOpenAdminLogin,
  onLogoutAdmin,
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
        <div className="w-64 flex flex-col h-full justify-between p-5 overflow-y-auto">
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

            {/* Navigation Menu (Regular Teacher View) */}
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

            {/* Exclusive Admin Menu — ONLY rendered when Admin is logged in */}
            {isAdmin && (
              <div className="pt-3 border-t border-amber-200/80 space-y-1.5">
                <div className="px-2.5 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-amber-800">
                  <span>Menu Khusus Admin</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">Aktif</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateSection('admin-stats')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSection === 'admin-stats'
                      ? 'bg-emerald-950 text-amber-300 shadow-xs'
                      : 'bg-amber-50/80 text-amber-950 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <BarChart3
                    className={`w-4 h-4 shrink-0 ${
                      activeSection === 'admin-stats' ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  />
                  <span>📊 Statistik Pengguna</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button in Sidebar Footer */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            {onOpenGuideModal && (
              <button
                type="button"
                onClick={onOpenGuideModal}
                className="w-full px-3.5 py-2 text-xs font-semibold text-amber-950 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>📖 Panduan Aplikasi</span>
              </button>
            )}
            {onOpenKopModal && (
              <button
                type="button"
                onClick={onOpenKopModal}
                className="w-full px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span>⚙️ Pengaturan Kop &amp; Pejabat</span>
              </button>
            )}
            <button
              type="button"
              onClick={onPrintDocument}
              className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Cetak Naskah Asesmen</span>
            </button>

            <div className="pt-2 flex items-center justify-between gap-2 text-[11px] text-slate-400">
              <span>Kurikulum Merdeka · PAIBP</span>
              {isAdmin ? (
                <button
                  type="button"
                  onClick={onLogoutAdmin}
                  title="Keluar dari Mode Admin"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:underline cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Keluar Admin</span>
                </button>
              ) : (
                onOpenAdminLogin && (
                  <button
                    type="button"
                    onClick={onOpenAdminLogin}
                    title="Login Khusus Administrator (@abunaura)"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Admin</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
