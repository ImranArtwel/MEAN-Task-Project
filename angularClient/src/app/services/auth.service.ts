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
    return this.http.post('api/register',user,{headers: headers})
    .map(res => res.json());

  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('api/authenticate',user,{headers: headers})
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
    let headers = new Headers
    headers.append('Content-Type','application/json');
    return this.http.get('api/tasks',{headers: headers})
    .map(res => res.json().tasks);
  }

  updateTask(id: number, newTask: string){
    let headers = new Headers();
    const body = JSON.stringify({content: newTask});
    headers.append('Content-Type','application/json');
    return this.http.put('api/task/'+ id,body,{headers: headers}).
    map(res => res.json());

  }

  deleteTask(id: number){
    return this.http.delete('api/task/'+ id)
    .map(res => res.json());

  }

  addTask(content: string){
    let headers = new Headers();
    const body = JSON.stringify({content: content});
    headers.append('Content-Type','application/json');
    return this.http.post('api/addtask',body,{headers: headers}).
    map(res => res.json());
  }

}
