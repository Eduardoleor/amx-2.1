import { FC } from 'react'
import { KeyCard } from '@/components/molecules'
import styled from 'styled-components'
import { Container } from '@/components/atoms'

interface CardFlightNumberProps {
  flightNumber: number
  onFlightNumberSelect: () => void
  flightDate: Date
  onSelectDate: () => void
}

export const CardFlightNumber: FC<CardFlightNumberProps> = ({
  flightNumber,
  flightDate,
  onFlightNumberSelect,
  onSelectDate,
}) => {
  return (
    <StyledContainer flexDirection="row">
      <KeyCard title="Flight Number" value={flightNumber} onPress={onFlightNumberSelect} />
      <KeyCard
        flex={1}
        title="Date of departure"
        type="date"
        icon="calendar"
        value={flightDate}
        onPress={onSelectDate}
      />
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`
