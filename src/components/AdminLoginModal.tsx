import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import {
  ensureAdminProfileInFirestore,
  setLocalAdminUnlocked,
} from '../utils/telemetryClient';
import {
  AUTHORIZED_ADMIN_EMAIL,
  clearFailedLoginAttempts,
  getCustomAdminPasswordDigest,
  getLockoutState,
  isAuthorizedAdminEmail,
  MAX_FAILED_ATTEMPTS,
  recordFailedLoginAttempt,
  verifyAdminCredentialsPure,
} from '../utils/adminAuth';
import {
  AlertTriangle,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
  X,
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdminLogin: (adminEmail: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessAdminLogin,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isVerifyingCredentials, setIsVerifyingCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutRemainingSec, setLockoutRemainingSec] = useState<number>(0);

  // Reset form fields and check lockout state whenever modal opens/closes
  useEffect(() => {
    setEmailInput('');
    setPasswordInput('');
    setShowPassword(false);
    setErrorMessage(null);
    setIsLoadingGoogle(false);
    setIsVerifyingCredentials(false);

    if (!isOpen) return;

    const updateLockoutTimer = () => {
      const state = getLockoutState(Date.now());
      if (state.lockoutUntilMs > Date.now()) {
        setLockoutRemainingSec(Math.ceil((state.lockoutUntilMs - Date.now()) / 1000));
      } else {
        setLockoutRemainingSec(0);
      }
    };

    updateLockoutTimer();
    const interval = window.setInterval(updateLockoutTimer, 1000);
    return () => window.clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const isLockedOut = lockoutRemainingSec > 0;

  const handleFailedAttempt = (reason: string) => {
    const nextState = recordFailedLoginAttempt(Date.now());
    if (nextState.lockoutUntilMs > Date.now()) {
      const secs = Math.ceil((nextState.lockoutUntilMs - Date.now()) / 1000);
      setLockoutRemainingSec(secs);
      setErrorMessage(
        `Terlalu banyak percobaan gagal (${MAX_FAILED_ATTEMPTS}x). Akses login dikunci sementara selama ${secs} detik demi keamanan.`
      );
    } else {
      const remaining = Math.max(0, MAX_FAILED_ATTEMPTS - nextState.failedAttempts);
      setErrorMessage(`${reason} (Sisa percobaan: ${remaining}x)`);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLockedOut) return;
    setErrorMessage(null);
    setIsLoadingGoogle(true);

    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const user = credential.user;
      const signedInEmail = (user.email || '').trim().toLowerCase();

      if (!user.emailVerified || !isAuthorizedAdminEmail(signedInEmail)) {
        // Segera keluarkan akun Google yang tidak berwenang & cabut sesi lokal
        setLocalAdminUnlocked(false);
        await signOut(auth);
        handleFailedAttempt(
          `Akses Ditolak: Akun Google "${user.email || 'Tidak dikenal'}" tidak memiliki otorisasi Administrator pada aplikasi ini.`
        );
        setIsLoadingGoogle(false);
        return;
      }

      clearFailedLoginAttempts();
      setLocalAdminUnlocked(true, 'google_oauth');
      await ensureAdminProfileInFirestore();
      setIsLoadingGoogle(false);
      onSuccessAdminLogin(user.email || AUTHORIZED_ADMIN_EMAIL);
      onClose();
    } catch (error) {
      setIsLoadingGoogle(false);
      const rawMsg = error instanceof Error ? error.message : String(error);
      if (rawMsg.includes('auth/popup-closed-by-user')) {
        setErrorMessage('Jendela autentikasi Google ditutup sebelum proses verifikasi selesai.');
      } else if (
        rawMsg.includes('auth/popup-blocked') ||
        rawMsg.includes('auth/cancelled-popup-request') ||
        rawMsg.includes('auth/unauthorized-domain') ||
        rawMsg.includes('auth/operation-not-supported-in-this-environment')
      ) {
        setErrorMessage(
          'Autentikasi pop-up Google diblokir oleh peramban atau domain belum terdaftar di Firebase Auth. Silakan masuk menggunakan Email Administrator & Kata Sandi Rahasia di bawah.'
        );
      } else {
        setErrorMessage(
          'Gagal melakukan verifikasi Google OAuth. Gunakan kredensial Email & Kata Sandi Rahasia Administrator di bawah.'
        );
      }
    }
  };

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;
    setErrorMessage(null);

    const cleanEmail = emailInput.trim();
    const rawPassword = passwordInput.trim();

    if (!cleanEmail || !rawPassword) {
      setErrorMessage('Mohon isi Email Administrator dan Kata Sandi Rahasia secara lengkap.');
      return;
    }

    setIsVerifyingCredentials(true);
    const customDigest = getCustomAdminPasswordDigest();

    try {
      // 1. Coba verifikasi ke endpoint server (/api/admin/verify) terlebih dahulu
      let verifiedByServer = false;
      let serverResponded = false;
      let serverErrorMsg = '';

      try {
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: cleanEmail,
            password: rawPassword,
            customPasswordDigest: customDigest,
          }),
        });
        if (res.status === 200 || res.status === 401) {
          serverResponded = true;
          const data = await res.json();
          if (res.ok && data.ok) {
            verifiedByServer = true;
          } else {
            serverErrorMsg = data.error || 'Akses Ditolak: Kredensial Administrator tidak valid.';
          }
        }
      } catch {
        // Fallback ke verifikasi digest terenkripsi sisi klien (mis. saat deploy statis di Vercel)
      }

      if (serverResponded) {
        if (!verifiedByServer) {
          setIsVerifyingCredentials(false);
          setPasswordInput('');
          handleFailedAttempt(serverErrorMsg);
          return;
        }
      } else {
        const localCheck = verifyAdminCredentialsPure({
          email: cleanEmail,
          password: rawPassword,
          customPasswordDigest: customDigest,
        });

        if (!localCheck.valid) {
          setIsVerifyingCredentials(false);
          setPasswordInput('');
          handleFailedAttempt(
            localCheck.reason || 'Akses Ditolak: Email atau Kata Sandi Administrator tidak valid.'
          );
          return;
        }
      }

      // Kredensial valid — apabila ada akun Firebase non-admin yang masih tersangkut, sign out dulu
      if (auth.currentUser && !isAuthorizedAdminEmail(auth.currentUser.email)) {
        try {
          await signOut(auth);
        } catch {
          // Ignore signOut error
        }
      }

      clearFailedLoginAttempts();
      setLocalAdminUnlocked(true, 'credentials');
      setIsVerifyingCredentials(false);
      onSuccessAdminLogin(AUTHORIZED_ADMIN_EMAIL);
      onClose();
    } catch {
      setIsVerifyingCredentials(false);
      setErrorMessage('Terjadi kesalahan saat memverifikasi otorisasi Administrator.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs"
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center text-amber-300 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-300 block">
                SISTEM KEAMANAN TERPROTEKSI
              </span>
              <h2 id="admin-login-title" className="text-base font-bold text-white">
                Otorisasi Panel Administrator
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Jendela Login Admin"
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              Area <strong className="font-semibold text-slate-900">Statistik &amp; Analitik Sistem</strong>{' '}
              dikunci secara ketat khusus untuk Pengelola Resmi. Guru pengguna biasa tidak memerlukan
              login dan dapat langsung menyusun instrumen asesmen PAIBP.
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              data-testid="admin-login-error"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5"
            >
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {isLockedOut && (
            <div
              data-testid="admin-lockout-banner"
              className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-center gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Proteksi keamanan aktif. Silakan tunggu{' '}
                <strong className="font-bold">{lockoutRemainingSec} detik</strong> sebelum mencoba
                kembali.
              </span>
            </div>
          )}

          {/* Option 1: Strict Credential Form (Email Admin + Secret Password) */}
          <form onSubmit={handleCredentialSubmit} className="space-y-3.5" autoComplete="off">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email-input"
                className="text-xs font-semibold text-slate-800 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-800" />
                <span>Email Administrator Resmi</span>
              </label>
              <input
                id="admin-email-input"
                data-testid="admin-email-input"
                type="email"
                required
                disabled={isLockedOut || isVerifyingCredentials}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan email administrator..."
                autoComplete="off"
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15 disabled:bg-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password-input"
                className="text-xs font-semibold text-slate-800 flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                <span>Kata Sandi Rahasia Admin</span>
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  data-testid="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLockedOut || isVerifyingCredentials}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Masukkan kata sandi rahasia..."
                  autoComplete="new-password"
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15 disabled:bg-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              data-testid="admin-submit-button"
              disabled={isLockedOut || isVerifyingCredentials}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-950 disabled:bg-slate-300 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              {isVerifyingCredentials ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Kredensial...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Verifikasi &amp; Buka Panel Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="relative flex py-0.5 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-[11px] font-medium text-slate-400">
              atau autentikasi SSO
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Option 2: Google OAuth Verification */}
          <div className="space-y-2">
            <button
              type="button"
              data-testid="admin-google-login-button"
              onClick={handleGoogleLogin}
              disabled={isLoadingGoogle || isLockedOut}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
            >
              {isLoadingGoogle ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-800" />
                  <span>Memverifikasi Akun Google...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <span>Masuk dengan Google OAuth (Khusus Admin)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Proteksi Enkripsi &amp; Anti-Brute-Force Aktif</span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
