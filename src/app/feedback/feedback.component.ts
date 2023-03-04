import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  msg: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, checkEmail]],
      feedback: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  SubmitForm(form: FormGroup) {
    if (this.feedbackForm.valid) {
      //console.log(form.value.name, form.value.emailId, form.value.feedback);
      this.msg = "Feedback provided Successfully";
    }
    else {
      this.msg = "There's a problem. Please try again";
    }
  }

}

function checkEmail(control: FormControl) {
  var email = control.value;
  if (email.endsWith('@gmail.com')) {
    return null;
  }
  else {
    return {
      emailError: {
        message: "Your email doesn't end with 'gmail.com'"
      }
    };
  }
}
