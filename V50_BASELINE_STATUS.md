# YASH Accounting — V50 Baseline

## Current baseline

The repository contains the working V50 build:

- `YASH_Accounting_V50_Voucher_Polish.zip`
- The ZIP contains the runnable `index.html` build.
- The build is preserved as the V50 reference and must not be replaced by a new demo/template.

## Initial code audit

The bundled V50 build contains code/logic related to:

- Login/start screen
- Company/account workflows
- Account Master
- Purchase / purchase invoice
- Sales / sales invoice
- Voucher save/edit/list workflows
- Voucher numbering
- Stock calculations
- Ledger
- Outstanding
- Stock Report
- GST-related workflows/reports
- Day Book
- Keyboard shortcuts/navigation
- Pukka/Kaccha/Mixed modes

The current build is a single bundled HTML application rather than the original editable React/Vite source tree.

## Important baseline rule

All future YASH Accounting development must preserve the working V50 behavior. Do not replace the V50 build with a fresh starter project.

## Next technical phase

1. Keep the current V50 ZIP untouched as the recovery/reference build.
2. Recover/reconstruct a proper editable project structure from the current V50 implementation.
3. Only after the editable structure is verified should feature development continue.
4. Future accounting persistence should move from browser LocalStorage to an appropriate local/cloud database architecture as specified by the Master Plan.

## User requirement

No completion sound, buzzer, vibration, or completion notification should be added unless explicitly requested again.
