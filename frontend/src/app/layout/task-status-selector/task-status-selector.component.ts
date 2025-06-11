import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskStatus } from '../../interface/task.interface';

@Component({
  selector: 'app-task-status-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-status-selector.component.html',
  styleUrl: './task-status-selector.component.scss'
})
export class TaskStatusSelectorComponent {
  @Input() currentStatus: string = TaskStatus.ToDo;
  @Output() statusChange = new EventEmitter<string>();

  statuses = Object.values(TaskStatus);
  selectedStatus = this.currentStatus;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentStatus']) {
      this.selectedStatus = this.currentStatus;
    }
  }

  onStatusChange() {
    console.log(this.selectedStatus);
    this.statusChange.emit(this.selectedStatus);
  }
}
