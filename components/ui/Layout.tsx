import React, { ReactNode } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`

const Content = styled.View`
  flex: 1;
  padding: 16px;
`

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Content>{children}</Content>
    </Container>
  </SafeAreaView>
)

export default Layout
