import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DefaultTheme, ThemeProvider } from 'styled-components/native'
import useResponsiveStyles, { RsFunction } from '@/hooks/useResponsiveStyles'

interface AppTheme extends DefaultTheme {
  colors: {
    primary: string
    secondary: string
    success: string
    danger: string
    warning: string
    info: string
    background: string
    cardBackground: string
    textPrimary: string
    textSecondary: string
    border: string
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
    circle: number
  }
  rs: (value: number, type?: 'width' | 'height' | 'font') => number
}

const queryClient = new QueryClient()

export default function RootLayout() {
  const rs = useResponsiveStyles()
  const theme: AppTheme = {
    colors: {
      primary: '#3498db',
      secondary: '#2c3e50',
      success: '#2ecc71',
      danger: '#e74c3c',
      warning: '#f39c12',
      info: '#3498db',
      background: '#f8f9fa',
      cardBackground: '#ffffff',
      textPrimary: '#2c3e50',
      textSecondary: '#7f8c8d',
      border: '#e0e0e0',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      circle: 100,
    },
    rs,
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
