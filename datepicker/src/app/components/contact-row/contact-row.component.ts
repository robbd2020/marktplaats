import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import {ContactService} from '../../service/contact.service';

@Component({
  selector: '[contact-row]',
  templateUrl: './contact-row.component.html',
  styleUrls: ['./contact-row.component.css']
})
export class ContactRowComponent {
  @Input() contact: Contact = {} as Contact; // cast leegjs object naar een Contact
  // @Output() del = new  EventEmitter<Contact>();

  constructor(private contactService: ContactService) {
  }

  edit(c: Contact): void {
    c.edit = !c.edit;
  }

  save(c: Contact): void {
    this.contact.edit = false;
    this.contactService.edit(c);
  }

  delete(c: Contact): void {
    this.contactService.delete(c);
  }
}
