import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AUTHORIZED_ADMIN_EMAIL,
  computeAdminSecretDigest,
  isAuthorizedAdminEmail,
  verifyAdminCredentialsPure,
} from '../adminAuth';

test('isAuthorizedAdminEmail accepts only marhaniza05@gmail.com (case-insensitive)', () => {
  assert.equal(isAuthorizedAdminEmail('marhaniza05@gmail.com'), true);
  assert.equal(isAuthorizedAdminEmail('  MARHANIZA05@GMAIL.COM '), true);
  assert.equal(isAuthorizedAdminEmail('guru.lain@gmail.com'), false);
  assert.equal(isAuthorizedAdminEmail('admin@smartpai.id'), false);
  assert.equal(isAuthorizedAdminEmail(''), false);
  assert.equal(isAuthorizedAdminEmail(null), false);
});

test('verifyAdminCredentialsPure rejects non-admin emails even with valid password', () => {
  const res = verifyAdminCredentialsPure({
    email: 'oranglain@gmail.com',
    password: 'Abunaura#PAI2026!',
  });
  assert.equal(res.valid, false);
  assert.ok(res.reason?.includes('Akses Ditolak'));
});

test('verifyAdminCredentialsPure rejects old/public passcodes (@abunaura, @abunaura2026)', () => {
  for (const insecureCode of ['@abunaura', 'abunaura', '@abunaura2026', 'abunaura2026', 'admin']) {
    const res = verifyAdminCredentialsPure({
      email: AUTHORIZED_ADMIN_EMAIL,
      password: insecureCode,
    });
    assert.equal(res.valid, false, `Expected ${insecureCode} to be rejected`);
  }
});

test('verifyAdminCredentialsPure accepts exact admin email + default secret password', () => {
  const res = verifyAdminCredentialsPure({
    email: AUTHORIZED_ADMIN_EMAIL,
    password: 'Abunaura#PAI2026!',
  });
  assert.equal(res.valid, true);
});

test('verifyAdminCredentialsPure respects customPasswordDigest when set', () => {
  const customDigest = computeAdminSecretDigest('SandiBaruRahasia2026#');

  // Default password should no longer work when custom digest is active
  const oldTry = verifyAdminCredentialsPure({
    email: AUTHORIZED_ADMIN_EMAIL,
    password: 'Abunaura#PAI2026!',
    customPasswordDigest: customDigest,
  });
  assert.equal(oldTry.valid, false);

  // Custom password works with authorized email
  const newTry = verifyAdminCredentialsPure({
    email: AUTHORIZED_ADMIN_EMAIL,
    password: 'SandiBaruRahasia2026#',
    customPasswordDigest: customDigest,
  });
  assert.equal(newTry.valid, true);
});
