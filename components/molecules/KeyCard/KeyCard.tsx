import { Card } from '@/components/atoms/Card'
import { Text } from '@/components/atoms/Text'
import { IconSymbol } from '@/components/atoms/IconSymbol'
import { SymbolViewProps } from 'expo-symbols'
import styled, { useTheme } from 'styled-components'
import { View } from 'react-native'
import { Container } from '@/components/atoms'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

type FlightType = 'flightNumber' | 'destination' | 'date'
interface KeyCardProps {
  title: string
  type?: FlightType
  icon?: SymbolViewProps['name']
  value?: string | number | Date
  onPress?: (type: FlightType) => void
  flex?: number
}

export const KeyCard: React.FC<KeyCardProps> = ({
  title,
  type = 'flightNumber',
  icon,
  value = '',
  flex,
  onPress,
}) => {
  const theme = useTheme()

  const date = value ? new Date(value) : new Date()
  const isValidDate = date instanceof Date && !isNaN(date.getTime())
  const formattedDate = isValidDate ? format(date, 'EEEE, MMM d', { locale: enUS }) : ''

  const customContent = () => {
    switch (type) {
      case 'flightNumber':
        return (
          <>
            <Text weight="bold" opacity={0.3}>
              AM
            </Text>
            <Text weight="bold">{value !== undefined && value !== null ? String(value) : ''}</Text>
          </>
        )
      case 'destination':
        const valueParts = String(value).split(',')
        const airport = valueParts[0]?.trim() || ''
        const countryCode = valueParts[1]?.trim() || ''

        return (
          <>
            <Text weight="bold">{airport}</Text>
            <Text weight="bold" opacity={0.3}>
              {countryCode}
            </Text>
          </>
        )
      case 'date':
        return (
          <>
            <Text weight="bold">{formattedDate}</Text>
          </>
        )
    }
  }

  return (
    <StyledCard
      animationType="scale"
      style={flex ? { flex } : undefined}
      onPress={() => type && onPress?.(type)}
    >
      <Text variant="caption">{title}</Text>
      <StyledContainer flexDirection="row">{customContent()}</StyledContainer>
      {icon && (
        <IconWrapper>
          <IconSymbol name={icon} color={theme.colors.textPrimary} />
        </IconWrapper>
      )}
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-width: 2px;
  width: auto;
  border-color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
`

const IconWrapper = styled(View)`
  position: absolute;
  right: 0;
  top: 50%;
  bottom: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`

const StyledContainer = styled(Container)`
  gap: ${({ theme }) => theme.spacing.sm}px;
  background-color: transparent;
`
