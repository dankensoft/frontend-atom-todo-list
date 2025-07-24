import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() doneToggled = new EventEmitter<Task>();
  @Output() deleted = new EventEmitter<string>();

  toggleDone(task: Task) {
    this.doneToggled.emit(task);
  }

  deleteTask(id: string) {
    this.deleted.emit(id);
  }
}
