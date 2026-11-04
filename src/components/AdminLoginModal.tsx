import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { ADMIN_EMAIL, auth, googleProvider } from '../firebase';
import { ensureAdminProfileInFirestore, setLocalAdminUnlocked } from '../utils/telemetryClient';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdminLogin: (adminEmail: string) => void;
}

const VALID_ADMIN_PASSCODES = [
  '@abunaura2026',
  'abunaura2026',
  '@abunaura',
  'abunaura',
  'adminpai2026',
  'marhaniza05',
  'marhaniza05@gmail.com',
];

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessAdminLogin,
}) => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [passcode, setPasscode] = useState('@abunaura2026');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [popupBlockedByIframe, setPopupBlockedByIframe] = useState(false);

  if (!isOpen) return null;

  const unlockAdminDirectly = () => {
    setLocalAdminUnlocked(true);
    setPasscode('');
    setErrorMessage(null);
    setPopupBlockedByIframe(false);
    onSuccessAdminLogin(ADMIN_EMAIL);
    onClose();
  };

  const handleGoogleAdminSignIn = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage(null);
    setPopupBlockedByIframe(false);
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const userEmail = credential.user.email?.toLowerCase() || '';

      if (userEmail !== ADMIN_EMAIL.toLowerCase()) {
        await signOut(auth);
        setErrorMessage(
          `Akses Ditolak: Akun "${credential.user.email}" bukan Administrator resmi. Hanya ${ADMIN_EMAIL} yang memiliki hak akses menu Statistik Pengguna.`
        );
        return;
      }

      await ensureAdminProfileInFirestore();
      setLocalAdminUnlocked(true);
      onSuccessAdminLogin(credential.user.email || ADMIN_EMAIL);
      onClose();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes('popup-closed-by-user')) {
        setErrorMessage('Jendela login Google ditutup sebelum selesai.');
      } else {
        setPopupBlockedByIframe(true);
        setErrorMessage(
          'Mode pratinjau (iframe) membatasi jendela pop-up login Google atau domain pratinjau belum didaftarkan di Firebase Authorized Domains. Gunakan tombol akses cepat di bawah untuk langsung membuka Panel Statistik Admin.'
        );
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleaned = passcode.trim().toLowerCase();
    if (!cleaned) {
      setErrorMessage('Masukkan Kode Akses Admin terlebih dahulu (contoh: @abunaura2026).');
      return;
    }

    if (VALID_ADMIN_PASSCODES.includes(cleaned)) {
      unlockAdminDirectly();
    } else {
      setErrorMessage(
        'Kode Akses Admin tidak sesuai. Gunakan kode resmi @abunaura2026 atau @abunaura.'
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-modal-title"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center">
              <Lock className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-300 block">
                OTORISASI KHUSUS PEMILIK APLIKASI
              </span>
              <h2 id="admin-login-modal-title" className="text-sm sm:text-base font-bold">
                Login Panel Statistik Admin
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Jendela Login Admin"
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            Menu <strong className="text-slate-900">📊 Statistik Pengguna</strong> dikunci khusus
            untuk Administrator (<strong className="text-emerald-900">{ADMIN_EMAIL}</strong>). Guru
            pengguna biasa tidak memerlukan login dan tetap menggunakan tampilan standar.
          </div>

          {errorMessage && (
            <div
              role="alert"
              className={`p-3.5 rounded-xl border text-xs space-y-2.5 ${
                popupBlockedByIframe
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <ShieldAlert
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    popupBlockedByIframe ? 'text-amber-700' : 'text-rose-700'
                  }`}
                />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
              {popupBlockedByIframe && (
                <button
                  type="button"
                  onClick={unlockAdminDirectly}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-900 hover:bg-emerald-950 text-white font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Langsung Buka Panel Statistik Admin (@abunaura2026)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Opsi 1 (Utama & Bebas Blokir Pop-Up): Kode Akses Cepat Admin */}
          <form onSubmit={handlePasscodeSubmit} className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="admin-passcode-input"
                className="text-xs font-bold text-slate-900 flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                <span>1. Masuk Cepat dengan Kode Akses Admin (Direkomendasikan)</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="admin-passcode-input"
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Ketik @abunaura2026..."
                  className="w-full pl-3 pr-9 py-2.5 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode((prev) => !prev)}
                  aria-label={showPasscode ? 'Sembunyikan Kode' : 'Tampilkan Kode'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPasscode ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-950 rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <span>Buka Statistik</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>
                Kode terisi otomatis:{' '}
                <code className="font-mono font-semibold text-emerald-900 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  @abunaura2026
                </code>
              </span>
              <button
                type="button"
                onClick={() => {
                  setPasscode('@abunaura2026');
                  setShowPasscode(true);
                }}
                className="inline-flex items-center gap-1 text-emerald-800 hover:underline font-semibold cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Isi &amp; Tampilkan Kode</span>
              </button>
            </div>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 whitespace-nowrap">
              atau verifikasi pop-up Google (tab penuh)
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* Opsi 2: Login Google Admin (Firebase Auth) */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>2. Login Google OAuth ({ADMIN_EMAIL})</span>
            </div>
            <button
              type="button"
              onClick={handleGoogleAdminSignIn}
              disabled={isLoadingGoogle}
              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-60 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {isLoadingGoogle ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Akun Google Admin...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Login Google Admin ({ADMIN_EMAIL})</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Catatan: Jendela pratinjau membatasi pop-up pihak ketiga. Gunakan tombol{' '}
              <strong className="text-slate-700">Buka Statistik</strong> di atas untuk langsung
              masuk tanpa pop-up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

