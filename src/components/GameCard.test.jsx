import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import GameCard from './GameCard'

describe('GameCard', () => {

  test('shows the "flipped" class when isFlipped is true', () => {
    const card = { value: '🍎', isFlipped: true, isMatched: false }
    render(<GameCard card={card} onCardClick={() => {}} />)

    const cardElement = screen.getByText('🍎').closest('.card')
    expect(cardElement).toHaveClass('flipped')
  })

  test('does NOT show the "flipped" class when isFlipped is false', () => {
    const card = { value: '🍎', isFlipped: false, isMatched: false }
    render(<GameCard card={card} onCardClick={() => {}} />)

    const cardElement = screen.getByText('🍎').closest('.card')
    expect(cardElement).not.toHaveClass('flipped')
  })

})