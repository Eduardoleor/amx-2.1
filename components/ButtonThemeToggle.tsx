import React, { memo } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import { useTheme } from 'styled-components/native'
import { useThemeContext } from '@/contexts/ThemeContext'
import { AppTheme } from '@/types'
import { IconSymbol } from './ui/IconSymbol'

interface ThemeToggleProps {
  size?: number
  style?: React.ComponentProps<typeof TouchableOpacity>['style']
}

const ButtonThemeToggle: React.FC<ThemeToggleProps> = ({ size = 24, style }) => {
  const theme = useTheme() as AppTheme
  const { toggleTheme, themeMode } = useThemeContext()
  const fadeAnim = React.useRef(new Animated.Value(1)).current

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start()

    toggleTheme()
  }

  const iconProps = {
    size: theme.rs(size, 'font'),
    color: theme.colors.textPrimary,
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityLabel={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      accessibilityRole="button"
      activeOpacity={0.7}
      style={style}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        {themeMode === 'dark' ? (
          <IconSymbol name="sun.max.fill" {...iconProps} />
        ) : (
          <IconSymbol name="moon.fill" {...iconProps} />
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}

export default memo(ButtonThemeToggle)
