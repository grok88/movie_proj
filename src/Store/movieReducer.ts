import {AddFavoriteBodyType, AddWatchlistBodyType, API, GetMovieDetailsResp} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {changeStatus} from './appReducer';

const initialState = {
    movieDetails: null as GetMovieDetailsResp | null
}

export type InitialMovieStateType = typeof initialState;

export const movieReducer = (state: InitialMovieStateType = initialState, action: MovieActionsType): InitialMovieStateType => {
    switch (action.type) {
        case 'MOVIE/SET-MOVIE':
            return {
                ...state,
                movieDetails: {...action.payload}
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


export const addFavorite = (link: string, body: AddFavoriteBodyType) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.addFavorite(link, body);
        dispatch(changeStatus('succeeded'));
        console.log(data)
    } catch (e) {
        dispatch(changeStatus('failed'));
        console.log(e.message);
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
        console.log(e.message);
    }
}


//types
type SetMovieAC = ReturnType<typeof setMovie>


export type MovieActionsType =
    SetMovieAC
