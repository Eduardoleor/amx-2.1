import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components/native'
import {
  StyleProp,
  ViewStyle,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
} from 'react-native'
import { Text as CustomText } from '@/components/ui'

interface InfoRowProps {
  title: string
  description: string
  onDescriptionChange: (text: string) => void
  descriptionPlaceholder?: string
  contentPlaceholder?: string
  placeholderPosition: 'left' | 'right'
  style?: StyleProp<ViewStyle>
  animated?: boolean
  textInputProps?: TextInputProps
}

export const InfoRow: React.FC<InfoRowProps> = ({
  title,
  description,
  onDescriptionChange,
  descriptionPlaceholder,
  contentPlaceholder,
  placeholderPosition,
  style,
  animated = true,
  textInputProps = {},
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<TextInput>(null)

  const handleContainerPress = () => {
    inputRef.current?.focus()
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const showContentPlaceholder = !isFocused && !description && contentPlaceholder

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress} style={{ flex: 1 }}>
      <Container style={style} $isFocused={isFocused}>
        <TitleText variant="caption" weight="medium">
          {title}
        </TitleText>

        <DescriptionContainer>
          {placeholderPosition === 'left' && descriptionPlaceholder && (
            <PlaceholderText weight="bold" $position={placeholderPosition} $animated={animated}>
              {descriptionPlaceholder}
            </PlaceholderText>
          )}

          <InputContainer>
            <DescriptionInput
              ref={inputRef}
              value={description}
              onChangeText={onDescriptionChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder=""
              $hasPlaceholder={!!descriptionPlaceholder}
              $position={placeholderPosition}
              $animated={animated}
              $showPlaceholder={!!showContentPlaceholder}
              {...textInputProps}
            />

            {showContentPlaceholder && (
              <ContentPlaceholderText>{contentPlaceholder}</ContentPlaceholderText>
            )}
          </InputContainer>

          {placeholderPosition === 'right' && descriptionPlaceholder && (
            <PlaceholderText weight="bold" $position={placeholderPosition} $animated={animated}>
              {descriptionPlaceholder}
            </PlaceholderText>
          )}
        </DescriptionContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled.View<{ $isFocused?: boolean }>`
  border: 2.5px solid
    ${({ theme, $isFocused }) =>
      $isFocused ? theme.colors.textSecondary : theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.background};
`

const TitleText = styled(CustomText)`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  opacity: 0.7;
`

const DescriptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const InputContainer = styled.View`
  position: relative;
  flex: 0;
  min-width: ${({ theme }) => theme.rs?.(40)}px;
  align-items: flex-start;
`

const baseTextStyle = css<{
  $position: 'left' | 'right'
  $animated: boolean
}>`
  transition: ${({ $animated }) => ($animated ? 'all 0.3s ease' : 'none')};
`

const DescriptionInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: 'transparent',
  selectionColor: theme.colors.primary,
  underlineColorAndroid: 'transparent',
}))<{
  $hasPlaceholder: boolean
  $position: 'left' | 'right'
  $animated: boolean
  $showPlaceholder: boolean
}>`
  ${baseTextStyle}
  font-weight: bold;
  color: ${({ theme, $showPlaceholder }) =>
    $showPlaceholder ? 'transparent' : theme.colors.textPrimary};
  padding: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.rs?.(16, 'font')}px;
  text-align: left;
  min-width: ${({ $showPlaceholder, theme }) => ($showPlaceholder ? theme.rs?.(40) : 0)}px;
  margin-bottom: ${({ $showPlaceholder }) => (!$showPlaceholder ? 5 : 0)}px;

  ${({ $hasPlaceholder, $position }) =>
    $hasPlaceholder &&
    $position === 'left' &&
    css`
      margin-left: ${({ theme }) => theme.spacing.xs}px;
    `}

  ${({ $hasPlaceholder, $position }) =>
    $hasPlaceholder &&
    $position === 'right' &&
    css`
      margin-right: ${({ theme }) => theme.spacing.xs}px;
    `}
`

const PlaceholderText = styled(CustomText)<{
  $position: 'left' | 'right'
  $animated: boolean
}>`
  ${baseTextStyle}
  opacity: 0.3;
  font-size: ${({ theme }) => theme.rs?.(16, 'font')}px;
  font-weight: bold;
  line-height: ${({ theme }) => theme.rs?.(20, 'font')}px;

  ${({ $position }) =>
    $position === 'left' &&
    css`
      margin-right: ${({ theme }) => theme.spacing.xs}px;
    `}
  ${({ $position }) =>
    $position === 'right' &&
    css`
      margin-left: ${({ theme }) => theme.spacing.xs}px;
    `}
`

const ContentPlaceholderText = styled(CustomText)`
  position: absolute;
  left: 0;
  top: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  opacity: 0.3;
  pointer-events: none;
  text-align: left;
  line-height: ${({ theme }) => theme.rs?.(20, 'font')}px;
`

export default InfoRow
