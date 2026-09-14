import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class TherapistsService {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  async findNearbyTherapists(lat: number, lng: number, radiusKm: number) {
    const radiusMeters = Math.round(radiusKm * 1000)
    // Using raw SQL with PostGIS functions. The TherapistProfile.location is stored as geography(Point,4326)
    const results = await this.prisma.$queryRaw`
      SELECT tp.id, tp.user_id as "userId", tp.bio, tp.service_radius as "serviceRadius",
        ST_X(ST_AsText(tp.location)) as lng,
        ST_Y(ST_AsText(tp.location)) as lat,
        ST_Distance(tp.location::geography, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography) as distance_m
      FROM "TherapistProfile" tp
      WHERE tp.location IS NOT NULL
      AND ST_DWithin(tp.location::geography, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography, ${radiusMeters})
      ORDER BY distance_m ASC
      LIMIT 100
    `

    return results
  }
}
