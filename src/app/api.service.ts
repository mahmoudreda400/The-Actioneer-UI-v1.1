import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseUrl = "http://localhost:8085";

  constructor(private http: HttpClient) { }

  register(person) :Observable<any> {
    return this.http.post(this.baseUrl+ '/register', person,  {
      responseType: 'json' as 'json'
    });
  }

  login(email, password) :Observable<any>{
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post(this.baseUrl + '/login', body,   {
      responseType: 'json' as 'json'
    });
  }
}
