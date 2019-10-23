import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  ip = "http://localhost";
  baseUrl = this.ip + ":8085";

  constructor(private http: HttpClient) { }

  getPhotoUrl(url) {
    // if (url != null) {
    //   let imagePath = url.substr(url.indexOf('/auctioneer')).replace(' ', '%20');
    //   return this.ip + imagePath;
    // }
    return url;
  }
  register(person): Observable<any> {
    return this.http.post(this.baseUrl + '/register', person, {
      responseType: 'text' as 'json'
    });
  }

  login(email, password): Observable<any> {
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post(this.baseUrl + '/login', body, {
      responseType: 'json' as 'json'
    });
  }
  getAllPost(): Observable<any> {
    return this.http.get(this.baseUrl + '/Allposts', {
      responseType: 'json' as 'json'
    });
  }

  bid(product): Observable<any> {
    let token = localStorage.getItem("token");

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
      'responseType': 'json' as 'json'
    });

    let options = { headers: headers };

    return this.http.post(this.baseUrl + '/api/bidding/bid', product, options);
  }

  reportUser(msg: string, reported) {
    //TODO fixme
    reported = { id: 1 };
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
  getPostById(id): Observable<any> {

    return this.http.get(this.baseUrl + '/posts/' + id, { responseType: 'json' as 'json' });


  }
  // getProfileData(token):Observable<any>
  // {
  // let header = new HttpHeaders();
  // header.append('Authorization',token)
  // return this.http.get(this.baseUrl+'/profileData',header,   {
  //   responseType: 'json' as 'json'
  // });

  // }
  getProfileData(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    let headers = new HttpHeaders({
      'Authorization': token
    });
    const options = { responseType: 'json' as 'json', headers };
    return this.http.get(this.baseUrl + '/profileData', options);

  }
  setProfileData(person): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    let headers = new HttpHeaders({
      'Authorization': token
    });
    const options = { responseType: 'json' as 'json', headers };
    return this.http.post(this.baseUrl + '/updateProfile', person, options);

  }


  ignoreReports(userId): Observable<any> {
    let body = new FormData();
    body.append('userId', userId);
    return this.http.post(this.baseUrl + '/ignoreReports', body, {
      responseType: 'json' as 'json'
    });
  }

  blockUser(userId): Observable<any> {
    let body = new FormData();
    body.append('userId', userId);
    return this.http.post(this.baseUrl + '/blockUser', body, {
      responseType: 'json' as 'json'
    });
  }
  activate(userId): Observable<any> {
    let body = new FormData();
    body.append('userId', userId);
    return this.http.post(this.baseUrl + '/activate', body, {
      responseType: 'json' as 'json'
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllCategories', {
      responseType: 'json' as 'json'
    });
  }

  getAllReports(): Observable<any> {
    return this.http.get(this.baseUrl + '/reports', {
      responseType: 'json' as 'json'
    });
  }
  loadBlockedUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/blocked', {
      responseType: 'json' as 'json'
    });
  }

  savePost(post, images): Observable<any> {
    const token = localStorage.getItem('token');
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
  updatePost(post, images): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization': token
    });
    const options = { responseType: 'text' as 'json', headers };
    let body = new FormData();
    if (images != null) {
      for (let image of images) {
        body.append('images', image);
      }
    } else {
      body.append('images', null);
    }
    body.append("post", new Blob([JSON.stringify(post)],
      {
        type: "application/json"
      }));
    return this.http.post(this.baseUrl + '/updatePost', body, options);
  }

  adminStatistics(): Observable<any> {
    return this.http.get(this.baseUrl + '/admin/stat', {
      responseType: 'json' as 'json'
    });
  }
  getUserNotifications(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization': token
    });
    const options = { responseType: 'json' as 'json', headers };
    return this.http.get(this.baseUrl + '/getNotifications', options);
  }
}
