import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Input() popup: boolean;
  @Output() close = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.popup = false;
    this.close.emit(this.popup);

  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  titleCaseWord(word: string): string {
    if (!word) { return word; }
    return ' ' + word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
