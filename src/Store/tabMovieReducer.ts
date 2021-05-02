import {ActingRespType, API, GetMovies} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {changeStatus} from './appReducer';

const initialState = {
    actorsDetails: null as ActingRespType | null,
    // similarMovies: null as GetMovies | null
    similarMovies: {} as GetMovies
}

export type InitialTabMovieReducerType = typeof initialState;

export const tabMovieReducer = (state: InitialTabMovieReducerType = initialState, action: TabMovieActionsType): InitialTabMovieReducerType => {
    switch (action.type) {
        case 'TAB-MOVIE/SET-ACTORS-DETAILS':
            return {
                ...state, actorsDetails: action.payload
            }
        case 'TAB-MOVIE/SET-SIMILAR-MOVIES':
            return {
                ...state,
                similarMovies: action.payload
            }
        case 'TAB-MOVIE/CHANGE-SIMILAR-PAGE':
            return {
                ...state,
                similarMovies: {
                    ...state.similarMovies,
                    page: action.payload
                }
            }
        default:
            return state;
    }

}
//actions


export const setActorsDetails = (actorsDetails: ActingRespType) => {
    return {
        type: 'TAB-MOVIE/SET-ACTORS-DETAILS',
        payload: actorsDetails
    } as const;
}
export const setSimilarMovies = (similarMovies: GetMovies) => {
    return {
        type: 'TAB-MOVIE/SET-SIMILAR-MOVIES',
        payload: similarMovies
    } as const;
}
export const changeSimilarMoviePage = (page: number) => {
    return {
        type: 'TAB-MOVIE/CHANGE-SIMILAR-PAGE',
        payload: page
    } as const
}

//thunks
export const getActorsDetails = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getActing(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setActorsDetails(data))
    } catch (e) {
        dispatch(changeStatus('failed'));
        console.log(e.message);
    }
}
export const getSimilarMovies = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getSimilarMovie(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setSimilarMovies(data))
    } catch (e) {
        dispatch(changeStatus('failed'));
        console.log(e.message);
    }
}

//types
type SetActorsDetailsAC = ReturnType<typeof setActorsDetails>
type SetSimilarMoviesAC = ReturnType<typeof setSimilarMovies>
type ChangeSimilarMoviePageAC = ReturnType<typeof changeSimilarMoviePage>


export type TabMovieActionsType =
    SetActorsDetailsAC
    | SetSimilarMoviesAC
    | ChangeSimilarMoviePageAC;
