import { Slot } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components/native'
import useResponsiveStyles from '@/hooks/useResponsiveStyles'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useMemo } from 'react'
import { ThemeContextProvider, useThemeContext } from '@/contexts/ThemeContext'
import { AppTheme } from '@/types'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Garnett-Regular': require('@/assets/fonts/Garnett-Regular.ttf'),
    'Garnett-Medium': require('@/assets/fonts/Garnett-Medium.ttf'),
    'Garnett-Bold': require('@/assets/fonts/Garnett-Bold.ttf'),
  })

  const rs = useResponsiveStyles()

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeContextProvider>
      <AppContent rs={rs} />
    </ThemeContextProvider>
  )
}

function AppContent({ rs }: { rs: (value: number, type?: 'width' | 'height' | 'font') => number }) {
  const { themeMode, theme } = useThemeContext()
  const appTheme: AppTheme = useMemo(
    () => ({
      ...theme,
      themeMode,
      fonts: {
        regular: 'Garnett-Regular',
        medium: 'Garnett-Medium',
        bold: 'Garnett-Bold',
      },
      rs,
    }),
    [theme, themeMode, rs]
  )

  return (
    <ThemeProvider theme={appTheme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
