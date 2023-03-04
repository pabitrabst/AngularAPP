import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../quickKart-interfaces/purchase';
import { PurchaseService } from '../quickKart-services/purchase-service/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-purchases',
  templateUrl: './view-purchases.component.html',
  styleUrls: ['./view-purchases.component.css']
})
export class ViewPurchasesComponent implements OnInit {

  purchases: IPurchase[];
  errorMsg: string;
  userRole: string;
  emailId: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;

  constructor(private _purchaseService: PurchaseService, private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.emailId = sessionStorage.getItem('emailId');

    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  }

  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases() {
    this._purchaseService.getPurchaseDetailsByEmailId(this.emailId).subscribe(
      responsePurchaseData => {
        this.purchases = responsePurchaseData
      },
      responseErrorData => {
        this.purchases = null;
        this.errorMsg = responseErrorData;
      },
      () => console.log("getPurchaseDetailsByEmailId() method executed successfully")
    );
  }

  rateProduct(productId: string, productName: string) {
    this.router.navigate(['/rateProduct', productId, productName]);
  }
}
