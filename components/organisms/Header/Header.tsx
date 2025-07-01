import React, { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native'
import styled, { useTheme } from 'styled-components/native'
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
  onChangeDate?: () => void
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
  onChangeDate,
}) => {
  const navigation = useNavigation()
  const theme = useTheme() as AppTheme

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <HeaderContainer
      backgroundColor={backgroundColor}
      padding="md"
      style={style}
      noBorder={back}
      hasBack={back}
    >
      {back && (
        <BackButton onPress={handleBack} accessibilityLabel="Go back" accessibilityRole="button">
          <IconSymbol name="chevron.left" size={30} color={theme.colors.textPrimary} />
        </BackButton>
      )}

      <ContentContainer centered={!back} alignRight={back}>
        <Title
          variant="heading2"
          numberOfLines={1}
          centered={!back}
          alignRight={back}
          weight="bold"
          color="textPrimary"
        >
          {title}
        </Title>

        {description &&
          (typeof description === 'string' && !back ? (
            <Description
              variant="body"
              color="textPrimary"
              numberOfLines={2}
              centered={!back}
              alignRight={back}
            >
              {description}
            </Description>
          ) : (
            <DescriptionRowContainer>
              <Description variant="body" numberOfLines={2} centered={!back} alignRight={back}>
                {description}
              </Description>
              <Text opacity={0.3}>|</Text>
              <DescriptionRowContainer>
                <IconSymbol name="calendar" size={20} color={theme.colors.textPrimary} />
                <Text underline onPress={onChangeDate}>
                  Change
                </Text>
              </DescriptionRowContainer>
            </DescriptionRowContainer>
          ))}
      </ContentContainer>

      {buttonTheme && <ThemeToggleButton />}
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Container)<{
  backgroundColor?: keyof AppTheme['colors']
  theme: AppTheme
  noBorder?: boolean
  hasBack?: boolean
}>`
  flex-direction: row;
  align-items: ${({ hasBack }) => (hasBack ? 'flex-start' : 'center')};
  width: 100%;
  height: ${({ theme, hasBack }) => (!hasBack ? theme.rs(150, 'height') : 'auto')}px;
  border-bottom-width: ${({ noBorder }) => (noBorder ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, backgroundColor = 'accent' }) =>
    String(theme.colors[backgroundColor])};
`

const BackButton = styled(Touchable)<{ theme: AppTheme }>`
  margin-right: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.xs}px;
  z-index: 1;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`

const ContentContainer = styled.View<{
  centered: boolean
  alignRight?: boolean
  theme: AppTheme
}>`
  flex: 1;
  align-items: ${({ centered, alignRight }) =>
    alignRight ? 'flex-end' : centered ? 'center' : 'flex-start'};
`

const Title = styled(Text)<{
  centered: boolean
  alignRight?: boolean
  theme: AppTheme
}>`
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  text-align: ${({ centered, alignRight }) =>
    alignRight ? 'right' : centered ? 'center' : 'left'};
  width: 100%;
`

const Description = styled(Text)<{
  centered: boolean
  alignRight?: boolean
  theme: AppTheme
}>`
  opacity: 0.8;
  text-align: ${({ centered, alignRight }) =>
    alignRight ? 'right' : centered ? 'center' : 'left'};
  width: 100%;
`

const ThemeToggleButton = styled(ButtonThemeToggle)`
  position: absolute;
  right: 16px;
  top: 16px;
`

const DescriptionRowContainer = styled(Container)<{
  theme: AppTheme
}>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`
