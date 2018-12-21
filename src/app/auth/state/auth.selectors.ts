import {AppState} from '../../reducers/index';
import {createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducer';

export const selectAuthState = (state: AppState) => state.auth;
export const isLoggedIn = createSelector(selectAuthState, (auth: AuthState) => auth.loggedIn);
export const isLoggedOut = createSelector(isLoggedIn, (loggedIn: boolean) => !loggedIn);
