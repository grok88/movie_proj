import {combineReducers, createStore} from 'redux';
import {appReducer} from './appReducer';
import {moviesReducer} from './moviesReducer';

const rootReducer = combineReducers({
    app:appReducer,
    movies:moviesReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);