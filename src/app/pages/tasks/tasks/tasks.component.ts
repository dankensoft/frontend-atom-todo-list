import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../tasks/services/task.service';
import { Task } from '../../../models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListComponent],
  template: `
    <h2>Mis Tareas</h2>

    <form (ngSubmit)="addTask()">
      <input type="text" [(ngModel)]="newTaskTitle" name="title" required placeholder="Nueva tarea" />
      <button type="submit">Agregar</button>
    </form>

    <app-task-list
      [tasks]="tasks"
      (doneToggled)="toggleDone($event)"
      (deleted)="deleteTask($event)">
    </app-task-list>
  `
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
