import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Lista } from '../component/lista/lista';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Lista],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('01-mi-primera-app');
  nombre: string = 'Pablito';
  clavitos: number = 0;

  increaseClavitos(): void {
    this.clavitos++;
  }
  decreaseClavitos(): void {
    this.clavitos > 0 ? this.clavitos-- : alert('Ché pibe, no hay clavos que pueda sacar');
  }
}
