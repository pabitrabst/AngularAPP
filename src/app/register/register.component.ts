import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../quickKart-interfaces/user';
import { UserService } from '../quickKart-services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: IUser;
  status: boolean;

  constructor(private formBuilder: FormBuilder, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      dateOfbirth: ['', [Validators.required, checkDate]],
      address: ['', Validators.required]
    });
  }

  SubmitForm(form: FormGroup) {
    if(this.registerForm.valid) {
      this.user = { emailId: form.value.emailId, userPassword: form.value.password, roleId: 2, gender: form.value.gender, dateOfBirth: form.value.dateOfbirth, address: form.value.address };

      this._userService.registerUser(this.user).subscribe(
        responseRegisterStatus => {
          if (responseRegisterStatus) {
            this.status = responseRegisterStatus;
            alert('User registered successfully');
            this.router.navigate(['/login']);
          }
          else {
            alert('Your account already exists with us...');
            this.ngOnInit();
          }
        },
        responseError => {
          alert(responseError);
        },
        () => console.log("registerUser() method executed successfully")
      )
    }
  }

}


function checkDate(control: FormControl) {
  var currentDate = new Date();
  var givenDate = new Date(control.value)

  if (givenDate <= currentDate || givenDate == null) {
    return null
  }
  else {
    return {
      dateError: {
        message: "Enter a date less than today's date"
      }
    };
  }
}
