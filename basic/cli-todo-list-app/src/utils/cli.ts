import chalk from 'chalk';
import readline from 'readline';
import { Todo } from '@/types/todo';

export class CLI {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async question(query: string): Promise<string> {
    return new Promise(resolve => {
      this.rl.question(chalk.cyan(query), resolve);
    });
  }

  displayTodos(todos: Todo[]): void {
    if (todos.length === 0) {
      console.log(chalk.yellow('\nNo hay tareas pendientes'));
      return;
    }
    console.log(chalk.blue('\n📋 Lista de Tareas:'));
    console.log(chalk.blue('=================='));

    todos.forEach(todo => {
      const checkbox = todo.completed ? chalk.green('✓') : chalk.red('✗');
      const status = todo.completed
        ? chalk.green('COMPLETADO')
        : chalk.yellow('PENDIENTE');
      const title = todo.completed
        ? chalk.gray(todo.title)
        : chalk.white(todo.title);
      const date = chalk.gray(new Date(todo.createdAt).toLocaleDateString());

      console.log(`${checkbox} [${status}] ${title} (${date})`);
    });
  }

  displayMenu(): void {
    console.log(chalk.blue('\n🔵 Menú Principal:'));
    console.log(chalk.white('1.'), chalk.green('Ver todas las tareas'));
    console.log(chalk.white('2.'), chalk.green('Agregar nueva tarea'));
    console.log(chalk.white('3.'), chalk.green('Marcar tarea como completada'));
    console.log(chalk.white('4.'), chalk.green('Eliminar tarea'));
    console.log(chalk.white('5.'), chalk.red('Salir'));
  }
  displayError(message: string): void {
    console.log(chalk.red(`\n❌ Error: ${message}`));
  }

  displaySuccess(message: string): void {
    console.log(chalk.green(`\n✅ Éxito: ${message}`));
  }

  displayWarning(message: string): void {
    console.log(chalk.yellow(`\n⚠️  Advertencia: ${message}`));
  }
  displayWelcome(): void {
    console.log(chalk.blue('\n👋 ¡Bienvenido!\n'));
  }

  clear(): void {
    console.clear();
  }

  close(): void {
    console.log(chalk.blue('\n👋 ¡Hasta luego!\n'));
    this.rl.close();
    process.exit(0);
  }
}
