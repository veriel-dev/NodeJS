import { FileStorage } from './services/storage/file-storage';
import { TodoService } from './services/todo/todo.service';
import { CLI } from './utils/cli';
import { Todo } from './types/todo';
import { Command } from './types/commands';

class TodoApp {
  private cli: CLI;
  private todoService: TodoService;

  constructor() {
    const storage = new FileStorage<Todo>('todos.json');
    this.todoService = new TodoService(storage);
    this.cli = new CLI();
  }

  private async handleViewTodos(): Promise<void> {
    const todos = await this.todoService.getAllTodos();
    this.cli.displayTodos(todos);
  }
  private async handleCreateTodo(): Promise<void> {
    const title = await this.cli.question('📝 Ingrese el título de la tarea: ');

    if (!title.trim()) {
      this.cli.displayError('El título no puede estar vacío');
      return;
    }

    try {
      await this.todoService.createTodo({ title: title.trim() });
      this.cli.displaySuccess('Tarea creada exitosamente');
    } catch (error) {
      this.cli.displayError(
        `Error al crear la tarea: ${(error as Error).message}`,
      );
    }
  }
  private async handleToggleTodo(): Promise<void> {
    const todos = await this.todoService.getAllTodos();
    if (todos.length === 0) {
      this.cli.displayWarning('No hay tareas para marcar como completadas');
      return;
    }

    this.cli.displayTodos(todos);
    const id = await this.cli.question(
      '🎯 Ingrese el ID de la tarea a modificar: ',
    );
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      this.cli.displayError('ID de tarea inválido');
      return;
    }
    try {
      await this.todoService.updateTodo(id, { completed: !todo.completed });
      this.cli.displaySuccess(
        `Tarea marcada como ${todo.completed ? 'pendiente' : 'completada'}`,
      );
    } catch (error) {
      this.cli.displayError(
        `Error al actualizar la tarea: ${(error as Error).message}`,
      );
    }
  }
  private async handleDeleteTodo(): Promise<void> {
    const todos = await this.todoService.getAllTodos();
    if (todos.length === 0) {
      this.cli.displayWarning('No hay tareas para eliminar');
      return;
    }

    this.cli.displayTodos(todos);
    const id = await this.cli.question(
      '🗑️  Ingrese el ID de la tarea a eliminar: ',
    );

    try {
      await this.todoService.deleteTodo(id);
      this.cli.displaySuccess('Tarea eliminada exitosamente');
    } catch (error) {
      this.cli.displayError(
        `Error al eliminar la tarea: ${(error as Error).message}`,
      );
    }
  }
  private async handleCommand(command: Command): Promise<boolean> {
    switch (command) {
      case Command.ViewTodos:
        await this.handleViewTodos();
        break;
      case Command.CreateTodo:
        await this.handleCreateTodo();
        break;
      case Command.ToggleTodo:
        await this.handleToggleTodo();
        break;
      case Command.DeleteTodo:
        await this.handleDeleteTodo();
        break;
      case Command.Exit:
        return false;
      default:
        this.cli.displayError('Comando inválido');
    }
    return true;
  }
  public async start(): Promise<void> {
    this.cli.clear();
    this.cli.displayWelcome();

    let running = true;
    while (running) {
      try {
        this.cli.displayMenu();
        const input = await this.cli.question('Seleccione una opción (1-5): ');
        const command = parseInt(input) as Command;
        running = await this.handleCommand(command);
      } catch (error) {
        this.cli.displayError(`Error inesperado: ${(error as Error).message}`);
        running = true;
      }
    }
    this.cli.close();
  }
}

const app = new TodoApp();
app.start().catch(error => {
  console.error('Error fatal en la aplicación:', error);
  process.exit(1);
});
