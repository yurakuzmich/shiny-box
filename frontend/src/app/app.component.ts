import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from './features/tasks/tasks.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { ErrorComponent } from './layout/error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TasksComponent, LoaderComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
