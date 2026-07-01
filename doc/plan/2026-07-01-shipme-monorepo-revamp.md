# Shipme Monorepo Revamp Plan

Date: 2026-07-01

## Goal

Move the Shipme apps and services into one pnpm workspace while avoiding a risky big-bang rewrite.

The intended outcome is:

- `shipme-web-vite` becomes the preserved public web app in this monorepo.
- `shipme-strapi`, `shipme-nextjs`, and `shipme-go` are revamped because they are older, but their existing business rules, API contracts, schemas, and operational knowledge are treated as source material.
- pnpm becomes the JavaScript package manager and task runner for the monorepo.
- Go remains a normal Go module, with pnpm only orchestrating scripts around it.

## Source Repos Checked

### `../shipme-web`

`../shipme-web` was not present locally. The matching repo appears to be `../shipme-web-vite`.

Current state:

- Vite 5, React 18, TypeScript, Tailwind, i18next.
- npm lockfile today; no pnpm workspace setup.
- Contains the public marketing pages, quote page, i18n files, Tailwind theme, and Strapi quote API wiring.
- No test suite.
- Static assets are referenced from `/logo`, `/img`, `/slider`, and `/partner`, but no `public/` directory was present in the repo.

Plan:

- Keep most of this app.
- Move it first because it is the lowest-risk app and closest to current frontend tooling.
- Rename package to `@shipme/landing-web`.
- Recover missing static assets before production cutover.
- Keep the Vite setup initially; do not convert it to Next.js unless there is a product reason.

### `../shipme-strapi`

Current state:

- Strapi 4.4.6, TypeScript, MySQL, S3 upload provider, SendGrid, carrier integrations, cron jobs, custom v0/v1 routes.
- Uses Yarn today, with both `yarn.lock` and `package-lock.json` present.
- Has substantial business logic around shipment orders, quotations, tracking, carrier partners, labels, PDFs, and fuel surcharge jobs.
- No automated test suite.
- Native dependencies such as `canvas` and `sharp` need careful Docker/CI handling.

Plan:

- Revamp the Strapi app, but do not discard its domain behavior.
- Decide early whether the target is Strapi 5 or a redesigned API/CMS split.
- Preserve content types, custom routes, partner integrations, cron behavior, env contract, and data migration requirements as the authoritative source.
- Create smoke tests before changing behavior: boot CMS, quote endpoint, order flow, upload provider, and cron disabled in local dev.
- Standardize on pnpm and remove duplicate lockfiles during migration.

### `../shipme-nextjs`

Current state:

- Next.js 12, React 17, JavaScript, Pages Router.
- Admin/dashboard app with customer, credential, rate card, shipment order, invoice, and quote flows.
- Uses Ant Design, plus MUI, Bootstrap, Reactstrap, Sass, and template-era UI code.
- Uses Yarn today, with both `yarn.lock` and `package-lock.json` present.
- Talks to both Strapi and the Go API through runtime config.
- No automated test suite.

Plan:

- Revamp as a modern admin app rather than directly preserving the framework version.
- Preserve user-facing flows and API contracts first.
- Build the replacement in `apps/dashboard-web` on a current Next.js version after baseline contract tests exist.
- Extract stable API clients and shared constants into workspace packages only when at least two apps need them.
- Remove template UI code and accidental dependencies during the revamp, not during the initial inventory.

### `../shipme-go`

Current state:

- Go 1.19 Gin API.
- Handles invoice generation and customer CRUD.
- Uses GORM with two MySQL connections: Strapi DB and Go-owned DB.
- API is consumed by `shipme-nextjs`.
- Runtime invoice template assets are referenced but were not present in the repo.
- Minimal tests exist only around invoice weight logic.

Plan:

- Revamp the service runtime and deployment shape, but preserve invoice/rate/customer behavior.
- Upgrade Go after adding regression coverage around invoice generation and API response shapes.
- Keep the existing `/api/user/v1/*` contract until the admin app is moved.
- Commit required invoice template assets or document how they are provisioned.
- Replace dev-style Docker execution with a compiled multi-stage image.

## Target Monorepo Structure

Initial scaffold:

```text
shipme-monorepo/
  package.json
  pnpm-workspace.yaml
  .npmrc
  .gitignore
  README.md
  doc/
    plan/
      2026-07-01-shipme-monorepo-revamp.md
  apps/
    landing-web/
    dashboard-web/
    core-api/
    invoice-api/
  packages/
    api-client/
    shared/
    config/
```

Workspace roles:

- `apps/landing-web`: public Vite website, migrated from `../shipme-web-vite`, with package name `@shipme/landing-web`.
- `apps/dashboard-web`: revamped customer/admin dashboard website, based on `../shipme-nextjs`.
- `apps/core-api`: revamped core Shipme API/CMS, based on `../shipme-strapi`.
- `apps/invoice-api`: revamped invoice API, based on `../shipme-go`.
- `packages/api-client`: shared API clients and request/response contracts.
- `packages/shared`: shared domain constants, types, validation, and utility code.
- `packages/config`: shared TypeScript, ESLint, Tailwind, and build configuration.

Avoid extracting packages too early. Start with app-local code, then move code into `packages/*` only when it is used by more than one workspace or represents a stable contract.

## Migration Phases

### Phase 0: Monorepo Foundation

Status: started.

Work:

- Add root `package.json`.
- Add `pnpm-workspace.yaml`.
- Add root `.npmrc`.
- Add root `.gitignore`.
- Add app and package directories.
- Add this plan.

Verification:

- `pnpm install` succeeds.
- `pnpm -r --if-present build` runs without workspace discovery errors.
- Git diff contains only scaffold and plan files.

### Phase 1: Preserve Public Web

Work:

- Copy `../shipme-web-vite` into `apps/landing-web`.
- Rename package to `@shipme/landing-web`.
- Convert npm lockfile to pnpm by installing from the monorepo root.
- Keep Vite, React, TypeScript, Tailwind, i18n, routing, and quote flow.
- Recover missing public assets.
- Add minimal smoke checks: typecheck, lint, build, and a browser check for main routes.

Verification:

- `pnpm --filter @shipme/landing-web dev` boots locally.
- `pnpm --filter @shipme/landing-web build` succeeds.
- Home, about, services, contact, and quote pages render with assets.
- Quote flow still calls the intended Strapi endpoint per environment.

### Phase 2: Contract Inventory

Work:

- Document current Strapi public/admin routes used by web and admin.
- Document current Go API routes used by admin.
- Capture response shapes for quote, order, customer, invoice, auth, carrier, rate card, and credential flows.
- Add lightweight contract fixtures before rewriting.

Verification:

- Each externally consumed endpoint has a named owner app and consumer app.
- The admin and web migration can point to fixtures instead of relying on memory.

### Phase 3: Revamp CMS/API

Work:

- Choose between Strapi 5 migration and redesigned API/CMS split.
- Recreate content models and custom routes from `../shipme-strapi`.
- Preserve carrier integrations, quotation behavior, order behavior, upload behavior, and cron jobs.
- Move secrets out of code defaults.
- Add boot, route, and cron-disabled smoke checks.

Verification:

- Local CMS boots from monorepo scripts.
- Existing quote/order/admin consumers can run against the new CMS in dev.
- Data migration steps are documented before production cutover.

### Phase 4: Revamp Go API

Work:

- Move or rebuild Go service under `apps/invoice-api`.
- Upgrade Go version.
- Keep current API paths until admin migration is complete.
- Add invoice generation regression tests.
- Locate and commit or provision invoice template assets.
- Replace Dockerfile with a compiled multi-stage image.

Verification:

- `go test ./...` passes.
- Invoice generation produces expected files from fixture data.
- Admin app can still call customer and invoice endpoints.

### Phase 5: Revamp Admin

Work:

- Build the new admin/dashboard in `apps/dashboard-web`.
- Use current Next.js and TypeScript.
- Preserve flows from `../shipme-nextjs`: login, dashboard orders, batch orders, quotations, customers, credentials, rate cards, zones, invoices, and shipment forms.
- Use `packages/api-client` for stable API calls once contracts are documented.
- Remove old template UI and unused UI libraries during the rebuild.

Verification:

- Admin smoke tests cover login, order list, quote, customer CRUD, invoice generation, and shipment form submit.
- `pnpm --filter @shipme/dashboard-web build` succeeds.
- New admin can operate against revamped or compatibility-mode APIs.

### Phase 6: Shared Packages and Tooling

Work:

- Add shared TypeScript config, ESLint config, and formatting rules.
- Extract shared API client contracts when used by both web and admin.
- Extract shared domain constants only after their source of truth is clear.
- Consider Turborepo only after multiple packages need cached builds.

Verification:

- Root `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm test` run useful tasks.
- Shared packages have clear owners and are not pass-through wrappers.

## Key Decisions Needed

- Confirm whether `../shipme-web-vite` is the intended `../shipme-web`.
- Decide whether `apps/core-api` should remain Strapi-based or become a different backend/CMS split.
- Decide whether the admin revamp should be feature-parity first or product-scope reduction.
- Decide how to handle separate Git histories: copy source trees, `git subtree`, or archive old repos and start clean.
- Decide target production runtime versions for Node, Go, MySQL, and Docker images.
- Locate missing public web assets and Go invoice template assets.

## Immediate Next Steps

1. Run `pnpm install` in the new monorepo.
2. Migrate `shipme-web-vite` into `apps/landing-web` first.
3. Add a short API contract inventory for Strapi and Go before revamping those services.
4. Create smoke tests before upgrading or replacing old frameworks.
5. Migrate one deployable unit at a time instead of copying all repos at once.
