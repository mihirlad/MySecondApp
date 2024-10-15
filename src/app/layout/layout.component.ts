import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {


  
  constructor(private router:Router){
   
    if(!localStorage.getItem('token_UserId'))
    {
     
      this.router.navigate(['']);
    }
    else
    {
     
    }
  }

  Logout()
  {
    console.log('Logout');
    localStorage.removeItem('token_UserId');  // Remove token from storage
    localStorage.removeItem('token_CompanyId');  // Remove token from storage
    this.router.navigate(['']); 
  }
}
