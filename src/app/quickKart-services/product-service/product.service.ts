import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/quickKart-interfaces/category';
import { IProduct } from 'src/app/quickKart-interfaces/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: IProduct[];
  categories: ICategory[];

  constructor(private http: HttpClient) { }

  getProducts() : Observable<IProduct[]> {
    let result = this.http.get<IProduct[]>('https://quickkartonlineservice.azurewebsites.net/api/product/getproducts')
    .pipe(catchError(this.errorHandler));
    return result;
  }

  getProductCategories() : Observable<ICategory[]> {
    let result = this.http.get<ICategory[]>('https://quickkartonlineservice.azurewebsites.net/api/category/getcategories')
    .pipe(catchError(this.errorHandler));
    return result;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message);
  }
}
