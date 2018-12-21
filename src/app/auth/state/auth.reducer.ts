import {User} from '../../model/user.model';
import {AuthActions, AuthActionTypes} from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: User;
}

const initialAuthState: AuthState = {loggedIn: false, user: undefined};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {loggedIn: true, user: action.user};
    case AuthActionTypes.Logout:
      return {loggedIn: false, user: undefined};
    default:
      return state;
  }
}
