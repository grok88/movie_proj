import {AddFavoriteBodyType, AddWatchlistBodyType, API, GetMovieDetailsResp, GetMovies} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {changeStatus, setError} from './appReducer';

const initialState = {
    movieDetails: null as GetMovieDetailsResp | null,
    favoriteMovies: null as GetMovies | null,
    statusCode: null as number | null
}

export type InitialMovieStateType = typeof initialState;

export const movieReducer = (state: InitialMovieStateType = initialState, action: MovieActionsType): InitialMovieStateType => {
    switch (action.type) {
        case 'MOVIE/SET-MOVIE':
            return {
                ...state,
                movieDetails: {...action.payload}
            }
        case 'MOVIE/SET-FAVORITE-MOVIES':
            return {
                ...state,
                favoriteMovies: action.payload
            }
        case 'MOVIE/SET-FAVORITE-STATUS-CODE':
            return {
                ...state,
                statusCode: action.payload
            }
        default:
            return state;
    }
}

//actions
export const setMovie = (movie: GetMovieDetailsResp) => {
    return {
        type: 'MOVIE/SET-MOVIE',
        payload: movie
    } as const;
}
export const setFavoriteMovies = (movies: GetMovies) => {
    return {
        type: 'MOVIE/SET-FAVORITE-MOVIES',
        payload: movies
    } as const;
}
export const setFavoriteStatusCode = (statusCode: number) => {
    return {
        type: 'MOVIE/SET-FAVORITE-STATUS-CODE',
        payload: statusCode
    } as const;
}

//thunks
export const getMovieDetails = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getMovieDetails(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setMovie(data));
        console.log(data)
    } catch (e) {
        dispatch(changeStatus('failed'));
        console.log(e.message);
    }
}
export const getFavoriteList = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getFavoriteList(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setFavoriteMovies(data));
        console.log(data)
    } catch (e) {
        dispatch(changeStatus('failed'));
        console.log(e.message);
    }
}


export const addFavorite = (link: string, body: AddFavoriteBodyType) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.addFavorite(link, body);
        dispatch(changeStatus('succeeded'));
        dispatch(setFavoriteStatusCode(data.status_code));
        console.log(data)
    } catch (e) {
        dispatch(changeStatus('failed'));
        dispatch(setError(e.response.data.status_message));

        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    }
}
export const addWatchlist = (link: string, body: AddWatchlistBodyType) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.addWatchlist(link, body);
        dispatch(changeStatus('succeeded'));
        console.log(data)
    } catch (e) {
        dispatch(changeStatus('failed'));
        dispatch(setError(e.response.data.status_message));

        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    }
}


//types
type SetMovieAC = ReturnType<typeof setMovie>;
type SetFavoriteMoviesAC = ReturnType<typeof setFavoriteMovies>;
type SetFavoriteStatusCodeAC = ReturnType<typeof setFavoriteStatusCode>;


export type MovieActionsType =
    SetMovieAC
    | SetFavoriteMoviesAC
    | SetFavoriteStatusCodeAC;
