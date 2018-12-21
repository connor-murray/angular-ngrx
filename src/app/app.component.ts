import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './reducers';
import {LogoutAction} from './auth/state/auth.actions';
import {Observable} from 'rxjs';
import {isLoggedIn, isLoggedOut} from './auth/state/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}
