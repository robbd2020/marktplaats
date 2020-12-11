import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gebruiker} from '../models/gebruiker';
import {Login} from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  private url = 'http://localhost:9080/mp/resources';

  ingelogdeGebruiker: Gebruiker;

  constructor(private http: HttpClient) {
  }

  getGebruikerMetEmailEnWachtwoord(l: Login): void {
    this.http.post<Gebruiker>(`${this.url}/login`, l).subscribe((g) => {this.ingelogdeGebruiker = g;
                                                                        console.log(this.ingelogdeGebruiker); });
  }

  uitloggen(): void{
    console.log('ik probeer nu uit te loggen');
    console.log(this.ingelogdeGebruiker);
    this.ingelogdeGebruiker = null;
    console.log(this.ingelogdeGebruiker);
  }

  edit(c: Gebruiker): void {
    this.http.put(`${this.url}/${c.id}`, c).subscribe();
  }

  delete(c: Gebruiker): void {
    this.http.delete(`${this.url}/${c.id}`).subscribe();
  }
}
