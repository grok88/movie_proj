import axios from 'axios';
import {GetAccountDetailsResponse} from '../components/Header/Login/LoginForm/LoginForm';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

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
    },
    logout(link: string, session_id: string | null) {
        const data = {session_id};
        return axios.delete<{ success: boolean }>(link, {data}).then(res => res.data)
    },
    //auth logic
    getRequestToken(tokenUrl: string) {
        return axios.get<GetToken>(tokenUrl).then(res => res.data)
    },
    createSessionWithLogin(loginUrl: string, body: CreateSessionWithLoginBody) {
        return axios.post<CreateSessionWithLoginResp>(loginUrl, body).then(res => res.data)
    },
    createSessionId(sessionUrl: string, body: { request_token: string }) {
        return axios.post<{ success: boolean, session_id: string }>(sessionUrl, body).then(res => res.data)
    },

    getAccountDetails(link: string) {
        return axios.get<GetAccountDetailsResponse>(link).then(res => res.data)
    },
    getMovieDetails(link: string) {
        return axios.get<GetMovieDetailsResp>(link).then(res => res.data)
    },
    addFavorite(link: string, body: AddFavoriteBodyType) {
        return axiosInstance.post<AddFavoriteRespType>(link, body).then(res => res.data)
    },
    addWatchlist(link: string, body: AddWatchlistBodyType) {
        return axiosInstance.post<AddFavoriteRespType>(link, body).then(res => res.data)
    },
    getFavoriteList(link: string) {
        return axiosInstance.get<GetMovies>(link).then(res => res.data)
    },
    getWatchList(link: string) {
        return axiosInstance.get<GetFavoriteListType>(link).then(res => res.data)
    },
    getActing(link: string) {
        return axiosInstance.get<ActingRespType>(link).then(res => res.data)
    },
    setRating(link: string, body: { value: number }) {
        return axiosInstance.post<{ status_code: number, status_message: string }>(link, body).then(res => res.data)
    },
    getSimilarMovie(link: string) {
        return axiosInstance.get<GetMovies>(link).then(res => res.data)
        // .catch((err) => {
        //     return err.response.data.status_message;
        // })
    },
    //PERSON PAGE
    getPersonDetail(link: string) {
        return axiosInstance.get<PersonDetailType>(link).then(res => res.data)
    },
    getPersonSocial(link: string) {
        return axiosInstance.get<PersonSocialRespType>(link).then(res => res.data)
    },
    getPersonFilms(link: string) {
        return axiosInstance.get<PersonFilmsRespType>(link).then(res => res.data)
    },
}

// export const fetchApi = (url: string, options: any = {}) => {
//     return new Promise((res, rej) => {
//         fetch(url, options)
//             .then(res => {
//                     if (res.status < 400) {
//                         return res.json();
//                     } else {
//                         throw res
//                     }
//                 }
//             ).then(data => {
//             res(data);
//         })
//             .catch(response => {
//                 response.json()
//                     .then((err: any) => {
//                         rej(err)
//                     })
//             })
//     })
// }

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
//add favorite
export type AddFavoriteBodyType = {
    media_type: string
    media_id: number
    favorite: boolean
}
export type AddFavoriteRespType = {
    status_code: number
    status_message: string
}
//add Watchlist
export type AddWatchlistBodyType = {
    media_type: string
    media_id: number
    watchlist: boolean
}

//GetFavoriteListType
export type ResultType = {
    poster_path: string | null
    adult: boolean
    overview: string
    release_date: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    title: string
    backdrop_path: string | null
    popularity: number
    video: string
    vote_average: number
    vote_count: number
}
export type GetFavoriteListType = {
    page: number
    total_pages: number
    total_results: number
    results: Array<ResultType>
}
//GetMovieDetailsResp
type ProductionCompaniesType = {
    name: string
    id: number
    logo_path: string | null
    origin_country: string
}
type ProductionCountriesType = {
    name: string
    iso_3166_1: string
}
type SpokenLanguagesType = {
    iso_639_1: string
    name: string
}
export type GetMovieDetailsResp = {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: null
    budget: number
    genres: Array<{ id: number, name: string }>
    homepage: string | null
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string
    overview: string | null
    popularity: number
    poster_path: string | null
    production_companies: Array<ProductionCompaniesType>
    production_countries: Array<ProductionCountriesType>
    release_date: string
    revenue: number
    runtime: string | null
    spoken_languages: Array<SpokenLanguagesType>
    status: string
    tagline: string | null
    title: string
    video: string
    vote_average: number
    vote_count: number
}

//Acting
export type CastType = {
    adult: boolean
    gender: null | number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    cast_id: number
    character: string
    credit_id: string
    order: number
}
type CrewType = {
    adult: boolean
    gender: null | number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    department: string
    job: string
}
export type ActingRespType = {
    id: number
    cast: Array<CastType>
    crew: Array<CrewType>
}

// Auth USer
export type CreateSessionWithLoginResp = {
    success: boolean
    expires_at: string
    request_token: string
}
export type CreateSessionWithLoginBody = {
    request_token: string
    username: string
    password: string
}

// -----------------------PERSON PAGE----------------
export type PersonDetailType = {
    birthday: null | string
    known_for_department: string
    deathday: null | string
    id: number
    name: string
    also_known_as: Array<string>
    gender: number
    biography: string
    popularity: number
    place_of_birth: null | string
    profile_path: null | string
    adult: boolean
    imdb_id: string
    homepage: null | string
}


export type PersonSocialRespType = {
    imdb_id: string | null
    facebook_id: string | null
    freebase_mid: string | null
    freebase_id: string | null
    tvrage_id: number | string
    twitter_id: string | null
    id: number
    instagram_id: string | null
}
export type PersonCastType = {
    character: string
    credit_id: string
    release_date: string
    vote_count: number
    video: boolean
    adult: boolean
    vote_average: number
    title: string
    genre_ids: Array<number>
    original_language: string
    original_title: string
    popularity: number
    id: number
    backdrop_path: null | string
    overview: string
    poster_path: null | string
}
export type PersonFilmsRespType = {
    id: number
    cast: Array<PersonCastType>
    crew: Array<any>
}
