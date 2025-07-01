import { useQuery } from '@tanstack/react-query'
import { FlightStatus } from '@/types'
import { FlightService } from '@/services/flightService'

export const useFlightBySegmentCode = (segmentCode: string | undefined) => {
  return useQuery<FlightStatus | null, Error>({
    queryKey: ['flight', segmentCode],
    queryFn: async () => {
      if (!segmentCode) return null
      const flight = await FlightService.getBySegmentCode(segmentCode)
      return flight || null
    },
    enabled: !!segmentCode,
    staleTime: 5 * 60 * 1000,
  })
}
