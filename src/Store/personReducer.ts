import {API, API_KEY_3, API_URL} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {changeStatus, setError} from './appReducer';

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
export const getPersonDetail = (link: string, personId: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    debugger
    try {

        let data = await API.getPersonDetail(link, personId);
        dispatch(changeStatus('succeeded'));

        console.log(data)
    } catch (e) {
        dispatch(changeStatus('failed'));
        //ser LoginForm serverError
        dispatch(setError(e.response.data.status_message));

        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    }
}

//types
type SetPersonDetailAC = ReturnType<typeof setPersonDetail>;


export type MovieActionsType =
    SetPersonDetailAC;
