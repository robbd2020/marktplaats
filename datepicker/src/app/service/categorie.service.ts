import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Categorie} from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private url = 'http://localhost:9080/mp/resources/categorieen';

  categorieenUpdated$ = new Subject<Categorie[]>();

  constructor(private http: HttpClient) {
  }


  getCategorieen(): Observable<Categorie[]> {
    this.http.get<Categorie[]>(this.url) // get contacts from server
      .subscribe(  // when the results arrive (some time in the future):
        // rise the contactsUpdated event and supply  the contacts
        cats => this.categorieenUpdated$.next(cats)
      );

    // we're using a custom subject here so when adding, editing or
    // deleting contacts, we can use this same observable to notify subscribers
    // of changes.
    return this.categorieenUpdated$;
  }

  edit(c: Categorie): void {
    this.http.put(`${this.url}/${c.id}`, c).subscribe(() => this.getCategorieen());
  }

  delete(c: Categorie): void {
    this.http.delete(`${this.url}/${c.id}`).subscribe(() => this.getCategorieen());
  }
}
