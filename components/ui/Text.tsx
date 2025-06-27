import React, { memo, useMemo } from 'react'
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppTheme as Theme } from '@/types'

export type TextVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'caption'
  | 'button'
  | 'label'

export interface TextProps extends RNTextProps {
  variant?: TextVariant
  color?: keyof Theme['colors'] | string
  align?: 'left' | 'center' | 'right' | 'justify'
  weight?: 'regular' | 'medium' | 'bold'
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  lineHeight?: number
  letterSpacing?: number
  style?: TextStyle
}

const variantStyles: Record<TextVariant, TextStyle> = {
  heading1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  heading3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
}

const TextComponent: React.FC<TextProps> = ({
  variant = 'body',
  color = 'textPrimary',
  align = 'left',
  weight = 'regular',
  transform = 'none',
  lineHeight,
  letterSpacing,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme() as Theme

  const textStyle = useMemo(() => {
    const baseStyle = variantStyles[variant]
    const textColor = theme.colors[color as keyof Theme['colors']] || color
    const responsiveLineHeight = lineHeight
      ? theme.rs(lineHeight, 'font')
      : theme.rs(baseStyle.lineHeight || 24, 'font')
    const fontFamily = theme.fonts[weight]

    return {
      color: textColor,
      textAlign: align,
      textTransform: transform,
      letterSpacing: letterSpacing ? theme.rs(letterSpacing, 'font') : undefined,
      fontFamily,
      ...baseStyle,
      fontSize: theme.rs(baseStyle.fontSize || 16, 'font'),
      lineHeight: responsiveLineHeight,
    } as TextStyle
  }, [variant, color, align, weight, transform, lineHeight, letterSpacing, theme])

  return (
    <RNText
      style={[textStyle, style]}
      allowFontScaling={false}
      maxFontSizeMultiplier={1.2}
      {...rest}
    >
      {children}
    </RNText>
  )
}

export const Text = memo(TextComponent)
