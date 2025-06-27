import { FlightStatus } from '@/types'

export const formatFlightTime = (dateTimeStr?: string): string => {
  if (!dateTimeStr) return '--:--'

  try {
    const dateObj = new Date(dateTimeStr)
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return dateTimeStr.slice(11, 16)
  }
}

export const getStatusColor = (status: FlightStatus['status']): string => {
  switch (status.toUpperCase()) {
    case 'ON_TIME':
      return '#2ecc71'
    case 'DELAYED':
      return '#e74c3c'
    case 'BOARDING':
      return '#3498db'
    case 'ARRIVED':
      return '#9b59b6'
    default:
      return '#7f8c8d'
  }
}

export const formatFlightDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}
