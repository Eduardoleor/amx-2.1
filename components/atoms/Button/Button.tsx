import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ActivityIndicator, Platform, ViewStyle, TextStyle } from 'react-native'
import * as Haptics from 'expo-haptics'
import { AppTheme } from '@/types'
import { Text } from '@/components/atoms/Text'
import { IconSymbol } from '@/components/atoms/IconSymbol'

export type ButtonVariant = keyof AppTheme['colors']['actionable']
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  title: string
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  iconLeft?: string
  iconRight?: string
  style?: ViewStyle
  textStyle?: TextStyle
  haptic?: boolean
  hapticType?: Haptics.ImpactFeedbackStyle
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  title,
  onPress,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  style,
  textStyle,
  haptic = true,
  hapticType = Haptics.ImpactFeedbackStyle.Light,
}) => {
  const theme = useTheme() as AppTheme
  const isDisabled = disabled || loading

  const handlePress = () => {
    if (isDisabled) return

    if (haptic && Platform.OS === 'ios') {
      Haptics.impactAsync(hapticType)
    }

    onPress?.()
  }

  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing[size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'],
      paddingHorizontal: theme.spacing[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'],
      backgroundColor: theme.colors.actionable[variant],
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? theme.colors.actionable[variant] : 'transparent',
    }

    if (isDisabled) {
      return {
        ...baseStyles,
        backgroundColor:
          variant === 'ghost' ? 'transparent' : `${theme.colors.actionable[variant]}80`,
        borderColor:
          variant === 'outline' ? `${theme.colors.actionable[variant]}80` : 'transparent',
      }
    }

    return baseStyles
  }

  const getTextColor = (): keyof AppTheme['colors'] => {
    if (variant === 'primary' || variant === 'danger' || variant === 'success') {
      return 'textOnDark'
    }
    if (variant === 'secondary' || variant === 'warning' || variant === 'info') {
      return 'textOnLight'
    }
    if (variant === 'ghost') return 'textPrimary'
    if (variant === 'outline') return 'textPrimary'
    return 'textPrimary'
  }

  const getTextSize = () => {
    return size === 'sm' ? 14 : size === 'md' ? 16 : 18
  }

  return (
    <ButtonContainer
      onPress={handlePress}
      disabled={isDisabled}
      style={[getButtonStyles(), style]}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[getTextColor()] as string} />
      ) : (
        <ContentWrapper>
          {iconLeft && (
            <IconContainer style={{ marginRight: theme.spacing.xs }}>
              <IconSymbol name={iconLeft} size={getTextSize()} color={getTextColor()} />
            </IconContainer>
          )}

          <Text
            variant="button"
            color={getTextColor()}
            fontSize={getTextSize()}
            weight="500"
            style={textStyle}
          >
            {title}
          </Text>

          {iconRight && (
            <IconContainer style={{ marginLeft: theme.spacing.xs }}>
              <IconSymbol name={iconRight} size={getTextSize()} color={getTextColor()} />
            </IconContainer>
          )}
        </ContentWrapper>
      )}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

const ContentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const IconContainer = styled.View``
