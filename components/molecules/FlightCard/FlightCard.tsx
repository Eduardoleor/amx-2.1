import { Chip, Container, Text } from '@/components/atoms'
import { Card } from '@/components/atoms/Card'
import Switch from '@/components/atoms/Switch/Switch'
import { FC } from 'react'
import styled from 'styled-components'
import { FlightStatus } from '../FlightStatus'
import { View } from 'react-native'

export const FlightCard: FC = () => {
  return (
    <StyledCard padding={0}>
      <Container flexDirection="row" justifyContent="space-between" alignItems="center">
        <Chip text="Arrived" color="success" status="delayed" shape="custom" />
        <Switch
          labelPosition="left"
          label="Favorite"
          size="sm"
          value={false}
          color="outline"
          onValueChange={() => {}}
        />
      </Container>
      <Container flexDirection="row" justifyContent="space-between">
        <Container>
          <Text>6:24</Text>
          <Text>MEXT</Text>
        </Container>
        <Container flex={1}>
          <FlightStatus status="delayed" />
          <Text>2h 28m</Text>
        </Container>
        <Container>
          <Text>9:24</Text>
          <Text>CUN</Text>
        </Container>
      </Container>
      <Separator />
      <Container flexDirection="row" justifyContent="space-between">
        <Text>AM 500</Text>
        <Text>DEtails</Text>
      </Container>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-width: 2px;
  width: auto;
  border-color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
`

const Separator = styled(View)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xs}px 0;
`
