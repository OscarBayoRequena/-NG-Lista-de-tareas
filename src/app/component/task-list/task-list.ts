import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../models/task';
@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Output() toggleTask = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();

  onToggle(id: number) {
    this.toggleTask.emit(id);
  }
  onDelete(id: number) {
    this.deleteTask.emit(id);
  }
}
