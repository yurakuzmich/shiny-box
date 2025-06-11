import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss'
})
export class CreateTaskFormComponent {
  @Output() taskCreated = new EventEmitter<Task>();

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    dueDate: new FormControl('', [
      Validators.required
    ])
  });

  get title() { return this.form.get('title'); }

  get description() { return this.form.get('description'); }

  get dueDate() { return this.form.get('dueDate'); }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Form is valid');
      const formValue = this.form.value;
      if (formValue.dueDate) {
        formValue.dueDate = new Date(formValue.dueDate).toISOString();
      }
      this.taskCreated.emit(formValue as Task);
      this.form.reset();
    }
  }
}
