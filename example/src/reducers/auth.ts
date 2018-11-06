import { Action, ActionType } from '../model/model';
import createReducer from './createReducer';

export const isLogin = createReducer(false, {
    [ActionType.SET_LOGIN](state: boolean, action: Action<boolean>) {
        return action.payload;
    },
});
