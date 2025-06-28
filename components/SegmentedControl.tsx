import React from 'react'
import styled from 'styled-components/native'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { Text } from '@/components/ui'

interface SegmentedControlProps {
  options: [string, string]
  selectedIndex: 0 | 1
  onSelect: (index: 0 | 1) => void
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
          onPress={() => onSelect(index as 0 | 1)}
          activeOpacity={0.7}
        >
          <SegmentText variant="caption" weight="medium" $selected={index === selectedIndex}>
            {option}
          </SegmentText>
        </SegmentButton>
      ))}
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  overflow: hidden;
  align-self: center;
`

const SegmentButton = styled(TouchableOpacity)<{
  $selected: boolean
  $first: boolean
  $last: boolean
}>`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.textPrimary : theme.colors.background};
  border-right-width: ${({ $last }) => ($last ? 0 : 1)}px;
  border-right-color: ${({ theme }) => theme.colors.border};
`

const SegmentText = styled(Text)<{ $selected: boolean }>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.background : theme.colors.textPrimary};
  font-weight: 500;
`

export default SegmentedControl
