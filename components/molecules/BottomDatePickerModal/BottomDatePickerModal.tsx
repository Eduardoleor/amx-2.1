import React, { useCallback, useMemo, useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Platform } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Button } from '@/components/atoms/Button'
import { AppTheme } from '@/types'
import { Text } from '@/components/atoms/Text'
import DateTimePicker from '@react-native-community/datetimepicker'

interface BottomDatePickerModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: (date: Date) => void
  value: Date
  title?: string
  confirmText?: string
  minimumDate?: Date
  maximumDate?: Date
}

const getYearRange = () => {
  const now = new Date()
  const year = now.getFullYear()
  const min = new Date(year, 0, 1)
  const max = new Date(year, 11, 31, 23, 59, 59, 999)
  return { min, max }
}

export const BottomDatePickerModal: React.FC<BottomDatePickerModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  value,
  title,
  confirmText = 'Select',
  minimumDate,
  maximumDate,
}) => {
  const theme = useTheme() as AppTheme
  const [selectedDate, setSelectedDate] = useState(value)
  const bottomSheetRef = React.useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['60%'], [])

  const { min, max } = useMemo(getYearRange, [])
  const minDate = minimumDate ?? min
  const maxDate = maximumDate ?? max

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present()
      setSelectedDate(value)
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [isVisible, value])

  const handleConfirm = () => {
    onConfirm(selectedDate)
    onClose()
  }

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        onPress={onClose}
      />
    ),
    [onClose]
  )

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
        android_keyboardInputMode="adjustPan"
        handleIndicatorStyle={{
          backgroundColor: theme.colors.border,
          width: 40,
        }}
      >
        <ContentContainer>
          {title && <ModalTitle variant="body">{title}</ModalTitle>}

          <DatePickerContainer>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              themeVariant={theme.themeMode === 'dark' ? 'dark' : 'light'}
              locale="en-US"
              minimumDate={minDate}
              maximumDate={maxDate}
              textColor={theme.colors.textPrimary}
            />
          </DatePickerContainer>

          <ActionsContainer>
            <Button
              variant="outline"
              size="md"
              title="Cancel"
              onPress={onClose}
              style={{ flex: 1, marginRight: 12 }}
            />
            <Button
              variant="primary"
              size="md"
              title={confirmText}
              onPress={handleConfirm}
              style={{ flex: 1 }}
            />
          </ActionsContainer>
        </ContentContainer>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const ContentContainer = styled(BottomSheetView)<{ theme: AppTheme }>`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`

const ModalTitle = styled(Text)<{ theme: AppTheme }>`
  margin-bottom: 16px;
`

const DatePickerContainer = styled.View`
  flex: 1;
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: center;
  width: 100%;
`

const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`
