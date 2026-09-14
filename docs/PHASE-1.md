# Phase 1 — Project Foundation

This document lists what Phase 1 includes and the acceptance criteria.

Included:
- Monorepo layout (apps/, packages/, infra/)
- Root tooling: pnpm workspaces, turbo, root tsconfig, eslint, prettier
- Basic Prisma schema (starter models) and docker-compose for PostGIS
- Minimal app scaffolds: NestJS API health endpoint, Next.js admin page, Expo app placeholders
- CI workflow (lint/typecheck/test placeholders)
- .env.example with required env var names

Acceptance checks:
- Repository builds and workspace installs with pnpm
- Docker Compose can start a Postgres/PostGIS container
- API health endpoint responds at /health when started
- Admin web and mobile apps have minimal start files

Next steps: Phase 2 (DB/PostGIS) — implement full Prisma schema, PostGIS geometry columns, migrations, seed data.
