import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, LoginAction, LogoutAction} from './auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {defer, of, SubscribableOrPromise} from 'rxjs';
import {User} from '../../model/user.model';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AuthActionTypes.Login),
    tap(action => {
      localStorage.setItem('user', JSON.stringify(action.user));
    })
  );

  @Effect({dispatch: false})
  logout = this.actions$.pipe(
    ofType<LogoutAction>(AuthActionTypes.Logout),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  init$ = defer((): SubscribableOrPromise<LoginAction | LogoutAction> | void => {
    const userData = localStorage.getItem('user');
    return userData ? of(new LoginAction(JSON.parse(userData) as User)) : of(new LogoutAction());
  });

  constructor(private actions$: Actions, private router: Router) {
  }
}
