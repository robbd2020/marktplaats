import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {ProductService} from '../../service/product.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
})
export class SearchProductComponent implements OnInit {

  private searchTerms$ = new Subject<string>();

  constructor(private service: ProductService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms$.next(term);
  }

  ngOnInit(): void {
    this.searchTerms$.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),
      // search only with three or more chars
      // filter(value => value.length > 2 ),
      // now execute the search
      map((term: string) => this.service.search(term)),
    ).subscribe();
  }
}
