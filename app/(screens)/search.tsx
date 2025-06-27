import React, { useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useFlightSearch } from '@/hooks/useFlightSearch'
import { FlightSearchCriteria } from '@/types'
import { Text } from '@/components/ui/Text'
import Layout from '@/components/Layout'
import ThemeToggle from '@/components/ThemeToggle'

export default function SearchScreen() {
  const [searchCriteria, setSearchCriteria] = useState<FlightSearchCriteria | null>(null)
  const { data, isLoading, error } = useFlightSearch(searchCriteria)
  const router = useRouter()

  React.useEffect(() => {
    if (data) {
      if (searchCriteria?.number) {
        router.push({
          pathname: '/(screens)/details',
          params: { flight: JSON.stringify(data) },
        })
      } else {
        router.push({
          pathname: '/(screens)/results',
          params: { flights: JSON.stringify(data) },
        })
      }
      setSearchCriteria(null)
    }
  }, [data, router, searchCriteria?.number])

  const handleSearch = (criteria: FlightSearchCriteria) => {
    if (criteria.number || (criteria.origin && criteria.destination)) {
      setSearchCriteria(criteria)
    }
  }

  return (
    <Layout>
      <Text>Search Flights</Text>
      <ThemeToggle size={26} />
    </Layout>
  )
}
