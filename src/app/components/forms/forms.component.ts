import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  forbiddenNameValidator,
  passwordValidator,
} from 'src/app/validators/form-validators';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          forbiddenNameValidator(/admin/), //in angular doc it says /admin/i but i dont see any difference
        ],
      ],
      surname: [''],
      email: [''],
      password: [''],
      confirm: [''],
      address: this.fb.group({
        city: [''],
        addressName: [''],
        postalCode: [''],
      }),
    },
    { validator: [passwordValidator()] }
  );

  ngOnInit(): void {}

  loadData() {
    this.registrationForm.setValue({
      //has to contain all the variables to work
      name: 'jason',
      surname: 'kakandris',
      email: 'example@gmail.com',
      address: {
        city: 'thessaloniki',
        addressName: 'skaltsouni',
        postalCode: '54637',
      },
    });
  }
  loadName() {
    this.registrationForm.patchValue({
      // can work with some variables
      name: 'socos',
      surname: 'sikis',
      email: 'papaki@gmail.com',
    });
  }

  get name() {
    //getting the validation without writing this in html every time
    return this.registrationForm.get('name');
  }
}
