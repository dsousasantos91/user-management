import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const userRoles = this.tokenService.getUserRoles();

    const hasAccess = expectedRoles.some((role) => userRoles.includes(role));
    if (!hasAccess) {
      console.log('Nao authorizado')
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }
}
