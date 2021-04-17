import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {API_KEY_3, API_URL, GetMovieDetailsResp} from '../../../api/api';
import {AppRootStateType} from '../../../Store/store';
import {connect} from 'react-redux';
import {getMovieDetails} from '../../../Store/movieReducer';

type PathParamsType = {
    id: string
}
type MoviePagePropsType = RouteComponentProps<PathParamsType> & MapStateToProps & MapDispatchToProps ;

class MoviePage extends Component<MoviePagePropsType> {
    componentDidMount() {
        const movie_id = this.props.match.params.id;
        const getMovieDetailsUrl = `${API_URL}/movie/${movie_id}?api_key=${API_KEY_3}`;
        this.props.getMovieDetails(getMovieDetailsUrl);
    }

    render() {
        const {movieDetails} = this.props;
        //@ts-ignore
        const backdrop_url = `https://image.tmdb.org/t/p/original/${movieDetails && movieDetails.backdrop_path}`
        return (
            <div className={'Container'}>
                <div className="movie_page_main"
                     style={{backgroundImage: `url(${backdrop_url})`}}>
                    <div className={'pt-3 pb-3 pl-4 pr-4'}>
                        <section className={'movie_page_section'}>
                            <div>
                                1
                            </div>
                            <div>
                                2
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}


type MapStateToProps = {
    movieDetails: null | GetMovieDetailsResp
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        movieDetails: state.moviePage.movieDetails,
    }
}

type MapDispatchToProps = {
    getMovieDetails: (link: string) => void;
}


export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    getMovieDetails
})(withRouter(MoviePage));