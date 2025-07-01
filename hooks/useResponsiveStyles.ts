import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export type RsFunction = (value: number, type?: 'width' | 'height' | 'font') => number

const useResponsiveStyles = (): RsFunction => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })

    return () => subscription?.remove()
  }, [])

  const rs: RsFunction = (value, type = 'width') => {
    const { width, height } = dimensions
    const baseWidth = 375 // iPhone 13 width
    const baseHeight = 812 // iPhone 13 height

    switch (type) {
      case 'height':
        return Math.round((value * height) / baseHeight)
      case 'font':
        const scaleFactor = Math.min(width / baseWidth, height / baseHeight)
        return Math.round(value * scaleFactor)
      case 'width':
      default:
        return Math.round((value * width) / baseWidth)
    }
  }

  return rs
}

export default useResponsiveStyles
