import { User } from '../user.model';
import { Action } from '@ngrx/store';

export interface State {
  user: User;
}

const initialState = {
  user: null,
};

export function authReducer(state = initialState, action: Action) {
  return state;
}
