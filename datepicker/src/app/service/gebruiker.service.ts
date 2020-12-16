import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gebruiker} from '../models/gebruiker';
import {Login} from '../models/login';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {serverUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  private url = serverUrl;

  ingelogdeGebruiker: Gebruiker;
  ingelogd$ = new Subject<Gebruiker>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getGebruikerMetEmailEnWachtwoord(l: Login): void {
    this.http.post<Gebruiker>(`${this.url}/login`, l).subscribe((data) => {
      this.ingelogdeGebruiker = data;
      this.ingelogd$.next(data);
    });
  }

  uitloggen(): void {
    this.ingelogdeGebruiker = null;
    this.router.navigate(['/login']);
  }


  edit(c: Gebruiker): void {
    this.http.put(`${this.url}/gebruikers/${this.ingelogdeGebruiker.id}`, c).subscribe();
  }

  delete(c: Gebruiker): void {
    this.http.delete(`${this.url}/gebruikers/${c.id}`).subscribe();
  }
}
