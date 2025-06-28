import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useFlightSearch } from '@/hooks/useFlightSearch'
import { FlightSearchCriteria } from '@/types'
import { Layout, Header, SegmentedControl, InfoRow, DateRow } from '@/components'
import styled from 'styled-components/native'

export default function SearchScreen() {
  const [searchCriteria, setSearchCriteria] = useState<FlightSearchCriteria | null>(null)
  const [selectedOption, setSelectedOption] = useState<0 | 1>(0)

  const [flightNumber, setFlightNumber] = useState('')
  const [flightDate, setFlightDate] = useState(new Date())

  const { data, isLoading, error } = useFlightSearch(searchCriteria)
  const router = useRouter()

  React.useEffect(() => {
    if (data) {
      if (searchCriteria?.number) {
        router.push({
          pathname: '/(screens)/details',
          params: { flight: JSON.stringify(data) },
        })
      } else {
        router.push({
          pathname: '/(screens)/results',
          params: { flights: JSON.stringify(data) },
        })
      }
      setSearchCriteria(null)
    }
  }, [data, router, searchCriteria?.number])

  const handleSearch = (criteria: FlightSearchCriteria) => {
    if (criteria.number || (criteria.origin && criteria.destination)) {
      setSearchCriteria(criteria)
    }
  }

  const handleChangeFlightNumber = (number: string) => {
    const numericValue = number.replace(/[^0-9]/g, '')
    setFlightNumber(numericValue)
  }

  return (
    <Layout statusBarColor="accent">
      <Header buttonTheme title="Track your flight" description="Keep you informed in real time!" />
      <StyledSegmentedControl
        options={['Flight Number', 'Destination']}
        selectedIndex={selectedOption}
        onSelect={setSelectedOption}
      />
      {selectedOption === 0 ? (
        <RowContent>
          <InfoRow
            title="Flight Number"
            contentPlaceholder="000"
            descriptionPlaceholder="AM"
            placeholderPosition="left"
            description={flightNumber}
            onDescriptionChange={handleChangeFlightNumber}
            textInputProps={{
              maxLength: 3,
              keyboardType: 'numeric',
            }}
          />
          <DateRow title="Date of departure" date={flightDate} onDateChange={setFlightDate} />
        </RowContent>
      ) : (
        <RowContent></RowContent>
      )}
    </Layout>
  )
}

const StyledSegmentedControl = styled(SegmentedControl)`
  margin: ${({ theme }) => theme.rs?.(-20)}px;
`

const RowContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding: ${({ theme }) => theme.rs?.(20)}px;
  margin-top: ${({ theme }) => theme.rs?.(30)}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`
