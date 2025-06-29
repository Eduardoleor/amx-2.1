import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { IconSymbol } from '@/components/atoms/IconSymbol'
import { SegmentedControl } from '@/components/atoms/SegmentedControl'
import { Text } from '@/components/atoms/Text'
import { Header } from '@/components/organisms/Header'
import { Layout } from '@/components/organisms/Layout'
import { useState } from 'react'

export default function SearchScreen() {
  const [selectedFilter, setSelectedFilter] = useState(0)

  return (
    <Layout backgroundColor="accent">
      <Header buttonTheme title="Track your flight" description="Keep you informed in real time!" />
      <Text variant="heading1">Título Principal</Text>
      <Text variant="body" color="status.ontime" align="center" weight="500" letterSpacing={0.5}>
        Texto personalizado
      </Text>
      <Text variant="button" color="actionable.primary">
        Botón Importante
      </Text>
      <IconSymbol name="house.fill" size={90} color={'red'} />
      <Button title="Botón de búsqueda" />
      <Button
        variant="primary"
        size="md"
        title="Presionar"
        onPress={() => console.log('Botón presionado')}
        iconLeft="checkmark"
        haptic
      />
      <SegmentedControl
        options={['Todos', 'Activos', 'Completados']}
        selectedIndex={selectedFilter}
        onSelect={setSelectedFilter}
        style={{ marginVertical: 16 }}
      />
      <Card elevated={false} borderColor="primary">
        <Text>Card con borde</Text>
      </Card>
      <Card animationType="scale" onPress={() => console.log('Card presionada')}>
        <Text>Card con animación</Text>
      </Card>
    </Layout>
  )
}
