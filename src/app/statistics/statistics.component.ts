import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statistics: any = {
    postsPerMonth: [],
    postsPerCategory: [],
    postsPerUser: []
  };
  pieChart = {
    title : 'Posts distributed as Categories',
   type : 'PieChart',
   data : this.statistics.postsPerCategory,
   columnNames : ['Category', 'Percentage'],
   options : {},
   width : 600,
   height : 300
  }
  
  lineChart = {
    title : 'Users Signed Up last 5 Months',
   type : 'LineChart',
   data : [
      ['May', 2000],
      ['June', 5000],
      ['July', 11000],
      ['Augest', 10000],
      ['September', 12000],
   ],
   columnNames : ['Month', 'Users'],
   options : {},
   width : 600,
   height : 300
  }

  barChart = {
    title : 'Items Shared last 5 Months',
   type : 'ColumnChart',
   data : [
      ['May', 200],
      ['June', 500],
      ['July', 1100],
      ['Augest', 1000],
      ['September', 1200],
   ],
   columnNames : ['Month', 'Items'],
   options : {},
   width : 600,
   height : 300
  }
   
  categories$;
  Cities;
  product :any = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService) {
    //this.categories$ = categoryService.getAll();
this.Cities = [
      {id:1,Name:'FairField'},
      {id:2,Name:'Des Moines'},
      {id:3,Name:'Iowa City'}
    ]
    this.id = route.snapshot.paramMap.get('id');
    //if (this.id) productService.get(this.id).valueChanges().take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
    this.apiService.adminStatistics().subscribe(data => {
      console.log("statistcs: ", data)
      this.statistics = data;
      this.pieChart.data = this.statistics.postsPerCategory;
      this.lineChart.data = this.statistics.postsPerMonth;
      this.barChart.data = this.statistics.postsPerUser;
    })
  }



}
