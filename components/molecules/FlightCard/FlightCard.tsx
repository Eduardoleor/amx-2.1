import { Chip, Container, Switch, Text } from '@/components/atoms'
import { Card } from '@/components/atoms/Card'
import { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import { FlightStatus } from '../FlightStatus'
import { View } from 'react-native'
import { transformStatus, transformStatusLabel } from '@/utils/data'
import {
  formatAMFlightNumber,
  formatShortFlightDuration,
  getHoursAndMinutes,
} from '@/utils/formatters'
import { IconSymbol } from '@/components/atoms/IconSymbol'
import { Touchable } from '@/components/atoms/Touchable'

interface FlightCardProps {
  flight: {
    number: string
    status: string
    departureAirport: string
    arrivalAirport: string
    departureDateTime: string
    arrivalDateTime: string
    duration: number
    segmentCode: string
    isFavorite?: boolean
  }
  optionFavorite?: boolean
  onDetail: (number: string) => void
  onFavoriteToggle?: (code: string) => void
}

export const FlightCard: FC<FlightCardProps> = ({
  flight,
  optionFavorite,
  onFavoriteToggle,
  onDetail,
}) => {
  const theme = useTheme()
  return (
    <StyledCard padding={0}>
      <Container flexDirection="row" justifyContent="space-between" alignItems="center">
        <Chip
          text={transformStatusLabel(flight?.status ?? '')}
          status={transformStatus(flight?.status ?? '')}
          shape="custom"
        />
        {optionFavorite && (
          <Switch
            labelPosition="left"
            label="Favorite"
            size="sm"
            value={flight?.isFavorite ?? false}
            onValueChange={() => {
              if (onFavoriteToggle) {
                onFavoriteToggle(flight?.segmentCode)
              }
            }}
          />
        )}
      </Container>
      <Container
        flexDirection="row"
        justifyContent="space-between"
        horizontalPadding="md"
        verticalMargin="sm"
      >
        <Container>
          <Text variant="heading3">{getHoursAndMinutes(flight?.departureDateTime)}</Text>
          <Text align="left">{flight?.departureAirport}</Text>
        </Container>
        <Container flex={1} justifyContent="space-between">
          <FlightStatus status={transformStatus(flight?.status ?? '')} />
          <Text align="center" variant="caption" weight="bold" opacity={0.5}>
            {formatShortFlightDuration(flight?.duration ?? 0)}
          </Text>
        </Container>
        <Container>
          <Text variant="heading3">{getHoursAndMinutes(flight?.arrivalDateTime)}</Text>
          <Text align="right">{flight?.arrivalAirport}</Text>
        </Container>
      </Container>
      <Separator />
      <Container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        horizontalMargin="md"
        verticalMargin="xs"
      >
        <Text variant="caption" weight="bold">
          {formatAMFlightNumber(flight?.number)}
        </Text>
        <Touchable onPress={() => onDetail(flight?.segmentCode)}>
          <Container flexDirection="row" alignItems="center">
            <Text variant="caption" underline>
              Details
            </Text>
            <IconSymbol name="chevron.right" size={16} color={theme.colors.textPrimary} />
          </Container>
        </Touchable>
      </Container>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-width: 2px;
  width: auto;
  border-color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
`

const Separator = styled(View)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xs}px 0;
`
