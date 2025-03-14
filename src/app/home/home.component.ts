import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="home-container">
      <h1>Welcome to Angular Firebase Messages</h1>
      <p>This application demonstrates Angular 19 with NGRX, Firebase integration, and Angular Material.</p>
      <div class="action-buttons">
        <a mat-raised-button color="primary" routerLink="/messages">View Messages</a>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    
    h1 {
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      color: rgba(0, 0, 0, 0.7);
    }
    
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  `]
})
export class HomeComponent {}
