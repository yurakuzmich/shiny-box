import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessage = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessage.asObservable();

  show(message: string) {
    this.errorMessage.next(message);
  }

  hide() {
    this.errorMessage.next(null);
  }
}
