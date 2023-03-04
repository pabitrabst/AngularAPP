import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPurchase } from '../../quickKart-interfaces/purchase';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  getPurchaseDetailsByEmailId(emailId: string) : Observable<IPurchase[]> {
    let result = this.http.get<IPurchase[]>('https://quickkartonlineservice.azurewebsites.net/api/purchase/getpurchaseDetailsByEmailId?emailId=' + emailId)
    .pipe(catchError(this.errorHandler));
    return result;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message);
  }
}
