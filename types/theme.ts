export interface FlightStatusColors {
  inair: string
  ontime: string
  delayed: string
  arrived: string
}

export interface ActionableColors {
  primary: string
  secondary: string
  success: string
  warning: string
  danger: string
  info: string
  outline: string
  ghost: string
}

export interface BaseTheme {
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
    accent: string
    actionable: ActionableColors
    status: FlightStatusColors
    textOnPrimary: string
    textOnDark: string
    textOnLight: string
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
}

export interface AppTheme extends BaseTheme {
  fonts: {
    regular: string
    medium: string
    bold: string
  }
  rs: (value: number, type?: 'width' | 'height' | 'font') => number
  themeMode: 'light' | 'dark'
}
