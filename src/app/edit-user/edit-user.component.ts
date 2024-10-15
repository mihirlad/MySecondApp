import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.services'
import { ActivatedRoute } from '@angular/router';
import { Role } from '../Models/Role.Model';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  RoleList: Role[] = [];//[{ roleId: 0, roleName: '-- Select Role --', isActive: true }];
  errorMessage: string = '';
  userId: number = 0;
  password: string = '';
  active: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.userId = (history.state.userId || 0);

    this.getRoles();
    //this.EditForm();
    //this.userId = +(this.router.snapshot.paramMap.get('userId') || 0);

    const requestData = {
      "RequestBy": localStorage.getItem('token_UserId'),
      "CompanyId": localStorage.getItem('token_CompanyId'),
      "UserId": this.userId,
    }
    this.apiService.UserById(requestData).subscribe(
      (response) => {
        if (response.status == "200") {
          this.EditForm(response.userData.userPassword, response.userData.isActive);
          this.fillUserData(response.userData);

        }
        else {
          this.errorMessage = response.message;

        }
      });

    this.EditForm(this.password, this.active);
  }

  EditForm(password: string, active: boolean): void {

    this.editUserForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
      UserName: ['', Validators.required],
      RoleId: ['', [Validators.required]],
      CompanyId: [localStorage.getItem('token_CompanyId')],
      RequestBy: [localStorage.getItem('token_UserId')],
      UserId: [(this.userId === 0 ? '' : this.userId), [Validators.required]],
      UserPassword: [password],
      IsActive: [active],
    });
  }

  fillUserData(user: User): void {

    this.editUserForm.patchValue({
      FirstName: user.firstName,
      LastName: user.lastName,
      EmailId: user.emailId,
      UserName: user.userName,
      RoleId: user.roleId  // Assuming user.roleId is the ID of the selected role
    });
  }

  onSubmit(): void {
    console.log(this.editUserForm.value);
    if (this.editUserForm.valid) {
      const requestData = this.editUserForm.value;

      // Call service to update user data via API
      this.apiService.UpdateUser(requestData).subscribe(response => {
        // if (response.status == "200") {
        //   this.router.navigate(['/Dashboard/User']);
        // }
        // else{
        this.errorMessage = response.message;
        //}
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
