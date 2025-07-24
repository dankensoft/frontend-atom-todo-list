import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  docData,
  query,
  where
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private tasksRef = collection(this.firestore, 'tasks');

  getUserId(): string | null {
    return this.auth.currentUser?.uid ?? null;
  }

  getTasks(): Observable<Task[]> {
    const uid = this.getUserId();
    const q = query(this.tasksRef, where('userId', '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Partial<Task>) {
    const uid = this.getUserId();
    return addDoc(this.tasksRef, {
      ...task,
      done: false,
      userId: uid,
      createdAt: new Date()
    });
  }

  updateTask(id: string, data: Partial<Task>) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return updateDoc(docRef, data);
  }

  deleteTask(id: string) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(docRef);
  }

  getTaskById(id: string): Observable<Task> {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Task>;
  }
}
