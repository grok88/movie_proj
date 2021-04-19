import React, {Component} from 'react';
import {ActingRespType, API, API_KEY_3, API_URL} from '../../../../../api/api';

type ActingPagePropsType = {
    movie_id: string
}

class ActingPage extends Component<ActingPagePropsType, { acting: null | ActingRespType }> {
    state = {
        acting: null as ActingRespType  |null
    }

    componentDidMount() {

        const actingUrl = `${API_URL}/movie/${this.props.movie_id}/credits?api_key=${API_KEY_3}&language=ru-RU`;
        API.getActing(actingUrl)
            .then(res => {
                // debugger
                console.log(res)
                this.setState({
                    acting:res
                })
            });
    }

    render() {
        console.log(this.state.acting)
        return (
            <div>
                ActingPage
                {/*{this.state.acting?.cast.map(p => <img src={`https://image.tmdb.org/t/p/w500/${this.state.acting?.cast.}`} alt=""/>)}*/}
            </div>
        );
    }
}

export default ActingPage;