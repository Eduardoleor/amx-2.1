import React from 'react'
import styled from 'styled-components/native'

interface DividerProps {
  color?: string
  thickness?: number
  marginVertical?: number
  width?: string | number
}

const StyledDivider = styled.View<DividerProps>`
  height: ${({ thickness }) => thickness || 1}px;
  background-color: ${({ color }) => color || '#E0E0E0'};
  margin-top: ${({ marginVertical }) => marginVertical || 8}px;
  margin-bottom: ${({ marginVertical }) => marginVertical || 8}px;
  width: ${({ width }) => width || '100%'};
`

export const Divider: React.FC<DividerProps> = ({ color, thickness, marginVertical, width }) => (
  <StyledDivider
    color={color}
    thickness={thickness}
    marginVertical={marginVertical}
    width={width}
  />
)
