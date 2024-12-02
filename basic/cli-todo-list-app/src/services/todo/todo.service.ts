import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoCreateDTO, TodoUpdateDTO } from '../../types/todo';
import { IStorage } from '../storage/storage.interface';

export class TodoService {
  constructor(private storage: IStorage<Todo>) {}

  async getAllTodos(): Promise<Todo[]> {
    return await this.storage.read();
  }
  async createTodo(dto: TodoCreateDTO): Promise<Todo> {
    const todos = await this.getAllTodos();

    const newTodo: Todo = {
      id: uuidv4(),
      title: dto.title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todos.push(newTodo);
    await this.storage.write(todos);

    return newTodo;
  }

  async updateTodo(id: string, dto: TodoUpdateDTO): Promise<Todo> {
    const todos = await this.getAllTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) throw new Error('Todo not found');

    const updatedTodo = {
      ...todos[todoIndex],
      ...dto,
      updatedAt: new Date(),
    };
    todos[todoIndex] = updatedTodo;
    await this.storage.write(todos);

    return updatedTodo;
  }

  async deleteTodo(id: string): Promise<void> {
    const todos = await this.getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);

    if (filteredTodos.length === todos.length) {
      throw new Error('Todo not found');
    }

    await this.storage.write(filteredTodos);
  }
}
