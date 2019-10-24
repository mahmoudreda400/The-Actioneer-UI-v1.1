import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  AllProducts: any[] = [];
  category: string;
  Cities;
  Prices;
  Relatives;
  Within;

  allProducts;
  selectedCategory = "All";
  selectedPrice = "All";
  categories$;
  Categories:any[];
  posts:any[];
  product :any = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  };
  currentProduct: any;

  constructor(public apiService:ApiService,private router: Router) {
   }
  ngOnInit() {
    this.initializeLists();
    // this.getFilteredProducts();
    this.getAllPosts();
    this.getAllCategories();
  }

  getAllCategories(){
    
    this.apiService.getAllCategories().subscribe(data => {
      console.log('>>> register fata : ', data);
      data.push({name:'All',value:0});
      this.Categories= data.map(x=>x.name);
    });
  }

  getAllPosts(){
    this.apiService.getAllPost().subscribe(data => {
      console.log('>>> register fata : ', data);
      this.filteredProducts= data;
      this.AllProducts= data;
    });
  }
  postDetails(productId){
    this.router.navigate(['/productDetails'],{queryParams:{id:productId}});
  }
 
  
  itemAction(obj, product){
    this.currentProduct = product;
    if(obj.target.selectedIndex == 1)
        this.router.navigate(['/addProduct'],{queryParams: {id: product.id}});
    else if(obj.target.selectedIndex == 2)
        {
            let modal = document.getElementById("myModal");
            modal.style.display = "block";
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            }
        }
  }
  goToDetails(product){
    sessionStorage.setItem('selectedProduct',JSON.stringify(product));
    this.router.navigate(['/productDetails']);
  }

  reportUser(reportMsg){
    // alert(reportMsg);
    // alert(this.currentProduct.price);
    this.apiService.reportUser(reportMsg, this.currentProduct).subscribe(data => {
      console.log(data);
      
    });
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal2").style.display = "block";
  }

// When the user clicks on <span> (x), close the modal
closeModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}
closeModal2() {
  let modal = document.getElementById("myModal2");
  modal.style.display = "none";
}

  initializeLists(){
    
  this.Cities = [
    {id:0,Name:'All'},
    {id:1,Name:'fairfield'},
    {id:2,Name:'cydar rapids'},
    {id:3,Name:'iowa'}
  ]
  this.Categories = [
    'All',
    'Cars',
    'Buildings',
    'Accessories'
  ]
  this.Prices = [
    {id:0,Name:'All'},
    {id:1000,Name:'less than 1000$'},
    {id:10000,Name:'less than 10000$'},
    {id:100000,Name:'less than 100000$'},
    {id:500000,Name:'less than 500000$'}
  ]
  this.Relatives = [
    {id:0,Name:'All'},
    {id:1,Name:'Most Recent'},
    {id:2,Name:'Low Price'},
    {id:3,Name:'High Price'}
  ]
  this.Within = [
    {id:0,Name:'All'},
    {id:1,Name:'The last 24 hours'},
    {id:2,Name:'The last 7 days'},
    {id:3,Name:'The last 30 days'}
  ];

  }

filterByCat(type,event)
{
  console.log('event: ' + this.filteredProducts);
  if(type == 'category')
  this.filteredProducts = this.AllProducts.filter(x=>x.category.name ==  event.target.value || event.target.value == 'All');
  else if(type == 'city')
  this.filteredProducts = this.AllProducts.filter(x=>x.city ==  event.target.selectedOptions[0].innerText || event.target.selectedOptions[0].innerText == 'All');
  else if(type == 'price')
  this.filteredProducts = this.AllProducts.filter(x=>x.minPrice < this.Prices[event.target.selectedIndex].id || event.target.selectedIndex == 0);
  else if(type == 'arrange')
  {
    this.filteredProducts.sort();
    this.filteredProducts.sort(function(a, b){
      if(event.target.value == 1)
      return a.created.localeCompare(b.created);
      if(event.target.value == 3)
      return b.minPrice - a.minPrice;
      if(event.target.value == 2)
      return a.minPrice - b.minPrice;
    });
  }
  
  //alert(this.selectedPrice);
  // let price = (parseInt(this.selectedPrice) == 1)?1000:(parseInt(this.selectedPrice) == 2)?10000:(parseInt(this.selectedPrice) == 3)?100000:500000;
  // this.filteredProducts = this.allProducts.filter(x=>
  // ((x.category == this.selectedCategory)||(this.selectedCategory == "All"))&&
  // ((x.price < price)||(this.selectedPrice == "All"))
  // );

}
}