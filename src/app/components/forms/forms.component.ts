import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group({
    name: ['jason'],
    surname: [''],
    email: [''],
    address: [''],
  });

  ngOnInit(): void {}
}
