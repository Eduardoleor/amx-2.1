import React from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from 'styled-components/native'
import { useThemeContext } from '@/contexts/ThemeContext'
import { IconSymbol } from '@/components/atoms/IconSymbol'
import { Touchable } from '@/components/atoms/Touchable'
import { AppTheme } from '@/types'

export interface ButtonThemeToggleProps {
  size?: number
  style?: StyleProp<ViewStyle>
}

export const ButtonThemeToggle: React.FC<ButtonThemeToggleProps> = ({ size = 24, style }) => {
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
    <Touchable
      onPress={handlePress}
      accessibilityLabel={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      accessibilityRole="button"
      style={style}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        {themeMode === 'dark' ? (
          <IconSymbol name="sun.max.fill" {...iconProps} />
        ) : (
          <IconSymbol name="moon.fill" {...iconProps} />
        )}
      </Animated.View>
    </Touchable>
  )
}
