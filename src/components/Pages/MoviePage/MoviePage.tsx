import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {API_KEY_3, API_URL, GetMovieDetailsResp} from '../../../api/api';
import {AppRootStateType} from '../../../Store/store';
import {connect} from 'react-redux';
import {getMovieDetails} from '../../../Store/movieReducer';
import Poster from './Poster/Poster';
import TabMoviePage from './TabMoviePage/TabMoviePage';

type PathParamsType = {
    id: string
    movietype: string
}
type MoviePagePropsType = RouteComponentProps<PathParamsType> & MapStateToProps & MapDispatchToProps ;

class MoviePage extends Component<MoviePagePropsType> {

    componentDidMount() {
        const movie_id = this.props.match.params.id;
        const getMovieDetailsUrl = `${API_URL}/movie/${movie_id}?api_key=${API_KEY_3}&language=ru-RU`;
        this.props.getMovieDetails(getMovieDetailsUrl);
    }


    render() {
        const {movieDetails} = this.props;
        const movie_id = this.props.match.params.id;
        let movietype = this.props.match.params.movietype;

        if (movietype === undefined) {
            movietype = '1';
        } else if (movietype === 'detail') {
            movietype = '1';
        } else if (movietype === 'videos') {
            movietype = '2';
        } else if (movietype === 'credits') {
            movietype = '3';
        }

        return (
            <div className={'container'}>
                <Poster movieDetails={movieDetails}/>
                <TabMoviePage movie_id={movie_id} movieType={movietype}/>
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