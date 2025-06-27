import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BaseTheme } from '@/types'
import { createTheme } from '@/constants/theme'

interface ThemeContextType {
  themeMode: 'light' | 'dark'
  toggleTheme: () => void
  theme: BaseTheme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode')
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setThemeMode(savedTheme)
        }
      } catch (error) {
        console.error('Error loading theme', error)
      }
    }

    loadTheme()
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      AsyncStorage.setItem('themeMode', newTheme).catch(console.error)
      return newTheme
    })
  }, [])

  const theme = useMemo(() => createTheme(themeMode), [themeMode])

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider')
  }
  return context
}
