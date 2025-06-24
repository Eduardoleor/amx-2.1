// app/(tabs)/index.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { Platform } from 'react-native'
import HomeScreen from './index'
import { jest } from '@jest/globals'

// Mock custom components
jest.mock('@/components/HelloWave', () => ({
  HelloWave: () => 'HelloWaveMock',
}))

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: 'ImageMock',
}))

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders welcome message and HelloWave component', () => {
    render(<HomeScreen />)

    expect(screen.getByText('Welcome!')).toBeTruthy()
    expect(screen.getByText('HelloWaveMock')).toBeTruthy()
  })

  it('renders step containers with correct content', () => {
    render(<HomeScreen />)

    const steps = screen.getAllByText(/Step \d:/)
    expect(steps).toHaveLength(3)

    expect(screen.getByText('Step 1: Try it')).toBeTruthy()
    expect(screen.getByText('Step 2: Explore')).toBeTruthy()
    expect(screen.getByText('Step 3: Get a fresh start')).toBeTruthy()
  })

  it('displays correct platform-specific shortcut', () => {
    render(<HomeScreen />)

    const expectedShortcut = Platform.select({
      ios: 'cmd + d',
      android: 'cmd + m',
      web: 'F12',
    })

    expect(screen.getByText(expectedShortcut!)).toBeTruthy()
  })

  it('renders all text content correctly', () => {
    render(<HomeScreen />)

    expect(screen.getByText('Edit app/(tabs)/index.tsx to see changes.')).toBeTruthy()

    expect(
      screen.getByText(
        "Tap the Explore tab to learn more about what's included in this starter app."
      )
    ).toBeTruthy()

    expect(
      screen.getByText("When you're ready, run npm run reset-project to get a fresh app directory.")
    ).toBeTruthy()
  })

  it('renders semi-bold text elements correctly', () => {
    render(<HomeScreen />)

    const semiBoldTexts = [
      'app/(tabs)/index.tsx',
      'cmd + d',
      'cmd + m',
      'F12',
      'npm run reset-project',
      'app',
      'app-example',
    ]

    semiBoldTexts.forEach((text) => {
      // Since we're not testing styles, just verify content exists
      expect(screen.getByText(text)).toBeTruthy()
    })
  })
})
