import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../interface';
import { TaskStatusSelectorComponent } from '../../layout/task-status-selector/task-status-selector.component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskStatusSelectorComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [ApiService]
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<string>();
  @HostBinding('class.todo') isTodo = true;
  @HostBinding('class.in-progress') isInProgress = true;
  @HostBinding('class.done') isDone = true;

  isEditMode = false;

  editForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    dueDate: new FormControl('', [Validators.required])
  });

  get title() { return this.editForm.get('title'); }
  get description() { return this.editForm.get('description'); }
  get dueDate() { return this.editForm.get('dueDate'); }

  ngOnInit() {
    this.task.dueDate = new Date(this.task.dueDate).toLocaleDateString();
    this.isTodo = this.task.status === TaskStatus.ToDo;
    this.isInProgress = this.task.status === TaskStatus.InProgress;
    this.isDone = this.task.status === TaskStatus.Done;
  }

  constructor(private apiService: ApiService) {}

  onStatusChange(status: string) {
    console.log(this.task.id);
    this.task.status = status as TaskStatus;
    this.apiService.updateTask(this.task).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.isTodo = this.task.status === TaskStatus.ToDo;
        this.isInProgress = this.task.status === TaskStatus.InProgress;
        this.isDone = this.task.status === TaskStatus.Done;
      } else {
        console.log(res.message);
      }
    });
  }

  onTaskEdit() {
    this.isEditMode = true;
    const dueDate = new Date(this.task.dueDate);
    this.editForm.patchValue({
      title: this.task.title,
      description: this.task.description,
      dueDate: dueDate.toISOString().split('T')[0]
    });
  }

  onTaskEditSave() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      if (formValue.title && formValue.description && formValue.dueDate) {
        this.task = {
          ...this.task,
          title: formValue.title,
          description: formValue.description,
          dueDate: new Date(formValue.dueDate).toISOString()
        };
        this.apiService.updateTask(this.task).subscribe((res) => {
          console.log(res);
          if (res.success) {
            this.isEditMode = false;
            this.task = res.data;
            this.task.dueDate = new Date(this.task.dueDate).toLocaleDateString();
          } else {
            console.log(res.message);
          }
        });
      }
    }
  }

  onTaskDelete() {
    this.apiService.deleteTask(this.task.id).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.taskDeleted.emit(this.task.id);
      } else {
        console.log(res.message);
      }
    });
  }
}
