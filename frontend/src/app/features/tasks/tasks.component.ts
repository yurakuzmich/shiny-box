import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiResponse, Task } from '../../interface';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { CreateTaskFormComponent } from '../../layout/create-task-form/create-task-form.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, CreateTaskFormComponent, TaskComponent],
  providers: [ApiService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  tasks: Task[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTasks().subscribe((response: ApiResponse) => {
      this.tasks = response.data;
      console.log(this.tasks);
    });
  }

  onTaskCreate(task: Task) {
    this.apiService.createTask(task).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.tasks.push(res.data);
      } else {
        console.log(res.message);
      }
    });
  }

  onTaskDeleted(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
