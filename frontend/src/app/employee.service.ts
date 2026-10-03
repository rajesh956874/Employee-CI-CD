
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  addEmployee(employee: any) {
    return this.http.post(this.apiUrl, employee);
  }

  getEmployees() {
  return this.http.get<any[]>(this.apiUrl);
}
}