import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { RegisterComponent } from './register/register.component';
import { ViewPurchasesComponent } from './view-purchases/view-purchases.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewRatingsComponent } from './view-ratings/view-ratings.component';
import { AuthGuardService } from './quickKart-services/auth-service/auth-guard.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { RateProductComponent } from './rate-product/rate-product.component';
import { UpdateCartComponent } from './update-cart/update-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viewProducts', component: ViewProductsComponent },
  { path: 'viewPurchases', component: ViewPurchasesComponent, canActivate: [AuthGuardService] },
  { path: 'viewCart', component: ViewCartComponent, canActivate: [AuthGuardService] },
  { path: 'viewRatings', component: ViewRatingsComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'rateProduct/:productId/:productName', component: RateProductComponent },
  { path: 'updateCart/:productId/:productName/:quantity/:quantityAvailable', component: UpdateCartComponent },
  { path: '**', component: LoginComponent }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
