import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {authReducer, AuthState} from '../auth/state/auth.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {routerReducer} from '@ngrx/router-store';
import {RouterReducerState} from '@ngrx/router-store/src/router_store_module';

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
