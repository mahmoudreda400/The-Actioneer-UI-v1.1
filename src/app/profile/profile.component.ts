import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  // user :any = {
  // };
  submitted = false;
  msg;
  constructor(private apiService:ApiService,private formBuilder: FormBuilder ) { 
  }
  ngOnInit() {
    this.getProfileData();
  }
  createprofileForm(user) {
    this.profileForm = this.formBuilder.group({
      id:[user.id],
      name: [user.name, Validators.required],
      email: [user.email, Validators.required],
      password: ['*******'],
      phone: [user.phone],
      address: [user.address]
    });
  }
getProfileData(){
  console.log(' ???? start get profile data')
  this.apiService.getProfileData().subscribe(data=>{
    console.log('>>> register fata : ', data);
    
    this.createprofileForm(data);
  });
}
  SaveProfileData(){
    this.submitted = true;
    if(this.profileForm.invalid){
      console.log('invalid form');
      return;
    }else{
    let p=this.profileForm.value;
    this.apiService.setProfileData(p).subscribe(data =>{ 
      console.log('>>> savedProfile: ',data);
      this.msg = data;
      this.submitted = false;
    });
  }}

}
