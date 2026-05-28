import { Component, signal } from '@angular/core';
import { DigitalThorana } from './digital-thorana/digital-thorana';

@Component({
  selector: 'app-root',
  imports: [DigitalThorana],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('digital-thorana');
}
