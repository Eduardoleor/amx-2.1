import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { FlightSearchCriteria } from '@/types'

interface SearchFormProps {
  onSubmit: (criteria: FlightSearchCriteria) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const theme = useTheme()
  const [criteria, setCriteria] = useState<FlightSearchCriteria>({
    origin: '',
    destination: '',
    number: '',
  })

  const handleSearch = () => {
    if (criteria.number || (criteria.origin && criteria.destination)) {
      onSubmit(criteria)
    }
  }

  return (
    <FormContainer>
      <Input
        label="Número de Vuelo"
        placeholder="Ej: AM500"
        value={criteria.number || ''}
        onChangeText={(text) => setCriteria({ ...criteria, number: text })}
      />

      <Separator>O</Separator>

      <Input
        label="Origen (Código)"
        placeholder="Ej: MEX"
        value={criteria.origin || ''}
        onChangeText={(text) => setCriteria({ ...criteria, origin: text.toUpperCase() })}
        maxLength={3}
      />

      <Input
        label="Destino (Código)"
        placeholder="Ej: CUN"
        value={criteria.destination || ''}
        onChangeText={(text) => setCriteria({ ...criteria, destination: text.toUpperCase() })}
        maxLength={3}
      />

      <Button
        title="Buscar Vuelos"
        onPress={handleSearch}
        disabled={!criteria.number && (!criteria.origin || !criteria.destination)}
      />
    </FormContainer>
  )
}

// Estilos
const FormContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0 ${({ theme }) => theme.rs(2)}px;
  shadow-opacity: 0.1;
  shadow-radius: ${({ theme }) => theme.rs(4)}px;
`

const Separator = styled.Text`
  text-align: center;
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.rs(16)}px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    top: 50%;
    width: 40%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`

export default SearchForm
