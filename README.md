YASH ACCOUNTING — MASTER PRODUCT PLAN
Stable baseline: V50
Date: 06 October 2026

VISION
Professional Accounting/GST ERP + YASH Business Ecosystem.

CORE
Company, Account/Party, Group, Product/Item, Unit, HSN/SAC, GST/Tax, Bank/Cash, Opening Balance, Price List, Users/Roles.
Transactions: Sales, Purchase, Sales Return, Purchase Return, Estimate, Order, Challan, Receipt, Payment, Contra, Journal, Credit/Debit Note, Cash/Bank, Expense, Production, Stock Journal, Voucher List.
Accounting must update Stock, Ledger, GST and Outstanding atomically. Voucher Edit reverses old effects and applies new effects.

PAKKA / KACCHA / MIXED
One company, three books/logins. Every transaction has company_id + book_type + unique transaction ID.
PAKKA = PAKKA only. KACCHA = KACCHA only. MIXED = combined.
Estimate: KACCHA only; not PAKKA; visible in MIXED but routes to KACCHA.

UI/UX
Professional, colorful but light, simple, user-friendly, responsive Desktop/Tablet/Mobile.
Enter = next field. Ctrl+Enter = Save. F10 = current voucher's own Voucher List.
Voucher List and Account Edit must remain accessible.
No unnecessary toolbar. No buzzer/sound/vibration/completion notifications unless explicitly requested.

GST & REPORTS
CGST/SGST same-state, IGST inter-state; Regular/Composition/URD/RCM/Other.
GST Master, GST Entry, RCM, GST Expense/Income, GST Reports/Register, GSTR-2B, Return, Integrity/Audit, E-Invoice, E-Way Bill.
Reports: Ledger, Voucher List, Day Book, Cash/Bank Book, Outstanding, Bill-wise/Ageing, Trial Balance, P&L, Balance Sheet, registers, stock, party-wise, expense/income, GST/HSN/SAC and analysis. MIXED reports merge PAKKA + KACCHA correctly.

OFFLINE / ONLINE / HYBRID
One accounting engine supporting local offline DB, cloud DB and synchronization.
Windows offline; automatic encrypted backup.
Online browser/cloud.
Hybrid: work offline and sync when internet returns.
Use proper local DB + cloud DB/API, not browser LocalStorage as the serious accounting database.
Unique IDs, sync queue, revisions and conflict detection.
Future platforms: Windows, Mac, Android, iPhone/iPad, tablets.
PWA installable via Add to Home Screen without Play Store/App Store.

LICENSING
Email + Store/Company ID + User ID/password. Monthly/yearly licensing with a lightweight license server. Data remains safe after expiry. Offline grace period.

YASH ADMIN
Dealers, customers, companies, Store IDs, subscriptions, expiry, users, plans, licence status, cloud/sync status and backup.

SALES ECOSYSTEM
Salesman App: mobile order-taking with customer/product/rate/stock/order status and accounting integration.
YASH B2B: business marketplace for manufacturers/wholesalers/distributors/retailers with GSTIN verification, catalogue, wholesale price, MOQ, bulk/repeat orders, credit, tracking, invoice/outstanding.
YASH B2C: direct customer shopping with catalogue, search, cart, address, payment/COD, tracking and returns. B2C order -> Sales Order -> Invoice -> Stock.
All apps share common Product, Party, Stock, Order, Invoice and Payment data.

FLEXIBLE PRINT & BARCODE DESIGNER
Miracle-level flexibility but easier.
Customer-specific formats for Sales/Purchase/Returns/Estimates/Orders/Challans/Receipt/Payment/Credit/Debit/Journal/Ledger/Outstanding/Stock/GST/barcodes.
Barcode fields: type, item code, barcode number, name, MRP, rates, batch, expiry, HSN, GST, quantity, logo, custom text; custom label size, rows/columns, margins, fonts, alignment, barcode size, preview.
Voucher designer: drag/drop, move/resize/show/hide fields, fonts, alignment, logo, header/footer, terms, signature, QR/e-invoice, bank details, amount in words, custom fields.
Customer/company-specific saved formats and multiple formats such as A4/thermal.
Customer should customize formats without developer help.

COMMERCIAL MODEL
Recurring revenue from accounting, offline renewal, cloud/hybrid, extra users, Salesman, B2B, B2C seller plans, cloud backup, WhatsApp/SMS usage, premium reports, E-Invoice/E-Way services, payments, dealers/partners, enterprise plans.
Prefer 3–4 clear plans with add-ons.

DEVELOPMENT RULE
V50 is the stable baseline. Future versions preserve V50. Implement limited requested changes one at a time and test. Never claim visual/browser testing unless actually performed. No fake buttons, dummy reports or placeholders.
