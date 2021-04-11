import {combineReducers, createStore} from 'redux';
import {appReducer} from './appReducer';

const rootReducer = combineReducers({
    app:appReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);