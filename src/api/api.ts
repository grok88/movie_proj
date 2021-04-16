import axios from 'axios';
import {GetAccountDetailsResponse} from '../components/Header/Login/LoginForm/LoginForm';

const axiosInstance = axios.create({
    headers:{
        'Content-Type':'application/json;charset=utf-8'
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
    getAccountDetails(link: string) {
        return axios.get<GetAccountDetailsResponse>(link).then(res => res.data)
            .catch((err) => {
                return err.response.data.status_message;
            })
    },
    addFavorite(link: string, body:any){
        return axiosInstance.post<AddFavoriteRespType>(link, body).then(res => res.data)
            .catch((err) => {
                return err.response.data.status_message;
            })
    }
}

export const fetchApi = (url: string, options: any = {}) => {
    return new Promise((res, rej) => {
        fetch(url, options)
            .then(res => {
                    if (res.status < 400) {
                        return res.json();
                    } else {
                        throw res
                    }
                }
            ).then(data => {
            res(data);
        })
            .catch(response => {
                response.json()
                    .then((err: any) => {
                        rej(err)
                    })
            })
    })
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

//add favorite
export type AddFavoriteRespType ={
    status_code:number
    status_message:string
}