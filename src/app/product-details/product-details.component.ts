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

  constructor(private router: Router,private activatedRouter: ActivatedRoute,public service:ApiService,private formBuilder: FormBuilder) { }
  imageView;
  uploadedText = 'Choose file';
  id;
  postForm: FormGroup;


  ngOnInit() {
   // this.product = JSON.parse(sessionStorage.getItem('selectedProduct'));
    // this.getFilteredProducts();
   // this.apiService.getPostById
    //});
    this.activatedRouter.queryParams.subscribe(params => {
      const postId = params['id'];
      this.getPostById(postId);});
  }
  // createDetailsForm(post) {
  //   const url = post.photos[0].url;
  //   const imageName = url.substr(url.lastIndexOf('/') + 1);
  //   this.uploadedText = imageName;
  //   this.imageView = null;
  //   this.postForm = this.formBuilder.group({
  //     id: [post.id],
  //     title: [post.title],
  //     description: [post.description],
  //     expirDate: [post.expirDate],
  //     minPrice: [post.minPrice],
  //     incrValue: [post.incrValue],
  //     city: [post.city],
  //     country: [post.country],
  //     category: [post.category.id],
  //     photos: [[]]

  //   });
  // }
  getPostById(id) {
    this.service.getPostById(id).subscribe(data => {
     // this.createDetailsForm(data);
      this.product= data;
    });
  }

  bid(product){
    console.log('>> bid on: ',product);
    
    let targetProduct = {id: product.id}
    this.service.bid(targetProduct).subscribe(data => {
      alert(data);
      this.product = data.body.post;
    });
  }

}
