export const scale = (size: number, width: number, baseWidth: number = 375): number =>
  Math.round((width / baseWidth) * size)

export const verticalScale = (size: number, height: number, baseHeight: number = 812): number =>
  Math.round((height / baseHeight) * size)

export const moderateScale = (
  size: number,
  width: number,
  factor: number = 0.5,
  baseWidth: number = 375
): number => {
  const scaledSize = scale(size, width, baseWidth)
  return Math.round(size + (scaledSize - size) * factor)
}
