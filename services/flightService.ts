import { AIRPORT_CITIES, MOCK_FLIGHTS } from '@/constants/mocks'
import { AirportCity, FlightStatus, FlightStatusCollection } from '@/types'

const simulateRequest = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 800)
  })
}

export const FlightService = {
  searchByRoute: async (
    origin: string,
    destination: string,
    date?: string
  ): Promise<FlightStatusCollection> => {
    return simulateRequest(
      MOCK_FLIGHTS.filter(
        (f) =>
          f.segment.departureAirport === origin &&
          f.segment.arrivalAirport === destination &&
          f.segment.departureDateTime.split('T')[0] === date
      )
    )
  },

  searchByNumber: async (
    flightNumber: string,
    date?: string
  ): Promise<FlightStatus | undefined> => {
    return simulateRequest(
      MOCK_FLIGHTS.find(
        (f) =>
          (f.segment.operatingFlightCode === flightNumber ||
            f.segment.marketingFlightCode === flightNumber) &&
          f.segment.departureDateTime.split('T')[0] === date
      )
    )
  },

  getAirports: async (): Promise<AirportCity[]> => {
    const airportsArray = Object.values(AIRPORT_CITIES.airportCities)
    return simulateRequest(airportsArray)
  },

  getBySegmentCode: async (segmentCode: string): Promise<FlightStatus | undefined> => {
    return simulateRequest(
      MOCK_FLIGHTS.find((flight) => flight.segment.segmentCode === segmentCode)
    )
  },
}
