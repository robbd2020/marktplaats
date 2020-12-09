import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../models/contact";
import {ContactService} from "../../service/contact.service";
import {Product} from "../../models/product";
import {ProductService} from "../../service/product.service";

@Component({
  selector: '[product-row]',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent {
  @Input() product: Product = {} as Product; // cast leegjs object naar een Contact
  // @Output() del = new  EventEmitter<Contact>();

  constructor(private productService: ProductService) {
  }
  //
  // edit(p: Product): void {
  //   p.edit = !p.edit;
  // }
  //
  // save(c: Contact): void {
  //   this.contact.edit = false;
  //   this.contactService.edit(c);
  // }
  //
  // delete(c: Contact): void {
  //   this.contactService.delete(c);
  // }
}
