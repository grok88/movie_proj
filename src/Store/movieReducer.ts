import {AddFavoriteBodyType, AddWatchlistBodyType, API, GetMovieDetailsResp, GetMovies} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {changeStatus, setError} from './appReducer';

const initialState = {
    movieDetails: null as GetMovieDetailsResp | null,
    favoriteMovies: null as GetMovies | null,
    statusCode: null as number | null,
    rating: null as null | number
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
        case 'MOVIE/SET-RATING':
            return {
                ...state,
                rating: action.payload
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
export const setRating = (value: number) => {
    return {
        type: 'MOVIE/SET-RATING',
        payload: value
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
        await API.addWatchlist(link, body);
        dispatch(changeStatus('succeeded'));
    } catch (e) {
        dispatch(changeStatus('failed'));
        dispatch(setError(e.response.data.status_message));

        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    }
}
export const setRatingThunk = (link: string, body: { value: number }) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        await API.setRating(link, body);
        dispatch(changeStatus('succeeded'));
        dispatch(setRating(body.value));

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
type SetRatingAC = ReturnType<typeof setRating>;


export type MovieActionsType =
    SetMovieAC
    | SetFavoriteMoviesAC
    | SetFavoriteStatusCodeAC
    | SetRatingAC;
