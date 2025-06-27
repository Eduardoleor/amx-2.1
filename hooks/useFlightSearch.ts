import { FlightStatus, FlightStatusCollection } from '@/types'
import { FlightService } from '@/services/flightService'
import { useQuery } from '@tanstack/react-query'

export interface FlightSearchCriteria {
  number?: string
  origin?: string
  destination?: string
}

export const useFlightSearch = (criteria: FlightSearchCriteria | null) => {
  return useQuery<FlightStatus | FlightStatusCollection | null, Error>({
    queryKey: ['flights', criteria],
    queryFn: async () => {
      if (!criteria) return null

      if (criteria.number) {
        const result = await FlightService.searchByNumber(criteria.number)
        return result ?? null
      } else if (criteria.origin && criteria.destination) {
        const result = await FlightService.searchByRoute(criteria.origin, criteria.destination)
        return result ?? null
      }
      return null
    },
    enabled: !!criteria && (!!criteria.number || (!!criteria.origin && !!criteria.destination)),
    staleTime: 5 * 60 * 1000,
  })
}
