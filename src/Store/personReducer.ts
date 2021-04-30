import {API, PersonDetailType, PersonFilmsRespType, PersonSocialRespType} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {changeStatus, setError} from './appReducer';

const initialState = {
    personDetails: null as null | PersonDetailType,
    social: null as null | PersonSocialRespType,
    personFilms: null as null | PersonFilmsRespType
}

export type InitialPersonStateType = typeof initialState;

export const personReducer = (state: InitialPersonStateType = initialState, action: PersonActionsType): InitialPersonStateType => {
    switch (action.type) {
        case 'PERSON/SET-PERSON-DETAIL':
            return {
                ...state,
                personDetails: action.payload
            }
        case 'PERSON/SET-SOCIAL':
            return {
                ...state,
                social: action.payload
            }
        case 'PERSON/SET-PERSON-FILMS':
            return {
                ...state,
                personFilms: action.payload
            }
        default:
            return state;
    }
}

//actions
export const setPersonDetail = (person: PersonDetailType) => {
    return {
        type: 'PERSON/SET-PERSON-DETAIL',
        payload: person
    } as const;
}
export const setSocial = (social: PersonSocialRespType) => {
    return {
        type: 'PERSON/SET-SOCIAL',
        payload: social
    } as const;
}
export const setPersonFilms = (personFilms: PersonFilmsRespType) => {
    return {
        type: 'PERSON/SET-PERSON-FILMS',
        payload: personFilms
    } as const;
}

//thunks
export const getPersonDetail = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getPersonDetail(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setPersonDetail(data));

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
export const getPersonSocial = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getPersonSocial(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setSocial(data));
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
export const getPersonFilms = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    dispatch(changeStatus('loading'));
    debugger
    try {
        let data = await API.getPersonFilms(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setPersonFilms(data));

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
type SetSocialAC = ReturnType<typeof setSocial>;
type SetPersonFilmsAC = ReturnType<typeof setPersonFilms>;

export type PersonActionsType =
    SetPersonDetailAC
    | SetSocialAC
    | SetPersonFilmsAC;
