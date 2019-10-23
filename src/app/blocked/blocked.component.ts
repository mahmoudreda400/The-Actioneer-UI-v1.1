import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  blockedUsers:any[]=[];
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.loadBlockedUsers();
  }
  loadBlockedUsers(){
    this.apiService.loadBlockedUsers().subscribe(data => {
      console.log('>>> register fata : ', data);
      this.blockedUsers= data;
    });
}
activate(user,index){
  this.apiService.activate(user.id).subscribe(data => {
    console.log('>>> register fata : ', data);
    this.blockedUsers.splice(index ,1);
  });
}
}
