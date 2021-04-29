import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {AppActionsType, appReducer} from './appReducer';
import {MoviesActionsType, moviesReducer} from './moviesReducer';
import {GenresFilterActionsType, genresFilterReducer} from './genresFilterReducer';
import thunk from 'redux-thunk';
import {MovieActionsType, movieReducer} from './movieReducer';
import {TabMovieActionsType, tabMovieReducer} from './tabMovieReducer';
import {personReducer} from './personReducer';

const rootReducer = combineReducers({
    app: appReducer,
    movies: moviesReducer,
    genresFilter: genresFilterReducer,
    moviePage: movieReducer,
    tabMoviePage: tabMovieReducer,
    personPage: personReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

//common actions type
export type TMDBActionType =
    GenresFilterActionsType
    | AppActionsType
    | MoviesActionsType
    | MovieActionsType
    | TabMovieActionsType;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

