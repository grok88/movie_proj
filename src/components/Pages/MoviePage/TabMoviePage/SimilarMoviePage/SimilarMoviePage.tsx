import React, {Component, PureComponent} from 'react';
import {API, API_KEY_3, API_URL} from '../../../../../api/api';

type SimilarMoviePagePropsType = {
    movie_id: string
}

class SimilarMoviePage extends PureComponent<SimilarMoviePagePropsType> {
    componentDidMount() {
        const actingUrl = `${API_URL}/movie/${this.props.movie_id}/videos?api_key=${API_KEY_3}&language=ru-RU`;
        API.getSimilarMovie(actingUrl)
            .then(res => {
                // debugger
                console.log(res);
            })
    }

    render() {
        console.log('SimilarMoviePage')
        return (
            <div>
                SimilarMoviePage
            </div>
        );
    }
}

export default SimilarMoviePage;