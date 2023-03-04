import { Component, OnInit } from '@angular/core';
import { RatingService } from '../quickKart-services/rating-service/rating.service';
import { IRating } from '../quickKart-interfaces/rating';

@Component({
  selector: 'app-view-ratings',
  templateUrl: './view-ratings.component.html',
  styleUrls: ['./view-ratings.component.css']
})
export class ViewRatingsComponent implements OnInit {

  ratings: IRating[];
  emailId: string;
  errorMsg: string;

  constructor(private _ratingService: RatingService) {
  }

  ngOnInit(): void {
    this.emailId = sessionStorage.getItem('emailId');
    this.getRatings();
  }

  getRatings() {

    this._ratingService.getRatings(this.emailId).subscribe(
      responseRatingData => {
        this.ratings = responseRatingData;
      },
      responseRatingError => {
        this.ratings = null;
        this.errorMsg = responseRatingError;
      },
      () => console.log("getRatings() method executed successfully")
    )
  }

}
