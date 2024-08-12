import { baseUrl } from 'constants/URLS'
import { Api } from 'lib/api'
import { Pagination } from 'types/models/Pagination'
import { CreateTodoModel, UpdateTodoModel } from 'types/models/TodoModel'
import { Todo } from 'types/Todo'
import { TodoList } from 'types/TodoList'

export class TodoService {
  constructor(private readonly api: Api) { }

  public async createTodo(data: CreateTodoModel): Promise<Todo> {
    return this.api.post('todo', data).then(x => x.data)
  }

  public async listTodo(pagination: Pagination): Promise<TodoList> {
    return this.api.get('todo', { params: pagination }).then(x => x.data)
  }

  public async updateTodo(data: UpdateTodoModel): Promise<Todo> {
    return this.api.patch('todo', data).then(x => x.data)
  }

  public async deleteTodo(id: string): Promise<Todo> {
    return this.api.delete(`todo/${id}`).then(x => x.data)
  }
}

const api = new Api(baseUrl)
export const todoService = new TodoService(api);
