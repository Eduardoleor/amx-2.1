import React, { FC, ReactNode, useCallback, useMemo } from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StatusBarProps,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { SafeAreaView, EdgeInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'
import { AppTheme } from '@/types'

export interface LayoutProps {
  children: ReactNode
  style?: ViewStyle
  containerStyle?: ViewStyle
  scrollable?: boolean
  scrollViewProps?: ScrollViewProps
  safeAreaEdges?: ('top' | 'right' | 'bottom' | 'left')[]
  safeAreaInsets?: EdgeInsets
  backgroundColor?: keyof AppTheme['colors'] | string
  statusBarStyle?: 'light-content' | 'dark-content' | 'default'
  statusBarProps?: StatusBarProps
  padding?: keyof AppTheme['spacing'] | number
  horizontalPadding?: keyof AppTheme['spacing'] | number
  verticalPadding?: keyof AppTheme['spacing'] | number
  margin?: keyof AppTheme['spacing'] | number
  horizontalMargin?: keyof AppTheme['spacing'] | number
  verticalMargin?: keyof AppTheme['spacing'] | number
  alignItems?: ViewStyle['alignItems']
  justifyContent?: ViewStyle['justifyContent']
  keyboardVerticalOffset?: number
  statusBarColor?: keyof AppTheme['colors'] | string
  statusBarTranslucent?: boolean
}

const Layout: FC<LayoutProps> = ({
  children,
  style,
  containerStyle,
  scrollable = false,
  scrollViewProps = {},
  safeAreaEdges = ['top', 'right', 'bottom', 'left'],
  safeAreaInsets,
  statusBarColor,
  statusBarTranslucent = false,
  backgroundColor = 'background',
  statusBarStyle = 'default',
  statusBarProps = {},
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

  const bgColor = useMemo(() => {
    if (backgroundColor in theme.colors) {
      const color = theme.colors[backgroundColor as keyof typeof theme.colors]
      if (typeof color === 'string') return color
      if ('main' in color && typeof color.main === 'string') return color.main
      return undefined
    }
    return backgroundColor
  }, [backgroundColor, theme])

  const resolvedStatusBarStyle = useMemo(() => {
    if (statusBarStyle !== 'default') return statusBarStyle
    return theme.themeMode === 'dark' ? 'light-content' : 'dark-content'
  }, [statusBarStyle, theme.themeMode])

  const resolveSpacing = useCallback(
    (value: keyof AppTheme['spacing'] | number | undefined) => {
      if (value === undefined) return undefined
      if (typeof value === 'string') return theme.spacing[value]
      return theme.rs(value)
    },
    [theme]
  )

  const containerStyles = useMemo(() => {
    return StyleSheet.flatten([
      styles.container,
      {
        backgroundColor: bgColor,
        padding: resolveSpacing(padding),
        margin: resolveSpacing(margin),
        paddingHorizontal: resolveSpacing(horizontalPadding),
        paddingVertical: resolveSpacing(verticalPadding),
        marginHorizontal: resolveSpacing(horizontalMargin),
        marginVertical: resolveSpacing(verticalMargin),
        alignItems,
        justifyContent,
      },
      containerStyle,
    ])
  }, [
    bgColor,
    resolveSpacing,
    padding,
    margin,
    horizontalPadding,
    verticalPadding,
    horizontalMargin,
    verticalMargin,
    alignItems,
    justifyContent,
    containerStyle,
  ])

  const statusBarBgColor = useMemo(() => {
    if (statusBarColor) {
      if (statusBarColor in theme.colors) {
        const color = theme.colors[statusBarColor as keyof typeof theme.colors]
        if (typeof color === 'string') return color
        if (color && typeof color === 'object' && 'main' in color && typeof color.main === 'string')
          return color.main
        return undefined
      }
      return statusBarColor
    }
    return bgColor
  }, [statusBarColor, theme, bgColor])

  const safeAreaStyles = useMemo(() => {
    return StyleSheet.flatten([
      styles.safeArea,
      style,
      { backgroundColor: statusBarBgColor || bgColor },
    ])
  }, [bgColor, statusBarBgColor, style])

  const renderContent = () => {
    const content = scrollable ? (
      <ScrollView
        contentContainerStyle={[styles.scrollContent, containerStyles]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    ) : (
      <View style={containerStyles}>{children}</View>
    )

    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardAvoiding}
        >
          {content}
        </KeyboardAvoidingView>
      )
    }

    return content
  }

  return (
    <>
      <StatusBar
        barStyle={resolvedStatusBarStyle}
        backgroundColor={statusBarBgColor}
        translucent={statusBarTranslucent}
        {...statusBarProps}
      />
      <SafeAreaView style={safeAreaStyles} edges={safeAreaEdges}>
        {renderContent()}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
})

export default Layout
