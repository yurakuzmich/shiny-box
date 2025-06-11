import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-overlay" *ngIf="errorMessage$ | async as message">
      <div class="error-container">
        <div class="error-message">{{ message }}</div>
        <button class="close-button" (click)="closeError()">×</button>
      </div>
    </div>
  `,
  styles: [`
    .error-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      pointer-events: auto;
    }

    .error-container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: relative;
      min-width: 300px;
      max-width: 80%;
      z-index: 10001;
    }

    .error-message {
      color: #d32f2f;
      font-size: 16px;
      margin-right: 30px;
      word-wrap: break-word;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 0;
      line-height: 1;
      z-index: 10002;
    }

    .close-button:hover {
      color: #333;
    }
  `]
})
export class ErrorComponent {
  errorMessage$ = this.errorService.errorMessage$;

  constructor(private errorService: ErrorService) {}

  closeError() {
    this.errorService.hide();
  }
}
