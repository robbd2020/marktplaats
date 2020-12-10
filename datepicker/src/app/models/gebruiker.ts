import {Winkelwagen} from "./winkelwagen";

export interface Gebruiker {
  id?: number;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  wachtwoord?: string;
  postcode?: string;
  woonplaats?: string;
  huisnummer?: number;
  huisnummertoevoeging?: string;
  isActief?: boolean;
  winkelwagen: Winkelwagen;

}
