import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RatingService } from '../quickKart-services/rating-service/rating.service';

@Component({
  selector: 'app-rate-product',
  templateUrl: './rate-product.component.html',
  styleUrls: ['./rate-product.component.css']
})
export class RateProductComponent implements OnInit {

  rateProductForm: FormGroup;
  prodId: string;
  prodName: string;
  emailId: string;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private _ratingService: RatingService) { }

  ngOnInit(): void {

    this.prodId = this.route.snapshot.params['productId'];
    this.prodName = this.route.snapshot.params['productName'];
    this.emailId = sessionStorage.getItem('emailId');

    this.rateProductForm = this.formBuilder.group({
      productId: [this.prodId],
      productName: [this.prodName],
      rating: ['', Validators.required],
      reviewComments: ['', Validators.required]
    });
  }

  rateProduct(productId: string, productName: string, rating: number, reviewComments: string) {

    this._ratingService.rateProduct(productId, productName, rating, reviewComments, this.emailId)
    .subscribe(
      ratingDataStatus => {
        if (ratingDataStatus) {
          alert('Product rating added successfully');
          this.router.navigate(['/viewRatings']);
        }
      },
      ratingError => {
        this.errorMsg = ratingError;
        alert(this.errorMsg);
      },
      () => console.log("rateProduct() method executed successfully")
    )
  }

  cancel() {
    this.router.navigate(['/viewPurchases']);
  }
}
