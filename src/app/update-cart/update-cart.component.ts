import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../quickKart-services/user-service/user.service';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.css']
})
export class UpdateCartComponent implements OnInit {

  productId: string;
  productName: string;
  quantity: number;
  quantityAvailable: number;
  emailId: string;
  status: boolean;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.productName = this.route.snapshot.params['productName'];
    this.quantity = parseInt(this.route.snapshot.params['quantity']);
    this.quantityAvailable = parseInt(this.route.snapshot.params['quantityAvailable']);

    this.emailId = sessionStorage.getItem('emailId');
  }

  updateCart(qty: number) {
    this._userService.updateCartProduct(this.emailId, this.productId, qty).subscribe(
      responseUpdateCartStatus => {
        this.status=responseUpdateCartStatus;
        if (this.status) {
          alert("Product quantity updated successfully.");
        }
        else {
          alert("Product quantity could not be updated. Please check...");
        }
        this.router.navigate(['/viewCart']);
      },
      responseUpdateCartError => {
        this.errorMsg = responseUpdateCartError;
        console.log(this.errorMsg);
        alert("Some error occured, please try after some time.");
      },
      () => console.log("UpdateCart() method executed successfully.")
    );
  }

}
