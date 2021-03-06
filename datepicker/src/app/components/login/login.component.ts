import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GebruikerService} from '../../service/gebruiker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  addLoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public gebruikerService: GebruikerService,
    private router: Router) {
    this.addLoginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      wachtwoord: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(): void {
    // this.addLoginForm.controls.wachtwoord.setValue(shajs('sha256').update(this.addLoginForm.get('wachtwoord')).digest('hex'));
    this.gebruikerService.getGebruikerMetEmailEnWachtwoord(this.addLoginForm.value);
    this.gebruikerService.ingelogd$.subscribe(() => this.router.navigate(['/artikelen']));
    // this.addLoginForm.reset();
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
