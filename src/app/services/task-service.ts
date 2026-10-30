import { computed, Injectable, signal, PLATFORM_ID, inject, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task } from '../models/task';
import { TaskFilters } from '../models/taskFilters';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /*private readonly _tasks = signal<Task[]>([
    { id: 1, text: 'Repasar TypeScript', done: true },
    { id: 2, text: 'Practicar Angular', done: false },
    { id: 3, text: 'Subir cambios a GitHub', done: false },
  ]);*/
  //
  private readonly platformId = inject(PLATFORM_ID);

  //Detecta el tipo de plataforma donde se ejecute esta aplicación
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  //private readonly _tasks = signal<Task[]>(this.retrieveTasks());
  //private nextId = Math.max(0, ...this.tasks().map((task) => task.id)) + 1;
  private readonly _tasks = signal<Task[]>([]);
  private nextId = 1;
  readonly isSaved = signal(false);

  constructor() {
    afterNextRender(() => {
      const tasks = this.retrieveTasks();
      this._tasks.set(tasks);
      this.nextId = Math.max(0, ...tasks.map((task) => task.id)) + 1;
    });
  }

  readonly tasks = this._tasks.asReadonly();
  readonly totalTasks = computed(() => this._tasks().length);
  readonly completedTasks = computed(() => this._tasks().filter((task) => task.done).length);
  readonly pendingTasks = computed(() => this._tasks().filter((task) => !task.done).length);

  private saveTimeout?: ReturnType<typeof setTimeout>;

  saveTasks(): void {
    //Protección porque el CLI ha creado en modo SSR (Server Side Rendering) el proyecto.
    //Entonces es como intentar acceder a localStorage en un servidor corriente: no existe.
    //Hay que forzar a que detecte que esta en un entorno de navegador y por tanto puede usar esa propiedad.
    if (!this.isBrowser) {
      return;
    }
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem('tasks', JSON.stringify(this._tasks()));
        this.isSaved.set(true);
      } catch (error) {
        console.error(error);
        this.isSaved.set(false);
      } finally {
        this.saveTimeout = undefined;
      }
    }, 1500);
  }
  retrieveTasks(): Task[] {
    //Protección porque el CLI ha creado en modo SSR (Server Side Rendering) el proyecto.
    //Entonces es como intentar acceder a localStorage en un servidor corriente: no existe.
    //Hay que forzar a que detecte que esta en un entorno de navegador y por tanto puede usar esa propiedad.
    if (!this.isBrowser) {
      this.isSaved.set(true);
      return [];
    }
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks === null) {
      const mockTasks: Task[] = [
        { id: 1, text: 'Repasar TypeScript', done: true },
        { id: 2, text: 'Practicar Angular', done: false },
        { id: 3, text: 'Subir cambios a GitHub', done: false },
      ];
      localStorage.setItem('tasks', JSON.stringify(mockTasks));
      this.isSaved.set(true);
      return mockTasks;
    }

    try {
      const tasks = JSON.parse(storedTasks);

      if (!Array.isArray(tasks)) {
        throw new Error("'El almacenamiento no contiene una lista de tareas'");
      }
      this.isSaved.set(true);
      return tasks as Task[];
    } catch {
      this.isSaved.set(true);
      return [];
    }
  }

  /*
  getSearchedTasks(query: string): Task[] {
    const tasks = this._tasks();

    return tasks.filter((task) => task.text.toLowerCase().includes(query.toLowerCase()));
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
  }*/

  //CRUD
  addTask(text: string): void {
    const sanitizedText = text.trim();

    if (!sanitizedText) {
      return;
    }
    const newTask: Task = { id: this.nextId++, text: sanitizedText, done: false };

    this._tasks.update((tasks) => [...tasks, newTask]);
    this.isSaved.set(false);
    this.saveTasks();
  }

  getTasks(query: string, filter: TaskFilters): Task[] {
    const tasks = this._tasks();
    let filteredTasks: Task[] = [];

    switch (filter) {
      case 'completed':
        filteredTasks = tasks.filter((task) => task.done);
        break;
      case 'pending':
        filteredTasks = tasks.filter((task) => !task.done);
        break;
      default:
        filteredTasks = tasks;
    }

    if (query !== '') {
      return filteredTasks.filter((task) => task.text.toLowerCase().includes(query));
    }
    return filteredTasks;
  }

  toggleDone(id: number): void {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
    this.isSaved.set(false);
    this.saveTasks();
  }

  removeTask(id: number): void {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    this.isSaved.set(false);
    this.saveTasks();
    //this.allTasks = this.allTasks.filter((tarea) => tarea.id !== id);
  }
}
