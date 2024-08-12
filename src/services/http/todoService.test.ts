import { Api } from 'lib/api'
import { TodoService } from './todoService'
import { Pagination } from 'types/models/Pagination'
import { AxiosResponse } from 'axios'
import { CreateTodoModel, UpdateTodoModel } from 'types/models/TodoModel'

jest.mock('lib/api.ts')

const ApiMock = Api as jest.Mock<Api>

describe(TodoService.name, () => {
  let todoService!: TodoService
  let apiMock!: jest.Mocked<Api>

  beforeEach(() => {
    const api = new ApiMock() as jest.Mocked<Api>

    todoService = new TodoService(api)
    apiMock = api
  })

  it(`should pass params to get when ${TodoService.prototype.listTodo.name} is called`, async () => {
    const params: Pagination = {
      page: 0,
      size: 10
    }

    apiMock.get.mockResolvedValue({ data: [] } as AxiosResponse)
    await todoService.listTodo(params)

    expect(apiMock.get).toHaveBeenCalledWith('todo', { params })
  })

  it(`should return data and total when ${TodoService.prototype.listTodo.name} is called`, async () => {
    const params: Pagination = {
      page: 0,
      size: 10
    }

    const response = {
      data: [],
      total: 0
    }

    apiMock.get.mockResolvedValue({ data: response } as AxiosResponse)
    const result = await todoService.listTodo(params)

    expect(result).toEqual(response)
  })


  it(`should return the updated todo when ${TodoService.prototype.updateTodo.name} is called`, async () => {
    const response: UpdateTodoModel = {
      id: 'teste',
      title: 'Teste'
    } 

    apiMock.patch.mockResolvedValue({ data: response } as AxiosResponse)
    const result = await todoService.updateTodo(response)

    expect(result).toEqual(response)
  })


  it(`should return the new todo when ${TodoService.prototype.createTodo.name} is called`, async () => {
    const response: CreateTodoModel = {
      title: 'Teste',
      description: 'TESTANDO'
    } 

    apiMock.post.mockResolvedValue({ data: response } as AxiosResponse)
    const result = await todoService.createTodo(response)

    expect(result).toEqual(response)
  })


  it(`should return the deleted todo when ${TodoService.prototype.deleteTodo.name} is called`, async () => {
    const response: CreateTodoModel = {
      title: 'Teste',
      description: 'TESTANDO'
    } 

    apiMock.delete.mockResolvedValue({ data: response } as AxiosResponse)
    const result = await todoService.deleteTodo('id')

    expect(result).toEqual(response)
  })

})
