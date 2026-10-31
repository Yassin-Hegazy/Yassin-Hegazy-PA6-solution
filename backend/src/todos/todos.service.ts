import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class TodosService {
  // Seed data (in memory, reset on every restart): a mix of done and open
  // todos so ?status=done and ?status=open filtering both show results.
  private todos = [
    { id: 1, title: 'Learn Next.js routing', done: true },
    { id: 2, title: 'Build the todo list page', done: false },
    { id: 3, title: 'Add a form to create todos', done: false },
    { id: 4, title: 'Read the NestJS docs', done: true },
  ];
  private id = 5;

  getAll() {
    return this.todos;
  }

  getOne(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(todo: any) {
    const title = typeof todo?.title === 'string' ? todo.title.trim() : '';
    if (!title) {
      throw new BadRequestException('title is required and must not be empty');
    }
    const newTodo = {
      id: this.id++,
      title,
      done: todo.done === true,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updatedTodo: any) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    // Both fields are optional, but if sent they must be valid. Validate
    // everything before changing anything, so a bad request never half-updates.
    const { title, done } = updatedTodo ?? {};
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      throw new BadRequestException('title must be a non-empty string');
    }
    if (done !== undefined && typeof done !== 'boolean') {
      throw new BadRequestException('done must be a boolean');
    }
    if (title !== undefined) {
      todo.title = title.trim();
    }
    if (done !== undefined) {
      todo.done = done;
    }
    return todo;
  }

  delete(id: number) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    this.todos.splice(index, 1);
    return { message: 'Todo deleted' };
  }
}
