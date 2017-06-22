import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {
  authToken:any;
  user:any;

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:5000/api/register',user,{headers: headers})
    .map(res => res.json());

  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:5000/api/authenticate',user,{headers: headers})
    .map(res => res.json());
  }

  storeUserData(user, token){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken= token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired();
  }

  getTask(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:5000/api/tasks?token=' +this.authToken,{headers: headers})
    .map(res => res.json().tasks);
  }

  updateTask(id: number, newTask: string){
    let headers = new Headers();
    const body = JSON.stringify({content: newTask});
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:5000/api/task/'+ id,body,{headers: headers}).
    map(res => res.json());

  }

  deleteTask(id: number){
    return this.http.delete('http://localhost:5000/api/task/'+ id)
    .map(res => res.json());

  }

  addTask(content: string){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    const body = JSON.stringify({content: content});
    return this.http.post('http://localhost:5000/api/addtask?token=' +this.authToken,body,{headers: headers}).
    map(res => res.json());
  }

}
