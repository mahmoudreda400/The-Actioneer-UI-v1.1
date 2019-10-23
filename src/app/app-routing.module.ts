import { BlockedComponent } from './blocked/blocked.component';
import { ReportsComponent } from './reports/reports.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path:'addProduct',
    component: AddProductComponent
  },{
    path:'productDetails',
    component: ProductDetailsComponent
  },{
    path:'profile',
    component: ProfileComponent
  },{
    path:'statistics',
    component: StatisticsComponent
  },{
    path:'reports',
    component: ReportsComponent
  },{
    path:'blocked',
    component: BlockedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
