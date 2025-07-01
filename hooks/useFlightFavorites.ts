import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { processFlights } from './useFlightSearch'

export const useFlightFavorites = () => {
  const queryClient = useQueryClient()

  const getFavorites = (): string[] => {
    return queryClient.getQueryData<string[]>(['flightFavorites']) || []
  }

  const toggleFavorite = (segmentCode: string) => {
    const currentFavorites = getFavorites()
    const newFavorites = currentFavorites.includes(segmentCode)
      ? currentFavorites.filter((code) => code !== segmentCode)
      : [...currentFavorites, segmentCode]

    queryClient.setQueryData(['flightFavorites'], newFavorites)
    updateFlightQueries(queryClient, newFavorites)
    return newFavorites
  }

  const isFavorite = (segmentCode: string): boolean => {
    return getFavorites().includes(segmentCode)
  }

  return { getFavorites, toggleFavorite, isFavorite }
}

const updateFlightQueries = (queryClient: QueryClient, favorites: string[]) => {
  const queryCache = queryClient.getQueryCache()

  const flightQueries = queryCache.findAll({
    predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'flights',
  })

  flightQueries.forEach((query) => {
    const { queryKey } = query
    queryClient.setQueryData(queryKey, (oldData: unknown) => {
      if (!oldData) return oldData
      const newData = processFlights(oldData as any, favorites)
      return newData !== oldData ? newData : { ...oldData }
    })
  })
}
