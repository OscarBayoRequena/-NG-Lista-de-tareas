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
  @Output() addTask = new EventEmitter<string>();
  @Output() changeFilter = new EventEmitter<TaskFilters>();

  taskInput: string = '';

  onSubmit(): void {
    this.onAdd(this.taskInput);
    this.taskInput = '';
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
