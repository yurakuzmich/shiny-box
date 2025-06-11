import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Task } from '../interface';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

const API_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) { }

  getTasks(): Observable<ApiResponse> {
    this.loaderService.show();
    return this.http.get<ApiResponse>(`${API_URL}/tasks`).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  createTask(task: Partial<Task>): Observable<ApiResponse> {
    this.loaderService.show();
    return this.http.post<ApiResponse>(`${API_URL}/tasks`, task).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  updateTask(task: Partial<Task>): Observable<ApiResponse> {
    this.loaderService.show();
    return this.http.put<ApiResponse>(`${API_URL}/tasks/${task.id}`, task).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  deleteTask(id: string): Observable<ApiResponse> {
    this.loaderService.show();
    return this.http.delete<ApiResponse>(`${API_URL}/tasks/${id}`).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
