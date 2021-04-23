import {GetAccountDetailsResponse} from '../components/Header/Login/LoginForm/LoginForm';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {API} from '../api/api';

const initialState = {
    user: null as null | GetAccountDetailsResponse,
    session_id: null as null | string,
    isAuth: false
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
        case 'APP/CHANGE-ISAUTH':
            return {
                ...state,
                isAuth: action.payload
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
export const changeIsAuth = (isAuth: boolean) => {
    return {
        type: 'APP/CHANGE-ISAUTH',
        payload: isAuth
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
        dispatch(changeIsAuth(false));
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
        dispatch(changeIsAuth(true));
        // return data;
    } catch (e) {
        console.log(e.message);
    }
}


//types
type SetUserAC = ReturnType<typeof setUser>
type SetSessionIdAC = ReturnType<typeof setSessionId>
type DeleteSessionIdAC = ReturnType<typeof deleteSessionId>
type ChangeIsAuthAC = ReturnType<typeof changeIsAuth>

export type AppActionsType =
    SetUserAC
    | SetSessionIdAC
    | DeleteSessionIdAC
    | ChangeIsAuthAC;