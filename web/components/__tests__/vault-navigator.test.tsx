import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { VaultNavigator } from '../vault-navigator'

describe('VaultNavigator', () => {
  it('renders vault folder buttons', () => {
    render(<VaultNavigator />)
    expect(screen.getByText('Areas')).toBeDefined()
    expect(screen.getByText('Projects')).toBeDefined()
    expect(screen.getByText('HQ')).toBeDefined()
  })

  it('displays folder names', () => {
    render(<VaultNavigator />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(5)
  })
})

