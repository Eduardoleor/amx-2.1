import React from 'react'
import styled from 'styled-components'
import { Text } from '@/components/atoms/Text'
import { Container } from '@/components/atoms/Container'

interface FooterProps {
  type: 'flightNumber' | 'destination'
  onPress?: () => void
}

export const Footer: React.FC<FooterProps> = ({ type = 'flightNumber', onPress }) => {
  const title =
    type === 'flightNumber' ? `Can't find your flight number?` : `Looking for a specific flight? `
  const action = type === 'flightNumber' ? `destination` : `flight number`

  return (
    <StyledFooter>
      <Text variant="caption" opacity={0.7}>
        {title}
      </Text>
      <Text variant="caption" opacity={0.7}>
        Try searching by{' '}
        <Text variant="caption" underline weight="bold" onPress={onPress}>
          {action}
        </Text>
      </Text>
    </StyledFooter>
  )
}

const StyledFooter = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing.lg * 2}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
`
