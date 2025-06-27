import { MOCK_FLIGHTS } from '@/constants/mocks'
import { FlightStatus, FlightStatusCollection } from '@/types'

const simulateRequest = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 800)
  })
}

export const FlightService = {
  searchByRoute: async (origin: string, destination: string): Promise<FlightStatusCollection> => {
    return simulateRequest(
      MOCK_FLIGHTS.filter(
        (f) => f.segment.departureAirport === origin && f.segment.arrivalAirport === destination
      )
    )
  },

  searchByNumber: async (flightNumber: string): Promise<FlightStatus | undefined> => {
    return simulateRequest(
      MOCK_FLIGHTS.find(
        (f) =>
          f.segment.operatingFlightCode === flightNumber ||
          f.segment.marketingFlightCode === flightNumber
      )
    )
  },
}
