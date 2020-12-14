import {Component, OnInit} from '@angular/core';
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
  selectedProduct: Product;

  ngOnInit(): void {
    const productsUpdated$ = this.productService.getProducten();

    productsUpdated$.subscribe(products => {
      this.products = products;
    });
  }


  constructor(private productService: ProductService) {
  }

  handleClick(product: Product): void {
    this.selectedProduct = product;
    this.popup = true;
  }
}
