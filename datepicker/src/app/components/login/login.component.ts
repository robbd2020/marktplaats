import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GebruikerService} from '../../service/gebruiker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private gebruikerService: GebruikerService) {
    this.addLoginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      wachtwoord: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(): void {
    console.log(this.addLoginForm.value());
    this.gebruikerService.getGebruikerMetEmailEnWachtwoord(this.addLoginForm.value());
    this.addLoginForm.reset();
  }

}

// tslint:disable-next-line:typedef
function emailValidator(control: AbstractControl) {
  // required validator should handle empty values
  if (!control.value) {
    return null;
  }
  const regex = /^.+@.+\.[a-zA-Z]+$/;
  return regex.test(control.value) ? null : { email: { valid: false } };
}