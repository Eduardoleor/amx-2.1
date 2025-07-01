import { FC } from 'react'
import { KeyCard } from '@/components/molecules'
import styled from 'styled-components'
import { Container } from '@/components/atoms'
import { AirportCity } from '@/types'

interface CardFlightDestinationProps {
  origin: AirportCity | null
  destination: AirportCity | null
  flightDate: Date
  onPressAirportSelector: (type: 'origin' | 'destination') => void
  onPressDateSelector: () => void
}

export const CardFlightDestination: FC<CardFlightDestinationProps> = ({
  origin,
  destination,
  flightDate,
  onPressAirportSelector,
  onPressDateSelector,
}) => {
  return (
    <StyledContainer>
      <StyledContainerDestination flexDirection="row">
        <KeyCard
          flex={1}
          title="Origin"
          type="destination"
          value={origin ? `${origin.city}, ${origin.country}` : 'Select origin'}
          onPress={() => onPressAirportSelector('origin')}
        />
        <KeyCard
          flex={1}
          title="Destination"
          type="destination"
          value={destination ? `${destination.city}, ${destination.country}` : 'Select destination'}
          onPress={() => onPressAirportSelector('destination')}
        />
      </StyledContainerDestination>
      <KeyCard
        title="Date of departure"
        type="date"
        icon="calendar"
        value={flightDate}
        onPress={onPressDateSelector}
      />
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`

const StyledContainerDestination = styled(Container)`
  gap: ${({ theme }) => theme.spacing.md}px;
`
