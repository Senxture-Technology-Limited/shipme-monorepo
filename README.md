# Shipme Monorepo

This repository will consolidate the Shipme web, admin, CMS, and core API codebases under a pnpm workspace.

## Workspace

- `apps/landing-vite` - public marketing and quote website, migrated from `../shipme-web-vite`
- `apps/dashboard-web` - revamped customer/admin dashboard website, based on `../shipme-nextjs`
- `apps/core-api` - revamped core Shipme API/CMS, based on `../shipme-strapi`
- `apps/invoice-api` - revamped invoice API, based on `../shipme-go`
- `packages/api-client` - shared API clients and request contracts
- `packages/shared` - shared domain constants, types, and utilities
- `packages/config` - shared TypeScript, ESLint, and build configuration

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
```
