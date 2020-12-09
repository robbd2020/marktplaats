import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { Route, RouterModule } from '@angular/router';
import { FormDemoComponent } from './components/form-demo/form-demo.component';
import { HomeComponent } from './pages/home/home';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactRowComponent } from './components/contact-row/contact-row.component';
import { ContactFormModelDrivenComponent } from './components/contact-form-model-driven/contact-form-model-driven.component';
import {HttpClientModule} from "@angular/common/http";
import {ContactNamePipe} from "./pipes/contact-name.pipe";
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Route[] = [
  {path:'datepicker', component: DatePickerComponent},
  {path:'formdemo', component: FormDemoComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [ // componenten van mijzelf
    AppComponent,
    DatePickerComponent,
    FormDemoComponent,
    HomeComponent,
    ContactFormComponent,
    ContactListComponent,
    ContactRowComponent,
    ContactFormModelDrivenComponent,
    ContactNamePipe,
    ProductListComponent,
    ProductRowComponent,
    ProductDetailsComponent
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
