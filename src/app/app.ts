import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task-service';
import { TaskForm } from './components/task-form/task-form';
import { TaskList } from './components/task-list/task-list';

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
  protected readonly taskService = inject(TaskService);

  currFilter: TaskFilters = TaskFilters.All;

  get filteredTasks(): Task[] {
    return this.taskService.getFilteredTasks(this.currFilter);
  }

  addTask(text: string): void {
    this.taskService.addTask(text);
  }

  removeTask(id: number): void {
    this.taskService.removeTask(id);
  }

  toggleDone(id: number): void {
    this.taskService.toggleDone(id);
  }

  //View management
  changeFilter(selectedFilter: TaskFilters): void {
    this.currFilter = selectedFilter;
  }
}
