import { IconSymbol } from '@/components/atoms/IconSymbol'
import { BottomFlightModal } from '@/components/molecules'
import { Layout } from '@/components/organisms'
import { useFlightBySegmentCode } from '@/hooks/useFlightBySegmentCode'
import { AppTheme } from '@/types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions, Image, TouchableOpacity } from 'react-native'
import styled, { useTheme } from 'styled-components'

export const Details = () => {
  const theme = useTheme() as AppTheme
  const router = useRouter()
  const params = useLocalSearchParams() as { id: string }

  const { data: flight, isLoading, isError } = useFlightBySegmentCode(params.id)

  const handleBackPress = () => {
    router.back()
  }

  return (
    <Layout statusBarTranslucent safeAreaEdges={['bottom']}>
      <StyledBackground source={require('@/assets/images/beach-background.jpg')} />
      <StyledBackButton onPress={handleBackPress}>
        <IconSymbol name="chevron.left" color={theme.colors.textPrimary} />
      </StyledBackButton>
      <BottomFlightModal
        isVisible={true}
        flight={flight}
        loading={isLoading}
        error={isError}
        onClose={() => {}}
      />
    </Layout>
  )
}

const StyledBackground = styled(Image)`
  width: 100%;
  height: ${Dimensions.get('window').height}px;
  object-fit: cover;
  z-index: 0;
`
const StyledBackButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg * 3}px;
  left: 20px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.circle}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px;
`
