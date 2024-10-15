import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup; 
  errorMessage: string = '';

  constructor(private formBuilder:FormBuilder,private router:Router,private apiService:ApiService){
    this.loginForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
   }

  
  onSubmit() {   
    if (this.loginForm.valid) {  
      const requestData={
        "emailId": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
      this.apiService.LoginAuthetication(requestData).subscribe(
        (response) => {
         
          if(response.status=="200")
          {
            localStorage.setItem('token_EmailId', response.emailId);
            localStorage.setItem('token_UserId', response.userId);
            localStorage.setItem('token_CompanyId', response.companyId);
            this.router.navigate(['/Dashboard']);
          }
          else if(response.status=="300")
          {
            this.errorMessage = 'Invalid email or password. Please try again.';
          }
          else
          {
            this.errorMessage =response.message;
          }
        },
        (error) => {
          console.error('API Error:', error);
        }

      );

      
      // if(this.loginForm.value.email=='mihir@gmail.com' && this.loginForm.value.password=='123')
      // {
      //   localStorage.setItem('token', this.loginForm.value.email);
      //   this.router.navigate(['/Dashboard']);
      // }
      // else
      // {
      //   this.errorMessage = 'Invalid email or password. Please try again.';
      // }
      // Further processing
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }

  }
}
