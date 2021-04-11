import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GenreType, GetGenres} from '../../../api/api';
import axios from 'axios';
import GenresFilter from './GenresFilter/GenresFilter';

type GenresFilterPagePropsType = {
    onGenresChange: (genreId: string) => void
    onGenresReset: () => void
};

class GenresFilterPage extends PureComponent<GenresFilterPagePropsType, { genres: Array<GenreType>, checked: boolean | undefined }> {
    constructor(props: GenresFilterPagePropsType) {
        super(props);
        this.state = {
            genres: [],
            checked: false
        }
    }

    componentDidMount() {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        axios.get<GetGenres>(link).then(res => res.data)
            .then(res => {
                this.setState({
                    genres: res.genres.map(g => ({...g, checked: false})),
                })
            })
    }

    onGenresResetHandler = () => {
        this.props.onGenresReset();

        if (this.state.checked === false) {
            this.setState({
                checked: undefined
            })
        } else {
            this.setState({
                checked: false
            })
        }
    }

    render() {
        const {genres, checked} = this.state;
        const {onGenresChange,} = this.props;
        console.log('GenresFilterPage')
        return (
            <div>
                <button type="button" className="btn btn-info mt-3 " style={{width: '100%'}}
                        onClick={this.onGenresResetHandler}>Показать все жанры
                </button>
                <GenresFilter genres={genres} onGenresChange={onGenresChange} checked={checked}/>
            </div>
        );
    }
}

export default GenresFilterPage;