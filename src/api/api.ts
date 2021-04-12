import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3';

export const API_KEY_3 = '74cf872c374464de94ecd087d053d256';

export const API_KEY_4 =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGNmODcyYzM3NDQ2NGRlOTRlY2QwODdkMDUzZDI1NiIsInN1YiI6IjYwNjVkMGVjZDEzMzI0MDAyOTU3YWY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xDMzqEfiTRACW-aKuOO0uQJnWFWRNvmG4B6a2rsmxyE';

export const API = {
    getMovies(link: string) {
        return axios.get<GetMovies>(link).then(res => res.data)
    },
    getGenres(link: string) {
        return axios.get<{ genres: GenreResponseType[] }>(link).then(res => res.data)
    }
}

//TYPES
export type MovieType = {
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: false
    vote_average: number
    vote_count: number
}

export type GetMovies = {
    page: number
    results: Array<MovieType>
    total_pages: number
    total_results: number
}

//Genres
export type GenreResponseType = {
    id: number
    name: string
}
export type GenreType = {
    id: number
    name: string
    checked: boolean
}
export type GetGenres = {
    genres: Array<GenreType>
}

//AUTH
export type GetToken = {
    expires_at: string
    request_token: string
    success: boolean
}