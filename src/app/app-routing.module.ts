import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { AddUserComponent } from './add-user/add-user.component'
import { EditUserComponent } from './edit-user/edit-user.component';
// import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'Dashboard',
    component: LayoutComponent, // The layout component will hold the header, sidebar, etc.
    children: [
      { path: 'User', component: UserComponent },
      { path: 'Role', component: RoleComponent },
      { path: 'add-user', component: AddUserComponent }, // Add user route
      //{ path: 'edit-user/:userId', component: EditUserComponent }, 
      { path: 'edit-user', component: EditUserComponent }, 
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
