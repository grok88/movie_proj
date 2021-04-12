import {API, MovieType} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';
import {setTotalPages} from './appReducer';

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
export const getMovies = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    try {
        let data = await API.getMovies(link);
        dispatch(setTotalPages(data.total_pages));
        dispatch(setMovies(data.results));
        console.log(data)
    } catch (e) {
        console.log(e.message);
    }
}

