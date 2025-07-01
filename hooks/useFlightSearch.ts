import { FlightSearchCriteria, FlightStatus, FlightStatusCollection } from '@/types'
import { FlightService } from '@/services/flightService'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useFlightSearch = (criteria: FlightSearchCriteria | null) => {
  const queryClient = useQueryClient()

  return useQuery<FlightStatus | FlightStatusCollection | null, Error>({
    queryKey: ['flights', criteria],
    queryFn: async () => {
      if (!criteria) return null
      if (criteria.number) {
        const result = await FlightService.searchByNumber(criteria.number, criteria.date)
        return result ?? null
      } else if (criteria.origin && criteria.destination) {
        const result = await FlightService.searchByRoute(
          criteria.origin,
          criteria.destination,
          criteria.date
        )
        return result ?? null
      }
      return null
    },
    enabled: !!criteria && (!!criteria.number || (!!criteria.origin && !!criteria.destination)),
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      if (!data) return null
      const favorites = queryClient.getQueryData<string[]>(['flightFavorites']) || []
      return processFlights(data, favorites)
    },
  })
}

export const processFlights = (
  data: FlightStatus | FlightStatusCollection,
  favorites: string[]
): FlightStatus | FlightStatusCollection => {
  if (Array.isArray(data)) {
    return data
      .map((flight) => ({
        ...flight,
        isFavorite: favorites.includes(flight.segment.segmentCode),
      }))
      .sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1
        if (!a.isFavorite && b.isFavorite) return 1
        return 0
      })
  } else {
    return {
      ...data,
      isFavorite: favorites.includes(data.segment.segmentCode),
    }
  }
}
