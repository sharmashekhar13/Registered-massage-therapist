# Seed script for Prisma/PostGIS development
// This script uses Prisma's $executeRaw to insert jurisdictions and sample therapists with PostGIS geography points.
// Run with: npx ts-node --transpile-only prisma/seed.ts (from apps/api)

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding jurisdictions...')

  const jurisdictions = [
    {
      country: 'CA',
      region: 'Ontario',
      rules: {
        required_license: true,
        background_check_required: true,
        insurance_min_cents: 1000000
      }
    },
    {
      country: 'CA',
      region: 'Quebec',
      rules: {
        required_license: true,
        background_check_required: true,
        insurance_min_cents: 1000000,
        requires_french_support: true
      }
    },
    {
      country: 'US',
      region: 'California',
      rules: {
        required_license: true,
        background_check_required: true,
        insurance_min_cents: 1000000
      }
    },
    {
      country: 'US',
      region: 'New York',
      rules: {
        required_license: true,
        background_check_required: true,
        insurance_min_cents: 1000000
      }
    }
  ]

  for (const j of jurisdictions) {
    await prisma.jurisdiction.create({ data: { country: j.country, region: j.region, rules: j.rules } })
  }

  console.log('Seeding sample therapists (dev only)')

  // Create a simple user + therapist using Prisma create, then set location via raw SQL using PostGIS functions
  const user = await prisma.user.create({ data: { email: 'dev.therapist1@example.com', role: 'THERAPIST' } })
  const therapist = await prisma.therapistProfile.create({ data: { userId: user.id, bio: 'Dev therapist in Toronto', serviceRadius: 25 } })

  // Update location using PostGIS function (lng, lat)
  await prisma.$executeRaw`
    UPDATE "TherapistProfile"
    SET location = ST_SetSRID(ST_MakePoint(-79.3832, 43.6532), 4326)
    WHERE id = ${therapist.id}
  `

  // Add a service
  await prisma.service.create({ data: { therapistId: therapist.id, name: 'Swedish Massage', durationMin: 60, priceCents: 9000 } })

  // San Francisco
  const user2 = await prisma.user.create({ data: { email: 'dev.therapist2@example.com', role: 'THERAPIST' } })
  const therapist2 = await prisma.therapistProfile.create({ data: { userId: user2.id, bio: 'Dev therapist in SF', serviceRadius: 30 } })
  await prisma.$executeRaw`
    UPDATE "TherapistProfile"
    SET location = ST_SetSRID(ST_MakePoint(-122.4194, 37.7749), 4326)
    WHERE id = ${therapist2.id}
  `
  await prisma.service.create({ data: { therapistId: therapist2.id, name: 'Deep Tissue', durationMin: 60, priceCents: 12000 } })

  console.log('Seed complete')
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
