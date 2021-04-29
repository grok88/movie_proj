import {API} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {changeStatus} from './appReducer';

const initialState = {
    personDetails: null
}

export type InitialPersonStateType = typeof initialState;

export const personReducer = (state: InitialPersonStateType = initialState, action: MovieActionsType): InitialPersonStateType => {
    switch (action.type) {

        case 'PERSON/SET-PERSON-DETAIL':
            return {
                ...state,
                personDetails: action.payload
            }
        default:
            return state;
    }
}

//actions
export const setPersonDetail = (person: any) => {
    return {
        type: 'PERSON/SET-PERSON-DETAIL',
        payload: person
    } as const;
}


//thunks
export const getMovieDetails = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getMovieDetails(link);
        dispatch(changeStatus('succeeded'));

        console.log(data)
    } catch (e) {
        dispatch(changeStatus('failed'));
        console.log(e.message);
    }
}

//types
type SetPersonDetailAC = ReturnType<typeof setPersonDetail>;


export type MovieActionsType =
    SetPersonDetailAC;
