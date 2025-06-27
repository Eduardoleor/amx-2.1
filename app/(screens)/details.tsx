import React from 'react'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { formatFlightTime, getStatusColor, formatFlightDuration } from '@/utils/formatters'
import { FlightStatus } from '@/types'

export default function DetailScreen() {
  const params = useLocalSearchParams()
  const flight: FlightStatus = params.flight ? JSON.parse(params.flight as string) : null

  if (!flight) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No se encontró el vuelo</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Vuelo {flight.segment.operatingFlightCode}</Text>
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: getStatusColor(flight.status) }}
        >
          <Text className="text-white font-bold">{flight.status}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-3xl font-bold">{flight.segment.departureAirport}</Text>
          <Text className="text-xl">{formatFlightTime(flight.estimatedDepartureTime)}</Text>
          <Text>Terminal: {flight.boardingTerminal}</Text>
        </View>

        <View className="items-center">
          <Text>⏱️ {formatFlightDuration(flight.totalFlightTimeInMinutes)}</Text>
          <Text className="text-sm">Duración</Text>
        </View>

        <View className="items-end">
          <Text className="text-3xl font-bold">{flight.segment.arrivalAirport}</Text>
          <Text className="text-xl">{formatFlightTime(flight.estimatedArrivalTime)}</Text>
          <Text>Terminal: {flight.arrivalTerminal}</Text>
        </View>
      </View>

      <View className="bg-white rounded-lg p-4">
        <View className="flex-row justify-between py-2 border-b border-gray-100">
          <Text className="font-medium">Puerta de abordaje</Text>
          <Text>{flight.boardingGate || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-100">
          <Text className="font-medium">Tipo de avión</Text>
          <Text>{flight.segment.aircraftType}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-100">
          <Text className="font-medium">Aerolínea operadora</Text>
          <Text>{flight.segment.operatingCarrier}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-100">
          <Text className="font-medium">Aerolínea comercial</Text>
          <Text>{flight.segment.marketingCarrier}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-100">
          <Text className="font-medium">Estado</Text>
          <Text>{flight.status}</Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text className="font-medium">Retraso</Text>
          <Text>{flight.delayInMinutes} minutos</Text>
        </View>
      </View>
    </View>
  )
}
