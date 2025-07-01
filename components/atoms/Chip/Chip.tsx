import { AppTheme } from '@/types'
import React from 'react'
import styled from 'styled-components/native'
import { Text } from '../Text'

interface ChipProps {
  text: string
  color?: keyof AppTheme['colors']['actionable']
  status?: keyof AppTheme['colors']['status']
  shape?: 'rounded' | 'square' | 'custom'
  onPress?: () => void
}

export const Chip = ({
  text,
  color = 'primary',
  status,
  shape = 'rounded',
  onPress,
}: ChipProps) => {
  return (
    <ChipContainer
      $color={color}
      $status={status}
      $shape={shape}
      onPress={onPress}
      $clickable={!!onPress}
      disabled={!onPress}
    >
      <ChipText weight="bold" variant="caption" $status={status} $color={color}>
        {text}
      </ChipText>
    </ChipContainer>
  )
}

interface StyledChipProps {
  $color?: keyof AppTheme['colors']['actionable']
  $status?: keyof AppTheme['colors']['status']
  $shape: 'rounded' | 'square' | 'custom'
  $clickable: boolean
}

const ChipContainer = styled.Pressable<StyledChipProps & { theme: AppTheme }>`
  align-self: flex-start;
  padding-left: ${({ theme }) => theme.spacing.md}px;
  padding-right: ${({ theme }) => theme.spacing.md}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  padding-bottom: ${({ theme }) => theme.spacing.sm}px;
  margin-left: ${({ theme }) => -theme.spacing.sm}px;

  ${({ theme, $color, $status }) => {
    if ($status) {
      return `background-color: ${theme.colors.status[$status]};`
    }
    return `background-color: ${theme.colors.actionable[$color || 'primary']};`
  }}

  ${({ theme, $shape }) => {
    if ($shape === 'rounded') {
      return `border-radius: ${theme.borderRadius.md}px;`
    } else if ($shape === 'square') {
      return 'border-radius: 0;'
    } else if ($shape === 'custom') {
      return `
        border-top-left-radius: ${theme.borderRadius.lg}px;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: ${theme.borderRadius.lg}px;
      `
    }
    return `border-radius: ${theme.borderRadius.md}px;`
  }}
  
  ${({ $clickable }) =>
    $clickable &&
    `
    opacity: 1;
  `}
  
  ${({ $clickable, theme }) =>
    $clickable &&
    `
    &:active {
      opacity: 0.8;
    }
  `}
`

interface TextProps {
  $color?: keyof AppTheme['colors']['actionable']
  $status?: keyof AppTheme['colors']['status']
}

const ChipText = styled(Text)<TextProps & { theme: AppTheme }>`
  ${({ theme, $status, $color }) => {
    const bgColor = $status
      ? theme.colors.status[$status]
      : theme.colors.actionable[$color || 'primary']

    const isLight = ['#ffffff', '#fff', '#f8f9fa'].includes(bgColor?.toLowerCase())
    return isLight ? `color: ${theme.colors.textOnLight};` : `color: ${theme.colors.textOnDark};`
  }}
`
