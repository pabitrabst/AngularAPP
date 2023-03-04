import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ICartProduct } from '../../quickKart-interfaces/cartProduct';
import { IUser } from '../../quickKart-interfaces/user';
import { ICart } from '../../quickKart-interfaces/cart';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCartProducts(emailId: string) : Observable<ICartProduct[]> {
    let result = this.http.get<ICartProduct[]>('https://quickkartonlineservice.azurewebsites.net/api/user/GetCartProducts?emailId=' + emailId)
    .pipe(catchError(this.errorHandler));
    return result;
  }

  validateCredentials(id: string, password: string): Observable<string> {
    var userObj: IUser;
    userObj = { emailId: id, userPassword: password, gender: null, roleId: null, dateOfBirth: null, address: null };
    return this.http.post<string>('https://quickkartonlineservice.azurewebsites.net/api/user/ValidateUserCredentials', userObj).pipe(catchError(this.errorHandler));
  }

  addProductToCart(productId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: 1 };
    return this.http.post<boolean>('https://quickkartonlineservice.azurewebsites.net/api/user/AddProductToCart', cartObj).pipe(catchError(this.errorHandler));
  }

  registerUser(userObj: IUser) {
    let result = this.http.post<boolean>('https://quickkartonlineservice.azurewebsites.net/api/User/InsertUserDetails', userObj)
    .pipe(catchError(this.errorHandler));
    return result;
  }

  updateCartProduct(emailId: string, productId: string, qty: number): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: qty };
    return this.http.put<boolean>('https://quickkartonlineservice.azurewebsites.net/api/user/UpdateCartProducts', cartObj).pipe(catchError(this.errorHandler));
  }

  deleteCartProduct(prodId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: prodId, emailId: emailId, quantity: 0 };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: cartObj };
    return this.http.delete<boolean>('https://quickkartonlineservice.azurewebsites.net/api/user/DeleteCartProduct', httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message);
  }
}
