import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRating } from '../../quickKart-interfaces/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatings(emailId: string) : Observable<IRating[]> {
    //let result = [{"emailId" : "Albert@gmail.com", "productId": "P155", "productName": "Teddy bear", "reviewRating" : 4, "reviewComments" : "Good product"}];
    let result = this.http.get<IRating[]>('https://quickkartonlineservice.azurewebsites.net/api/Rating/DisplayAllReviewDetailsByEmailId?emailId=' + emailId)
    .pipe(catchError(this.errorHandler));
    return result;
  }

  rateProduct(productId: string, productName: string, rating: number, reviewComments: string, emailId: string) : Observable<boolean> {
    let ratingObj : IRating = { productId: productId, productName: productName, reviewRating: rating, reviewComments: reviewComments, emailId: emailId };
    let result = this.http.post<boolean>('https://quickkartonlineservice.azurewebsites.net/api/Rating/InsertRating', ratingObj)
    .pipe(catchError(this.errorHandler));
    return result;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message);
  }
}
