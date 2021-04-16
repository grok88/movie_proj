import {API, GenreResponseType, GenreType} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, TMDBActionType} from './store';

const initialState = {
    genres: [] as Array<GenreType>
}

export type InitialGenresFilterStateType = typeof initialState;

export const genresFilterReducer = (state: InitialGenresFilterStateType = initialState, action: GenresFilterActionsType): InitialGenresFilterStateType => {
    switch (action.type) {
        case 'GENRES/SET-GENRES':
            return {
                ...state,
                genres: action.payload.map(g => ({...g, checked: false}))
            }
        case 'GENRES/CHANGE-CHECKED':
            return {
                ...state,
                genres: state.genres.map(g => g.id === action.payload.genreId ? ({
                    ...g,
                    checked: action.payload.checked
                }) : g)
            }
        case 'GENRES/RESET-CHECKED':
            return {
                ...state,
                genres: state.genres.map(g => ({...g, checked: false}))
            }
        default:
            return state;
    }

}

//actions
export const setGenres = (genres: Array<GenreResponseType>) => {
    return {
        type: 'GENRES/SET-GENRES',
        payload: genres
    } as const;
}
export const changeChecked = (genreId: number, checked: boolean) => {
    return {
        type: 'GENRES/CHANGE-CHECKED',
        payload: {
            genreId,
            checked
        }
    } as const;
}
export const genresResetChecked = () => {
    return {
        type: 'GENRES/RESET-CHECKED',
    } as const;
}

//thunks
export const getGenres = (link: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, TMDBActionType>) => {
    try {
        const res = await API.getGenres(link)
        dispatch(setGenres(res.genres));
    } catch (e) {
        console.log(e.message)
    }
}


//types
type SetGenresAC = ReturnType<typeof setGenres>;
type ChangeCheckedAC = ReturnType<typeof changeChecked>;
type GenresResetCheckedAC = ReturnType<typeof genresResetChecked>;

export type GenresFilterActionsType = SetGenresAC | ChangeCheckedAC | GenresResetCheckedAC;
