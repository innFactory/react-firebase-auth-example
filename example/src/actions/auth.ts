import { Action, ActionType } from '../model/model';

export function setLogin(login: boolean): Action<boolean> {

    return {
        type: ActionType.SET_LOGIN,
        payload: login
    };
}