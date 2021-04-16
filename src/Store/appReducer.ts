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

type ChangeFiltersAC = ReturnType<typeof changeFilters>
type ChangePageAC = ReturnType<typeof changePage>
type SetTotalPagesAC = ReturnType<typeof setTotalPages>
type ResetAllFiltersAC = ReturnType<typeof resetAllFilters>
type GenresResetAC = ReturnType<typeof genresReset>
type GenresChangeAC = ReturnType<typeof genresChange>

type SetUserAC = ReturnType<typeof setUser>
type SetSessionIdAC = ReturnType<typeof setSessionId>
type DeleteSessionIdAC = ReturnType<typeof deleteSessionId>

export type AppActionsType =
    ChangeFiltersAC
    | ChangePageAC
    | SetTotalPagesAC
    | ResetAllFiltersAC
    | GenresResetAC
    | GenresChangeAC

    | SetUserAC
    | SetSessionIdAC
    | DeleteSessionIdAC;

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/CHANGE-FILTERS':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.name]: action.payload.value
                }
            }
        case 'APP/CHANGE-PAGE':
            return {
                ...state,
                page: action.payload
            }
        case 'APP/SET-TOTAl-PAGES':
            return {
                ...state,
                total_pages: action.payload
            }
        case 'APP/RESET-ALL-FILTERS':
            let filters: FilterType = {
                sort_by: 'popularity.desc',
                primary_release_year: '2021',
                with_genres: []
            }
            return {
                ...state,
                filters: {...state.filters, ...filters},
                page: 1
            }
        case 'APP/RESET-GENRES':
            return {
                ...state,
                filters: {...state.filters, with_genres: []}
            }
        case 'APP/CHANGE-GENRES':
            let genres: Array<string> = [...state.filters.with_genres];

            let index = genres.findIndex(el => el === action.payload)
            if (index === -1) {
                genres.push(action.payload)
            } else {
                genres.splice(index, 1)
            }
            return {
                ...state,
                filters: {
                    ...state.filters,
                    with_genres: genres
                }
            }
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

export const changeFilters = (value: string, name: string) => {
    return {
        type: 'APP/CHANGE-FILTERS',
        payload: {
            value,
            name
        }
    } as const;
}
export const changePage = (page: number) => {
    return {
        type: 'APP/CHANGE-PAGE',
        payload: page
    } as const
}
export const setTotalPages = (pages: number) => {
    return {
        type: 'APP/SET-TOTAl-PAGES',
        payload: pages
    } as const
}
export const resetAllFilters = () => {
    return {
        type: 'APP/RESET-ALL-FILTERS',
    } as const
}
export const genresChange = (genreId: string) => {
    return {
        type: 'APP/CHANGE-GENRES',
        payload: genreId
    } as const
}
export const genresReset = () => {
    return {
        type: 'APP/RESET-GENRES',
    } as const
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
        let data = await API.logout(link, session_id);
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