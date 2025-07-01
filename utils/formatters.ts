import { FlightStatus } from '@/types'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

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

export const formatLongDate = (value?: string | number | Date, isNextDay?: boolean): string => {
  let date = value ? new Date(value) : new Date()
  const isValidDate = date instanceof Date && !isNaN(date.getTime())
  if (!isValidDate) return ''
  if (isNextDay) {
    date = new Date(date.getTime() + 24 * 60 * 60 * 1000)
  }
  return format(date, 'EEEE, MMM d', { locale: enUS })
}

export const formatDateToString = (value?: string | number | Date): string => {
  const date = value ? new Date(value) : new Date()
  const isValidDate = date instanceof Date && !isNaN(date.getTime())
  return isValidDate ? format(date, 'yyyy-MM-dd') : ''
}

export const formatShortFlightDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}`
}

export const getHoursAndMinutes = (dateTimeStr?: string): string => {
  if (!dateTimeStr) return '--:--'
  try {
    const dateObj = new Date(dateTimeStr)
    const hours = dateObj.getHours().toString().padStart(2, '0')
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  } catch {
    return '--:--'
  }
}

export const formatAMFlightNumber = (flight?: string, destination?: boolean): string => {
  if (!flight) return ''

  if (destination) {
    const splitFlight = flight.split(',')
    return `${splitFlight[0]} → ${splitFlight[1]}`
  }

  return `AM ${flight}`
}

export const formatTimeHHMM = (dateTime: string): string => {
  const date = new Date(dateTime)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const formatTimeHour = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':')
  if (!hours || !minutes) return '--:--'
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
}
