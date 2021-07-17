import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  constructor() {}
  userForm: FormGroup;
  ngOnInit(): void {
    this.userForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      informations_payment: new FormGroup({
        cardType: new FormControl('', Validators.required),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        date: new FormControl(''),
        code: new FormControl(''),
      }),
    });
  }
  onClick() {
    console.log(this.userForm.value);
  }

  get nom() {
    return this.userForm.get('nom');
  }

  get email() {
    return this.userForm.get('email');
  }

  get cardType() {
    return this.userForm.get('informations_payment').get('cardType');
  }

  get cardNumber() {
    return this.userForm.get('informations_payment').get('cardNumber');
  }

  get date() {
    return this.userForm.get('informations_payment').get('date');
  }

  get code() {
    return this.userForm.get('informations_payment').get('code');
  }
}
