import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { Route, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {GebruikerNamePipe} from './pipes/gebruiker-name.pipe';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import {BezorgwijzePipe} from './pipes/bezorgwijze.pipe';
import { GebruikerGegevensComponent } from './components/gebruiker-gegevens/gebruiker-gegevens.component';

const routes: Route[] = [
  {path: 'producten', component: ProductOverviewComponent},
  {path: '', component: ProductOverviewComponent}
];

@NgModule({
  declarations: [ // componenten van mijzelf
    AppComponent,
    ProductOverviewComponent,
    GebruikerNamePipe,
    BezorgwijzePipe,
    ProductListComponent,
    ProductRowComponent,
    ProductDetailsComponent,
    SearchProductComponent,
    LoginComponent,
    AddProductComponent,
    GebruikerGegevensComponent
  ],
  imports: [      // componenten van een ander die ik nodig heb
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
