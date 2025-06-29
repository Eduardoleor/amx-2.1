import { BaseTheme } from '@/types'
import { COLORS } from './colors'

export const createTheme = (mode: 'light' | 'dark'): BaseTheme => {
  const modeColors = COLORS[mode]

  return {
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
    colors: {
      ...modeColors,
      textOnPrimary: modeColors.textOnPrimary,
      textOnDark: modeColors.textOnDark,
      textOnLight: modeColors.textOnLight,
      actionable: {
        primary: modeColors.primary,
        secondary: modeColors.secondary,
        success: modeColors.success,
        warning: modeColors.warning,
        danger: modeColors.danger,
        info: modeColors.info,
        outline: modeColors.outline,
        ghost: modeColors.ghost,
      },
      status: {
        ...COLORS.common.status,
        arrived: mode === 'light' ? '#000000' : '#E2E8F0',
      },
    },
  }
}
