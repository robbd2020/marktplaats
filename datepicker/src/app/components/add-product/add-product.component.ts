import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GebruikerService} from '../../service/gebruiker.service';
import {ProductService} from '../../service/product.service';
import {Categorie} from '../../models/categorie';
import {CategorieService} from '../../service/categorie.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  categorieen: Categorie[] = [];


  constructor(
    private categorieService: CategorieService,
    private fb: FormBuilder,
    public gebruikerService: GebruikerService,
    public productService: ProductService
  ) {
    this.addProductForm = this.fb.group({
      naam: ['', [Validators.required, Validators.maxLength(50)]],
      beschrijving: ['', [Validators.required, Validators.maxLength(250)]],
      prijs: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0), Validators.max(2500)]],
      bezorgwijze: this.fb.array([], [Validators.required]),
      categorie: ['', [Validators.required, Validators.minLength(8)]],
      aanbieder: this.gebruikerService.ingelogdeGebruiker
    });
  }


  ngOnInit(): void {
    const categorieenUpdated$ = this.categorieService.getCategorieen();

    categorieenUpdated$.subscribe(cs => {
      this.categorieen = cs;
    });
  }


  addProduct(): void {
    this.productService.addProduct(this.addProductForm.value);
    this.addProductForm.reset();
    this.clearCheckboxes();
  }

  clearCheckboxes(): void {
    const checkArray: FormArray = this.addProductForm.get('bezorgwijze') as FormArray;
    checkArray.clear();
  }

  onCheckboxChange(e): void {
    const checkArray: FormArray = this.addProductForm.get('bezorgwijze') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
