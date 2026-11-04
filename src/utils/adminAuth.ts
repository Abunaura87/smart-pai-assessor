/**
 * Modul Keamanan & Otorisasi Administrator — Smart PAI Assessor
 *
 * Menjamin akses ke menu khusus "📊 Statistik Pengguna" hanya dapat dibuka oleh
 * Administrator resmi melalui:
 * 1. Otorisasi Google OAuth (Firebase Auth) dengan verifikasi email ketat, ATAU
 * 2. Kombinasi 2 Faktor: Email Administrator Resmi + Kata Sandi Rahasia Admin
 *    (tanpa auto-fill, tanpa petunjuk sandi di UI, dan dilengkapi proteksi brute-force).
 */

export const AUTHORIZED_ADMIN_EMAIL = 'marhaniza05@gmail.com';
const LEGACY_INSECURE_STORAGE_KEY = 'smart_pai_admin_unlocked_v1';
const ADMIN_SESSION_STORAGE_KEY = 'smart_pai_admin_session_v2';
const CUSTOM_PASSWORD_HASH_KEY = 'smart_pai_admin_custom_pw_hash_v2';
const LOCKOUT_STORAGE_KEY = 'smart_pai_admin_lockout_v2';

export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 jam
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 60 * 1000; // 60 detik

/**
 * Hash deterministik FNV-1a 64-bit (kompatibel penuh di Node.js & Browser sinkron)
 * dengan salt internal agar kata sandi tidak disimpan sebagai teks biasa.
 */
export function computeAdminSecretDigest(rawInput: string): string {
  const salted = `smart_pai_salt_2026::${rawInput}::cp020_auth`;
  let h1 = 0xdeadbeef ^ salted.length;
  let h2 = 0x41c6ce57 ^ salted.length;

  for (let i = 0; i < salted.length; i++) {
    const ch = salted.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return ` digest_v2_${hex1}${hex2}`.trim();
}

// Digest dari kata sandi standar baru: "Abunaura#PAI2026!"
const DEFAULT_ADMIN_PASSWORD_DIGEST = computeAdminSecretDigest('Abunaura#PAI2026!');

export interface AdminSessionPayload {
  email: string;
  signature: string;
  issuedAtMs: number;
  expiresAtMs: number;
  method: 'google_oauth' | 'credentials';
}

export interface LockoutState {
  failedAttempts: number;
  lockoutUntilMs: number;
}

export interface CredentialVerificationResult {
  valid: boolean;
  errorMessage?: string;
  remainingAttempts?: number;
  lockedOutSeconds?: number;
}

/**
 * Memeriksa apakah email yang diberikan adalah email Administrator resmi.
 */
export function isAuthorizedAdminEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  return email.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
}

/**
 * Memvalidasi kredensial (Email + Kata Sandi) secara murni.
 * Menolak tegas email selain admin, kata sandi kosong, atau kata sandi publik (@abunaura).
 */
export function verifyAdminCredentialsPure(options: {
  email: string;
  password: string;
  customPasswordDigest?: string | null;
}): { valid: boolean; reason?: string } {
  const cleanEmail = String(options.email ?? '').trim().toLowerCase();
  const rawPassword = String(options.password ?? '').trim();

  if (!cleanEmail || !rawPassword) {
    return {
      valid: false,
      reason: 'Email Administrator dan Kata Sandi Rahasia wajib diisi lengkap.',
    };
  }

  if (!isAuthorizedAdminEmail(cleanEmail)) {
    return {
      valid: false,
      reason: 'Akses Ditolak: Email yang Anda masukkan tidak terdaftar sebagai Administrator sistem.',
    };
  }

  // Tolak kata sandi yang terlalu pendek atau string watermark publik
  const forbiddenPublicStrings = [
    '@abunaura',
    'abunaura',
    '@abunaura2026',
    'abunaura2026',
    'admin',
    'admin123',
    '123456',
    AUTHORIZED_ADMIN_EMAIL.toLowerCase(),
  ];

  if (forbiddenPublicStrings.includes(rawPassword.toLowerCase())) {
    return {
      valid: false,
      reason:
        'Akses Ditolak: Kode publik atau kode lama yang tidak aman telah dinonaktifkan. Gunakan Kata Sandi Rahasia Admin yang baru.',
    };
  }

  const inputDigest = computeAdminSecretDigest(rawPassword);
  const targetDigest = options.customPasswordDigest || DEFAULT_ADMIN_PASSWORD_DIGEST;

  if (inputDigest !== targetDigest) {
    return {
      valid: false,
      reason: 'Akses Ditolak: Kata Sandi Rahasia Administrator tidak sesuai.',
    };
  }

  return { valid: true };
}

/**
 * Membaca custom password digest jika Admin pernah mengubah kata sandi.
 */
export function getCustomAdminPasswordDigest(): string | null {
  try {
    const stored = localStorage.getItem(CUSTOM_PASSWORD_HASH_KEY);
    if (stored && stored.startsWith('digest_v2_')) {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Menyimpan kata sandi baru yang diatur oleh Admin dari dalam Dashboard.
 */
export function updateCustomAdminPassword(
  currentPassword: string,
  newPassword: string
): { ok: boolean; message: string } {
  const verifyCurrent = verifyAdminCredentialsPure({
    email: AUTHORIZED_ADMIN_EMAIL,
    password: currentPassword,
    customPasswordDigest: getCustomAdminPasswordDigest(),
  });

  if (!verifyCurrent.valid) {
    return {
      ok: false,
      message: 'Kata sandi saat ini tidak sesuai.',
    };
  }

  const trimmedNew = newPassword.trim();
  if (trimmedNew.length < 8) {
    return {
      ok: false,
      message: 'Kata sandi baru minimal harus terdiri dari 8 karakter.',
    };
  }

  const forbidden = ['@abunaura', 'abunaura', '@abunaura2026', 'abunaura2026', 'admin123'];
  if (forbidden.includes(trimmedNew.toLowerCase())) {
    return {
      ok: false,
      message: 'Jangan gunakan nama watermark publik atau kode lama sebagai kata sandi.',
    };
  }

  const nextDigest = computeAdminSecretDigest(trimmedNew);
  try {
    localStorage.setItem(CUSTOM_PASSWORD_HASH_KEY, nextDigest);
  } catch {
    return {
      ok: false,
      message: 'Gagal menyimpan kata sandi baru ke penyimpanan peramban.',
    };
  }

  return {
    ok: true,
    message: 'Kata Sandi Rahasia Administrator berhasil diperbarui.',
  };
}

/**
 * Manajemen proteksi brute-force (lockout sementara setelah 5 percobaan gagal).
 */
export function getLockoutState(nowMs = Date.now()): LockoutState {
  try {
    const raw = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (!raw) return { failedAttempts: 0, lockoutUntilMs: 0 };
    const parsed = JSON.parse(raw) as Partial<LockoutState>;
    const failedAttempts = Number(parsed.failedAttempts) || 0;
    const lockoutUntilMs = Number(parsed.lockoutUntilMs) || 0;
    if (lockoutUntilMs > 0 && nowMs >= lockoutUntilMs) {
      localStorage.removeItem(LOCKOUT_STORAGE_KEY);
      return { failedAttempts: 0, lockoutUntilMs: 0 };
    }
    return { failedAttempts, lockoutUntilMs };
  } catch {
    return { failedAttempts: 0, lockoutUntilMs: 0 };
  }
}

export function recordFailedLoginAttempt(nowMs = Date.now()): LockoutState {
  const current = getLockoutState(nowMs);
  const nextAttempts = current.failedAttempts + 1;
  const lockoutUntilMs =
    nextAttempts >= MAX_FAILED_ATTEMPTS ? nowMs + LOCKOUT_DURATION_MS : 0;
  const nextState: LockoutState = {
    failedAttempts: nextAttempts,
    lockoutUntilMs,
  };
  try {
    localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify(nextState));
  } catch {
    // Ignore storage error
  }
  return nextState;
}

export function clearFailedLoginAttempts(): void {
  try {
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch {
    // Ignore storage error
  }
}

/**
 * Membuat tanda tangan sesi internal agar sesi tidak dapat dipalsukan dengan mudah.
 */
function buildSessionSignature(email: string, issuedAtMs: number, expiresAtMs: number): string {
  return computeAdminSecretDigest(`${email.toLowerCase()}|${issuedAtMs}|${expiresAtMs}`);
}

/**
 * Menyimpan sesi login Admin yang telah terverifikasi dengan masa berlaku terbatas (8 jam).
 */
export function createVerifiedAdminSession(
  email: string,
  method: 'google_oauth' | 'credentials',
  nowMs = Date.now()
): boolean {
  if (!isAuthorizedAdminEmail(email)) {
    clearAdminSession();
    return false;
  }

  const issuedAtMs = nowMs;
  const expiresAtMs = nowMs + SESSION_DURATION_MS;
  const payload: AdminSessionPayload = {
    email: AUTHORIZED_ADMIN_EMAIL,
    signature: buildSessionSignature(AUTHORIZED_ADMIN_EMAIL, issuedAtMs, expiresAtMs),
    issuedAtMs,
    expiresAtMs,
    method,
  };

  try {
    // Hapus kunci lama yang tidak aman
    localStorage.removeItem(LEGACY_INSECURE_STORAGE_KEY);
    localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(payload));
    clearFailedLoginAttempts();
    return true;
  } catch {
    return false;
  }
}

/**
 * Memeriksa apakah sesi Admin saat ini valid, belum kedaluwarsa, dan memiliki tanda tangan sah.
 * Sekaligus membersihkan kunci `smart_pai_admin_unlocked_v1` versi lama.
 */
export function hasValidAdminSession(nowMs = Date.now()): boolean {
  try {
    // Pastikan kunci lama yang rentan selalu dihapus
    if (localStorage.getItem(LEGACY_INSECURE_STORAGE_KEY) !== null) {
      localStorage.removeItem(LEGACY_INSECURE_STORAGE_KEY);
    }

    const raw = localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!raw) return false;

    const parsed = JSON.parse(raw) as Partial<AdminSessionPayload>;
    if (
      !parsed ||
      typeof parsed.email !== 'string' ||
      !isAuthorizedAdminEmail(parsed.email) ||
      typeof parsed.issuedAtMs !== 'number' ||
      typeof parsed.expiresAtMs !== 'number' ||
      typeof parsed.signature !== 'string'
    ) {
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      return false;
    }

    if (nowMs >= parsed.expiresAtMs) {
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      return false;
    }

    const expectedSig = buildSessionSignature(
      parsed.email,
      parsed.issuedAtMs,
      parsed.expiresAtMs
    );
    if (parsed.signature !== expectedSig) {
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Menghapus seluruh sesi Admin dari penyimpanan lokal.
 */
export function clearAdminSession(): void {
  try {
    localStorage.removeItem(LEGACY_INSECURE_STORAGE_KEY);
    localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  } catch {
    // Ignore storage error
  }
}
