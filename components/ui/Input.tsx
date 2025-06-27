// components/UI/Input.tsx
import React from 'react'
import styled, { useTheme } from 'styled-components/native'

interface InputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  maxLength?: number
}

const Input: React.FC<InputProps> = ({ label, placeholder, value, onChangeText, maxLength }) => {
  const theme = useTheme()

  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
    </Container>
  )
}

const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`

const Label = styled.Text`
  font-size: ${({ theme }) => theme.rs(14)}px;
  margin-bottom: ${({ theme }) => theme.rs(4)}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`

const StyledInput = styled.TextInput`
  height: ${({ theme }) => theme.rs(44)}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.rs(16)}px;
  background-color: white;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export default Input
