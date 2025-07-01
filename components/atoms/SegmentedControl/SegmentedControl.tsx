import React from 'react'
import styled from 'styled-components/native'
import { StyleProp, ViewStyle } from 'react-native'
import { Text } from '@/components/atoms/Text'
import { Touchable } from '@/components/atoms/Touchable'
import { AppTheme } from '@/types'

interface SegmentedControlProps {
  options: string[]
  selectedIndex: number
  onSelect: (index: number) => void
  style?: StyleProp<ViewStyle>
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onSelect,
  style,
}) => {
  return (
    <Container style={style}>
      {options.map((option, index) => (
        <SegmentButton
          key={index}
          $selected={index === selectedIndex}
          $first={index === 0}
          $last={index === options.length - 1}
          onPress={() => onSelect(index)}
          accessibilityLabel={`Select ${option}`}
          accessibilityRole="button"
        >
          <SegmentText variant="caption" weight="500" $selected={index === selectedIndex}>
            {option}
          </SegmentText>
        </SegmentButton>
      ))}
    </Container>
  )
}

// Corrección: Añadir tipado explícito para el tema
const Container = styled.View<{ theme: AppTheme }>`
  flex-direction: row;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  overflow: hidden;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.background};
`

interface SegmentButtonProps {
  $selected: boolean
  $first: boolean
  $last: boolean
  theme: AppTheme
}

const SegmentButton = styled(Touchable)<SegmentButtonProps>`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.textPrimary : 'transparent'};
  border-right-width: ${({ $last, $selected }) => ($last ? 0 : 1)}px;
  border-right-color: ${({ theme, $selected }) =>
    $selected ? 'transparent' : theme.colors.border};
`

interface SegmentTextProps {
  $selected: boolean
  theme: AppTheme
}

const SegmentText = styled(Text)<SegmentTextProps>`
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.background : theme.colors.textPrimary};
`
