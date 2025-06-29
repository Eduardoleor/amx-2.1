import React from 'react'
import { Text as RNText, TextProps as RNTextProps, TextStyle, StyleProp } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppTheme } from '@/types'

export type TextVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'caption'
  | 'button'
  | 'label'

export type TextColor =
  | keyof AppTheme['colors']
  | `status.${keyof AppTheme['colors']['status']}`
  | `actionable.${keyof AppTheme['colors']['actionable']}`
  | string

export interface TextProps extends RNTextProps {
  variant?: TextVariant
  color?: TextColor
  fontSize?: number
  align?: 'left' | 'center' | 'right' | 'justify' | 'auto'
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  lineHeight?: number
  letterSpacing?: number
  style?: StyleProp<TextStyle>
}

const variantStyles: Record<TextVariant, TextStyle> = {
  heading1: {
    fontSize: 32,
    lineHeight: 40,
  },
  heading2: {
    fontSize: 24,
    lineHeight: 32,
  },
  heading3: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
}

const getColor = (theme: AppTheme, colorPath?: TextColor) => {
  if (!colorPath) return theme.colors.textPrimary
  if (typeof colorPath === 'string' && colorPath.includes('.')) {
    const [group, variant] = colorPath.split('.') as [keyof AppTheme['colors'], string]
    if (group === 'status' && variant in theme.colors.status) {
      return theme.colors.status[variant as keyof AppTheme['colors']['status']]
    }
    if (group === 'actionable' && variant in theme.colors.actionable) {
      return theme.colors.actionable[variant as keyof AppTheme['colors']['actionable']]
    }
  }
  if (typeof colorPath === 'string' && colorPath in theme.colors) {
    return theme.colors[colorPath as keyof AppTheme['colors']]
  }
  return colorPath || theme.colors.textPrimary
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'textPrimary',
  fontSize,
  align = 'left',
  weight,
  transform = 'none',
  lineHeight,
  letterSpacing,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme() as AppTheme
  const baseStyle = variantStyles[variant]
  let fontFamily = theme.fonts.regular
  if (variant === 'button') {
    fontFamily = theme.fonts.medium
  } else if (variant.includes('heading')) {
    fontFamily = theme.fonts.bold
  }
  if (weight) {
    if (weight === 'bold') {
      fontFamily = theme.fonts.bold
    } else if (weight === '500' || weight === '600') {
      fontFamily = theme.fonts.medium
    }
  }
  const finalFontSize =
    typeof fontSize === 'number'
      ? theme.rs(fontSize, 'font')
      : theme.rs(baseStyle.fontSize ?? 16, 'font')
  const finalLineHeight =
    typeof lineHeight === 'number'
      ? theme.rs(lineHeight, 'font')
      : typeof baseStyle.lineHeight === 'number'
        ? theme.rs(baseStyle.lineHeight, 'font')
        : undefined
  const finalLetterSpacing =
    typeof letterSpacing === 'number' ? theme.rs(letterSpacing, 'font') : undefined
  const textColor = String(getColor(theme, color))
  return (
    <RNText
      style={[
        {
          color: textColor,
          fontSize: finalFontSize,
          fontFamily,
          textAlign: align,
          lineHeight: finalLineHeight,
          letterSpacing: finalLetterSpacing,
          textTransform: transform,
        },
        style,
      ]}
      allowFontScaling={false}
      maxFontSizeMultiplier={1.2}
      {...rest}
    >
      {children}
    </RNText>
  )
}
