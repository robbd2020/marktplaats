import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:9080/mp/resources/producten';

  productenUpdated = new Subject<Product[]>(); // event, can contain Product[]
  bericht$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }


  addProduct(product: Product): void {
    this.http.post<Product>(this.url, product) // post contact to server
      .subscribe(data => {
        this.getProducten();
        this.bericht$.next(`Product ${data.naam} is toegevoegd.`);
      },
        error => {
        this.bericht$.next(`Het toevoegen van het product is helaas mislukt. Reden: ${error.statusText}`);
        });  // when posted: getAll (refresh)
  }

  getProducten(): Observable<Product[]> {
    this.http.get<Product[]>(this.url) // get contacts from server
      .subscribe(  // when the results arrive (some time in the future):
        // rise the contactsUpdated event and supply  the contacts
        data => this.productenUpdated.next(data)
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
