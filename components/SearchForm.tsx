import useResponsiveStyles from '@/hooks/useResponsiveStyles'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
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

  return (
    <FormContainer>
      {/*   <Input
        label="Número de Vuelo"
        placeholder="Ej: AM500"
        value={criteria.number}
        onChangeText={(text) => setCriteria({ ...criteria, number: text })}
        rs={rs}
      /> */}

      {/*  <Separator rs={rs}>O</Separator>

      <TextInput
        label="Origen (Código)"
        placeholder="Ej: MEX"
        value={criteria.origin}
        onChangeText={(text) => setCriteria({ ...criteria, origin: text.toUpperCase() })}
        rs={rs}
        maxLength={3}
      />
 */}
      {/*   <Input
        label="Destino (Código)"
        placeholder="Ej: CUN"
        value={criteria.destination}
        onChangeText={(text) => setCriteria({ ...criteria, destination: text.toUpperCase() })}
        rs={rs}
        maxLength={3}
      />

      <Button
        title="Buscar Vuelos"
        onPress={() => onSubmit(criteria)}
        rs={rs}
        disabled={!criteria.number && (!criteria.origin || !criteria.destination)}
      /> */}
    </FormContainer>
  )
}

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

export default SearchForm
