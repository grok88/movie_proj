import React, {ChangeEvent, Component, PureComponent} from 'react';
import {GenreType} from '../../../../api/api';

type GenresFilterPropsType = {
    genres: Array<GenreType>
    onGenresChange: (genreId: string) => void
    // checked: boolean | undefined
    onChangeChecked: (genreId: number, checked: boolean) => void
}

class GenresFilter extends PureComponent<GenresFilterPropsType, {}> {

    render() {
        const {genres, onChangeChecked} = this.props;
        console.log('GenresFilter')
        return (
            <div className='form-group mt-3'>
                {genres.map(g => <GenreCheckbox
                    onGenresChange={this.props.onGenresChange}
                    genre={g} key={g.id}
                    onChangeChecked={onChangeChecked}
                />)}
            </div>
        );
    }
}


type GenreCheckboxPropsType = {
    onGenresChange: (genreId: string) => void
    genre: GenreType
    onChangeChecked: (genreId: number, checked: boolean) => void
}

class GenreCheckbox extends Component<GenreCheckboxPropsType, {}> {

    onChangeFavorite = (event: ChangeEvent<HTMLInputElement>, genreId: number) => {
        this.props.onGenresChange(event.target.name);
        this.props.onChangeChecked(genreId, event.target.checked);
        // this.setState({
        //     checked: event.target.checked
        // })
    };

    render() {
        const g = this.props.genre;

        return <div className="form-check">
            <input className="form-check-input" type="checkbox"
                   checked={this.props.genre.checked}
                   id={String(g.id)} name={String(g.id)}
                   onChange={(e) => this.onChangeFavorite(e, g.id)}/>
            <label className="form-check-label" htmlFor={String(g.id)}>
                {g.name}
            </label>
        </div>
    }
}


export default GenresFilter;