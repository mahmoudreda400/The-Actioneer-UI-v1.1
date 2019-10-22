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
  getAllPost() :Observable<any>{
    return this.http.get(this.baseUrl + '/Allposts',    {
      responseType: 'json' as 'json'
    });
  }
  getPostById(id):Observable<any>{
    
    return this.http.get(this.baseUrl+'/posts/'+'${id}',{responseType: 'json' as 'json'}) ;


}
// getProfileData(token):Observable<any>
// {
  // let header = new HttpHeaders();
  // header.append('Authorization',token)
  // return this.http.get(this.baseUrl+'/profileData',header,   {
  //   responseType: 'json' as 'json'
  // });

// }

}
