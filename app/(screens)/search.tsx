import React, { useState } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { FlightSearchCriteria, useFlightSearch } from '@/hooks/useFlightSearch'
import SearchForm from '@/components/SearchForm'

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
  }, [data])

  const handleSearch = (criteria: FlightSearchCriteria) => {
    if (criteria.number || (criteria.origin && criteria.destination)) {
      setSearchCriteria(criteria)
    }
  }

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <SearchForm onSubmit={handleSearch} />

      {isLoading && (
        <View className="mt-5 items-center">
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
      {error && <Text className="text-red-500 mt-3 text-center">Error: {error.message}</Text>}
    </View>
  )
}
