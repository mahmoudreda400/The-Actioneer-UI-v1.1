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

  login(email, password): Observable<any> {
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post(this.baseUrl + '/login', body,   {
      responseType: 'json' as 'json'
    });
  }
<<<<<<< HEAD
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

=======

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllCategories', {
      responseType: 'json' as 'json'
    });
  }

  savePost(post, images): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    // let headers = new HttpHeaders({
    //   'Authorization': token,
    //   'responseType': 'json'
    // });
    let headers = new HttpHeaders({
      'Authorization': token
    });
    const options = { responseType: 'text' as 'json', headers };
    let body = new FormData();
    for (let image of images) {
      body.append('images', image);
    }
    body.append("post", new Blob([JSON.stringify(post)],
      {
        type: "application/json"
      }));
    return this.http.post(this.baseUrl + '/addPost', body, options);
  }
>>>>>>> 85d237345f2ff4e5f7b27ac971d2a2c94c63e21a
}
