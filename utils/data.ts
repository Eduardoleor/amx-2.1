import { AppTheme } from '@/types'

export const toArray = (prop: unknown): unknown[] => {
  if (Array.isArray(prop)) {
    return prop
  }
  return [prop]
}

const statusMap: Record<string, string> = {
  IN_AIR: 'inair',
  ON_TIME: 'ontime',
  DELAYED: 'delayed',
  ARRIVED: 'arrived',
}

export const transformStatus = (status: string): keyof AppTheme['colors']['status'] => {
  return (statusMap[status] ?? status) as unknown as keyof AppTheme['colors']['status']
}

export const transformStatusLabel = (status: string): string => {
  const formatted = status.replace(/_/g, ' ').toLowerCase()
  return uppercaseFirstLetter(formatted)
}

export const uppercaseFirstLetter = (str: string): string => {
  const toLower = str?.toLowerCase()
  return toLower.charAt(0)?.toUpperCase() + toLower.slice(1)
}
