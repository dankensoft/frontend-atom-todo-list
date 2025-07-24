import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../tasks/services/task.service';
import { Task } from '../../../models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskListComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <h2>Mis Tareas</h2>

      <form (ngSubmit)="addTask()" class="task-form">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Nueva tarea</mat-label>
          <input matInput [(ngModel)]="newTaskTitle" name="title" required />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">
          Agregar
        </button>
      </form>

      <app-task-list
        [tasks]="tasks"
        (doneToggled)="toggleDone($event)"
        (deleted)="deleteTask($event)">
      </app-task-list>
    </mat-card>
  `,
  styles: [`
    .task-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .full-width {
      width: 100%;
    }
  `]
})

export class TasksComponent {
  private taskService = inject(TaskService);
  tasks: Task[] = [];
  newTaskTitle = '';

  constructor() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask({ title: this.newTaskTitle }).then(() => {
        this.newTaskTitle = '';
      });
    }
  }

  toggleDone(task: Task) {
    this.taskService.updateTask(task.id!, { done: task.done });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
