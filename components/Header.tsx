import React, { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { Text, IconSymbol } from '@/components/ui'
import { StyleProp, ViewStyle } from 'react-native'
import ButtonThemeToggle from './ButtonThemeToggle'

interface HeaderProps {
  buttonTheme?: boolean
  back?: boolean
  title: string
  description?: string | ReactNode
  style?: StyleProp<ViewStyle>
}

const Header: React.FC<HeaderProps> = ({
  back = false,
  buttonTheme = false,
  title,
  description,
  style,
}) => {
  const navigation = useNavigation()

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <Container style={style}>
      {back && (
        <BackButton onPress={handleBack} accessibilityLabel="Go back" accessibilityRole="button">
          <IconSymbol name="chevron.left" size={24} color="textPrimary" />
        </BackButton>
      )}

      <ContentContainer $centered={!back}>
        <Title
          variant="heading2"
          numberOfLines={1}
          $centered={!back}
          weight="bold"
          color="textPrimary"
        >
          {title}
        </Title>

        {description &&
          (typeof description === 'string' ? (
            <Description variant="body" color="textPrimary" numberOfLines={2} $centered={!back}>
              {description}
            </Description>
          ) : (
            <DescriptionNode $centered={!back}>{description}</DescriptionNode>
          ))}
      </ContentContainer>

      {buttonTheme && <ButttonThemeToggle />}
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.accent};
  width: 100%;
  height: ${({ theme }) => theme.rs?.(150, 'height')}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`

const BackButton = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.xs}px;
`

const ContentContainer = styled.View<{ $centered: boolean }>`
  flex: 1;
  align-items: ${({ $centered }) => ($centered ? 'center' : 'flex-start')};
`

const Title = styled(Text)<{ $centered: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  text-align: ${({ $centered }) => ($centered ? 'center' : 'left')};
  width: 100%;
`

const Description = styled(Text)<{ $centered: boolean }>`
  opacity: 0.8;
  text-align: ${({ $centered }) => ($centered ? 'center' : 'left')};
  width: 100%;
`

const DescriptionNode = styled.View<{ $centered: boolean }>`
  opacity: 0.8;
  align-items: ${({ $centered }) => ($centered ? 'center' : 'flex-start')};
  width: 100%;
`

const ButttonThemeToggle = styled(ButtonThemeToggle)`
  position: absolute;
  right: 16px;
  top: 16px;
`

export default Header
