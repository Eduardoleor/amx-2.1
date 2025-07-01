import { Container, Text, Skeleton } from '@/components/atoms'
import { FlightCard } from '@/components/molecules'
import { FlightStatus } from '@/types'
import { FlatList } from 'react-native'

interface ListFlightsProps {
  items: FlightStatus[]
  criteria: 'single' | 'multiple'
  isLoading?: boolean
  error?: Error | undefined | null
  onDetail: (id: string) => void
  onFavoriteToggle: (flightNumber: string) => void
}

export const ListFlights: React.FC<ListFlightsProps> = ({
  items = [],
  criteria = 'single',
  isLoading = false,
  error = null,
  onDetail,
  onFavoriteToggle,
}) => {
  if (isLoading) {
    return (
      <Container justifyContent="center" alignItems="center" verticalMargin={200}>
        {[...Array(10)].map((_, idx) => (
          <Skeleton
            key={idx}
            width="100%"
            height={120}
            borderRadius={16}
            style={{ marginVertical: 10 }}
          />
        ))}
      </Container>
    )
  }

  if (error) {
    return (
      <Container justifyContent="center" alignItems="center" height="60%">
        <Text variant="body" color="textSecondary" align="center">
          Error loading flights
        </Text>
      </Container>
    )
  }

  if (!items.length) {
    return (
      <Container justifyContent="center" alignItems="center" height="60%">
        <Text variant="body" color="textSecondary" align="center">
          No flights found{'\n'}Try a different search.
        </Text>
      </Container>
    )
  }

  return (
    <FlatList
      data={items}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: '50%',
        gap: 20,
      }}
      renderItem={({ item }) => (
        <FlightCard
          flight={{
            number: item?.segment.operatingFlightCode,
            status: item?.status,
            departureAirport: item?.segment.departureAirport,
            arrivalAirport: item?.segment.arrivalAirport,
            departureDateTime: item?.segment.departureDateTime,
            arrivalDateTime: item?.segment.arrivalDateTime,
            duration: item?.totalFlightTimeInMinutes,
            segmentCode: item?.segment.segmentCode,
            isFavorite: item?.isFavorite,
          }}
          optionFavorite={criteria === 'multiple'}
          onFavoriteToggle={onFavoriteToggle}
          onDetail={onDetail}
        />
      )}
    />
  )
}
