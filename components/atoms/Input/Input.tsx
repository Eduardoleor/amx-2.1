import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { TextInputProps, TextStyle, ViewStyle, StyleProp } from 'react-native'
import { AppTheme } from '@/types'
import { IconSymbol } from '@/components/atoms/IconSymbol'

export interface InputProps extends Omit<TextInputProps, 'style'> {
  variant?: 'default' | 'outline' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  containerStyle?: ViewStyle
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
  error?: boolean
  leftIcon?: string
  rightIcon?: string
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  placeholder,
  value,
  onChangeText,
  containerStyle,
  textStyle,
  disabled = false,
  error = false,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const theme = useTheme() as AppTheme

  const getHeight = () => {
    return size === 'sm' ? 40 : size === 'md' ? 48 : 56
  }

  const getPaddingHorizontal = () => {
    return theme.spacing[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg']
  }

  const getBackgroundColor = () => {
    if (variant === 'filled') return theme.colors.cardBackground
    if (variant === 'outline') return 'transparent'
    return theme.colors.background
  }

  const getBorderColor = () => {
    if (error) return theme.colors.danger
    if (variant === 'outline') return theme.colors.border
    return 'transparent'
  }

  const getBorderWidth = () => {
    if (variant === 'outline' || error) return 1
    return 0
  }

  return (
    <InputContainer
      style={[
        {
          height: getHeight(),
          paddingHorizontal: getPaddingHorizontal(),
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: getBorderWidth(),
          borderRadius: theme.borderRadius.md,
          flexDirection: 'row',
          alignItems: 'center',
        },
        containerStyle,
      ]}
    >
      {leftIcon && (
        <IconContainer style={{ marginRight: theme.spacing.xs }}>
          <IconSymbol name={leftIcon} size={16} color={theme.colors.textSecondary} />
        </IconContainer>
      )}
      <StyledTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        editable={!disabled}
        style={[
          {
            flex: 1,
            color: theme.colors.textPrimary,
            fontSize: size === 'sm' ? 14 : size === 'md' ? 16 : 18,
            fontFamily: theme.fonts.regular,
          },
          textStyle,
        ]}
        {...rest}
      />
      {rightIcon && (
        <IconContainer style={{ marginLeft: theme.spacing.xs }}>
          <IconSymbol name={rightIcon} size={16} color={theme.colors.textSecondary} />
        </IconContainer>
      )}
    </InputContainer>
  )
}

const InputContainer = styled.View``

const StyledTextInput = styled.TextInput``

const IconContainer = styled.View``
