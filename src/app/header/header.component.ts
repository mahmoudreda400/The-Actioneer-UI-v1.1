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
    this.checkUserExist();
  }

  checkUserExist(){
    if(localStorage.getItem('userData'))
        this.appUser = JSON.parse(localStorage.getItem('userData'));
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

  userAction(obj){
    //console.log('target: ' + obj.target);
    if(obj.target.selectedIndex == 1)
        this.router.navigate(['/profile']);
    else if(obj.target.selectedIndex == 2)
    this.router.navigate(['/statistics']);
    else if(obj.target.selectedIndex == 25)
    this.logout();

  }

  goToProfile(){
    alert('Profile');
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
        this.appUser = data;
        localStorage.setItem('userData',JSON.stringify(data));
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
  closeModal() {
    var modal = document.getElementById("loginModal");
    modal.style.display = "none";
  }
  toggle() {
    this.loginShow = !this.loginShow;
  }
  logout() { 
    console.log('>>>> logout')
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('name');
    localStorage.removeItem('userDate');
    //this.auth.logout();
  }


}
