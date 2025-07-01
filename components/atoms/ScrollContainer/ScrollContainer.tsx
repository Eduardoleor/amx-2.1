import React from 'react'
import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native'

interface ScrollContainerProps extends ScrollViewProps {
  containerStyle?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  containerStyle,
  contentContainerStyle,
  ...rest
}) => {
  return (
    <ScrollView
      style={containerStyle}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  )
}
