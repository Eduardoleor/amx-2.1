import { MOCK_FLIGHTS, AIRPORT_CITIES } from '@/constants/mocks'

export function getFlightRoute(flightNumber: string): string {
  const flight = MOCK_FLIGHTS.find(
    (f) =>
      f.segment.operatingFlightCode === flightNumber ||
      f.segment.marketingFlightCode === flightNumber
  )

  if (!flight) return 'Flight not found'

  const depCode = flight.segment.departureAirport
  const arrCode = flight.segment.arrivalAirport

  const departureCity = AIRPORT_CITIES.airportCities[depCode]?.city || depCode
  const arrivalCity = AIRPORT_CITIES.airportCities[arrCode]?.city || arrCode

  return `${departureCity} to ${arrivalCity}`
}
