import {Component, Input} from '@angular/core';
import {Product} from '../../models/product';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[product-row]',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent {
  @Input() product: Product = {} as Product; // cast leegjs object naar een Contact

  constructor() {
  }
}
