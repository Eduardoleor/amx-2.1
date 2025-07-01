import React, { useEffect, useMemo, useState } from 'react'
import { BottomDatePickerModal, Container, Header, Layout, ListFlights, Text } from '@/components'
import { useFlightFavorites } from '@/hooks/useFlightFavorites'
import { useFlightSearch } from '@/hooks/useFlightSearch'
import { FlightStatus, SearchParams } from '@/types'
import { toArray } from '@/utils/data'
import { formatAMFlightNumber, formatDateToString, formatLongDate } from '@/utils/formatters'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getFlightRoute } from '@/hooks/useFlightRoute'

export const List = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({})
  const [items, setItems] = useState<FlightStatus[]>([])
  const [dateModalVisible, setDateModalVisible] = useState(false)

  const router = useRouter()
  const params = useLocalSearchParams() as SearchParams

  const route = getFlightRoute(searchParams.flightNumber ?? '')
  const { toggleFavorite } = useFlightFavorites()
  const { data, isLoading, error } = useFlightSearch({
    number: searchParams.flightNumber,
    origin: searchParams.origin,
    destination: searchParams.destination,
    date: searchParams.flightDate,
  })

  const flightTitle = useMemo(() => {
    if (!searchParams.flightNumber) {
      return `${searchParams.origin},${searchParams.destination}`
    }
    return searchParams.flightNumber
  }, [searchParams.destination, searchParams.flightNumber, searchParams.origin])

  const handleChangeDate = (date: Date) => {
    const newDate = formatDateToString(date)
    router.setParams({
      ...params,
      flightDate: newDate,
    })
  }

  const handleDetailsPress = (segmentCode: string) => {
    router.push({
      pathname: '/(screens)/details',
      params: {
        id: segmentCode,
      },
    })
  }

  useEffect(() => {
    if (data) {
      setItems(toArray(data) as FlightStatus[])
    }
  }, [data])

  useEffect(() => {
    const { criteria, flightNumber, flightDate, origin, destination } = params
    setSearchParams({
      criteria,
      flightNumber,
      flightDate,
      origin,
      destination,
    })
  }, [params.criteria, params.flightNumber, params.flightDate, params.origin, params.destination])

  return (
    <Layout>
      <Header
        back
        backgroundColor="background"
        title={formatAMFlightNumber(flightTitle, params.criteria === 'multiple')}
        description={formatLongDate(searchParams.flightDate, true)}
        onChangeDate={() => setDateModalVisible(true)}
      />
      <Container backgroundColor="background" height="100%" padding="md">
        <Container flexDirection="row" justifyContent="space-between">
          <Text variant="caption" weight="bold">
            {route || 'Flight Route'}
          </Text>
          <Text variant="caption" opacity={0.5}>
            {items.length} results
          </Text>
        </Container>
        <Container verticalMargin="lg" height="100%" flex={1}>
          <ListFlights
            items={items}
            criteria={params.criteria ?? 'single'}
            isLoading={isLoading}
            error={error}
            onDetail={handleDetailsPress}
            onFavoriteToggle={toggleFavorite}
          />
        </Container>
      </Container>
      <BottomDatePickerModal
        isVisible={dateModalVisible}
        onClose={() => setDateModalVisible(false)}
        onConfirm={handleChangeDate}
        value={new Date(searchParams.flightDate || Date.now())}
        title="Select Date"
        confirmText="Confirm"
      />
    </Layout>
  )
}
