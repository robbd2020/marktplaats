import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductOverviewComponent} from './components/product-overview/product-overview.component';
import {AuthGuard} from './service/authguard';
import {LoginComponent} from './components/login/login.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {GebruikerGegevensComponent} from './components/gebruiker-gegevens/gebruiker-gegevens.component';

const routes: Routes = [
  { path: 'artikelen', component: ProductOverviewComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'producttoevoegen', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'account', component: GebruikerGegevensComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
