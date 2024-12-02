import { TodoService } from "../../services/todo/todo.service";
import { IStorage } from "../../services/storage/storage.interface";
import { Todo } from "../../types/todo";

class MockStorage implements IStorage<Todo> {
  private data: Todo[] = [];
  async read(): Promise<Todo[]> {
    return this.data;
  }
  async write(data: Todo[]): Promise<void> {
    this.data = data;
  }
}

describe("TodoService", () => {
  let todoService: TodoService;
  let storage: MockStorage;
  beforeEach(() => {
    storage = new MockStorage();
    todoService = new TodoService(storage);
  });
  it("should create a new todo", async () => {
    const todoData = { title: "Test todo" };
    const todo = await todoService.createTodo(todoData);

    expect(todo.title).toBe(todoData.title);
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeDefined();

    const todos = await todoService.getAllTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual(todo);
  });
  it("should update a todo", async () => {
    const todo = await todoService.createTodo({ title: "Test todo" });
    const updatedTodo = await todoService.updateTodo(todo.id, {
      title: "Updated todo",
      completed: true,
    });
    expect(updatedTodo.title).toBe("Updated todo");
    expect(updatedTodo.completed).toBe(true);
    expect(updatedTodo.id).toBe(todo.id);
  });
  it("should throw error when updating non-existent todo", async () => {
    await expect(
      todoService.updateTodo("non-existent-id", { title: "Updated todo" }),
    ).rejects.toThrow("Todo not found");
  });
  it("should delete a todo", async () => {
    const todo = await todoService.createTodo({ title: "Test todo" });
    await todoService.deleteTodo(todo.id);

    const todos = await todoService.getAllTodos();
    expect(todos).toHaveLength(0);
  });
});
