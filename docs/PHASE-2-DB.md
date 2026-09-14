# Phase 2 — Database / PostGIS

This phase expands the Prisma schema and integrates Prisma into the NestJS API. It includes:

- Full Prisma schema with models for Users, Profiles, Licensing, Bookings, Payments, Reviews, etc.
- PostGIS geography fields for Therapist location and SavedAddress
- PrismaModule and PrismaService for NestJS
- Example TherapistsController with a nearby search using PostGIS

Local verification steps

1. Start Postgres/PostGIS container:
   docker compose -f infra/docker-compose.dev.yml up -d
2. Set DATABASE_URL in your environment to point to the running Postgres
3. Run Prisma migrate (creates migration skeleton):
   cd apps/api
   pnpm install
   npx prisma migrate dev --name init --schema=prisma/schema.prisma
4. Start API: pnpm run dev
5. Verify endpoint: curl "http://localhost:3000/therapists/nearby?lat=43.6532&lng=-79.3832&radiusKm=25"

Notes
- Prisma currently treats PostGIS types as Unsupported. Migrations will generate CREATE COLUMN with geography(Point,4326) via the migration SQL.
- Jurisdiction rules are stored as JSON in Jurisdiction.rules and will be populated in Phase 4 onboarding.
