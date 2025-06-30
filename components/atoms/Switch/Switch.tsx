import { AppTheme } from '@/types'
import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Text } from '../Text'

interface SwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  color?: keyof AppTheme['colors']['actionable']
  size?: 'sm' | 'md' | 'lg'
  label?: string
  labelPosition?: 'left' | 'right'
  thumbColor?: string
  trackColor?: {
    false?: string
    true?: string
  }
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  color = 'primary',
  size = 'md',
  label,
  labelPosition = 'right',
  thumbColor,
  trackColor,
}) => {
  const theme = useTheme() as AppTheme

  const toggleSwitch = () => {
    if (!disabled) {
      onValueChange(!value)
    }
  }

  const getTrackColor = (): string => {
    if (trackColor) {
      if (value && trackColor.true) return trackColor.true
      if (!value && trackColor.false) return trackColor.false
    }
    return value ? theme.colors.actionable[color] : theme.colors.border
  }

  const getSize = () => {
    const sizes = {
      sm: {
        width: theme.spacing.xl * 1.5,
        height: theme.spacing.lg,
        thumbSize: theme.spacing.md,
      },
      md: {
        width: theme.spacing.xl * 2,
        height: theme.spacing.xl,
        thumbSize: theme.spacing.lg,
      },
      lg: {
        width: theme.spacing.xl * 2.5,
        height: theme.spacing.xl * 1.25,
        thumbSize: theme.spacing.xl,
      },
    }

    return sizes[size]
  }

  const switchSize = getSize()

  return (
    <SwitchContainer disabled={disabled} onPress={toggleSwitch} $labelPosition={labelPosition}>
      {label && labelPosition === 'left' && (
        <Label $disabled={disabled} $position="left">
          {label}
        </Label>
      )}

      <Track $value={value} $disabled={disabled} $size={switchSize} $trackColor={getTrackColor()}>
        <Thumb
          $value={value}
          $disabled={disabled}
          $size={switchSize}
          $thumbColor={thumbColor || theme.colors.background}
        />
      </Track>

      {label && labelPosition === 'right' && (
        <Label $disabled={disabled} $position="right">
          {label}
        </Label>
      )}
    </SwitchContainer>
  )
}

interface ContainerProps {
  $labelPosition: 'left' | 'right'
}

const SwitchContainer = styled.Pressable<ContainerProps & { theme: AppTheme }>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`

interface TrackProps {
  $value: boolean
  $disabled: boolean
  $size: { width: number; height: number }
  $trackColor: string
}

const Track = styled.View<TrackProps & { theme: AppTheme }>`
  width: ${({ $size }) => $size.width}px;
  height: ${({ $size }) => $size.height}px;
  border-radius: ${({ $size }) => $size.height / 2}px;
  background-color: ${({ $trackColor, $disabled, theme }) =>
    $disabled ? theme.colors.border : $trackColor};
  justify-content: center;
  padding: 2px;
`

interface ThumbProps {
  $value: boolean
  $disabled: boolean
  $size: { width: number; height: number; thumbSize: number }
  $thumbColor: string
}

const Thumb = styled.View<ThumbProps>`
  width: ${({ $size }) => $size.thumbSize * 1.3}px;
  height: ${({ $size }) => $size.thumbSize * 1.3}px;
  border-radius: ${({ $size }) => $size.thumbSize / 1.3}px;
  background-color: ${({ $thumbColor }) => $thumbColor};
  position: absolute;
  left: ${({ $value, $size }) => ($value ? $size.width - $size.thumbSize - 4 : 2)}px;
  box-shadow: 0px 1px 1.5px rgba(0, 0, 0, 0.2);
`

interface LabelProps {
  $disabled: boolean
  $position: 'left' | 'right'
}

const Label = styled(Text)<LabelProps & { theme: AppTheme }>`
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.textSecondary : theme.colors.textPrimary};
  ${({ $position, theme }) =>
    $position === 'left'
      ? `margin-right: ${theme.spacing.xs}px;`
      : `margin-left: ${theme.spacing.xs}px;`}
`
