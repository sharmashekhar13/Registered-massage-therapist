import { Controller, Get, Query } from '@nestjs/common'
import { TherapistsService } from './therapists.service'

@Controller('therapists')
export class TherapistsController {
  constructor(private readonly service: TherapistsService) {}

  // Example: GET /therapists/nearby?lat=43.6532&lng=-79.3832&radiusKm=25
  @Get('nearby')
  async nearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radiusKm') radiusKm = '25'
  ) {
    const latNum = parseFloat(lat)
    const lngNum = parseFloat(lng)
    const radius = parseFloat(radiusKm)
    return this.service.findNearbyTherapists(latNum, lngNum, radius)
  }
}
