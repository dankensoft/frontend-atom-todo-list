import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../tasks/services/task.service';
import { Task } from '../../../models/task.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);

  form!: FormGroup;
  isEdit = false;
  taskId!: string;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      completed: [false]
    });

    // Detectar si es edición
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.taskId = id;
          this.isEdit = true;
          return this.taskService.getTaskById(id);
        }
        return of(null);
      })
    ).subscribe(task => {
      if (task) this.form.patchValue(task);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const taskData: Task = this.form.value;

    if (this.isEdit) {
      this.taskService.updateTask(this.taskId, taskData).then(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.addTask(taskData).then(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
