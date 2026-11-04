import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { ADMIN_EMAIL, auth, googleProvider } from '../firebase';
import { ensureAdminProfileInFirestore, setLocalAdminUnlocked } from '../utils/telemetryClient';
import { KeyRound, Loader2, Lock, ShieldAlert, ShieldCheck, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdminLogin: (adminEmail: string) => void;
}

const VALID_ADMIN_PASSCODES = ['@abunaura2026', 'adminpai2026', 'marhaniza05'];

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessAdminLogin,
}) => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleAdminSignIn = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage(null);
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
        setErrorMessage(
          'Pop-up login Google diblokir oleh peramban atau koneksi terputus. Anda juga dapat menggunakan Kode Akses Admin di bawah.'
        );
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleaned = passcode.trim();
    if (!cleaned) {
      setErrorMessage('Masukkan Kode Akses Admin terlebih dahulu.');
      return;
    }

    if (VALID_ADMIN_PASSCODES.includes(cleaned.toLowerCase())) {
      setLocalAdminUnlocked(true);
      setPasscode('');
      onSuccessAdminLogin(ADMIN_EMAIL);
      onClose();
    } else {
      setErrorMessage(
        'Kode Akses Admin tidak sesuai. Gunakan akun Google resmi Admin atau masukkan kode otorisasi @abunaura2026.'
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
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5"
            >
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Opsi 1: Login Google Admin (Firebase Auth) */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>1. Masuk dengan Akun Google Admin (Cloud Firestore)</span>
            </div>
            <button
              type="button"
              onClick={handleGoogleAdminSignIn}
              disabled={isLoadingGoogle}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-950 disabled:opacity-60 text-white text-xs font-semibold flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer"
            >
              {isLoadingGoogle ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Akun Google Admin...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Login Google Admin ({ADMIN_EMAIL})</span>
                </>
              )}
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 whitespace-nowrap">
              atau kode akses langsung
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* Opsi 2: Kode Akses Langsung Admin (@abunaura2026) */}
          <form onSubmit={handlePasscodeSubmit} className="space-y-2.5">
            <label
              htmlFor="admin-passcode-input"
              className="text-xs font-semibold text-slate-800 flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-700" />
              <span>2. Kode Akses Cepat Admin (@abunaura)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="admin-passcode-input"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan kode akses admin..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Buka Statistik
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Gunakan kode <code className="font-mono text-slate-700">@abunaura2026</code> apabila
              jendela pop-up Google diblokir pada mode pratinjau.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
