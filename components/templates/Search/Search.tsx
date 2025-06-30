import { useState } from 'react'
import {
  BottomInputModal,
  BottomDatePickerModal,
  Button,
  Container,
  Footer,
  Header,
  KeyCard,
  Layout,
  SegmentedControl,
} from '@/components'
import styled from 'styled-components'

export const Search = () => {
  const [tabOption, setTabOption] = useState(0)
  const [flightModalVisible, setFlightModalVisible] = useState(false)
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [flightNumber, setFlightNumber] = useState(500)
  const [flightDate, setFlightDate] = useState(new Date())

  const buttonActionTitle = `Search Flight${tabOption === 0 ? '' : 's'}`

  const handlePressFooter = () => {
    setTabOption(tabOption === 0 ? 1 : 0)
  }

  return (
    <Layout backgroundColor="accent">
      <Header buttonTheme title="Track your flight" description="Keep you informed in real time!" />
      <StyledSegmentedControl
        options={['Flight Number', 'Destination']}
        selectedIndex={tabOption}
        onSelect={setTabOption}
      />
      <Container backgroundColor="background" height="100%" padding="md">
        {tabOption === 0 ? (
          <StyledContainer flexDirection="row">
            <KeyCard
              title="Flight Number"
              value={flightNumber}
              onPress={() => setFlightModalVisible(true)}
            />
            <KeyCard
              flex={1}
              title="Date of departure"
              type="date"
              icon="calendar"
              value={flightDate}
              onPress={() => setDateModalVisible(true)}
            />
          </StyledContainer>
        ) : (
          <StyledContainer>
            <StyledContainerDestination flexDirection="row">
              <KeyCard flex={1} title="Origin" type="destination" />
              <KeyCard flex={1} title="Destination" type="destination" />
            </StyledContainerDestination>
            <KeyCard
              title="Date of departure"
              type="date"
              icon="calendar"
              value={flightDate}
              onPress={() => setDateModalVisible(true)}
            />
          </StyledContainer>
        )}
        <Button haptic title={buttonActionTitle} size="lg" onPress={() => {}} />
        <Footer
          type={tabOption === 0 ? 'flightNumber' : 'destination'}
          onPress={handlePressFooter}
        />
      </Container>

      <BottomInputModal
        isVisible={flightModalVisible}
        title="Flight Number"
        placeholder={flightNumber.toString()}
        confirmText="Search Flight"
        onClose={() => setFlightModalVisible(false)}
        onConfirm={(text) => {
          setFlightNumber(Number(text))
          setFlightModalVisible(false)
        }}
      />
      <BottomDatePickerModal
        isVisible={dateModalVisible}
        onClose={() => setDateModalVisible(false)}
        onConfirm={(date) => setFlightDate(date)}
        value={flightDate}
        title="Select Date"
        confirmText="Confirm"
      />
    </Layout>
  )
}

const StyledSegmentedControl = styled(SegmentedControl)`
  margin-top: ${({ theme }) => -theme.spacing.md}px;
`
const StyledContainer = styled(Container)`
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`
const StyledContainerDestination = styled(Container)`
  gap: ${({ theme }) => theme.spacing.md}px;
`
