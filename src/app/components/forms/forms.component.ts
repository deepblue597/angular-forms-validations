import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
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
        subscribe: [false],
        numberOfEmails: [0],
        password: [''],
        confirm: [''],
        address: this.fb.group({
          city: [''],
          addressName: [''],
          postalCode: [''],
        }),
        alternateEmails: this.fb.array([]),
      },
      { validator: [passwordValidator()] }
    );

    // we check if the subsicribe is checked then email is required
    // the valueChanges returns an observable so we subscribe to it
    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });

    // adds the required method to eaxh alternate Email
    // need to uncheck and recheck the checkbox in order to work
    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedValue) => {
        this.alternateEmails.controls.forEach((element) => {
          if (checkedValue) {
            element.setValidators(Validators.required);
          } else {
            element.clearValidators();
          }
          element.updateValueAndValidity();
        });
      });
  }

  loadData() {
    this.registrationForm.setValue({
      //has to contain all the variables to work
      name: 'jason',
      surname: 'kakandris',
      email: 'example@gmail.com',
      subscribe: false,
      password: '123',
      confirm: '123',
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

  get email() {
    //getting the validation without writing this in html every time
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails() {
    const number = this.registrationForm.get('numberOfEmails')?.value;
    for (let i = 0; i < number; i++) {
      this.alternateEmails.push(this.fb.control('')); // pushes more items to formbuilder
    }
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
