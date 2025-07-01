import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Header,
  Container,
  Footer,
  SegmentedControl,
  Button,
  BottomInputModal,
  BottomDatePickerModal,
  BottomListPickerModal,
} from '@/components'
import { useAirportCities } from '@/hooks/useAirportCities'
import { AirportCity } from '@/types'
import { useRouter } from 'expo-router'
import { CardFlightNumber } from '@/components/organisms/CardFlightNumber'
import { CardFlightDestination } from '@/components/organisms/CardFlightDestination'
import { formatDateToString } from '@/utils/formatters'

export const Search = () => {
  const [tabOption, setTabOption] = useState(0)
  const [flightModalVisible, setFlightModalVisible] = useState(false)
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [openAirportModal, setOpenAirportModal] = useState(false)

  const [flightNumber, setFlightNumber] = useState(500)
  const [flightDate, setFlightDate] = useState(new Date())

  const [modalType, setModalType] = useState<'origin' | 'destination'>('origin')
  const [airportsState, setAirportsState] = useState<{
    origin: AirportCity | null
    destination: AirportCity | null
  }>({ origin: null, destination: null })

  const router = useRouter()
  const { data: airports = [], isLoading } = useAirportCities()
  const buttonActionTitle = useMemo(() => `Search Flight${tabOption === 0 ? '' : 's'}`, [tabOption])

  const handlePressFooter = () => {
    setTabOption(tabOption === 0 ? 1 : 0)
  }

  const openAirportSelector = (type: 'origin' | 'destination') => {
    setModalType(type)
    setOpenAirportModal(true)
  }

  const handleAirportSelect = (selected: AirportCity) => {
    if (modalType === 'origin') {
      setAirportsState((prev) => ({ ...prev, origin: selected }))
    } else {
      setAirportsState((prev) => ({ ...prev, destination: selected }))
    }
    setOpenAirportModal(false)
  }

  const handleSearch = () => {
    const params: Record<string, string | number | undefined> = {
      criteria: tabOption === 0 ? 'single' : 'multiple',
      flightDate: formatDateToString(flightDate),
    }

    if (tabOption === 0) {
      params.flightNumber = flightNumber
    } else {
      params.origin = airportsState.origin?.country
      params.destination = airportsState.destination?.country
    }

    router.push({
      pathname: '/(screens)/results',
      params,
    })
  }

  useEffect(() => {
    if (airports.length === 0 || airportsState.origin || airportsState.destination) return
    setAirportsState((prev) => ({
      ...prev,
      origin: airports.find((a) => a.city === 'Mexico City') || null,
      destination: airports.find((a) => a.city === 'Cancun') || null,
    }))
  }, [airports, airportsState.origin, airportsState.destination])

  return (
    <Layout backgroundColor="accent">
      <Header buttonTheme title="Track your flight" description="Keep you informed in real time!" />
      <StyledSegmentedControl
        options={['Flight Number', 'Destination']}
        selectedIndex={tabOption}
        onSelect={setTabOption}
      />
      <Container backgroundColor="background" height="100%" padding="md">
        {tabOption === 0 ? (
          <CardFlightNumber
            flightNumber={flightNumber}
            flightDate={flightDate}
            onFlightNumberSelect={() => setFlightModalVisible(true)}
            onSelectDate={() => setDateModalVisible(true)}
          />
        ) : (
          <CardFlightDestination
            origin={airportsState.origin}
            destination={airportsState.destination}
            flightDate={flightDate}
            onPressAirportSelector={openAirportSelector}
            onPressDateSelector={() => setDateModalVisible(true)}
          />
        )}
        <Button
          haptic
          size="lg"
          title={buttonActionTitle}
          disabled={isLoading}
          loading={isLoading}
          onPress={handleSearch}
        />
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
        selectedItem={modalType === 'origin' ? airportsState.origin : airportsState.destination}
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
