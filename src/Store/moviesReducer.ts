import {MovieType} from '../api/api';
import {Dispatch} from 'redux';

const initialState = {
    movies: [] as Array<MovieType>
}

export type InitialMoviesStateType = typeof initialState;

type SetMoviesAC = ReturnType<typeof setMovies>


export type MoviesActionsType = SetMoviesAC;


export const moviesReducer = (state: InitialMoviesStateType = initialState, action: MoviesActionsType): InitialMoviesStateType => {
    switch (action.type) {
        case 'MOVIES/SET-MOVIES':
            return {
                ...state,
                movies: action.payload
            }
        default:
            return state;
    }

}

export const setMovies = (movies: Array<MovieType>) => {
    return {
        type: 'MOVIES/SET-MOVIES',
        payload: movies
    } as const;
}

//thunks
export const getMovies = (page: number, primary_release_year: string = '', genres: Array<string> = ['']) => (dispatch:Dispatch) => {

}

