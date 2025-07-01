import { Slot } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components/native'
import useResponsiveStyles from '@/hooks/useResponsiveStyles'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useMemo } from 'react'
import { ThemeContextProvider, useThemeContext } from '@/contexts/ThemeContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContextProvider>
        <AppContent rs={rs} />
      </ThemeContextProvider>
    </GestureHandlerRootView>
  )
}

function AppContent({ rs }: { rs: (value: number, type?: 'width' | 'height' | 'font') => number }) {
  const { themeMode, theme } = useThemeContext()

  queryClient.setQueryData(['flightFavorites'], [])

  const appTheme: AppTheme = useMemo(() => {
    const baseTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        actionable: theme.colors.actionable || {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
          success: theme.colors.success,
          warning: theme.colors.warning,
          danger: theme.colors.danger,
          info: theme.colors.info,
        },
        status: theme.colors.status || {
          inair: '#1872B3',
          ontime: '#2E9509',
          delayed: '#FECB2F',
          arrived: themeMode === 'light' ? '#000000' : '#E2E8F0',
        },
      },
    }

    return {
      ...baseTheme,
      themeMode,
      fonts: {
        regular: 'Garnett-Regular',
        medium: 'Garnett-Medium',
        bold: 'Garnett-Bold',
      },
      rs,
    }
  }, [theme, themeMode, rs])

  return (
    <ThemeProvider theme={appTheme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
