
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    SET_LOGIN
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}