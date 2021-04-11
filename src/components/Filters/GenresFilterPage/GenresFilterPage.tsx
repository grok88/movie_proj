import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GenreType, GetGenres} from '../../../api/api';
import axios from 'axios';
import GenresFilter from './GenresFilter/GenresFilter';

type GenresFilterPagePropsType = {
    onGenresChange: (genreId: string) => void
    onGenresReset: () => void
};

class GenresFilterPage extends PureComponent<GenresFilterPagePropsType, { genres: Array<GenreType> }> {
    constructor(props: GenresFilterPagePropsType) {
        super(props);
        this.state = {
            genres: [],
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

    onChangeChecked = (genreId: number, checked: boolean) => {
        console.log(genreId, checked)
        this.setState({
            genres: this.state.genres.map(g => g.id === genreId ? ({...g, checked: checked}) : g)
        })
    }
    onGenresResetHandler = () => {
        this.props.onGenresReset();
        this.setState({
            genres: this.state.genres.map(g => ({...g, checked: false}))
        })
    }

    render() {
        const {genres} = this.state;
        const {onGenresChange,} = this.props;
        console.log('GenresFilterPage')
        return (
            <div>
                <button type="button" className="btn btn-info mt-3 " style={{width: '100%'}}
                        onClick={this.onGenresResetHandler}>Показать все жанры
                </button>
                <GenresFilter genres={genres} onGenresChange={onGenresChange} onChangeChecked={this.onChangeChecked}/>
            </div>
        );
    }
}

export default GenresFilterPage;