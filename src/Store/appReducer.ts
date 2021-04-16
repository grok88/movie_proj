import {FilterType} from '../components/App';
import {GetAccountDetailsResponse} from '../components/Header/Login/LoginForm/LoginForm';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {API} from '../api/api';

const initialState = {
    filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '2021',
        with_genres: []
    } as FilterType,
    page: 1,
    total_pages: null as null | number,
    user: null as null | GetAccountDetailsResponse,
    session_id: null as null | string
}

export type InitialAppStateType = typeof initialState;

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-USER':
            return {
                ...state,
                user: action.payload
            }
        case 'APP/SET-SESSION-ID':
            return {
                ...state,
                session_id: action.payload
            }
        case 'APP/DELETE-SESSION-ID':
            return {
                ...state,
                session_id: null
            }
        default:
            return state;
    }

}
//user
export const setUser = (user: GetAccountDetailsResponse | null) => {
    return {
        type: 'APP/SET-USER',
        payload: user
    } as const
}
export const setSessionId = (session_id: string) => {
    return {
        type: 'APP/SET-SESSION-ID',
        payload: session_id
    } as const
}
export const deleteSessionId = () => {
    return {
        type: 'APP/DELETE-SESSION-ID',
    } as const
}


//thunks
export const logoutUser = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>, getState: () => AppRootStateType) => {
    const session_id = getState().app.session_id;
    try {
        await API.logout(link, session_id);
        dispatch(deleteSessionId());
        dispatch(setUser(null));
    } catch (e) {
        console.log(e.message);
    }
}
export const getAccountDetails = (link: string, session_id: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>, getState: () => AppRootStateType) => {
    try {
        let data = await API.getAccountDetails(link);
        console.log(data);
        dispatch(setUser(data));
        dispatch(setSessionId(session_id));
        return data;
    } catch (e) {
        console.log(e.message);
    }
}


//types
type SetUserAC = ReturnType<typeof setUser>
type SetSessionIdAC = ReturnType<typeof setSessionId>
type DeleteSessionIdAC = ReturnType<typeof deleteSessionId>

export type AppActionsType =
    SetUserAC
    | SetSessionIdAC
    | DeleteSessionIdAC;