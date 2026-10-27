import { computed, Injectable, signal } from '@angular/core';
import { Task } from '../models/task';
import { TaskFilters } from '../models/taskFilters';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks = signal<Task[]>([
    { id: 1, text: 'Repasar TypeScript', done: true },
    { id: 2, text: 'Practicar Angular', done: false },
    { id: 3, text: 'Subir cambios a GitHub', done: false },
  ]);

  readonly tasks = this._tasks.asReadonly();
  readonly totalTasks = computed(() => this._tasks().length);
  readonly completedTasks = computed(() => this._tasks().filter((task) => task.done).length);
  readonly pendingTasks = computed(() => this._tasks().filter((task) => !task.done).length);

  private nextId = 4;

  //CRUD
  addTask(text: string): void {
    const sanitizedText = text.trim();

    if (!sanitizedText) {
      return;
    }
    const newTask: Task = { id: this.nextId++, text: sanitizedText, done: false };

    this._tasks.update((tasks) => [...tasks, newTask]);
  }

  getFilteredTasks(filter: TaskFilters): Task[] {
    const tasks = this._tasks();

    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.done);
      case 'pending':
        return tasks.filter((task) => !task.done);
      default:
        return tasks;
    }
  }

  toggleDone(id: number): void {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }

  removeTask(id: number): void {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));

    //this.allTasks = this.allTasks.filter((tarea) => tarea.id !== id);
  }
}
