// components/UI/FlightCard.tsx
import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { FlightStatus } from '@/types'
import { formatFlightTime, getStatusColor } from '@/utils/formatters'

// Contenedor principal de la tarjeta
const CardContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`

// Encabezado de la tarjeta
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm}px;
`

// Número de vuelo
const FlightNumber = styled.Text`
  font-size: ${({ theme }) => theme.rs(18)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`

// Badge de estado
const StatusBadge = styled.Text<{ color: string }>`
  background-color: ${({ color }) => color};
  color: white;
  font-size: ${({ theme }) => theme.rs(12)}px;
  font-weight: bold;
  padding-vertical: ${({ theme }) => theme.rs(3)}px;
  padding-horizontal: ${({ theme }) => theme.rs(8)}px;
  border-radius: ${({ theme }) => theme.rs(12)}px;
  overflow: hidden;
`

// Contenedor de la ruta
const RouteContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`

// Contenedor de aeropuerto
const Airport = styled.View`
  align-items: center;
  flex: 1;
`

// Código de aeropuerto
const Code = styled.Text`
  font-size: ${({ theme }) => theme.rs(24)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.rs(4)}px;
`

// Hora de vuelo
const Time = styled.Text`
  font-size: ${({ theme }) => theme.rs(16)}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

// Duración del vuelo
const Duration = styled.Text`
  font-size: ${({ theme }) => theme.rs(14)}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-horizontal: ${({ theme }) => theme.spacing.sm}px;
`

// Contenedor de detalles
const Details = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.sm}px;
`

// Ítem de detalle
const DetailItem = styled.Text`
  font-size: ${({ theme }) => theme.rs(14)}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 33%;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`

interface FlightCardProps {
  flight: FlightStatus
  onPress?: () => void
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onPress }) => {
  const theme = useTheme()

  return (
    <CardContainer onPress={onPress} activeOpacity={0.9}>
      <Header>
        <FlightNumber>{flight.segment.operatingFlightCode}</FlightNumber>
        <StatusBadge color={getStatusColor(flight.status)}>{flight.status}</StatusBadge>
      </Header>

      <RouteContainer>
        <Airport>
          <Code>{flight.segment.departureAirport}</Code>
          <Time>{formatFlightTime(flight.estimatedDepartureTime)}</Time>
        </Airport>

        <Duration>⏱️ {flight.totalFlightTimeInMinutes} min</Duration>

        <Airport>
          <Code>{flight.segment.arrivalAirport}</Code>
          <Time>{formatFlightTime(flight.estimatedArrivalTime)}</Time>
        </Airport>
      </RouteContainer>

      <Details>
        <DetailItem>Terminal: {flight.boardingTerminal || 'N/A'}</DetailItem>
        <DetailItem>Puerta: {flight.boardingGate || 'N/A'}</DetailItem>
        <DetailItem>Tipo: {flight.segment.aircraftType}</DetailItem>
      </Details>
    </CardContainer>
  )
}

export default FlightCard
