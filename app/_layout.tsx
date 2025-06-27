import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components/native'
import useResponsiveStyles from '@/hooks/useResponsiveStyles'
import { AppTheme } from '@/types'
import { theme } from '@/constants/theme'
import Layout from '@/components/ui/Layout'

const queryClient = new QueryClient()

export default function RootLayout() {
  const rs = useResponsiveStyles()
  const buildTheme: AppTheme = {
    ...theme,
    rs,
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={buildTheme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Slot />
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
