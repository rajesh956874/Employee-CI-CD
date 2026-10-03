import { Component, signal } from '@angular/core';
import { ReactiveFormsModule,Validators, FormBuilder } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './employee.service';
import { EmployeeList } from './feature/employee-list/employee-list';

@Component({
  imports: [RouterOutlet,ReactiveFormsModule,EmployeeList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  
  

  message = '';
employeeForm: any;
   constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      EmployeeName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required]
    });
  }

  addEmployee() {

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: () => {
        this.message = 'Employee added successfully!';
        this.employeeForm.reset();
      },
      error: (error) => {
        this.message = 'Failed to add employee';
        console.error(error);
      }
    });
  }

}
