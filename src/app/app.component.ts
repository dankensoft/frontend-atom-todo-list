import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'atom-challenge-fe-template';
  auth = inject(Auth);

  constructor() {
    console.log('User:', this.auth.currentUser);
  }
}
