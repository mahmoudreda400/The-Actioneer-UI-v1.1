import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appUser: any;
  user :any = {
  };
loginShow;
  constructor(
    private router:Router,private auth: ApiService) {
    this.loginShow = false;
   }
   
   ngOnInit(){
  }
   login(){
    var modal = document.getElementById("loginModal");
    modal.style.display = "block";
   }

signUp(user){
  user.createdDate = + new Date();
  alert('Under Construction');
  // this.http.post(environment.url + 'user/add',user ).subscribe(response => {
  //     this.loginShow = true;
  //   })
}
loginUser(user){
if (user.email == 'admin' && user.password == 'admin')
{
  this.appUser = {
    "id": 58,
    "firstName": "Ahmed",
    "lastName": "Fares",
    "email": "ahmed.fares101@gmail.com",
    "address": null,
    "mobile": null,
    "whatsapp": null,
    "active": null,
    "blocked": null,
    "password": "123",
    "seller": null,
    "buyer": null,
    "token": "8a474b4a-46e5-4de1-bfb8-6d84d3da7fcc",
    "createdDate": null,
    "admin": true
  };
  var modal = document.getElementById("loginModal");
  modal.style.display = "none";
  sessionStorage.setItem('userLoggedIn',JSON.stringify(this.appUser));
}
else if (user.email == 'user' && user.password == 'user')
{
  this.appUser = {
    "id": 58,
    "firstName": "Mustafa",
    "lastName": "Anwar",
    "email": "ahmed.fares90@gmail.com",
    "address": null,
    "mobile": null,
    "whatsapp": null,
    "active": null,
    "blocked": null,
    "password": "123", 
    "seller": null,
    "buyer": null,
    "token": "8a474b4a-46e5-4de1-bfb8-6d84d3da7fcc",
    "createdDate": null,
    "admin": false
  };
  var modal = document.getElementById("loginModal");
  modal.style.display = "none";
  sessionStorage.setItem('userLoggedIn',JSON.stringify(this.appUser));
}

}
   closeModal(){
    var modal = document.getElementById("loginModal");
    modal.style.display = "none";
   }
   toggle(){
    this.loginShow = !this.loginShow;
   }
   logout(){
    this.appUser = null;
    sessionStorage.removeItem('userLoggedIn');
    //this.auth.logout();
  }
  

}
