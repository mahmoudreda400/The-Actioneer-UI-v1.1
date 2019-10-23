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

  constructor(public apiService:ApiService,private router: Router) {
   }
  ngOnInit() {
    this.initializeLists();
    // this.getFilteredProducts();
    this.getAllPosts();
  }

  getAllPosts(){
    this.apiService.getAllPost().subscribe(data => {
      console.log('>>> register fata : ', data);
      this.filteredProducts= data;
    });
  }
  
  itemAction(obj, productId){
    if(obj.target.selectedIndex == 1)
        this.router.navigate(['/addProduct'],{queryParams: {id: productId}});
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

// When the user clicks on <span> (x), close the modal
closeModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}


  // getFilteredProducts() {

  //   this.filteredProducts = 
  // [
  //   {
  //     "id": 8,
  //     "itemName": "building",
  //     "itemDescription": "New Test House",
  //     "price": 120000,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSugqMq-ImCtgu-y-uRxj6tfWGPJlCtkfXhDQqvj8lCxCXo904M",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "HOUSING",
  //     "active": true,
  //     "city": "Cedar_Rapids",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 16,
  //     "itemName": "Phone",
  //     "itemDescription": "New Test Phone",
  //     "price": 1200,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTItm_4h1AdPDKBsMdV_pqF79ePa1BDkZZmhHOGggWx57NJCc_Dgg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "ELECTRONICS",
  //     "active": true,
  //     "city": "Sioux_City",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 7,
  //     "itemName": "building",
  //     "itemDescription": "New Test House",
  //     "price": 900566,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRTPJSb2L2F4wIpDyuzpitVAELXjtWworqyylCJU6uSCwIDD2fA",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "HOUSING",
  //     "active": true,
  //     "city": "Ames",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 12,
  //     "itemName": "Phone",
  //     "itemDescription": "New Test Phone",
  //     "price": 2100,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1ublnuwdS24OEaKVQTPSSx-mwSpQQnEGADYFMPwaLjY6eJAb8w",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "ELECTRONICS",
  //     "active": true,
  //     "city": "Waterloo",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 13,
  //     "itemName": "Phone",
  //     "itemDescription": "New Test Phone",
  //     "price": 2000,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuATr-p5U6g2XpAXj3y99VhZOxeGtZUvi8i08RH1oa3zpqd-NKfg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "ELECTRONICS",
  //     "active": true,
  //     "city": "Waterloo",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 15,
  //     "itemName": "Phone",
  //     "itemDescription": "New Test Phone",
  //     "price": 1250,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl4sIpzij64MAxyxWD7_dVvbWH91EUOjIWvZdhWtIN0fOzRbOlkQ",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "ELECTRONICS",
  //     "active": true,
  //     "city": "Sioux_City",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 1,
  //     "itemName": "ford car",
  //     "itemDescription": "ford",
  //     "price": 25000,
  //     "likes": 12,
  //     "photosURL": "https://cdn.pixabay.com/photo/2017/03/05/15/29/aston-2118857_960_720.jpg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "CAR",
  //     "active": true,
  //     "city": "Cedar_Rapids",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 4,
  //     "itemName": "Hundai",
  //     "itemDescription": "New Test Car",
  //     "price": 26000,
  //     "likes": 6,
  //     "photosURL": "https://cdn.motor1.com/images/mgl/17XG3/s1/bugatti-la-voiture-noire-leaves-geneva.jpg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "CAR",
  //     "active": true,
  //     "city": "Davenport",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 9,
  //     "itemName": "building",
  //     "itemDescription": "New Test House",
  //     "price": 130000,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSGMVgHlgHVFZrHP5VNHAIsHX9pCKhGLyXs3QKvgeZYU7dKRlBmsMg7DXhPnF6u1eCjPS6mTkgSkrgFfSPDChn7DhY0eWJkkpvs_Ly0Uq9N&usqp=CAc",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "HOUSING",
  //     "active": true,
  //     "city": "Davenport",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 10,
  //     "itemName": "building",
  //     "itemDescription": "New Test House",
  //     "price": 123544,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eg_sWa5V4Ee8vO_C_Hz7FZgIULeDKyRpXl7Yfz7Jf5WWPBAeGQ",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "HOUSING",
  //     "active": true,
  //     "city": "Iowa_City",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 11,
  //     "itemName": "building",
  //     "itemDescription": "New Test House",
  //     "price": 123454,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN7YfqtBBks8e7n9CCUZjJvGcnLQ1tJmJcQasHakt1n9GWRZaq",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "HOUSING",
  //     "active": true,
  //     "city": "Iowa_City",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 21,
  //     "itemName": "Ball",
  //     "itemDescription": "New Test Ball",
  //     "price": 99,
  //     "likes": 25,
  //     "photosURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/768px-Soccer_ball.svg.png",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "SPORTS",
  //     "active": true,
  //     "city": "Ankeny",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 6,
  //     "itemName": "Hundai",
  //     "itemDescription": "New Test Car",
  //     "price": 14500,
  //     "likes": 18,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyP9IpbhynPLVLnyP33b-bgCcWJKKrk5fcVEfDYT_vl4MNaF4W",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "CAR",
  //     "active": true,
  //     "city": "West_Des_Moines",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 28,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 1350,
  //     "likes": 15,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqASmOwhjakFA2VYIyZKVOxHAzz6bghIDRp9Co3CtcgVh8Zk6KDA",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "Iowa_City",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 24,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 950,
  //     "likes": 15,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeeEb4j8Cbi0iYCRZpA57XG1ztirxKsRhLtt6E2UNAONx2EvrZQw",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "Marion",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 29,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 1400,
  //     "likes": 15,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyONUU8K7yfzGMQq8Z2zUuCRseKEfLJUcaERRTNbhYi_pGbJT2",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "Mason_City",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 25,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 1856,
  //     "likes": 15,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRoDM-rlfUwJEVxtsHxgnAwh8PFoGtuhMf5gN2SNrtSOrQw3I0dw",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "West_Des_Moines",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 27,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 1540,
  //     "likes": 15,
  //     "photosURL": "https://cdn.pixabay.com/photo/2019/04/24/19/56/movie-4152982_960_720.jpg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "Dubuque",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 14,
  //     "itemName": "Phone",
  //     "itemDescription": "New Test Phone",
  //     "price": 1354,
  //     "likes": 25,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCoIzHoPFxF5cv3POwt4Ax9Uw5iUJh9J8ORmfV9T-m7Y_vgfdL",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "ELECTRONICS",
  //     "active": true,
  //     "city": "Ames",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 23,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 1150,
  //     "likes": 15,
  //     "photosURL": "https://cdn.pixabay.com/photo/2019/04/24/19/56/movie-4152982_960_720.jpg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "Cedar_Rapids",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 19,
  //     "itemName": "Ball",
  //     "itemDescription": "New Test Ball",
  //     "price": 125,
  //     "likes": 25,
  //     "photosURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/768px-Soccer_ball.svg.png",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "SPORTS",
  //     "active": true,
  //     "city": "Cedar_Falls",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 22,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 1423,
  //     "likes": 15,
  //     "photosURL": "https://cdn.pixabay.com/photo/2019/04/24/19/56/movie-4152982_960_720.jpg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "Dubuque",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 20,
  //     "itemName": "Ball",
  //     "itemDescription": "New Test Ball",
  //     "price": 120,
  //     "likes": 25,
  //     "photosURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/768px-Soccer_ball.svg.png",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "SPORTS",
  //     "active": true,
  //     "city": "Council_Bluffs",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 18,
  //     "itemName": "Ball",
  //     "itemDescription": "New Test Ball",
  //     "price": 134,
  //     "likes": 25,
  //     "photosURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/768px-Soccer_ball.svg.png",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "SPORTS",
  //     "active": true,
  //     "city": "Council_Bluffs",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 26,
  //     "itemName": "Movie",
  //     "itemDescription": "New Test Movie",
  //     "price": 1760,
  //     "likes": 15,
  //     "photosURL": "https://cdn.pixabay.com/photo/2019/04/24/19/56/movie-4152982_960_720.jpg",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "MOVIE",
  //     "active": true,
  //     "city": "Ames",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 17,
  //     "itemName": "Ball",
  //     "itemDescription": "New Test Ball",
  //     "price": 78,
  //     "likes": 25,
  //     "photosURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/768px-Soccer_ball.svg.png",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "SPORTS",
  //     "active": true,
  //     "city": "Ankeny",
  //     "user": null,
  //     "comments": []
  //   },
  //   {
  //     "id": 3,
  //     "itemName": "Hundai",
  //     "itemDescription": "New Test Car",
  //     "price": 22000,
  //     "likes": 6,
  //     "photosURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlosHA0-9vn43zDNmqA85-ps6Qur8jhfihPVUaP2y7xvzSbLOT",
  //     "createdTime": "2019-09-15T06:09:26.221+0000",
  //     "expiryDate": null,
  //     "category": "CAR",
  //     "active": true,
  //     "city": "West_Des_Moines",
  //     "user": null,
  //     "comments": []
  //   }
  // ];
  // }

  initializeLists(){
    
  this.Cities = [
    {id:0,Name:'All'},
    {id:1,Name:'FairField'},
    {id:2,Name:'Des Moines'},
    {id:3,Name:'Iowa City'}
  ]
  this.Categories = [
    'All',
    'Cars',
    'Buildings',
    'Accessories'
  ]
  this.Prices = [
    {id:0,Name:'All'},
    {id:1,Name:'less than 1000$'},
    {id:2,Name:'less than 10000$'},
    {id:3,Name:'less than 100000$'},
    {id:4,Name:'less than 500000$'}
  ]
  this.Relatives = [
    {id:0,Name:'All'},
    {id:1,Name:'Most Recent'},
    {id:2,Name:'Low Price'},
    {id:3,Name:'High Price'},
    {id:3,Name:'Closest Area'}
  ]
  this.Within = [
    {id:0,Name:'All'},
    {id:1,Name:'The last 24 hours'},
    {id:2,Name:'The last 7 days'},
    {id:3,Name:'The last 30 days'}
  ];

  }

filterByCat()
{
  //alert(this.selectedPrice);
  let price = (parseInt(this.selectedPrice) == 1)?1000:(parseInt(this.selectedPrice) == 2)?10000:(parseInt(this.selectedPrice) == 3)?100000:500000;
  this.filteredProducts = this.allProducts.filter(x=>
  ((x.category == this.selectedCategory)||(this.selectedCategory == "All"))&&
  ((x.price < price)||(this.selectedPrice == "All"))
  );

}
}