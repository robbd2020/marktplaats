import {Component, OnInit} from '@angular/core';
import {Contact} from 'src/app/models/contact';
import {ContactService} from '../../service/contact.service';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  ngOnInit(): void {
    const contactsUpdated$ = this.contactService.getContacts();

    contactsUpdated$.subscribe(contacts => {
      this.contacts = contacts;
    });
  }


  constructor(private contactService: ContactService) {
  }

}
