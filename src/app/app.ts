import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task-service';
import { TaskForm } from './components/task-form/task-form';
import { TaskList } from './components/task-list/task-list';
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

  protected readonly currFilter = signal(TaskFilters.All);
  protected search = signal('');

  readonly tasksToRender = computed(() =>
    this.taskService.getTasks(this.search(), this.currFilter()),
  );

  /*
  tasksToRender(): Task[] {
    
    if (this.search !== '') {
      return this.taskService.getSearchedTasks(this.search);
    } else {
      return this.taskService.getFilteredTasks(this.currFilter);
    }
  }*/

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
    this.currFilter.set(selectedFilter);
  }

  updateSearch(updatedSearch: string): void {
    this.search.set(updatedSearch.trim().toLocaleLowerCase());
  }
}
