import React from 'react';
import { MovieType } from '../../api/api';


type MovieItemPropsType = {
    item: MovieType
}

export default class MovieItem extends React.Component<MovieItemPropsType, {}> {
    render() {
        const {item} = this.props;
        return (
            <div className="card" style={{width: '100%'}}>
                <img
                    className="card-img-top card-img--height"
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                    item.poster_path}`}
                    alt=""
                />
                <div className="card-body">
                    <h6 className="card-title">{item.title}</h6>
                    <div className="card-text"><b>Описание</b>: {item.overview}</div>
                    <div className="card-text">Рейтинг: {item.vote_average}</div>
                </div>
            </div>
        );
    }
}
