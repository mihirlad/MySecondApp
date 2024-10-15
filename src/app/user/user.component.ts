import { Component ,OnInit ,ViewChild,AfterViewInit   } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/User.model';
import { ApiService } from '../api.services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit  {
  errorMessage: string = '';
  userlist:User[];
  dataSource: MatTableDataSource<User>=new MatTableDataSource<User>();
  displayedColumns: string[] = ['firstName','lastName','roleName','actions'];
  //paginator: MatPaginator;
  //user:User;
  constructor(private formBuilder:FormBuilder,private router:Router,private apiService:ApiService){
    this.userlist=[];
    //this.user=new User(1,"Mihir","mihir@gmail.com");
    // this.userlist.push(new User(1,"Mihir","mihir@gmail.com"));
    // this.userlist.push(new User(2,"Amit","Amit@gmail.com"));
  //  this.user=new User(2,"Amit","Amit@gmail.com");
    console.log(localStorage.getItem('token_UserId'));
    if(!localStorage.getItem('token_UserId'))
    {
      console.log('Unauthorise');
      this.router.navigate(['']);
    }
    else
    {
      console.log('Authorise');
      console.log(this.userlist);
    }
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
 
  ngOnInit(): void {
    this.getUsers();
    
    //this.dataSource.paginator = this.paginator;
  }

  getUsers(): void {

    const requestData={
      "RequestBy": localStorage.getItem('token_UserId'),
      "CompanyId": localStorage.getItem('token_CompanyId')
    }
    this.apiService.UserList(requestData).subscribe(
      (response) => {
       
        if(response.status=="200")
        {
          //console.log(response.lstUsers);
          this.userlist=response.lstUsers;
         
          this.dataSource = new MatTableDataSource<User>(this.userlist);
          this.dataSource.paginator = this.paginator;
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

    //return this.userlist;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(userId: number) {
    this.router.navigateByUrl('/Dashboard/edit-user', { state: { userId: userId } });
  }
  

}
