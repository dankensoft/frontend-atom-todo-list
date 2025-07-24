export interface Task {
  id?: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  userId: string;
}
