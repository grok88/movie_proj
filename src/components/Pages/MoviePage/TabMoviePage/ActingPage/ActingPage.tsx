import React, {PureComponent} from 'react';
import {ActingRespType, API_KEY_3, API_URL} from '../../../../../api/api';

type ActingPagePropsType = {
    movie_id: string
    actorsDetails: ActingRespType | null
    getActorsDetails: (link: string) => void
}

class ActingPage extends PureComponent<ActingPagePropsType, { acting: null | ActingRespType }> {
    componentDidMount() {
        const actingUrl = `${API_URL}/movie/${this.props.movie_id}/credits?api_key=${API_KEY_3}&language=ru-RU`;
        this.props.getActorsDetails(actingUrl);
    }

    render() {
        const {actorsDetails} = this.props;
        console.log('ActingPage')
        return (
            <div className={'mt-3 actingPage container'}>
                <h3>В главных ролях</h3>
                <div className="row">
                    {actorsDetails && actorsDetails.cast.map(p => <div key={p.cast_id} className="col">
                        <div className={'actingPage__card'}>
                            <div className={'actingPage__img'}>
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