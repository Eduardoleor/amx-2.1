import React, { useMemo, useEffect } from 'react'
import styled, { useTheme } from 'styled-components/native'
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { AppTheme, FlightStatus as FlightStatusType } from '@/types'
import { Text } from '@/components/atoms/Text'
import { Chip, Container, Divider } from '@/components/atoms'
import {
  formatLongDate,
  formatTimeHHMM,
  formatTimeHour,
  getHoursAndMinutes,
} from '@/utils/formatters'
import { FlightStatus } from '../FlightStatus'
import SVGFlightDeparture from '@/assets/icons/flight-departure.icon'
import SVGFlightArrival from '@/assets/icons/flight-arrival.icon'
import { transformStatus, transformStatusLabel } from '@/utils/data'
import { AIRPORT_CITIES } from '@/constants/mocks'

interface BottomFlightModalProps {
  loading: boolean
  error?: boolean
  flight?: FlightStatusType | null
  isVisible: boolean
  onClose: () => void
}

export const BottomFlightModal: React.FC<BottomFlightModalProps> = ({
  isVisible,
  loading,
  error,
  flight,
  onClose,
}) => {
  const theme = useTheme() as AppTheme

  const bottomSheetRef = React.useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['50%', '70%'], [])

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isVisible])

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
        android_keyboardInputMode="adjustPan"
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.border,
          width: 40,
        }}
      >
        <ContentContainer>
          <Container flexDirection="row" justifyContent="space-between" alignItems="center">
            <Container>
              <StyledTitleContainer>
                <Text variant="heading3" opacity={0.5}>
                  AM
                </Text>
                <Text variant="heading3">{flight?.segment?.marketingFlightCode}</Text>
              </StyledTitleContainer>
              <Text variant="caption">{formatLongDate(flight?.outGate?.dateTimeLocal)}</Text>
            </Container>
            <Chip
              text={transformStatusLabel(flight?.status ?? '')}
              status={transformStatus(flight?.status ?? '')}
              shape="rounded"
            />
          </Container>
          <Divider />
          <Container flexDirection="row" justifyContent="space-between" verticalMargin="sm">
            <Container>
              <Text variant="heading3">
                {getHoursAndMinutes(flight?.segment?.departureDateTime)}
              </Text>
              <Text align="left">{flight?.segment?.departureAirport}</Text>
            </Container>
            <Container flex={1} justifyContent="space-between">
              <FlightStatus status={transformStatus(flight?.status ?? '')} />
            </Container>
            <Container>
              <Text variant="heading3">{getHoursAndMinutes(flight?.segment?.arrivalDateTime)}</Text>
              <Text align="right">{flight?.segment?.arrivalAirport}</Text>
            </Container>
          </Container>
          <Divider />
          <Container verticalMargin="lg">
            <Text variant="heading3" weight="bold">
              Flight Details
            </Text>
            <StyleDetailsContainer>
              <StyleDetailsItemContainer>
                <SVGFlightDeparture />
                <Text weight="bold" fontSize={16}>
                  Departure
                </Text>
              </StyleDetailsItemContainer>
              <Text variant="caption" opacity={0.5}>
                {AIRPORT_CITIES.airportCities[flight?.segment?.departureAirport ?? '']?.city} -{' '}
                {flight?.segment?.departureAirport}
              </Text>
            </StyleDetailsContainer>
            <StyledItemContainer backgroundColor="accent">
              <Container backgroundColor="accent">
                <Text>Teminal</Text>
                <Text variant="button" weight="bold">
                  {flight?.boardingTerminal}
                </Text>
              </Container>
              <Container backgroundColor="accent">
                <Text>Gate</Text>
                <Text variant="button" weight="bold">
                  {flight?.boardingGate}
                </Text>
              </Container>
              <Container backgroundColor="accent">
                <Text>Boarding</Text>
                <Text variant="button" weight="bold">
                  {formatTimeHour(flight?.boardingTime ?? '')}
                </Text>
              </Container>
            </StyledItemContainer>
            <StyleDetailsContainer>
              <StyleDetailsItemContainer>
                <SVGFlightArrival />
                <Text weight="bold" fontSize={16}>
                  Arrival
                </Text>
              </StyleDetailsItemContainer>
              <Text variant="caption" opacity={0.5}>
                {AIRPORT_CITIES.airportCities[flight?.segment?.arrivalAirport ?? '']?.city} -{' '}
                {`Terminal ${flight?.arrivalTerminal ?? 'N/A'}`}
              </Text>
            </StyleDetailsContainer>
            <StyledItemContainer backgroundColor="accent" spaceBetween={false}>
              <Container backgroundColor="accent">
                <Text>Teminal</Text>
                <Text variant="button" weight="bold">
                  {flight?.arrivalGate}
                </Text>
              </Container>
              <Container backgroundColor="accent">
                <Text>Est. Landing</Text>
                <Text variant="button" weight="bold">
                  {formatTimeHHMM(flight?.estimatedArrivalTime ?? '')}
                </Text>
              </Container>
            </StyledItemContainer>
          </Container>
        </ContentContainer>
      </BottomSheet>
    </BottomSheetModalProvider>
  )
}

const ContentContainer = styled(BottomSheetView)<{ theme: AppTheme }>`
  flex: 1;
  height: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.circle * 2}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.circle * 2}px;
`

const StyledTitleContainer = styled(Container)<{ theme: AppTheme }>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`

const StyleDetailsContainer = styled(Container)<{ theme: AppTheme }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`

const StyleDetailsItemContainer = styled(Container)<{ theme: AppTheme }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`

interface StyledItemContainerProps {
  theme: AppTheme
  spaceBetween?: boolean
}

const StyledItemContainer = styled(Container)<StyledItemContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ spaceBetween = true }) => (spaceBetween ? 'space-between' : 'flex-start')};
  gap: ${({ theme, spaceBetween = true }) =>
    !spaceBetween ? theme.spacing.lg : theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`
