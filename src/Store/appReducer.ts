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
export type AppActionsType = {}

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType) => {
    return state;
}