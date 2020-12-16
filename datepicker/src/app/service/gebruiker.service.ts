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
  bericht$ = new Subject<string>();


  constructor(private http: HttpClient, private router: Router) {
  }

  getGebruikerMetEmailEnWachtwoord(l: Login): void {
    this.http.post<Gebruiker>(`${this.url}/login`, l).subscribe((data) => {
      this.ingelogdeGebruiker = data;
      this.ingelogd$.next(data);
    },  error => this.bericht$.next('Inlogpoging gefaald. Probeer opnieuw!'));
  }

  uitloggen(): void {
    this.ingelogdeGebruiker = null;
    this.router.navigate(['/login']);
  }

  getIngelogdeGebruiker(g: Gebruiker): void {
    this.http.get<Gebruiker>(`${this.url}/gebruikers/` + g.id).subscribe((data) =>
      this.ingelogdeGebruiker = data );
  }

  edit(c: Gebruiker): void {
    this.http.put(`${this.url}/gebruikers/${this.ingelogdeGebruiker.id}`, c).subscribe((data) => {
      this.getIngelogdeGebruiker(c);
      this.bericht$.next('Gebruikergegevens zijn aangepast');
    }, error => { this.bericht$.next('Foutmelding: ' + error.getMessage());
    });
  }

  delete(c: Gebruiker): void {
    this.http.delete(`${this.url}/gebruikers/${c.id}`).subscribe();
  }
}
