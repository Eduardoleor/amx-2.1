import useResponsiveStyles from '@/hooks/useResponsiveStyles'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

interface SearchFormProps {
  onSubmit: (criteria: { origin: string; destination: string; number: string }) => void
}

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const rs = useResponsiveStyles()
  const [criteria, setCriteria] = useState({
    origin: '',
    destination: '',
    number: '',
  })

  const handleSubmit = () => {
    onSubmit(criteria)
  }

  return (
    <FormContainer>
      <Input
        label="Número de Vuelo"
        placeholder="Ej: AM500"
        value={criteria.number}
        onChangeText={(text) => setCriteria({ ...criteria, number: text })}
      />

      <Separator>O</Separator>

      <Input
        label="Origen (Código)"
        placeholder="Ej: MEX"
        value={criteria.origin}
        onChangeText={(text) => setCriteria({ ...criteria, origin: text.toUpperCase() })}
        maxLength={3}
      />

      <Input
        label="Destino (Código)"
        placeholder="Ej: CUN"
        value={criteria.destination}
        onChangeText={(text) => setCriteria({ ...criteria, destination: text.toUpperCase() })}
        maxLength={3}
      />

      <Button
        title="Buscar Vuelos"
        onPress={handleSubmit}
        disabled={!criteria.number && (!criteria.origin || !criteria.destination)}
      />
    </FormContainer>
  )
}

// Custom Input Component
interface InputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  maxLength?: number
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <StyledTextInput {...props} />
    </InputContainer>
  )
}

// Custom Button Component
interface ButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
}

const Button = ({ title, onPress, disabled }: ButtonProps) => {
  return (
    <StyledButton onPress={onPress} disabled={disabled}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  )
}

// Styled Components
const FormContainer = styled.View`
  padding: ${({ theme }) => theme.rs(20)}px;
  background-color: white;
  border-radius: ${({ theme }) => theme.rs(8)}px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0 ${({ theme }) => theme.rs(2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${({ theme }) => theme.rs(4)}px;
`

const Separator = styled.Text`
  text-align: center;
  margin-vertical: ${({ theme }) => theme.rs(10)}px;
  font-weight: bold;
  color: #555;
  font-size: ${({ theme }) => theme.rs(16)}px;
`

const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.rs(16)}px;
`

const InputLabel = styled.Text`
  font-size: ${({ theme }) => theme.rs(14)}px;
  margin-bottom: ${({ theme }) => theme.rs(4)}px;
  color: #333;
`

const StyledTextInput = styled(TextInput)`
  padding: ${({ theme }) => theme.rs(10)}px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: ${({ theme }) => theme.rs(4)}px;
  font-size: ${({ theme }) => theme.rs(16)}px;
`

const StyledButton = styled(TouchableOpacity)`
  background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#007bff')};
  padding: ${({ theme }) => theme.rs(12)}px;
  border-radius: ${({ theme }) => theme.rs(4)}px;
  align-items: center;
`

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.rs(16)}px;
`

export default SearchForm
