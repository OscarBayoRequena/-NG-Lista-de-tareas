import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskFilters } from '../../models/taskFilters';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  @Input() filter: TaskFilters = TaskFilters.All;
  @Input() search: string = '';
  @Output() addTask = new EventEmitter<string>();
  @Output() changeFilter = new EventEmitter<TaskFilters>();
  @Output() updateSearch = new EventEmitter<string>();

  taskInput: string = '';
  searchInput: string = '';

  onSubmit(): void {
    this.onAdd(this.taskInput);
    this.taskInput = '';
  }

  onSearch(currSearch: string) {
    this.updateSearch.emit(currSearch);
    this.searchInput = currSearch;
  }
  onAdd(input: string) {
    this.addTask.emit(input);
  }
  onFilter(selectedFilter: string) {
    let filter: TaskFilters;
    switch (selectedFilter) {
      case 'completed':
        filter = TaskFilters.Completed;
        break;
      case 'remaining':
        filter = TaskFilters.Pending;
        break;
      default:
        filter = TaskFilters.All;
    }
    this.changeFilter.emit(filter);
  }
}
