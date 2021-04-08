import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GenreType, GetGenres} from '../../../api/api';
import axios from 'axios';
import GenresFilter from './GenresFilter/GenresFilter';

type GenresFilterPagePropsType = {
    onGenresChange : (genreId: string) => void
};

class GenresFilterPage extends PureComponent<GenresFilterPagePropsType, { genres: Array<GenreType> }> {
    constructor(props: GenresFilterPagePropsType) {
        super(props);
        this.state = {
            genres: []
        }
    }

    componentDidMount() {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        axios.get<GetGenres>(link).then(res => res.data)
            .then(res => {
                this.setState({
                    genres: res.genres
                })
            })
    }

    render() {
        const {genres} = this.state;
        const {onGenresChange} = this.props;
        console.log('GenresFilterPage')
        return (
            <div>
                <button type="button" className="btn btn-info mt-3 " style={{width: '100%'}}>Показать все жанры</button>
                <GenresFilter genres={genres} onGenresChange={onGenresChange}/>
            </div>
        );
    }
}

export default GenresFilterPage;