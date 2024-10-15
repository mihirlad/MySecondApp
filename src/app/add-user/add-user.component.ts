import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.services'
import { Router } from '@angular/router';
import { Role } from '../Models/Role.Model';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  RoleList: Role[] = [];//[{ roleId: 0, roleName: '-- Select Role --', isActive: true }];
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getRoles();
    this.createForm();
  }

  // Create the form with validators
  createForm(): void {
   
    this.addUserForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
      UserName: ['', Validators.required],
      UserPassword: ['', [Validators.required, Validators.minLength(6)]],
      RoleId: ['', [Validators.required]],
      CompanyId: [localStorage.getItem('token_CompanyId')],
      RequestBy: [localStorage.getItem('token_UserId')],
    });
  }



  onSubmit(): void {
    console.log("requestData");
    if (this.addUserForm.valid) {
      const requestData = this.addUserForm.value;
      this.apiService.AddUser(requestData).subscribe(
        (response) => {
          if (response.status == "200") {
            this.router.navigate(['/Dashboard/User']);
          }
          else{
            this.errorMessage = response.message;
          }
        });
    }
  }
  
  getRoles(): void {

    const requestData = {
      "RequestBy": localStorage.getItem('token_UserId'),
      "CompanyId": localStorage.getItem('token_CompanyId')
    }
    this.apiService.RoleList(requestData).subscribe(
      (response) => {
        if (response.status == "200") {
          response.lstRoles.forEach((rle: any) => {
            this.RoleList.push(rle);
          });
        }
        else if (response.status == "300") {
          this.errorMessage = 'Roles Selection Data Not Found';
        }
        else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );

    //return this.userlist;
  }
}
