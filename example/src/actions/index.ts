import * as AuthActions from './auth';
import * as TodoActions from './todo';

export const ActionCreators = Object.assign({}, TodoActions, AuthActions);
