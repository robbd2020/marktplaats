import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  popup: boolean;
  product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
