import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7196/api';  // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Method to call API with a JSON object parameter
  LoginAuthetication(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(`${this.apiUrl}/Login/AuthenticateUser`, data, { headers });  // Replace '/endpoint' with your endpoint
  }

  UserList(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(`${this.apiUrl}/Login/GetAllLoginMaster`, data, { headers });  // Replace '/endpoint' with your endpoint
  }

  AddUser(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(`${this.apiUrl}/Login/InsertUserMaster`, data, { headers });  // Replace '/endpoint' with your endpoint
  }

  UserById(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(`${this.apiUrl}/Login/GetLoginMasterById`, data, { headers });  // Replace '/endpoint' with your endpoint
  }

  RoleList(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(`${this.apiUrl}/Login/GetAllRoleMaster`, data, { headers });  // Replace '/endpoint' with your endpoint
  }

  
  UpdateUser(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(`${this.apiUrl}/Login/UpdateUserMaster`, data, { headers });  // Replace '/endpoint' with your endpoint
  }

  
}