import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { ViewProps, Animated, StyleSheet, View, LayoutChangeEvent } from 'react-native'

const SkeletonContainer = styled.View<{
  width?: number | string
  height?: number | string
  borderRadius?: number
}>`
  overflow: hidden;
  background-color: #f5f5f5;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '16px')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 4)}px;
`

type SkeletonProps = ViewProps & {
  width?: number | string
  height?: number | string
  borderRadius?: number
  shimmerColors?: [string, string, string]
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  style,
  shimmerColors = ['#cccccc', '#e2e2e2', '#333333'],
  ...rest
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current
  const [containerWidth, setContainerWidth] = React.useState(300)

  useEffect(() => {
    shimmerAnim.setValue(0)
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start()
  }, [shimmerAnim])

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width)
  }

  const shimmerWidth = Math.max(60, containerWidth * 0.4)

  return (
    <SkeletonContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      style={style}
      onLayout={onLayout}
      accessibilityRole="progressbar"
      {...rest}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={{
            position: 'absolute',
            width: shimmerWidth,
            height: '100%',
            borderRadius: borderRadius ?? 4,
            backgroundColor: shimmerColors[1],
            opacity: 0.6,
            transform: [
              {
                translateX: shimmerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-shimmerWidth, containerWidth],
                }),
              },
            ],
          }}
        />
      </View>
    </SkeletonContainer>
  )
}
