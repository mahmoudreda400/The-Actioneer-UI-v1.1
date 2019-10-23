import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  pieChart = {
    title : 'Posts distributed as Categories',
   type : 'PieChart',
   data : [
      ['CARS', 12.0],
      ['ELECTRONICS', 26.8],
      ['SPORTS', 35.8],
      ['MOVIES', 8.5],
      ['HOUSING', 16.9]
   ],
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
    private route: ActivatedRoute) {
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
  }



}
