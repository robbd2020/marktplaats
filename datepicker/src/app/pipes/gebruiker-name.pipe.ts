import {Pipe, PipeTransform} from "@angular/core";
import {Gebruiker} from "../models/gebruiker";

@Pipe({name: 'gebruikerName'})
export class GebruikerNamePipe implements PipeTransform {
  transform(gebruiker: Gebruiker): any {
    return `${gebruiker.voornaam} ${gebruiker.achternaam} uit ${gebruiker.woonplaats}`;
  }

}
