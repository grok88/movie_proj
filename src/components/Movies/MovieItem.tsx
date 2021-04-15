import React from 'react';
import {MovieType} from '../../api/api';
import {StarsOutlined} from '@material-ui/icons';


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
                    src={item.backdrop_path ||
                    item.poster_path ? `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                    item.poster_path}` : 'https://static.wikia.nocookie.net/nopixel/images/b/b4/Not-found-image-15383864787lu.jpg/revision/latest?cb=20200910062142'}
                    alt=""
                />
                <div className="card-body">
                    <h6 className="card-title">{item.title}</h6>
                    <div className="card-text"><b>Описание</b>: {item.overview}</div>
                    <div className="card-text"><b>Рейтинг</b>: {item.vote_average}</div>
                </div>
            </div>
        );
    }
}
