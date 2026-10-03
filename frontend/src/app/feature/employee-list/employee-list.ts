import { Component } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  imports: [DatePipe,JsonPipe],
  selector: 'app-employee-list',
  styleUrl: './employee-list.css',
  templateUrl: './employee-list.html',
})
export class EmployeeList {
    employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // this.getEmployees();
     this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('API DATA:', data);
        this.employees = data;
        console.log('EMPLOYEES:', this.employees);
      },
      error: (error) => {
        console.error('API ERROR:', error);
      }
    });
  }

  getEmployees(): void {
       this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('API DATA:', data);
        this.employees = data;
        console.log('EMPLOYEES:', this.employees);
      },
      error: (error) => {
        console.error('API ERROR:', error);
      }
    });
  
  }

  

}
