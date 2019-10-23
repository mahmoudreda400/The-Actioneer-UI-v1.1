import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product :any;
  constructor(private service: ApiService) { }

  ngOnInit() {
    this.product = JSON.parse(sessionStorage.getItem('selectedProduct'));
  }

  bid(product){
    console.log(product);
    
    let targetProduct = {id: product.id}
    this.service.bid(targetProduct).subscribe(data => {
      alert(data);
      this.product = data.body.post;
    });
  }

}
