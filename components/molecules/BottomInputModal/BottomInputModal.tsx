import React, { useCallback, useMemo, useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components/native'
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Button } from '@/components/atoms/Button'
import { AppTheme } from '@/types'
import { Text } from '@/components/atoms/Text'
import { TextInput } from 'react-native-gesture-handler'

interface BottomInputModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: (text: string) => void
  title?: string
  placeholder?: string
  confirmText?: string
}

export const BottomInputModal: React.FC<BottomInputModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  placeholder = 'Type here...',
  confirmText = 'Search',
}) => {
  const theme = useTheme() as AppTheme
  const [inputValue, setInputValue] = useState('')

  const inputRef = React.useRef<TextInput>(null)
  const bottomSheetRef = React.useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['40%'], [])

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand()
      setInputValue('')
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isVisible])

  const handleConfirm = () => {
    inputRef.current?.blur()
    onConfirm(inputValue)
    onClose()
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
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enableDynamicSizing={false}
        enablePanDownToClose
        onClose={onClose}
      >
        <ContentContainer>
          {title && <StyledText variant="body">{title}</StyledText>}
          <BottomSheetTextInput
            ref={inputRef}
            placeholder={placeholder}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
            maxLength={3}
            returnKeyType="done"
            style={{
              height: 48,
              paddingHorizontal: 16,
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.border,
              borderWidth: 1,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.regular,
              fontSize: 16,
              marginBottom: 24,
            }}
            onSubmitEditing={handleConfirm}
          />

          <Button
            variant="primary"
            size="md"
            title={confirmText}
            onPress={handleConfirm}
            disabled={!inputValue.trim()}
          />
        </ContentContainer>
      </BottomSheet>
    </BottomSheetModalProvider>
  )
}

const ContentContainer = styled(BottomSheetView)<{ theme: AppTheme }>`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`

const StyledText = styled(Text)`
  margin-bottom: 16px;
`
