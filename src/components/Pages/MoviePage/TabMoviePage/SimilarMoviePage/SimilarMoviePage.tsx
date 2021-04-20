import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GetMovies} from '../../../../../api/api';

type SimilarMoviePagePropsType = {
    movie_id: string
    similarMovies: GetMovies | null
    getSimilarMovies: (link: string) => void
}

class SimilarMoviePage extends PureComponent<SimilarMoviePagePropsType> {
    componentDidMount() {
        const actingUrl = `${API_URL}/movie/${this.props.movie_id}/similar?api_key=${API_KEY_3}&language=ru-RU`;
        this.props.getSimilarMovies(actingUrl);
        // API.getSimilarMovie(actingUrl)
        //     .then(res => {
        //         // debugger
        //         console.log(res);
        //     })
    }

    render() {
        console.log(this.props.similarMovies)
        return (
            <div>
                SimilarMoviePage
            </div>
        );
    }
}

export default SimilarMoviePage;