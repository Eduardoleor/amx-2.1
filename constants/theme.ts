import { BaseTheme } from '@/types'
import { COLORS } from './colors'

export const createTheme = (mode: 'light' | 'dark'): BaseTheme => {
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
      ...COLORS[mode],
      actionable: { ...COLORS[mode] },
      status: {
        ...COLORS.common.status,
        arrived: mode === 'light' ? '#000000' : '#E2E8F0',
      },
    },
  }
}
