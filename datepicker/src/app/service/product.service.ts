import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:9080/mp/resources/producten';

  productenUpdated = new Subject<Product[]>(); // event, can contain Product[]

  constructor(private http: HttpClient) {
  }

  productList: Product[] = [];

  // addContact(c: Contact): void {
  //   this.http.post<Contact>(this.url, c) // post contact to server
  //     .subscribe(() => this.getContacts());  // when posted: getAll (refresh)
  // }

  getProducten(): Observable<Product[]> {
    this.http.get<Product[]>(this.url) // get contacts from server
      .subscribe(  // when the results arrive (some time in the future):
        // rise the contactsUpdated event and supply  the contacts
        producten => this.productenUpdated.next(producten)
      );

    // we're using a custom subject here so when adding, editing or
    // deleting contacts, we can use this same observable to notify subscribers
    // of changes.
    return this.productenUpdated;
  }

  search(term: string): void {
    // return !term.trim() ?
    //   of([]) :
    const trimmedTerm = term.trim();
    this.http.get<Product[]>(`${this.url}/zoeken/?q=${trimmedTerm}`)
      .subscribe(products => this.productenUpdated.next(products));
  }

  edit(c: Product): void {
    this.http.put(`${this.url}/${c.id}`, c).subscribe(() => this.getProducten());
  }

  delete(c: Product): void {
    this.http.delete(`${this.url}/${c.id}`).subscribe(() => this.getProducten());
  }
}
