import { Component, OnInit } from '@angular/core';
import { ICartProduct } from '../quickKart-interfaces/cartProduct';
import { UserService } from '../quickKart-services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  cartProducts: ICartProduct[];
  errorMsg: string;
  emailId: string;
  userRole: string;
  imgPath: string;
  status: boolean;

  constructor(private _userService: UserService, private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.emailId = sessionStorage.getItem('emailId');
    this.imgPath = "../../assets/quickKart-images/delete-item.jpg";
  }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this._userService.getCartProducts(this.emailId).subscribe(
      responseCartProductsData => {
        this.cartProducts = responseCartProductsData;
      },
      responseCartProductError => {
        this.cartProducts = null;
        this.errorMsg = responseCartProductError;
      },
      () => console.log("getCartProducts() method executed successfully")
    );
  }

  updateCart(prod: ICartProduct) {
    this.router.navigate(['/updateCart', prod.productId, prod.productName, prod.quantity, prod.quantityAvailable]);
  }

  removeProductFromCart(prod: ICartProduct) {
    this._userService.deleteCartProduct(prod.productId, this.emailId).subscribe(
      responseRemoveCartProductStatus => {
        this.status = responseRemoveCartProductStatus;
        if (this.status) {
          alert("Product deleted successfully.");
          this.ngOnInit();
        }
        else {
          alert("Product could not be deleted. Please try after sometime.");
        }
      },
      responseRemoveCartProductError => {
        this.errorMsg = responseRemoveCartProductError;
        alert("Something went wrong. Please try after sometime.");
      },
      () => console.log("RemoveProductFromCart method executed successfully")
    );
  }
}
