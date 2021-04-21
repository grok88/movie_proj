import React, {Component} from 'react';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import {Link} from 'react-router-dom'
import ActingPage from './ActingPage/ActingPage';
import SimilarMoviePage from './SimilarMoviePage/SimilarMoviePage';
import {AppRootStateType} from '../../../../Store/store';
import {connect} from 'react-redux';
import {
    changeSimilarMoviePage,
    getActorsDetails,
    getSimilarMovies,
    InitialTabMovieReducerType
} from '../../../../Store/tabMovieReducer';
import {AddFavoriteBodyType, AddWatchlistBodyType, API_KEY_3, API_URL} from '../../../../api/api';
import {addFavorite, addWatchlist} from '../../../../Store/movieReducer';

type TabMoviePagePropsType = {
    movie_id: string
    movieType: string
} & MapStateToProps & MapDispatchToProps;

class TabMoviePage extends Component<TabMoviePagePropsType, { activeTab: string }> {
    // for tabs
    state = {
        activeTab: this.props.movieType
    }

    toggle = (tab: string) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }
    //for SimilarMoviePage
    changeFavorite = (media_type: string, favorite: boolean, media_id: number) => {
        const addFavoriteUrl = `${API_URL}/account/${this.props.account_id}/favorite?api_key=${API_KEY_3}&session_id=${this.props.session_id}`;
        const body = {
            media_type: 'movie',
            media_id: media_id,
            favorite
        }
        this.props.addFavorite(addFavoriteUrl, body);
    }
    changeWatchlist = (media_type: string, watchlist: boolean, media_id: number) => {
        console.log(media_type, watchlist, media_id)
        const addFavoriteUrl = `${API_URL}/account/${this.props.account_id}/watchlist?api_key=${API_KEY_3}&session_id=${this.props.session_id}`;
        const body = {
            media_type: 'movie',
            media_id: media_id,
            watchlist
        }
        this.props.addWatchlist(addFavoriteUrl, body);
    }

    render() {
        const {tabMoviePage: {actorsDetails, similarMovies}, getActorsDetails, getSimilarMovies, changeSimilarMoviePage, session_id, addFavorite, addWatchlist} = this.props
        return <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        to={`/movie/${this.props.movie_id}/detail`}
                        tag={Link}
                        className={this.state.activeTab === '1' ? 'active' : ''}
                        onClick={() => {
                            this.toggle('1');
                        }}>Детали</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        to={`/movie/${this.props.movie_id}/videos`}
                        tag={Link}
                        className={this.state.activeTab === '2' ? 'active' : ''}
                        onClick={() => {
                            this.toggle('2');
                        }}>Похожие фильмы</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        to={`/movie/${this.props.movie_id}/credits`}
                        tag={Link}
                        className={this.state.activeTab === '3' ? 'active' : ''}
                        onClick={() => {
                            this.toggle('3');
                        }}>Актеры </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                {this.state.activeTab === '1' && <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <h4>Tab 1 Contents</h4>
                        </Col>
                    </Row>
                </TabPane>}
                {this.state.activeTab === '2' && <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <SimilarMoviePage movie_id={this.props.movie_id} similarMovies={similarMovies}
                                              getSimilarMovies={getSimilarMovies}
                                              changeSimilarMoviePage={changeSimilarMoviePage}
                                              session_id={session_id}
                                              changeWatchlist={this.changeWatchlist}
                                              changeFavorite={this.changeFavorite}
                            />
                        </Col>
                    </Row>
                </TabPane>}
                {this.state.activeTab === '3' && <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <ActingPage movie_id={this.props.movie_id} actorsDetails={actorsDetails}
                                        getActorsDetails={getActorsDetails}
                            />
                        </Col>
                    </Row>
                </TabPane>}
            </TabContent>
        </div>
    }
}

type MapStateToProps = {
    tabMoviePage: InitialTabMovieReducerType
    session_id: string | null
    account_id: number | null
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        tabMoviePage: state.tabMoviePage,
        session_id: state.app.session_id,
        account_id: state.app.user && state.app.user.id
    }
}

type MapDispatchToProps = {
    getActorsDetails: (link: string) => void
    getSimilarMovies: (link: string) => void
    changeSimilarMoviePage: (page: number) => void
    addFavorite: (link: string, body: AddFavoriteBodyType) => void
    addWatchlist: (link: string, body: AddWatchlistBodyType) => void
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    getActorsDetails,
    getSimilarMovies,
    changeSimilarMoviePage,
    addWatchlist,
    addFavorite
})(TabMoviePage);
