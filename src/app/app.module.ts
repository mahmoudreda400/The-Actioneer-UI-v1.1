import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegitserComponent } from './regitser/regitser.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminBlockedUsersComponent } from './admin-blocked-users/admin-blocked-users.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegitserComponent,
    HeaderComponent,
    ProductComponent,
    AddProductComponent,
    AdminDashboardComponent,
    AdminReportsComponent,
    AdminBlockedUsersComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
