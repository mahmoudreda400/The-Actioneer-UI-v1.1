import { ApiService } from './../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  categories;
  Cities;
  product: any = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };
  id;

  postForm: FormGroup;
  uploadedText = 'Choose file';
  images;
  submitted = false;
  imageView;
  msg;
  productToEdit;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder) {

    this.Cities = [
      { id: 1, Name: 'FairField' },
      { id: 2, Name: 'Des Moines' },
      { id: 3, Name: 'Iowa City' }
    ]

    // this.id = route.snapshot.paramMap.get('id');
    // if (this.id) productService.get(this.id).valueChanges().take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      const postId = params['id'];
      console.log('>> query param: ', postId)
      if (postId != null) {
        this.getPostById(postId);
      } else {
        this.createNewForm();
      }
    });

    this.getAllCateories();

  }

  createNewForm() {
    this.uploadedText = 'Choose file';
    this.imageView = null;
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      expirDate: [''],
      minPrice: ['', Validators.required],
      incrValue: ['', Validators.required],
      city: [''],
      country: [''],
      category: ['', Validators.required],
      photos: [[]]

    });
  }

  createUpdateForm(post) {
    const url = post.photos[0].url;
    const imageName = url.substr(url.lastIndexOf('/') + 1);
    this.uploadedText = imageName;
    this.imageView = null;
    this.postForm = this.formBuilder.group({
      id: [post.id],
      title: [post.title, Validators.required],
      description: [post.description],
      expirDate: [post.expirDate],
      minPrice: [post.minPrice, Validators.required],
      incrValue: [post.incrValue, Validators.required],
      city: [post.city],
      country: [post.country],
      category: [post.category.id, Validators.required],
      photos: [[]]

    });
  }

  getAllCateories() {
    this.apiService.getAllCategories().subscribe(data => {
      console.log(' >> all cateogries');
      this.categories = data;;
    });
  }

  uploadFile(event) {

    console.log(' >>> upload file: ', event);
    this.uploadedText = '';
    this.images = event.target.files;
    for (let f of event.target.files) {
      this.uploadedText += f.name + ' , ';
    }
    const reader = new FileReader();
    reader.onload = e => this.imageView = reader.result;
    reader.readAsDataURL(this.images[0]);
  }

  savePost() {
    this.submitted = true;
    if (this.postForm.invalid) {
      console.log('invalid form');
      return;
    } else {

      let p = this.postForm.value;
      let selectedCategory = this.categories.filter(c => c.id == this.postForm.value.category);
      p.category = selectedCategory[0];
      console.log(' >> select Category: ', selectedCategory)
      console.log('>> post to save : ', p);
      console.log(' >> id to operate: ', p.id);
      if (p.id != null && p.id > 0) {
        this.updatePost(p);
        console.log('>>>-->> p:', p);
        console.log('>>>-->> productToEdit:', this.productToEdit);
      } else {
        this.postForm.value.photos = [];

        this.addNewPost(p);
      }
    }

  }
  addNewPost(p) {
    this.apiService.savePost(p, this.images).subscribe(data => {
      console.log('>>> savedPOst: ', data);
      this.msg = data;
      this.submitted = false;
      this.createNewForm();
    });
  }

  updatePost(p) {
    this.apiService.updatePost(p, this.images).subscribe(data => {
      console.log('>>> updatePOst: ', data);
      this.msg = data;
      this.submitted = false;
      // this.createNewForm();
    });
  }






  getPostById(id) {
    this.apiService.getPostById(id).subscribe(data => {
      this.createUpdateForm(data);
      this.productToEdit = data;
    });
  }




}
