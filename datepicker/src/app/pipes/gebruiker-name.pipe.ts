import {Pipe, PipeTransform} from '@angular/core';
import {Gebruiker} from '../models/gebruiker';

@Pipe({name: 'gebruikerName'})
export class GebruikerNamePipe implements PipeTransform {
  private naamwoonplaats: string;
  transform(gebruiker: Gebruiker): any {
    this.naamwoonplaats = gebruiker.woonplaats === undefined ? `` : ` uit ${gebruiker.woonplaats}`;

    return `${gebruiker.voornaam} ${gebruiker.achternaam}${this.naamwoonplaats}`;
  }

}
