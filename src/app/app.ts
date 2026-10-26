import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskForm } from './component/task-form/task-form';
import { TaskList } from './component/task-list/task-list';

import { Task } from './models/task';
import { TaskFilters } from './models/taskFilters';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskForm, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('01-mi-primera-app');

  allTasks: Task[] = [
    { id: 1, text: 'Repasar TypeScript', done: true },
    { id: 2, text: 'Practicar Angular', done: false },
    { id: 3, text: 'Subir cambios a GitHub', done: false },
  ];
  idCounter = Math.max(0, ...this.allTasks.map((task) => task.id));
  currFilter: TaskFilters = TaskFilters.All;

  get filteredTasks(): Task[] {
    switch (this.currFilter) {
      case 'completed':
        return this.allTasks.filter((tarea) => tarea.done);
      case 'pending':
        return this.allTasks.filter((tarea) => !tarea.done);
      default:
        return this.allTasks;
    }
  }

  get completedTasks(): number {
    return this.allTasks.filter((tarea) => tarea.done).length;
  }

  get pendingTasks(): number {
    return this.allTasks.filter((task) => !task.done).length;
  }

  //CRUD
  addTask(text: string): void {
    if (text.trim() === '') {
      return;
    }

    this.idCounter++;
    const tempTask: Task = {
      id: this.idCounter,
      text: text.trim(),
      done: false,
    };
    this.allTasks.push(tempTask);
  }

  removeTask(id: number): void {
    this.allTasks = this.allTasks.filter((tarea) => tarea.id !== id);
  }

  toggleDone(id: number): void {
    const tempTask = this.allTasks.find((tarea) => tarea.id === id);

    if (tempTask) {
      tempTask.done = !tempTask.done;
    }
  }

  //View management
  changeFilter(selectedFilter: TaskFilters): void {
    this.currFilter = selectedFilter;
  }
}
