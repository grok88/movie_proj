import {FilterType} from '../components/App';

const initialState = {
    filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '2021',
        with_genres: []
    } as FilterType,
    page: 1,
    total_pages: null as null | number
}

export type InitialAppStateType = typeof initialState;

type ChangeFiltersAC = ReturnType<typeof changeFilters>
type ChangePageAC = ReturnType<typeof changePage>
type SetTotalPagesAC = ReturnType<typeof setTotalPages>
type ResetAllFiltersAC = ReturnType<typeof resetAllFilters>
type GenresResetAC = ReturnType<typeof genresReset>
type GenresChangeAC = ReturnType<typeof genresChange>

export type AppActionsType =
    ChangeFiltersAC
    | ChangePageAC
    | SetTotalPagesAC
    | ResetAllFiltersAC
    | GenresResetAC
    | GenresChangeAC;

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
    }
    return state;
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