import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import {ContactService} from "../../service/contact.service";

@Component({
  selector: 'app-contact-form-model-driven',
  templateUrl: './contact-form-model-driven.component.html',
  styleUrls: ['./contact-form-model-driven.component.css']
})
export class ContactFormModelDrivenComponent {
  addContactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.addContactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      email: ['', [Validators.required, emailValidator]]
    });
  }

  addContact(): void {
    this.contactService.addContact(this.addContactForm.value);
    this.addContactForm.reset();
  }

}

function emailValidator(control: AbstractControl) {
  // required validator should handle empty values
  if (!control.value) {
    return null;
  }
  let regex = /^.+@.+\.[a-zA-Z]+$/;
  return regex.test(control.value) ? null : { email: { valid: false } };
}

