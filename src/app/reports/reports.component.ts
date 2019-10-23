import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
reports: any[] = [];
selectedReport;
selectedIndex;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.openNav();
    this.loadReports(); 
   
  }
  loadReports(){
      this.apiService.getAllReports().subscribe(data => {
        console.log('>>> register fata : ', data);
        this.reports= data.filter(x=>x.hasReports.length > 0);
        this.selectedReport = this.reports[0];
      });
  }
  ignoreUser(user){
    this.apiService.ignoreReports(user.id).subscribe(data => {
      console.log('>>> register fata : ', data);
      this.reports.splice(this.selectedIndex,1);
      this.selectedReport = this.reports[0];
      this.selectedIndex = 0;
    })
  }
  blockUser(user){
    this.apiService.blockUser(user.id).subscribe(data => {
      console.log('>>> register fata : ', data);
      
      this.reports.splice(this.selectedIndex,1);
      this.selectedReport = this.reports[0];
      this.selectedIndex = 0;
    })
  }
  selectReport(report,index)
  {
    this.selectedReport = report;
    this.selectedIndex = index;
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
