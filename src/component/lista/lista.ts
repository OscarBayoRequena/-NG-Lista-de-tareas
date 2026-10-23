import { Component } from '@angular/core';
import { Tarea } from '../../models/tarea';
enum FiltroTareas {
  Todas = 'all',
  Completadas = 'completed',
  Pendientes = 'remaining',
}
@Component({
  selector: 'lista-comp',
  imports: [],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  idCounter: number = 3;
  tareaInput: string = '';
  tareas: Tarea[] = [
    { id: 1, text: 'Repasar TypeScript', status: true },
    { id: 2, text: 'Practicar Angular', status: false },
    { id: 3, text: 'Subir cambios a GitHub', status: false },
  ];
  currFilter: FiltroTareas = FiltroTareas.Todas;
  get tareasFiltradas(): Tarea[] {
    switch (this.currFilter) {
      case 'completed':
        return this.tareas.filter((tarea) => tarea.status);
      case 'remaining':
        return this.tareas.filter((tarea) => !tarea.status);
      default:
        return this.tareas;
    }
  }

  //CRUD
  addTarea(text: string): void {
    if (text.trim() === '') {
      return;
    }

    this.idCounter++;
    const tempTask: Tarea = {
      id: this.idCounter,
      text: text.trim(),
      status: false,
    };
    this.tareas.push(tempTask);
  }

  removeTarea(id: number): void {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
  }

  toggleStatus(id: number): void {
    const tempTask = this.tareas.find((tarea) => tarea.id === id);

    if (tempTask) {
      tempTask.status = !tempTask.status;
    }
  }

  //Data
  remainingTareas(): number {
    return this.tareas.filter((tarea) => !tarea.status).length;
  }

  completedTareas(): number {
    return this.tareas.filter((tarea) => tarea.status).length;
  }

  //View management
  changeFilter(selectedFilter: string): void {
    switch (selectedFilter) {
      case 'completed':
        this.currFilter = FiltroTareas.Completadas;
        break;
      case 'remaining':
        this.currFilter = FiltroTareas.Pendientes;
        break;
      default:
        this.currFilter = FiltroTareas.Todas;
    }
  }

  onSubmit(): void {
    this.addTarea(this.tareaInput);
    this.tareaInput = '';
  }
}
