
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { Todo } from '../model/model';
import * as authReducer from './auth';
import * as todoReducder from './todo';

export interface RootState {
  todoList: Array<Todo>;
  isLogin: boolean;
}

export default (history: History) => combineReducers({
  router: connectRouter(history),
  ...todoReducder,
  ...authReducer
});