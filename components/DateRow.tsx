import React from 'react'
import styled from 'styled-components/native'
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { IconSymbol, Text } from '@/components/ui'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

interface DateRowProps {
  title: string
  date: Date
  onDateChange: (date: Date) => void
  style?: StyleProp<ViewStyle>
  minDate?: Date
  maxDate?: Date
}

export const DateRow: React.FC<DateRowProps> = ({
  title,
  date,
  onDateChange,
  style,
  minDate,
  maxDate,
}) => {
  const handlePress = () => {
    // En una implementación real, aquí abrirías el date picker
    console.log('Open date picker')
  }

  // Formatear la fecha como "Tuesday, Nov 21"
  const formattedDate = format(date, 'EEEE, MMM d', { locale: enUS })

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={{ flex: 1 }}>
      <Container style={style}>
        <TitleText variant="caption" weight="medium">
          {title}
        </TitleText>

        <ContentContainer>
          <DateText weight="medium">{formattedDate}</DateText>

          <CalendarIconContainer>
            <IconSymbol name="calendar" size={25} color="black" />
          </CalendarIconContainer>
        </ContentContainer>
      </Container>
    </TouchableOpacity>
  )
}

// Componentes estilizados
const Container = styled.View`
  border: 2.5px solid ${({ theme }) => theme.colors.textPrimary || 'black'};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.background};
`
const TitleText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  opacity: 0.7;
`

const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DateText = styled(Text)`
  font-size: ${({ theme }) => theme.rs(16, 'font')}px;
  font-weight: 500;
`

const CalendarIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`

export default DateRow
