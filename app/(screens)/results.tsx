import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { FlightStatusCollection } from '@/types/types'
import FlightCard from '@/components/FlightCard'

export default function ResultsScreen() {
  const params = useLocalSearchParams()
  const flights: FlightStatusCollection = params.flights ? JSON.parse(params.flights as string) : []

  if (flights.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">No se encontraron vuelos</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-xl font-bold mb-4">Vuelos Encontrados: {flights.length}</Text>

      <FlatList
        data={flights}
        keyExtractor={(item) => item.segment.segmentCode}
        renderItem={({ item }) => <FlightCard flight={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}
