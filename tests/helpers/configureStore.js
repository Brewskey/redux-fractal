import localReducer from '../../src/localReducer.js';
import { createStore, combineReducers } from 'redux';
import { combineReducers as immutableCombineReducers } from 'redux-immutable';
import Immutable from 'immutable';

export function configureStore(asImmutable = false) {
  const initalState = asImmutable ? Immutable.Map({}) : {};
  const combiner    = asImmutable ? immutableCombineReducers : combineReducers;
  const store = createStore(
            combiner({
              local: localReducer,
              isVisible: (state = true, action) => {
                switch (action.type) {
                  case 'CLOSE':
                    return false;
                  default:
                    return state;
                }
              },
              someGlobalState: (state = { isGlobal: true }, action) => {
                switch (action.type) {
                  case 'SET_GLOBAL':
                    return Object.assign({}, state, { isGlobal: action.payload });
                  default:
                    return state;
                }
              },
            }),
            initalState
        );
  return store;
}

export const Store = configureStore();
