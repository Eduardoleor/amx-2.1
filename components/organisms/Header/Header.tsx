import React, { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { StyleProp, ViewStyle } from 'react-native'
import { AppTheme } from '@/types'
import { Container } from '@/components/atoms/Container'
import { Touchable } from '@/components/atoms/Touchable'
import { Text } from '@/components/atoms/Text'
import { ButtonThemeToggle } from '@/components/atoms/ButtonThemeToggle'
import { IconSymbol } from '@/components/atoms/IconSymbol'

interface HeaderProps {
  buttonTheme?: boolean
  back?: boolean
  title: string
  description?: string | ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: keyof AppTheme['colors']
}

export const Header: React.FC<HeaderProps> = ({
  back = false,
  buttonTheme = false,
  title,
  description,
  style,
  backgroundColor = 'accent',
}) => {
  const navigation = useNavigation()

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <HeaderContainer backgroundColor={backgroundColor} padding="md" style={style}>
      {back && (
        <BackButton onPress={handleBack} accessibilityLabel="Go back" accessibilityRole="button">
          <IconSymbol name="chevron.left" size={24} color="textPrimary" />
        </BackButton>
      )}

      <ContentContainer centered={!back}>
        <Title
          variant="heading2"
          numberOfLines={1}
          centered={!back}
          weight="bold"
          color="textPrimary"
        >
          {title}
        </Title>

        {description &&
          (typeof description === 'string' ? (
            <Description variant="body" color="textPrimary" numberOfLines={2} centered={!back}>
              {description}
            </Description>
          ) : (
            <DescriptionContainer centered={!back}>{description}</DescriptionContainer>
          ))}
      </ContentContainer>

      {buttonTheme && <ThemeToggleButton />}
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Container)<{
  backgroundColor?: keyof AppTheme['colors']
  theme: AppTheme
}>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => theme.rs(150, 'height')}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, backgroundColor = 'accent' }) =>
    String(theme.colors[backgroundColor])};
`

const BackButton = styled(Touchable)<{ theme: AppTheme }>`
  margin-right: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.xs}px;
`

const ContentContainer = styled.View<{
  centered: boolean
  theme: AppTheme
}>`
  flex: 1;
  align-items: ${({ centered }) => (centered ? 'center' : 'flex-start')};
`

const Title = styled(Text)<{
  centered: boolean
  theme: AppTheme
}>`
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  width: 100%;
`

const Description = styled(Text)<{
  centered: boolean
  theme: AppTheme
}>`
  opacity: 0.8;
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  width: 100%;
`

const DescriptionContainer = styled.View<{
  centered: boolean
  theme: AppTheme
}>`
  opacity: 0.8;
  align-items: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  width: 100%;
`

const ThemeToggleButton = styled(ButtonThemeToggle)`
  position: absolute;
  right: 16px;
  top: 16px;
`
