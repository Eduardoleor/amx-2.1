import { DefaultTheme } from 'styled-components/native'

export interface AppTheme extends DefaultTheme {
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
