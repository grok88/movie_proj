import React, {PureComponent} from 'react';
import {ActingRespType, API, API_KEY_3, API_URL} from '../../../../../api/api';

type ActingPagePropsType = {
    movie_id: string
}

class ActingPage extends PureComponent<ActingPagePropsType, { acting: null | ActingRespType }> {
    state = {
        acting: null as ActingRespType | null
    }

    componentDidMount() {
        const actingUrl = `${API_URL}/movie/${this.props.movie_id}/credits?api_key=${API_KEY_3}&language=ru-RU`;
        API.getActing(actingUrl)
            .then(res => {
                this.setState({
                    acting: res
                })
            });
    }

    render() {
        console.log('ActingPage')
        return (
            <div className={'mt-3 actingPage container'}>
                <h3>В главных ролях</h3>
                <div className="row">
                    {this.state.acting && this.state.acting.cast.map(p => <div key={p.cast_id} className="col">
                        <div className={'actingPage_card'}>
                            <div className={'actingPage_card__img'}>
                                <img
                                    src={p.profile_path ? `https://image.tmdb.org/t/p/w500/${p.profile_path}` : 'https://static.wikia.nocookie.net/nopixel/images/b/b4/Not-found-image-15383864787lu.jpg/revision/latest?cb=20200910062142'}
                                    alt={`${p.name}`} title={`${p.name}`}/>
                            </div>
                            <p>{p.name}</p>
                            <p>{p.character}</p>
                        </div>
                    </div>)}
                </div>
            </div>
        );
    }
}

export default ActingPage;