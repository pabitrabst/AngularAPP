import { Component, OnInit } from '@angular/core';
import { IProduct } from '../quickKart-interfaces/product';
import { ICategory } from '../quickKart-interfaces/category';
import { ProductService } from '../quickKart-services/product-service/product.service';
import { UserService } from '../quickKart-services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: IProduct[];
  categories: ICategory[];
  filteredProducts: IProduct[];
  addToCartImgPath: string = "../assets/quickKart-images/add-item.jpg";

  errorMsg: string;
  userRole: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  emailId: string;

  constructor(private _productService: ProductService, private _userService: UserService, private router: Router) {

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

    this._productService.getProducts().subscribe(
      responseProductData => {
        this.products = responseProductData,
        this.filteredProducts = responseProductData
      },
      responseErrorData => {
        this.products = null;
        this.filteredProducts = null;
        this.errorMsg = responseErrorData;
      },
      () => console.log("getProducts() method executed successfully")
    );

    this._productService.getProductCategories().subscribe(
      responseCategoryData => {
        this.categories = responseCategoryData;
      },
      responseErrorData => {
        this.categories = null;
        this.errorMsg = responseErrorData;
      },
      () => console.log("getProductCategories() method executed successfully")
    );

    this.filteredProducts = this.products;
  }

  searchProductByCategory(categoryId: string) {
    this.filteredProducts = this.products;
    if (categoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryId.toString() == categoryId);
    }
  }

  searchProductByName(productName: string, catId: string) {
    this.searchProductByCategory(catId);
    if (productName != "") {
      this.filteredProducts = this.filteredProducts
        .filter(prod => prod.productName.includes(productName));
    }
  }

  addToCart(prod: IProduct) {
    if (this.userRole == null) {
      this.router.navigate(['/login']);
    }
    else {
      this._userService.addProductToCart(prod.productId, this.emailId)
        .subscribe(
          responseProductData => {
            if (responseProductData) {
              alert("Product added sucessfully.")
            }
          },
          responseProductError => {
            this.errorMsg = responseProductError,
            alert("Sorry, something went wrong. Please try again after sometime.")
          },
          () => console.log("addToCart() method executed successfully")
        );
    }
  }
}
