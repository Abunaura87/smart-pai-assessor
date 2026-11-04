# Security Specification — Smart PAI Assessor

## 1. Data Invariants
1. **Default-Deny Catch-All**: Every path not explicitly matched is denied by `match /{document=**} { allow read, write: if false; }`.
2. **Bootstrapped & Verified Admin Identity**: `isAdmin()` requires `isSignedIn()` and either a verified token email matching `"marhaniza05@gmail.com"` (`request.auth.token.email_verified == true`) or the existence of `/admins/$(request.auth.uid)`.
3. **PII & Analytics Isolation**: Only `isAdmin()` can `get` or `list` `/admins/{adminId}` and `/usageEvents/{eventId}` (with `resource.data.eventId is string` check on `list`). Regular users cannot read admin profiles or telemetry records.
4. **Strict Blueprint Validation (`isValidAdminProfile` & `isValidUsageEvent`)**:
   - Enforces `hasAll` and `hasOnly` on document keys to block shadow/ghost fields.
   - Enforces exact string length bounds (`maxLength`) and regex patterns (`^[a-zA-Z0-9_\-]+$`) on ID fields.
   - Enforces `incoming().authorUid == request.auth.uid` and `incoming().createdAt == request.time`.
5. **Immutable Audit Log**: `/usageEvents/{eventId}` and `/admins/{adminId}` are append-only (`allow update: if false;`), preventing update-gap or state-tampering attacks. Only `isAdmin()` may delete a usage event when resetting telemetry.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write (`usageEvents`)**: `auth = null` attempting `create` on `/usageEvents/evt_1` -> `PERMISSION_DENIED`.
2. **Unverified Email Spoof (`admins`)**: `auth = { uid: 'u1', token: { email: 'marhaniza05@gmail.com', email_verified: false } }` attempting `get` on `/usageEvents/evt_1` -> `PERMISSION_DENIED`.
3. **Ghost Field Injection (`usageEvents`)**: Authenticated user sending `{ ..., isSuperAdmin: true }` -> Rejected by `data.keys().hasOnly(...)` -> `PERMISSION_DENIED`.
4. **Identity Spoofing (`usageEvents`)**: User `u1` setting `authorUid: 'u2'` -> Rejected by `data.authorUid == request.auth.uid` -> `PERMISSION_DENIED`.
5. **ID Poisoning (`usageEvents`)**: Document ID containing spaces/slashes or >128 chars -> Rejected by `isValidId(eventId)` -> `PERMISSION_DENIED`.
6. **Denial of Wallet Oversized String (`usageEvents`)**: `topikMateri` with 5,000 characters (>250 max) -> Rejected by `data.topikMateri.size() <= 250` -> `PERMISSION_DENIED`.
7. **Forged Client Timestamp (`usageEvents`)**: Setting `createdAt` to a past/future timestamp instead of `request.time` -> Rejected by `data.createdAt == request.time` -> `PERMISSION_DENIED`.
8. **Enum Violation (`usageEvents`)**: Setting `eventType: 'hack_system'` -> Rejected by `data.eventType in [...]` -> `PERMISSION_DENIED`.
9. **Unauthorized Read of Telemetry (`usageEvents`)**: Non-admin signed-in user attempting `get` or `list` on `/usageEvents` -> `PERMISSION_DENIED`.
10. **Self-Assigned Admin Profile (`admins`)**: Non-admin user `u2` attempting `create` on `/admins/u2` -> Rejected by `isAdmin()` -> `PERMISSION_DENIED`.
11. **Role Escalation via Update (`admins`)**: Attempting `update` on `/admins/u1` -> Rejected by `allow update: if false` -> `PERMISSION_DENIED`.
12. **Unauthorized Deletion (`usageEvents`)**: Non-admin user attempting `delete` on `/usageEvents/evt_1` -> Rejected by `isAdmin()` -> `PERMISSION_DENIED`.
