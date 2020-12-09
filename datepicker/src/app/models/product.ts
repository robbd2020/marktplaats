import {Bezorgwijze} from "./bezorgwijze";
import {Winkelwagen} from "./winkelwagen";
import {Categorie} from "./categorie";
import {Gebruiker} from "./gebruiker";

export interface Product {
  id?: number;
  aanbieder: Gebruiker;
  plaatsingsdatum?: string;
  beschrijving: string;
  categorie: Categorie;
  naam: string;
  prijs: number;
  bezorgwijze: Bezorgwijze[];
  winkelwagen?: Winkelwagen;
  koper?: Gebruiker;
}
