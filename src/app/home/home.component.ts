import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  imgPath: string = "../../assets/quickKart-images/quickKart.png";
  userRole: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;

  ngOnInit() {

  }

  constructor() {
    this.userRole = sessionStorage.getItem('userRole');

    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  }

}
