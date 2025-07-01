import React from 'react'
import { KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from 'react-native'

interface KeyboardAvoidingContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  keyboardVerticalOffset?: number
}

export const KeyboardAvoidingContainer: React.FC<KeyboardAvoidingContainerProps> = ({
  children,
  style,
  keyboardVerticalOffset = 0,
}) => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[{ flex: 1 }, style]}
      >
        {children}
      </KeyboardAvoidingView>
    )
  }

  return <>{children}</>
}
