import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';
@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html'
})
export class ContactFormComponent {
    @Output() addEvent = new EventEmitter<Contact>();

    newContact = {} as Contact;

    constructor() { }

    addContact(): void {
        this.addEvent.emit(this.newContact);
        // this.contacts.push(this.newContact);
        this.newContact = {} as Contact;
    }

}


