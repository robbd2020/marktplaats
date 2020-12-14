import { Component } from '@angular/core';
import {GebruikerService} from './service/gebruiker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'artikelen';
  today = new Date();


  constructor(public gebruikerService: GebruikerService){}

}
