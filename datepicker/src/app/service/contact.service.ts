import {Injectable} from '@angular/core';
import {Contact} from '../models/contact';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = 'http://localhost:9080/rest_war_exploded/resources/contacts';

  contactsUpdated$ = new Subject<Contact[]>(); // event, can contain Contact[]

  constructor(private http: HttpClient) {
  }

  contactsList: Contact[] = [];

  addContact(c: Contact): void {
    this.http.post<Contact>(this.url, c) // post contact to server
      .subscribe(() => this.getContacts());  // when posted: getAll (refresh)
  }

  getContacts(): Observable<Contact[]> {
    this.http.get<Contact[]>(this.url) // get contacts from server
      .subscribe(  // when the results arrive (some time in the future):
        // rise the contactsUpdated event and supply  the contacts
        contacts => this.contactsUpdated$.next(contacts)
      );

    // we're using a custom subject here so when adding, editing or
    // deleting contacts, we can use this same observable to notify subscribers
    // of changes.
    return this.contactsUpdated$;
  }

  edit(c: Contact): void {
    this.http.put(`${this.url}/${c.id}`, c).subscribe(() => this.getContacts());
  }

  delete(c: Contact): void {
    this.http.delete(`${this.url}/${c.id}`).subscribe(() => this.getContacts());
  }
}
