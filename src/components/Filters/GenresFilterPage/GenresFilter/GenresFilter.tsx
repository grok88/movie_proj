import React, {ChangeEvent, PureComponent} from 'react';
import {GenreType} from '../../../../api/api';

type GenresFilterPropsType = {
    genres: Array<GenreType>
    onGenresChange : (genreId: string) => void
}

class GenresFilter extends PureComponent<GenresFilterPropsType, {}> {

    onChangeFavorite = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onGenresChange( event.target.name);
    };

    render() {
        const {genres} = this.props;
        console.log('GenresFilter')
        return (
            <div className='form-group mt-3'>
                {genres.map(g => <div className="form-check" key={g.id}>
                    <input className="form-check-input" type="checkbox" value="" id={String(g.id)} name={String(g.id)}
                           onChange={this.onChangeFavorite}/>
                    <label className="form-check-label" htmlFor={String(g.id)}>
                        {g.name}
                    </label>
                </div>)}

            </div>
        );
    }
}

export default GenresFilter;