import { render, screen } from '@testing-library/react'
import  { userEvent } from '@testing-library/user-event'
import { Header } from '.'
import { ReactNode } from 'react'
import { LayoutProvider, useLayoutContext } from '../context/LayoutContext'

describe(Header.name, () => {
  const customRender = (children: ReactNode) => {
    <LayoutProvider>
      {children}
    </LayoutProvider> 
  }

  it('should render Header', () => {
    render(<Header />)

    expect(screen.getByRole('heading')).toBeTruthy()
  })

  it('should have search field', async () => {
    render(<Header />)

    const input = screen.getByRole('search')
    const textContent = 'Teste'

    await userEvent.type(input, textContent)

    expect(input).toHaveValue(textContent)
  })

})

