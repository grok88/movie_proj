import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import {PersonCastType} from '../../../../api/api';

type PersonItemPropsType = {
    film :PersonCastType
}
class PersonItem extends PureComponent<PersonItemPropsType> {
    render() {
        const {film} = this.props;
        return (
            <NavLink to={`/movie/${film.id}`}>
                <img
                    className="card-img-top card-img--height person__films-img"
                    src={film.poster_path ||
                    film.backdrop_path ? `https://image.tmdb.org/t/p/w500${film.poster_path ||
                    film.backdrop_path}` : 'https://static.wikia.nocookie.net/nopixel/images/b/b4/Not-found-image-15383864787lu.jpg/revision/latest?cb=20200910062142'}
                    alt=""
                />
            </NavLink>
        );
    }
}

export default PersonItem;