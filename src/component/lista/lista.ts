import { Component } from '@angular/core';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'lista-comp',
  imports: [],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  idCounter: number = 3;
  tareas: Tarea[] = [
    { id: 1, text: 'Repasar TypeScript', status: true },
    { id: 2, text: 'Practicar Angular', status: false },
    { id: 3, text: 'Subir cambios a GitHub', status: false },
  ];

  addTarea(text: string): void {
    if (text.trim() === '') {
      return;
    }

    this.idCounter++;
    let tempTask: Tarea = {
      id: this.idCounter,
      text: text.trim(),
      status: false,
    };
    this.tareas.push(tempTask);
  }

  toggleStatus(id: number): void {
    const tempTask = this.tareas.find((tarea) => tarea.id === id);

    tempTask ? (tempTask.status = !tempTask.status) : '';
  }
}
