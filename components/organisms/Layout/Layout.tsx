import React, { FC, ReactNode } from 'react'
import { ViewStyle, StatusBarProps, ColorValue } from 'react-native'
import { AppTheme } from '@/types'
import { useTheme } from 'styled-components/native'
import { SafeAreaView } from '@/components/atoms/SafeAreaView'
import { CustomStatusBar } from '@/components/atoms/CustomStatusBar'
import { Container } from '@/components/atoms/Container'
import { ScrollContainer } from '@/components/atoms/ScrollContainer'
import { KeyboardAvoidingContainer } from '@/components/atoms/KeyboardAvoidingContainer'

export interface LayoutProps {
  children: ReactNode
  style?: ViewStyle
  containerStyle?: ViewStyle
  scrollable?: boolean
  safeAreaEdges?: ('top' | 'right' | 'bottom' | 'left')[]
  backgroundColor?: keyof AppTheme['colors'] | ColorValue
  statusBarStyle?: 'light-content' | 'dark-content' | 'default'
  statusBarProps?: StatusBarProps
  statusBarColor?: keyof AppTheme['colors'] | ColorValue
  statusBarTranslucent?: boolean
  padding?: keyof AppTheme['spacing'] | number
  horizontalPadding?: keyof AppTheme['spacing'] | number
  verticalPadding?: keyof AppTheme['spacing'] | number
  margin?: keyof AppTheme['spacing'] | number
  horizontalMargin?: keyof AppTheme['spacing'] | number
  verticalMargin?: keyof AppTheme['spacing'] | number
  alignItems?: ViewStyle['alignItems']
  justifyContent?: ViewStyle['justifyContent']
  keyboardVerticalOffset?: number
}

export const Layout: FC<LayoutProps> = ({
  children,
  style,
  containerStyle,
  scrollable = false,
  safeAreaEdges = ['top', 'right', 'bottom', 'left'],
  backgroundColor = 'background',
  statusBarStyle = 'default',
  statusBarProps,
  statusBarColor,
  statusBarTranslucent = false,
  padding,
  horizontalPadding,
  verticalPadding,
  margin,
  horizontalMargin,
  verticalMargin,
  alignItems,
  justifyContent,
  keyboardVerticalOffset = 0,
}) => {
  const theme = useTheme() as AppTheme

  const statusBarBgColor = statusBarColor || backgroundColor

  return (
    <>
      <CustomStatusBar
        backgroundColor={statusBarBgColor}
        barStyle={
          statusBarStyle === 'default'
            ? theme.themeMode === 'dark'
              ? 'light-content'
              : 'dark-content'
            : statusBarStyle
        }
        translucent={statusBarTranslucent}
        {...statusBarProps}
      />

      <SafeAreaView
        edges={safeAreaEdges}
        backgroundColor={backgroundColor}
        style={[{ flex: 1 }, style]}
      >
        <KeyboardAvoidingContainer keyboardVerticalOffset={keyboardVerticalOffset}>
          {scrollable ? (
            <ScrollContainer containerStyle={{ flex: 1 }} contentContainerStyle={containerStyle}>
              <Container
                padding={padding}
                margin={margin}
                horizontalPadding={horizontalPadding}
                verticalPadding={verticalPadding}
                horizontalMargin={horizontalMargin}
                verticalMargin={verticalMargin}
                alignItems={alignItems}
                justifyContent={justifyContent}
              >
                {children}
              </Container>
            </ScrollContainer>
          ) : (
            <Container
              style={containerStyle}
              padding={padding}
              margin={margin}
              horizontalPadding={horizontalPadding}
              verticalPadding={verticalPadding}
              horizontalMargin={horizontalMargin}
              verticalMargin={verticalMargin}
              alignItems={alignItems}
              justifyContent={justifyContent}
            >
              {children}
            </Container>
          )}
        </KeyboardAvoidingContainer>
      </SafeAreaView>
    </>
  )
}
