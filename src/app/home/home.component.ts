import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // userlist:User[];
  //user:User;
  constructor(private formBuilder:FormBuilder,private router:Router){
  //   this.userlist=[];
  //   //this.user=new User(1,"Mihir","mihir@gmail.com");
  //   this.userlist.push(new User(1,"Mihir","mihir@gmail.com"));
  //   this.userlist.push(new User(2,"Amit","Amit@gmail.com"));
  // //  this.user=new User(2,"Amit","Amit@gmail.com");
  //   console.log(localStorage.getItem('token'));
  //   if(!localStorage.getItem('token'))
  //   {
  //     console.log('Unauthorise');
  //     this.router.navigate(['/login']);
  //   }
  //   else
  //   {
  //     console.log('Authorise');
  //     console.log(this.userlist);
  //   }
  }

  // getUsers(): User[] {
  //   return this.userlist;
  // }


  // Logout()
  // {
  //   console.log('Logout');
  //   localStorage.removeItem('token');  // Remove token from storage
  //   this.router.navigate(['/login']); 
  // }

}
