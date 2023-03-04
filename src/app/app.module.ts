import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { ViewPurchasesComponent } from './view-purchases/view-purchases.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewRatingsComponent } from './view-ratings/view-ratings.component';
import { HomeComponent } from './home/home.component';
import { RateProductComponent } from './rate-product/rate-product.component';
import { UpdateCartComponent } from './update-cart/update-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductsComponent,
    LoginComponent,
    RegisterComponent,
    FeedbackComponent,
    CommonLayoutComponent,
    CustomerLayoutComponent,
    ViewPurchasesComponent,
    ViewCartComponent,
    ViewRatingsComponent,
    HomeComponent,
    RateProductComponent,
    UpdateCartComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
