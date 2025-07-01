import React, { useCallback, useMemo, useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components/native'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Button } from '@/components/atoms/Button'
import { AppTheme, AirportCity } from '@/types'
import { Text } from '@/components/atoms/Text'
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { IconSymbol } from '@/components/atoms/IconSymbol'

interface BottomListPickerModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: (selectedItem: AirportCity) => void
  items: AirportCity[]
  selectedItem: AirportCity | null
  title?: string
  confirmText?: string
  loading?: boolean
  emptyMessage?: string
}

export const BottomListPickerModal: React.FC<BottomListPickerModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  items,
  selectedItem: propSelectedItem,
  title,
  confirmText = 'Select',
  loading = false,
  emptyMessage = 'No items available',
}) => {
  const theme = useTheme() as AppTheme
  const [selectedItem, setSelectedItem] = useState<AirportCity | null>(null)
  const bottomSheetRef = React.useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['50%'], [])

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present()
      setSelectedItem(propSelectedItem || null)
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [isVisible, propSelectedItem])

  const handleConfirm = () => {
    if (selectedItem) {
      onConfirm(selectedItem)
    }
    onClose()
  }

  const handleSelectItem = (item: AirportCity) => {
    setSelectedItem(item)
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

  const renderItem = ({ item }: { item: AirportCity }) => (
    <ListItem
      onPress={() => handleSelectItem(item)}
      selected={selectedItem?.city === item.city && selectedItem?.country === item.country}
      disabled={loading}
    >
      <ListItemText
        selected={selectedItem?.city === item.city && selectedItem?.country === item.country}
        disabled={loading}
      >
        {item.city}, {item.country}
      </ListItemText>
      {selectedItem?.city === item.city && selectedItem?.country === item.country && !loading && (
        <IconSymbol name="checkmark" color={theme.colors.primary} />
      )}
    </ListItem>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <LoadingText>{emptyMessage}</LoadingText>
        </LoadingContainer>
      )
    }

    if (items.length === 0) {
      return (
        <EmptyContainer>
          <EmptyText>{emptyMessage}</EmptyText>
        </EmptyContainer>
      )
    }

    return (
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.city}-${item.country}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    )
  }

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
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.border,
          width: 40,
        }}
      >
        <ContentContainer>
          {title && <ModalTitle>{title}</ModalTitle>}

          <ListContainer>{renderContent()}</ListContainer>

          <ActionsContainer>
            <Button
              variant="outline"
              size="md"
              title="Cancel"
              onPress={onClose}
              style={{ flex: 1, marginRight: 12 }}
              disabled={loading}
            />
            <Button
              variant="primary"
              size="md"
              title={confirmText}
              onPress={handleConfirm}
              style={{ flex: 1 }}
              disabled={!selectedItem || loading}
            />
          </ActionsContainer>
        </ContentContainer>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const ContentContainer = styled(BottomSheetView)<{ theme: AppTheme }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.background};
`

const ModalTitle = styled(Text)<{ theme: AppTheme }>`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ListContainer = styled.View<{ theme: AppTheme }>`
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`

interface ListItemProps {
  theme: AppTheme
  selected?: boolean
  disabled?: boolean
}

const ListItem = styled(TouchableOpacity)<ListItemProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ selected, theme, disabled }) => {
    if (disabled) return theme.colors.accent
    return selected ? theme.colors.accent : theme.colors.cardBackground
  }};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`

interface ListItemTextProps {
  theme: AppTheme
  selected?: boolean
  disabled?: boolean
}

const ListItemText = styled(Text)<ListItemTextProps>`
  color: ${({ selected, theme, disabled }) => {
    if (disabled) return theme.colors.textSecondary
    return selected ? theme.colors.primary : theme.colors.textPrimary
  }};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`

const ActionsContainer = styled.View<{ theme: AppTheme }>`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`

const LoadingContainer = styled.View<{ theme: AppTheme }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`

const LoadingText = styled(Text)<{ theme: AppTheme }>`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const EmptyContainer = styled.View<{ theme: AppTheme }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`

const EmptyText = styled(Text)<{ theme: AppTheme }>`
  color: ${({ theme }) => theme.colors.textSecondary};
`
