import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appUser: any;
  user: any = {
  };
  loginShow;

  loginForm: FormGroup;
  registerForm: FormGroup;
  loginSubmitted = false;
  registerSubmitted= false;
  constructor(
    private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) {
    this.loginShow = false;
  }

  ngOnInit() {
    this.createLoginForm();
    this.createRegister();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    });
  }
  createRegister() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: [''],
      address: ['']
    });
  }
  get lf() { return this.loginForm.controls; }
  get rf() { return this.registerForm.controls; }


  showLogin() {

    var modal = document.getElementById("loginModal");
    modal.style.display = "block";
  }

  login() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      console.log('>>> invalid form',this.loginForm.controls)
      return;
    }
    this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      console.log(' >> login data: ', data);
      console.log('' ,data.name );
      if(data.message == 'success'){
        localStorage.setItem('token',data.token);
        localStorage.setItem('name',data.name);
        localStorage.setItem('type',data.name);
        this.closeModal();
      }else{
        alert(data.message);
      }
      
    });
  }

  register() {
    this.registerSubmitted = true;
     if (this.registerForm.invalid) {
      console.log('>>> invalid form')
      return;
    }
    this.apiService.register(this.registerForm.value).subscribe(data => {
      console.log('>>> register fata : ', data);
      this.closeModal();
    });
  }

  signUp(user) {
    user.createdDate = + new Date();
    alert('Under Construction');
    // this.http.post(environment.url + 'user/add',user ).subscribe(response => {
    //     this.loginShow = true;
    //   })
  }
  loginUser(user) {
    if (user.email == 'admin' && user.password == 'admin') {
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
      sessionStorage.setItem('userLoggedIn', JSON.stringify(this.appUser));
    }
    else if (user.email == 'user' && user.password == 'user') {
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
      sessionStorage.setItem('userLoggedIn', JSON.stringify(this.appUser));
    }

  }
  closeModal() {
    var modal = document.getElementById("loginModal");
    modal.style.display = "none";
  }
  toggle() {
    this.loginShow = !this.loginShow;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('name');
    //this.auth.logout();
  }


}
