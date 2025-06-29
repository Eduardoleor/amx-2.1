import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import {
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
  Pressable,
  PressableProps,
  View,
} from 'react-native'
import { AppTheme } from '@/types'

export interface CardProps extends PressableProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  elevated?: boolean
  padding?: keyof AppTheme['spacing'] | number
  backgroundColor?: keyof AppTheme['colors'] | string
  borderColor?: keyof AppTheme['colors'] | string
  borderRadius?: keyof AppTheme['borderRadius'] | number
  animationType?: 'none' | 'scale' | 'fade'
  onPress?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  containerStyle,
  elevated = true,
  padding = 'md',
  backgroundColor = 'cardBackground',
  borderColor = 'border',
  borderRadius = 'md',
  animationType = 'none',
  onPress,
  ...pressableProps
}) => {
  const theme = useTheme() as AppTheme
  const scaleValue = React.useRef(new Animated.Value(1)).current
  const fadeValue = React.useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    if (animationType === 'scale') {
      Animated.timing(scaleValue, {
        toValue: 0.98,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    } else if (animationType === 'fade') {
      Animated.timing(fadeValue, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    }
  }

  const handlePressOut = () => {
    if (animationType === 'scale') {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    } else if (animationType === 'fade') {
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    }
  }

  const resolveSpacing = (value: keyof AppTheme['spacing'] | number | undefined) => {
    if (value === undefined) return undefined
    if (typeof value === 'string') return theme.spacing[value]
    return theme.rs(value)
  }

  const resolveRadius = (value: keyof AppTheme['borderRadius'] | number | undefined) => {
    if (value === undefined) return undefined
    if (typeof value === 'string') return theme.borderRadius[value]
    return theme.rs(value)
  }

  const resolveColor = (color: keyof AppTheme['colors'] | string | undefined) => {
    if (!color) return undefined
    if (color in theme.colors) return theme.colors[color as keyof AppTheme['colors']]
    return color
  }

  const cardStyle = {
    backgroundColor: resolveColor(backgroundColor),
    borderColor: resolveColor(borderColor),
    borderRadius: resolveRadius(borderRadius),
    padding: resolveSpacing(padding),
    ...(elevated
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }
      : {
          borderWidth: 1,
        }),
  }

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  let ContainerComponent: any = View
  let animationStyle = {}

  if (onPress) {
    ContainerComponent = AnimatedPressable

    if (animationType === 'scale') {
      animationStyle = { transform: [{ scale: scaleValue }] }
    } else if (animationType === 'fade') {
      animationStyle = { opacity: fadeValue }
    }
  }

  return (
    <ContainerComponent
      onPress={onPress}
      onPressIn={onPress ? handlePressIn : undefined}
      onPressOut={onPress ? handlePressOut : undefined}
      style={[cardStyle, animationStyle, style]}
      {...pressableProps}
    >
      <Content style={containerStyle}>{children}</Content>
    </ContainerComponent>
  )
}

const Content = styled.View``
