import { Component, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {ContactService} from '../../service/contact.service';
import {Product} from '../../models/product';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  popup: boolean;
  product: Product;

  ngOnInit(): void {
    const productsUpdated$ = this.productService.getProducten();

    productsUpdated$.subscribe(products => {
      this.products = products;
    });
  }


  constructor(private productService: ProductService) {
  }

  handleClick(product: Product): void{
    this.product = product;
    this.popup = true;
  }
}
