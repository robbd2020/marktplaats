import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductOverviewComponent} from './components/product-overview/product-overview.component';
import {AuthGuard} from './service/authguard';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: '', component: ProductOverviewComponent, canActivate: [AuthGuard] },
  // { path: '', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
