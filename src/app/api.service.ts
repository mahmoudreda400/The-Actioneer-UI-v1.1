import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  bid(product) :Observable<any>{
    let token = localStorage.getItem("token");

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
      'responseType': 'json' as 'json' });

    let options = { headers: headers };
    
    return this.http.post(this.baseUrl + '/api/bidding/bid', product, options);
  }

  reportUser(msg: string, reported) {
    //TODO fixme
    reported = {id: 1};
    // let token = localStorage.getItem("token") || "";

    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': token });

    // let options = { responseType: 'json' as 'json',
    // headers: headers };

    let body = new FormData();
    body.append("msg", msg);
    body.append("reported", new Blob([JSON.stringify(reported)],
      {
        type: "application/json"
      }
    ));

    return this.http.post(this.baseUrl + '/reportUser', body);
  }
}
