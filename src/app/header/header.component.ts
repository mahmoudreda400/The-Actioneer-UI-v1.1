import { ApiService } from './../api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

// import * as Stomp from "@stomp/stompjs";
// import * as SockJS from "sockjs-client";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  appUser: any;
  user: any = {
  };
  loginShow;

  loginForm: FormGroup;
  registerForm: FormGroup;
  loginSubmitted = false;
  registerSubmitted = false;
  notifications = [];

  private stompClient = null;
  disabled = true;
  activePage;


  constructor(
    private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) {
    this.loginShow = false;
  }

  ngOnInit() {
    if (this.router.url == '/profile')
      this.activePage = 'profile';
    else if (this.router.url == '/statistics')
      this.activePage = 'statistics';
    else if (this.router.url == '/addProduct')
      this.activePage = 'addProduct';
    else if (this.router.url == '/reports')
      this.activePage = 'reports';
    else if (this.router.url == '/blocked')
      this.activePage = 'blocked';
    else
      this.activePage = 'home';
    this.createLoginForm();
    this.createRegister();
    this.disconnect();
    this.checkUserExist();
  }

  ngOnDestroy() {
    this.disconnect();
  }
  checkUserExist() {
    if (localStorage.getItem('userData')) {
      this.appUser = JSON.parse(localStorage.getItem('userData'));
      this.getUserNotifications();
      // this.userConnect(userId)
      console.log('>>>> userdata: ', JSON.parse(localStorage.getItem('userData')));
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.userConnect(userData.id);
    }

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

  userAction(obj) {
    //console.log('target: ' + obj.target);
    if (obj.target.selectedIndex == 1)
      this.router.navigate(['/profile']);
    else if (obj.target.selectedIndex == 2)
      this.router.navigate(['/statistics']);
    else if (obj.target.selectedIndex == 5)
      this.logout();
    else if (obj.target.selectedIndex == 3)
      this.router.navigate(['/reports']);
    else if (obj.target.selectedIndex == 4)
      this.router.navigate(['/blocked']);
  }

  goToProfile() {
    alert('Profile');
  }
  login() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      console.log('>>> invalid form', this.loginForm.controls)
      return;
    }
    this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      console.log(' >> login data: ', data);
      console.log('', data.name);
      if (data.message == 'success') {
        this.appUser = data;
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('type', data.name);
        this.closeModal();
      } else {
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
  closeModal() {
    var modal = document.getElementById("loginModal");
    modal.style.display = "none";
  }
  toggle() {
    this.loginShow = !this.loginShow;
  }
  logout() {
    this.appUser = null;
    console.log('>>>> logout')
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('name');
    localStorage.removeItem('userDate');
    //this.auth.logout();
  }

  getUserNotifications() {
    this.apiService.getUserNotifications().subscribe(data => {
      console.log('>> user notifications: ', data);
      this.notifications = data;
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
  }


  userConnect(userId) {
    const socket = new SockJS(this.apiService.webSocketPath);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('>>----- conect on: ', userId);
      _this.stompClient.subscribe("/notifications/" + userId, function (data) {
        let bids = JSON.parse(data.body);
        _this.notifications = bids;
        console.log(' =======++++++>>> get new Notifications by pushing: ', bids);
      });



    });
  }

}
