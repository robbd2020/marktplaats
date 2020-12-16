import {Component} from '@angular/core';
import {GebruikerService} from '../../service/gebruiker.service';
import {Gebruiker} from '../../models/gebruiker';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../models/categorie';
import {CategorieService} from '../../service/categorie.service';
import {ProductService} from '../../service/product.service';
import {Bezorgwijze} from '../../models/bezorgwijze';

@Component({
  selector: 'app-gebruiker-gegevens',
  templateUrl: './gebruiker-gegevens.component.html',
  styleUrls: ['./gebruiker-gegevens.component.css']
})
export class GebruikerGegevensComponent {

  gebruiker: Gebruiker = this.gebruikerService.ingelogdeGebruiker;
  lock: boolean;
  addGebruikerForm: FormGroup;
  categorieen: Categorie[] = [];
  alleBezorgwijzen: Bezorgwijze[];
  ondersteundeBezorgwijzen: Array<Bezorgwijze>;

  constructor(
    private categorieService: CategorieService,
    private fb: FormBuilder,
    public gebruikerService: GebruikerService,
    public productService: ProductService
  ) {
    this.ondersteundeBezorgwijzen = gebruikerService.ingelogdeGebruiker.ondersteundeBezorgwijzeLijst;
    console.log(this.ondersteundeBezorgwijzen);
    this.lock = true;
    this.alleBezorgwijzen = Object.values(Bezorgwijze);
    this.addGebruikerForm = this.fb.group({
      id: this.gebruiker.id,
      wachtwoord: this.gebruiker.wachtwoord,
      voornaam: [{value: this.gebruiker.voornaam, disabled: this.lock}, [Validators.required]],
      achternaam: [{value: this.gebruiker.achternaam, disabled: this.lock}, [Validators.required]],
      emailadres: [{value: this.gebruiker.emailadres, disabled: this.lock}, [Validators.required, emailValidator]],
      huisnummer: [{
        value: this.gebruiker.huisnummer,
        disabled: this.lock
      }, [Validators.required, Validators.pattern('^[0-9]*$')]],
      huisnummertoevoeging: [{value: this.gebruiker.huisnummertoevoeging, disabled: this.lock}],
      postcode: [{
        value: this.gebruiker.postcode,
        disabled: this.lock
      }, [Validators.required, Validators.pattern('^[1-9][0-9]{3}[\\s]?[A-Za-z]{2}$')]],
      woonplaats: [{
        value: this.gebruiker.woonplaats,
        disabled: this.lock
      }, [Validators.required, Validators.pattern('\\p{L}')]],
      ondersteundeBezorgwijzeLijst: [{value: this.ondersteundeBezorgwijzen, disabled: this.lock}, [Validators.required]]
    });
  }

  addGebruiker(): void {
    this.addGebruikerForm.controls.ondersteundeBezorgwijzeLijst.setValue(this.ondersteundeBezorgwijzen);
    this.gebruikerService.edit(this.addGebruikerForm.value);
    this.changeEditing();
  }

  changeEditing(): void {
    this.lock = !this.lock;
    this.lock ? this.addGebruikerForm.disable() : this.addGebruikerForm.enable();
  }

  onCheckboxChange(e, item: Bezorgwijze): void {
    if (e.target.checked) {
      if (this.ondersteundeBezorgwijzen.indexOf(e.value) < 0) {
        this.ondersteundeBezorgwijzen.push(item);
      }
    } else {
      this.ondersteundeBezorgwijzen = this.ondersteundeBezorgwijzen.filter(obj => obj !== item);
    }
  }

  isChecked(item: Bezorgwijze): boolean {
    return this.ondersteundeBezorgwijzen.indexOf(item) >= 0;
  }
}

// tslint:disable-next-line:typedef
function emailValidator(control: AbstractControl) {
  // required validator should handle empty values
  if (!control.value) {
    return null;
  }
  const regex = /^.+@.+\.[a-zA-Z]+$/;
  return regex.test(control.value) ? null : {email: {valid: false}};
}
