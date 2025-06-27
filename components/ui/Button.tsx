// components/UI/Button.tsx
import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, loading = false }) => {
  const theme = useTheme()

  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={{
        opacity: disabled || loading ? 0.6 : 1,
        backgroundColor: disabled ? theme.colors.textSecondary : theme.colors.primary,
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </StyledButton>
  )
}

const StyledButton = styled.TouchableOpacity`
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`

const ButtonText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.rs(16)}px;
  font-weight: bold;
`

export default Button
