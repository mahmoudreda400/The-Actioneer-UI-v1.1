import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product :any;
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.product = JSON.parse(sessionStorage.getItem('selectedProduct'));
    // this.getFilteredProducts();
   // this.apiService.getPostById
    //});
  }

}
