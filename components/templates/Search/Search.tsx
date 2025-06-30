import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import {
  Layout,
  Header,
  Container,
  Footer,
  SegmentedControl,
  KeyCard,
  Button,
  BottomInputModal,
  BottomDatePickerModal,
  BottomListPickerModal,
} from '@/components'
import { useAirportCities } from '@/hooks/useAirportCities'
import { AirportCity } from '@/types'
import { useRouter } from 'expo-router'

const getDefaultAirports = (airports: AirportCity[]) => {
  const defaultOrigin = airports.find((a) => a.city === 'Mexico City') || null
  const defaultDestination = airports.find((a) => a.city === 'Cancun') || null
  return { defaultOrigin, defaultDestination }
}

export const Search = () => {
  const [tabOption, setTabOption] = useState(0)
  const [flightModalVisible, setFlightModalVisible] = useState(false)
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [flightNumber, setFlightNumber] = useState(500)
  const [flightDate, setFlightDate] = useState(new Date())

  const [openAirportModal, setOpenAirportModal] = useState(false)
  const [modalType, setModalType] = useState<'origin' | 'destination'>('origin')
  const [origin, setOrigin] = useState<AirportCity | null>(null)
  const [destination, setDestination] = useState<AirportCity | null>(null)

  const { data: airports = [], isLoading } = useAirportCities()

  const buttonActionTitle = useMemo(() => `Search Flight${tabOption === 0 ? '' : 's'}`, [tabOption])

  const handlePressFooter = () => setTabOption(tabOption === 0 ? 1 : 0)
  const router = useRouter()

  const openAirportSelector = (type: 'origin' | 'destination') => {
    setModalType(type)
    setOpenAirportModal(true)
  }

  const handleAirportSelect = (selected: AirportCity) => {
    if (modalType === 'origin') {
      setOrigin(selected)
    } else {
      setDestination(selected)
    }
    setOpenAirportModal(false)
  }

  const handleSearch = () => {
    router.push({
      pathname: '/(screens)/details',
      params: {
        criteria: tabOption === 0 ? 'single' : 'multiple',
        flightNumber: tabOption === 0 ? flightNumber : undefined,
        flightDate: flightDate.toISOString(),
        origin: origin ? origin.country : undefined,
        destination: destination ? destination.country : undefined,
      },
    })
  }

  useEffect(() => {
    if (airports.length === 0 || origin || destination) return

    const { defaultOrigin, defaultDestination } = getDefaultAirports(airports)
    setOrigin(defaultOrigin)
    setDestination(defaultDestination)
  }, [airports.length])

  const renderFlightNumberSearch = () => (
    <StyledContainer flexDirection="row">
      <KeyCard
        title="Flight Number"
        value={flightNumber}
        onPress={() => setFlightModalVisible(true)}
      />
      <KeyCard
        flex={1}
        title="Date of departure"
        type="date"
        icon="calendar"
        value={flightDate}
        onPress={() => setDateModalVisible(true)}
      />
    </StyledContainer>
  )

  const renderDestinationSearch = () => (
    <StyledContainer>
      <StyledContainerDestination flexDirection="row">
        <KeyCard
          flex={1}
          title="Origin"
          type="destination"
          value={origin ? `${origin.city}, ${origin.country}` : 'Select origin'}
          onPress={() => openAirportSelector('origin')}
        />
        <KeyCard
          flex={1}
          title="Destination"
          type="destination"
          value={destination ? `${destination.city}, ${destination.country}` : 'Select destination'}
          onPress={() => openAirportSelector('destination')}
        />
      </StyledContainerDestination>
      <KeyCard
        title="Date of departure"
        type="date"
        icon="calendar"
        value={flightDate}
        onPress={() => setDateModalVisible(true)}
      />
    </StyledContainer>
  )

  return (
    <Layout backgroundColor="accent">
      <Header buttonTheme title="Track your flight" description="Keep you informed in real time!" />
      <StyledSegmentedControl
        options={['Flight Number', 'Destination']}
        selectedIndex={tabOption}
        onSelect={setTabOption}
      />
      <Container backgroundColor="background" height="100%" padding="md">
        {tabOption === 0 ? renderFlightNumberSearch() : renderDestinationSearch()}

        <Button haptic title={buttonActionTitle} size="lg" onPress={handleSearch} />
        <Footer
          type={tabOption === 0 ? 'flightNumber' : 'destination'}
          onPress={handlePressFooter}
        />
      </Container>

      <BottomInputModal
        isVisible={flightModalVisible}
        title="Flight Number"
        placeholder={flightNumber.toString()}
        confirmText="Search Flight"
        onClose={() => setFlightModalVisible(false)}
        onConfirm={(text) => {
          setFlightNumber(Number(text))
          setFlightModalVisible(false)
        }}
      />
      <BottomDatePickerModal
        isVisible={dateModalVisible}
        onClose={() => setDateModalVisible(false)}
        onConfirm={(date) => setFlightDate(date)}
        value={flightDate}
        title="Select Date"
        confirmText="Confirm"
      />
      <BottomListPickerModal
        isVisible={openAirportModal}
        onClose={() => setOpenAirportModal(false)}
        onConfirm={handleAirportSelect}
        items={airports}
        selectedItem={modalType === 'origin' ? origin : destination}
        title={`Select ${modalType === 'origin' ? 'Origin' : 'Destination'} Airport`}
        loading={isLoading}
        emptyMessage="No airports available"
      />
    </Layout>
  )
}

const StyledSegmentedControl = styled(SegmentedControl)`
  margin-top: ${({ theme }) => -theme.spacing.md}px;
`

const StyledContainer = styled(Container)`
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`

const StyledContainerDestination = styled(Container)`
  gap: ${({ theme }) => theme.spacing.md}px;
`
