import {ActingRespType, API} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';

const initialState = {
    actorsDetails: null as ActingRespType | null
}

export type InitialTabMovieReducerType = typeof initialState;

export const tabMovieReducer = (state: InitialTabMovieReducerType = initialState, action: TabMovieActionsType): InitialTabMovieReducerType => {
    switch (action.type) {
        case 'TAB-MOVIE/SET-ACTORS-DETAILS':
            return {
                ...state, actorsDetails: action.payload
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

//thunks
export const getActorsDetails = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    try {
        let data = await API.getActing(link);
        dispatch(setActorsDetails(data))
        console.log(data)
    } catch (e) {
        console.log(e.message);
    }
}

//types
type SetActorsDetailsAC = ReturnType<typeof setActorsDetails>


export type TabMovieActionsType =
    SetActorsDetailsAC
