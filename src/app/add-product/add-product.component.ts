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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder) {

    this.Cities = [
      { id: 1, Name: 'FairField' },
      { id: 2, Name: 'Des Moines' },
      { id: 3, Name: 'Iowa City' }
    ]

    this.id = route.snapshot.paramMap.get('id');
    // if (this.id) productService.get(this.id).valueChanges().take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
    this.createNewForm();
    this.getAllCateories();
    
  }

  createNewForm() {
    this.uploadedText = 'Choose file';
    this.imageView = null;
    this.postForm = this.formBuilder.group({
      title: ['',Validators.required],
      description: [''],
      expirDate: [''],
      minPrice: ['',Validators.required],
      incrValue: ['', Validators.required],
      city:[''],
      country:[''],
      category:['', Validators.required],
      photos:[[]]

    });
  }

  getAllCateories(){
    this.apiService.getAllCategories().subscribe(data => {
      console.log(' >> all cateogries');
      this.categories = data;;
    });
  }

  uploadFile(event){
    
    console.log(' >>> upload file: ',event);
    this.uploadedText = '';
    this.images = event.target.files; 
    for(let f of event.target.files){
    this.uploadedText += f.name+' , ';
    }
    const reader = new FileReader();
    reader.onload = e => this.imageView = reader.result ;
    reader.readAsDataURL(this.images[0]);
  }

  savePost(){
    this.submitted = true;
    if(this.postForm.invalid){
      console.log('invalid form');
      return;
    }else{
      this.postForm.value.photos = [];
      let p = this.postForm.value;
      let selectedCategory = this.categories.filter(c => c.id == this.postForm.value.category);
      p.category = selectedCategory[0];
      console.log(' >> select Category: ',selectedCategory)
      console.log('>> post to save : ',p);
      this.apiService.savePost(p, this.images).subscribe(data =>{ 
        console.log('>>> savedPOst: ',data);
        this.msg = data;
        this.submitted = false;
        this.createNewForm();
      });
    }

  }
  



}
