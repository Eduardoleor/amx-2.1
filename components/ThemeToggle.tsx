import React, { memo } from 'react'
import { TouchableOpacity, Animated, Easing } from 'react-native'
import { useTheme } from 'styled-components/native'
import { useThemeContext } from '@/contexts/ThemeContext'
import { AppTheme } from '@/types'
import { IconSymbol } from './ui/IconSymbol'

interface ThemeToggleProps {
  size?: number
  style?: React.ComponentProps<typeof TouchableOpacity>['style']
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 24, style }) => {
  const theme = useTheme() as AppTheme
  const { toggleTheme, themeMode } = useThemeContext()
  const spinValue = React.useRef(new Animated.Value(0)).current

  const handlePress = () => {
    // Animación de rotación
    spinValue.setValue(0)
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()

    toggleTheme()
  }

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

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
      <Animated.View style={{ transform: [{ rotate }] }}>
        {themeMode === 'dark' ? (
          <IconSymbol name="sun.max.fill" {...iconProps} />
        ) : (
          <IconSymbol name="moon.fill" {...iconProps} />
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}

export default memo(ThemeToggle)
