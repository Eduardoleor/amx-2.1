import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { AppTheme } from '@/types'
import SVGFlight from '@/assets/icons/flight.icon'

interface StatusFlightProps {
  status: keyof AppTheme['colors']['status']
}

export const FlightStatus: React.FC<StatusFlightProps> = ({ status }) => {
  const theme = useTheme() as AppTheme
  const statusColor = theme.colors.textPrimary

  return (
    <Container>
      <Dot />
      <Line
        $color={statusColor}
        $dashed={false}
        $visible={status !== 'delayed'}
        $flex={status === 'arrived' ? 1 : status === 'delayed' ? 0 : 0.9}
      />
      <FlightIcon>
        <SVGFlight color="black" />
      </FlightIcon>
      {status !== 'arrived' && (
        <DashedLine $color={statusColor} $flex={status === 'delayed' ? 1 : 0.1} />
      )}
      <Dot />
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 32px;
  width: 100%;
  padding: 0 8px;
`

const Dot = styled.View<{ theme: AppTheme }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.textPrimary};
  z-index: 2;
`

interface LineProps {
  $color: string
  $dashed: boolean
  $visible: boolean
  $flex: number
}

const Line = styled.View<LineProps>`
  height: 3px;
  flex: ${({ $flex }) => $flex};
  background-color: ${({ $color, $dashed, $visible }) =>
    $visible ? ($dashed ? 'transparent' : $color) : 'transparent'};
`

interface DashedLineProps {
  $color: string
  $flex: number
}

const StyledDashedLine = styled.View<DashedLineProps>`
  flex: ${({ $flex }) => $flex};
  height: 3px;
  position: relative;
  overflow: hidden;
`

const DashedPattern = styled.View<{ $color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const DashSegment = styled.View<{ $color: string }>`
  width: 3px;
  height: 3px;
  background-color: ${({ $color }) => $color};
  border-radius: 1.5px;
`

const FlightIcon = styled.View`
  z-index: 2;
  padding: 0 5px;
`

const DashedLineRenderer: React.FC<{ $color: string }> = ({ $color }) => {
  const segments = Array(20).fill(0)
  return (
    <DashedPattern $color={$color}>
      {segments.map((_, i) => (
        <DashSegment key={i} $color={$color} />
      ))}
    </DashedPattern>
  )
}

const DashedLine: React.FC<DashedLineProps> = ({ $color, $flex }) => (
  <StyledDashedLine $color={$color} $flex={$flex}>
    <DashedLineRenderer $color={$color} />
  </StyledDashedLine>
)
