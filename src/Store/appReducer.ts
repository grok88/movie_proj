import {GetAccountDetailsResponse} from '../components/Header/Login/LoginForm/LoginForm';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {API, API_KEY_3, API_URL} from '../api/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    user: null as null | GetAccountDetailsResponse,
    session_id: null as null | string,
    isAuth: false,
    disabled: false,
    error: null as null | string,
    status: 'idle' as RequestStatusType,
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
        case 'APP/CHANGE-DISABLED':
            return {
                ...state,
                disabled: action.payload
            }
        case 'APP/SET-ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'APP/CHANGE-STATUS':
            return {
                ...state,
                status: action.payload
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
export const changeStatus = (status: RequestStatusType) => {
    return {
        type: 'APP/CHANGE-STATUS',
        payload: status
    } as const
}
export const setSessionId = (session_id: string) => {
    return {
        type: 'APP/SET-SESSION-ID',
        payload: session_id
    } as const
}
export const setError = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: error
    } as const
}
export const changeIsAuth = (isAuth: boolean) => {
    return {
        type: 'APP/CHANGE-ISAUTH',
        payload: isAuth
    } as const
}
export const changeDisabled = (disabled: boolean) => {
    return {
        type: 'APP/CHANGE-DISABLED',
        payload: disabled
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
    dispatch(changeStatus('loading'));
    try {
        await API.logout(link, session_id);
        cookies.remove('session_id');
        dispatch(changeStatus('succeeded'));
        dispatch(deleteSessionId());
        dispatch(setUser(null));
        dispatch(changeIsAuth(false));
        dispatch(changeDisabled(false));
    } catch (e) {
        dispatch(changeStatus('failed'));
        //ser LoginForm serverError
        dispatch(setError(e.response.data.status_message));

        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    }
    ;
}
export const getAccountDetails = (link: string, session_id: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>, getState: () => AppRootStateType) => {
    dispatch(changeStatus('loading'));
    try {
        let data = await API.getAccountDetails(link);
        dispatch(changeStatus('succeeded'));
        dispatch(setUser(data));
        dispatch(setSessionId(session_id));
        dispatch(changeIsAuth(true));
        // return data;
    } catch (e) {
        dispatch(changeStatus('failed'));
        //ser LoginForm serverError
        dispatch(setError(e.response.data.status_message));

        setTimeout(() => {
            dispatch(setError(null));
        }, 3000);
    }
    ;
}

// auth user
export const userAuthFlow = (username: string, password: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>, getState: () => AppRootStateType) => {

    // ?????????????? ???? 3 ???????????????? ???? ????????????
    // 1 ???? ??????????????
    // 2 ?????????? + ???????? + ???????? ??????????
    // 3 ???? session

    //1
    dispatch(changeDisabled(true));
    dispatch(changeStatus('loading'));
    let tokenUrl = `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`;
    API.getRequestToken(tokenUrl)
        .then(data => {
            //2
            const loginUrl = `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`;
            const body = {
                username,
                password,
                request_token: data.request_token
            }
            API.createSessionWithLogin(loginUrl, body)
                .then(() => {
                    // 3 session url
                    const sessionUrl = `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`;
                    API.createSessionId(sessionUrl, {request_token: data.request_token})
                        .then(session => {
                            //cookie
                            cookies.set('session_id', session.session_id, {
                                path: '/',
                                maxAge: 2592000
                            });
                            dispatch(setSessionId(session.session_id));
                            const accountUrl = `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session.session_id}`;
                            dispatch(getAccountDetails(accountUrl, session.session_id));
                        })
                        .catch(e => {
                            //disabled btn
                            dispatch(changeDisabled(false));
                            //ser LoginForm serverError
                            dispatch(setError(e.response.data.status_message));

                            setTimeout(() => {
                                dispatch(setError(null));
                            }, 3000);
                        });
                })
                .catch(e => {
                    //disabled btn
                    dispatch(changeDisabled(false));
                    //ser LoginForm serverError
                    dispatch(setError(e.response.data.status_message));

                    setTimeout(() => {
                        dispatch(setError(null));
                    }, 3000);
                });
        })
        .catch(e => {
            //disabled btn
            dispatch(changeDisabled(false));
            //ser LoginForm serverError
            dispatch(setError(e.message));

            setTimeout(() => {
                dispatch(setError(null));
            }, 3000);
        })
        .finally(() => {
            dispatch(changeStatus('succeeded'));
        });
}

//types
type SetUserAC = ReturnType<typeof setUser>
type SetSessionIdAC = ReturnType<typeof setSessionId>
type DeleteSessionIdAC = ReturnType<typeof deleteSessionId>
type ChangeIsAuthAC = ReturnType<typeof changeIsAuth>
type ChangeDisabledAC = ReturnType<typeof changeDisabled>
type SetErrorAC = ReturnType<typeof setError>
type ChangeStatusAC = ReturnType<typeof changeStatus>

export type AppActionsType =
    SetUserAC
    | SetSessionIdAC
    | DeleteSessionIdAC
    | ChangeIsAuthAC
    | ChangeDisabledAC
    | SetErrorAC
    | ChangeStatusAC;