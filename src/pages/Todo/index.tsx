import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card } from './components/Card'
import styles from './Todo.module.scss'
import { Todo } from 'types/Todo'
import { todoService } from 'services/http/todoService'
import { UpdateTodoModel } from 'types/models/TodoModel'
import { useWindowResize } from 'hooks/useWindowResize'
import { CreateTodoCard } from './components/CreateTodoCard'
import { useLayoutContext } from 'components/layout/context/LayoutContext'
import { useDebounce } from 'hooks/useDebounce'
import { usePagination } from 'hooks/usePagination'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Loading } from 'components/shared/Loading'

interface TodoSeparation {
  favorites: Todo[]
  others: Todo[]
}

export function TodoPage() {
  const { width: windowWidth } = useWindowResize()
  const { searchTerm } = useLayoutContext()
  const { loading, changeParams, params, setData, data } = usePagination({
    fetcher: todoService.listTodo
  })
  const { data: todos, total } = data

  const { favorites, others } = useMemo(() => {
    return todos.reduce(
      (acc, todo) => {
        if (todo.isFavorite) {
          acc.favorites.push(todo)
        } else {
          acc.others.push(todo)
        }
        return acc
      },
      { favorites: [], others: [] } as TodoSeparation
    )
  }, [todos])

  const handleSearchTerm = () => {
    changeParams({
      term: searchTerm
    })
  }
  const searchTermDebounce = useDebounce({ delay: 500, fn: handleSearchTerm })

  useEffect(() => {
    if (searchTerm) searchTermDebounce()
  }, [searchTerm])

  const handleChangeTodoData = useCallback(
    async (data: UpdateTodoModel) => {
      try {
        const updatedTodo = await todoService.updateTodo(data)

        setData(
          todos.map(todo => {
            return todo._id === data.id ? updatedTodo : todo
          })
        )
      } catch (err: any) {
        toast.error(err.message)
      }
    },
    [todoService, setData, todos]
  )

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      try {
        await todoService.deleteTodo(id)
        setData(todos.filter(x => x._id !== id))
      } catch (err: any) { 
        toast.error(err.message)
      }
    },
    [todoService, setData, todos]
  )

  const handleAddTodo = (todo: Todo) => {
    setData([...todos, todo])
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className={styles.Todo}>
      <CreateTodoCard handleAddTodo={handleAddTodo} />
      <section role='grid' className={styles.cardBox}>
        {!!favorites.length && (
          <div>
            <h3 aria-description='Conjunto de todos marcadas como favoritas' tabIndex={0} className={styles.title}>Favoritas</h3>
            <section className={styles.todoGrid}>
              {favorites.map(todo => (
                <Card
                  windowWidth={windowWidth}
                  todo={todo}
                  onChangeData={handleChangeTodoData}
                  onDeleteTodo={handleDeleteTodo}
                  key={todo._id}
                  animationTo='down'
                />
              ))}
            </section>
          </div>
        )}
        {!!others.length && (
          <div>
            <h3 aria-description='Conjunto de todos' role='grid' tabIndex={0} className={styles.title}>Outras</h3>
            <section className={styles.todoGrid}>
              {others.map(todo => (
                <Card
                  windowWidth={windowWidth}
                  todo={todo}
                  onChangeData={handleChangeTodoData}
                  onDeleteTodo={handleDeleteTodo}
                  key={todo._id}
                  animationTo='top'
                />
              ))}
            </section>
          </div>
        )}
      </section>
      {total > params.size! && (
        <div className={styles.pagination}>
          <ReactPaginate
            pageCount={Math.ceil(total / params.size!)}
            onPageChange={({selected}) => changeParams({ page: selected})}
            breakLabel='...'
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            nextLabel={<ChevronRight />}
            previousLabel={<ChevronLeft />}
            containerClassName={styles.container}
            pageClassName={styles.page}
            activeClassName={styles.active}
            nextClassName={styles.next}
            previousClassName={styles.previous}
            activeLinkClassName={styles.activeLink}
          />
        </div>
      )}
    </div>
  )
}
