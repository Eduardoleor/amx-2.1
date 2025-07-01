import { useQuery } from '@tanstack/react-query'
import { FlightService } from '@/services/flightService'
import { AirportCity } from '@/types'

export const useAirportCities = () => {
  return useQuery<AirportCity[], Error>({
    queryKey: ['airport-cities'],
    queryFn: FlightService.getAirports,
    staleTime: 24 * 60 * 60 * 1000,
  })
}
