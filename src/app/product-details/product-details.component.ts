import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product :any;
  biddingValue = 0;
  biddings: any[] = [];
  lastBidderName: any = "";

  constructor(private router: Router,private activatedRouter: ActivatedRoute,public service:ApiService,private formBuilder: FormBuilder) { }
  imageView;
  uploadedText = 'Choose file';
  id;
  postForm: FormGroup;


  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      const postId = params['id'];
      this.getPostById(postId);});
  }
  
  getPostById(id) {
    this.service.getPostById(id).subscribe(data => {
     // this.createDetailsForm(data);
      this.product= data;
      this.biddingValue = this.product.minPrice + this.product.incrValue;
      this.biddings = data.biddings;
      if(this.biddings != null && this.biddings.length > 0){
      this.biddings.sort(function(a: any,b: any){
        return b.id - a.id;
      })
      this.lastBidderName = this.biddings[0].user.name;
    }
    });
  }

  bid(product){
    console.log('>> bid on: ',product);
    
    let targetProduct = {id: product.id}
    this.service.bid(targetProduct).subscribe(data => {
      this.product.minPrice = data.price;
      this.biddingValue = this.product.minPrice + this.product.incrValue;
      this.lastBidderName = data.user.name;
    });
  }

}
