import {API, GetMovieDetailsResp} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';

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
    try {
        let data = await API.getMovieDetails(link);
        dispatch(setMovie(data));
        console.log(data)
    } catch (e) {
        console.log(e.message);
    }
}

export type AddFavoriteBodyType = {
    media_type: string
    media_id: number
    favorite: boolean
}
export const addFavorite = (link: string, body: AddFavoriteBodyType) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    debugger
    try {
        let data = await API.addFavorite(link, body);
        console.log(data)
    } catch (e) {
        console.log(e.message);
    }
}


//types
type SetMovieAC = ReturnType<typeof setMovie>


export type MovieActionsType =
    SetMovieAC
