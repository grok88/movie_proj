import {applyMiddleware, combineReducers, createStore} from 'redux';
import {AppActionsType, appReducer} from './appReducer';
import {MoviesActionsType, moviesReducer} from './moviesReducer';
import {GenresFilterActionsType, genresFilterReducer} from './genresFilterReducer';
import thunk from 'redux-thunk';
import {MovieActionsType, movieReducer} from './movieReducer';
import {TabMovieActionsType, tabMovieReducer} from './tabMovieReducer';

const rootReducer = combineReducers({
    app: appReducer,
    movies: moviesReducer,
    genresFilter: genresFilterReducer,
    moviePage: movieReducer,
    tabMovie: tabMovieReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

//common actions type
export type TMDBActionType =
    GenresFilterActionsType
    | AppActionsType
    | MoviesActionsType
    | MovieActionsType
    | TabMovieActionsType;
export const store = createStore(rootReducer, applyMiddleware(thunk));