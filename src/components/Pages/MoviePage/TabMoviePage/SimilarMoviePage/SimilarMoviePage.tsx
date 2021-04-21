import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GetMovies} from '../../../../../api/api';
import FilterPagination from '../../../../Filters/FilterPagination/FilterPagination';
import SimilarMoviesList from './SimilarMoviesList/SimilarMoviesList';

type SimilarMoviePagePropsType = {
    movie_id: string
    similarMovies: GetMovies
    getSimilarMovies: (link: string) => void
    changeSimilarMoviePage: (page: number) => void
    session_id: string | null
}

class SimilarMoviePage extends PureComponent<SimilarMoviePagePropsType> {
    componentDidMount() {
        const actingUrl = `${API_URL}/movie/${this.props.movie_id}/similar?api_key=${API_KEY_3}&language=ru-RU&page=1`;
        this.props.getSimilarMovies(actingUrl);
    }

    componentDidUpdate(prevProps: Readonly<SimilarMoviePagePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.similarMovies.page !== this.props.similarMovies.page) {
            const actingUrl = `${API_URL}/movie/${this.props.movie_id}/similar?api_key=${API_KEY_3}&language=ru-RU&page=${this.props.similarMovies.page}`;
            this.props.getSimilarMovies(actingUrl);
        }
    }

    render() {
        const {similarMovies, changeSimilarMoviePage, session_id} = this.props;
        // console.log(similarMovies)
        return (
            <div className={'mt-3 container'}>
                <FilterPagination page={similarMovies.page} onChangePage={changeSimilarMoviePage}
                                  totalPages={similarMovies && similarMovies.total_pages}/>
                <SimilarMoviesList
                    // filters={filters}
                    page={similarMovies.page}
                    // onChangePage={this.onChangePage}
                    movies={similarMovies.results}
                    session_id={session_id}
                    // getMovies={this.props.getMovies}
                />
            </div>
        );
    }
}

export default SimilarMoviePage;