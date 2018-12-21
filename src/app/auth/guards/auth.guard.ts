import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {isLoggedIn} from '../state/auth.selectors';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn: boolean) => this.redirect(loggedIn))
    );
  }

  private redirect(loggedIn: boolean): void {
    if (!loggedIn) {
      this.router.navigateByUrl('/login');
    }
  }
}

