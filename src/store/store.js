import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { countReducer } from './countReducer';
import { boardReducer } from './boardReducer';

const rootReducer = combineReducers({
  boardReducer,
  countReducer,
});

export const store = configureStore({ reducer: rootReducer });
