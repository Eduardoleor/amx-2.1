import { Container, Header, Layout, Text } from '@/components'
import { FlightCard } from '@/components/molecules/FlightCard'
import { useFlightSearch } from '@/hooks/useFlightSearch'
import { formatLongDate } from '@/utils/formatters'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'

export const List = () => {
  const params = useLocalSearchParams()
  const criteria = params.criteria as 'single' | 'multiple' | undefined
  const flightNumber = params.flightNumber ? parseInt(params.flightNumber as string, 10) : undefined
  const flightDate = params.flightDate ? new Date(params.flightDate as string) : undefined
  const origin = params.origin as string | undefined
  const destination = params.destination as string | undefined

  const [flightDirection, setFlightDirection] = React.useState('')

  const { data, isLoading, error } = useFlightSearch({
    number: flightNumber ? flightNumber.toString() : undefined,
    origin: origin,
    destination: destination,
    date: flightDate ? flightDate.toISOString().split('T')[0] : undefined,
  })

  console.log(data, isLoading, error)

  useEffect(() => {}, [])

  return (
    <Layout>
      <Header
        back
        backgroundColor="background"
        title={`AM ${flightNumber}`}
        description={formatLongDate(flightDate)}
      />
      <Container padding="md">
        <Container flexDirection="row" justifyContent="space-between">
          <Text>Mexico City to Cancún</Text>
          <Text>4 results</Text>
        </Container>
        <FlightCard />
      </Container>
    </Layout>
  )
}
