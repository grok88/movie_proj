import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {GetMovieDetailsResp} from '../../../../../api/api';

type MoviePageInfoPropsType = {
    movieDetails: null | GetMovieDetailsResp
}

class MoviePageInfo extends Component<MoviePageInfoPropsType> {
    render() {
        const {movieDetails} = this.props;
        return (
            <div className={'mt-3'}>
                <Table>
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Статус</th>
                        <td>{movieDetails && movieDetails.status}</td>
                    </tr>
                    <tr>
                        <th scope="row">Дата выхода</th>
                        <td>{movieDetails && movieDetails.release_date}</td>
                    </tr>
                    <tr>
                        <th scope="row">Продолжительность</th>
                        <td>{movieDetails && movieDetails.runtime}m</td>
                    </tr>
                    <tr>
                        <th scope="row">Язык оригинала</th>
                        <td>{movieDetails && movieDetails.original_language}</td>
                    </tr>
                    <tr>
                        <th scope="row">Страна</th>
                        <td>{movieDetails && movieDetails.production_countries.map(c => <span
                            key={c.name}>{c.name} </span>)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Бюджет</th>
                        <td>{movieDetails && movieDetails.budget} $</td>
                    </tr>
                    <tr>
                        <th scope="row">Сборы</th>
                        <td>{movieDetails && movieDetails.revenue} $</td>
                    </tr>
                    <tr>
                        <th scope="row">Компания</th>
                        <td>{movieDetails && movieDetails.production_companies.map(c => <div key={c.id}>
                            <span className={'companyInfo'}>{c.name}</span>
                        </div>)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Жанры</th>
                        <td>{movieDetails && movieDetails.genres.map(g => <div key={g.id}>
                            <span className={'companyInfo'}>{g.name}</span>
                        </div>)}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default MoviePageInfo;