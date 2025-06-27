export interface FlightSegment {
  segmentCode: string
  departureAirport: string
  arrivalAirport: string
  departureDateTime: string
  arrivalDateTime: string
  flightStatus: string
  operatingCarrier: string
  marketingCarrier: string
  operatingFlightCode: string
  marketingFlightCode: string
  flightDurationInMinutes: number
  aircraftType: string
  stops: any[]
}

export interface OutGate {
  accuracy: string
  dateTimeUtc: string
  dateTimeLocal: string
  sourceType: string
}

export interface FlightStatus {
  status: string
  boardingTerminal?: string
  boardingGate?: string
  boardingTime?: string
  estimatedDepartureTime?: string
  estimatedArrivalTime?: string
  delayInMinutes: number
  arrivalTerminal?: string
  arrivalGate?: string
  segment: FlightSegment
  outGate?: OutGate
  legType: string
  totalFlightTimeInMinutes: number
}

export type FlightStatusCollection = FlightStatus[]
