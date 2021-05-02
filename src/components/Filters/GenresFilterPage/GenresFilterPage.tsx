import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GenreType} from '../../../api/api';
import GenresFilter from './GenresFilter/GenresFilter';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../Store/store';
import {changeChecked, genresResetChecked, getGenres} from '../../../Store/genresFilterReducer';

type GenresFilterPagePropsType = {
    onGenresChange: (genreId: string) => void
    onGenresReset: () => void
} & MapDispatchToProps & MapStateToProps;


class GenresFilterPage extends PureComponent<GenresFilterPagePropsType> {

    componentDidMount() {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        this.props.getGenres(link);
    }

    onChangeChecked = (genreId: number, checked: boolean) => {
        this.props.changeChecked(genreId, checked);
    }
    onGenresResetHandler = () => {
        this.props.onGenresReset();
        this.props.genresResetChecked();
    }

    render() {
        const {onGenresChange,} = this.props;
        return (
            <div>
                <button type="button" className="btn btn-info mt-3 " style={{width: '100%'}}
                        onClick={this.onGenresResetHandler}>Показать все жанры
                </button>
                <GenresFilter genres={this.props.genres} onGenresChange={onGenresChange}
                              onChangeChecked={this.onChangeChecked}/>
            </div>
        );
    }
}


type MapStateToProps = {
    genres: Array<GenreType>
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        genres: state.genresFilter.genres
    }
}

type MapDispatchToProps = {
    getGenres: (link: string) => void
    changeChecked: (genreId: number, checked: boolean) => void
    genresResetChecked: () => void
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    getGenres,
    changeChecked,
    genresResetChecked
})(GenresFilterPage);