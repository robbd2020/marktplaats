import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {GebruikerService} from './gebruiker.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(
    private router: Router,
    private gebruikerService: GebruikerService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const ingelogdeGebruiker = this.gebruikerService.ingelogdeGebruiker;
    if (ingelogdeGebruiker) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
