import { Component, OnInit } from '@angular/core';
import { UserService } from '../quickKart-services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status: string;
  msg: string;
  userRole: string;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLoginForm(form: any) {
    this._userService.validateCredentials(form.value.email, form.value.password).subscribe(
      responseLoginStatus => {
        this.status = responseLoginStatus;
        if (this.status.toLowerCase() != "invalid credentials") {
          sessionStorage.setItem('emailId', form.value.email);
          sessionStorage.setItem('userRole', this.status);
          this.router.navigate(['/home']);
        }
        else {
          this.msg = this.status + ". Please try again.";
        }
      },
      responseLoginError => {
        this.msg = responseLoginError;
      },
      () => console.log("submitLoginForm() method executed successfully")
    )
  }

}
