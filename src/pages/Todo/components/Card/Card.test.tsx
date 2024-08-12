import { render, screen } from '@testing-library/react'
import { Card } from '.'
import { todoMock, todoMock2 } from '__mock__/todoMock'

type CardProps = Partial<Parameters<typeof Card>[0]>

describe(Card.name, () => {
  const DefaultCard = (props: CardProps = {} as CardProps) =>
    <Card
      todo={todoMock}
      onChangeData={jest.fn()}
      onDeleteTodo={jest.fn()}
      windowWidth={1024}
      animationTo="top"
      {...props}
    />

  it('should render component', () => {
    render(DefaultCard())
    
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should be on favorites if todo is favorie', () => {
    const { container } = render(DefaultCard({ todo: todoMock2 }))

    const star = container.querySelector('[aria-label="remover dos favoritos"]')
    expect(star).toBeInTheDocument()
  })

  it('should be on favorites if todo is favorie', () => {
    const todoMock3 = {
      ...todoMock
    }
    const handleChangeData = () => {
      todoMock3.isFavorite = true
    }
    const { container, debug } = render(DefaultCard({ todo: todoMock3 }))

    handleChangeData()

    debug()

    const star = container.querySelector('[aria-label="remover dos favoritos"]')
    expect(star).toBeInTheDocument()
  })
})
