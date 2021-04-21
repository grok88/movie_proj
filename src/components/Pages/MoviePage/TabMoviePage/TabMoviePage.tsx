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

    render() {
        const {tabMoviePage: {actorsDetails, similarMovies}, getActorsDetails, getSimilarMovies,changeSimilarMoviePage} = this.props
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
                                              getSimilarMovies={getSimilarMovies} changeSimilarMoviePage={changeSimilarMoviePage}/>
                        </Col>
                    </Row>
                </TabPane>}
                {this.state.activeTab === '3' && <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <ActingPage movie_id={this.props.movie_id} actorsDetails={actorsDetails}
                                        getActorsDetails={getActorsDetails}/>
                        </Col>
                    </Row>
                </TabPane>}
            </TabContent>
        </div>
    }
}

type MapStateToProps = {
    tabMoviePage: InitialTabMovieReducerType
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        tabMoviePage: state.tabMoviePage
    }
}

type MapDispatchToProps = {
    getActorsDetails: (link: string) => void
    getSimilarMovies: (link: string) => void
    changeSimilarMoviePage : (page: number) => void
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    getActorsDetails,
    getSimilarMovies,
    changeSimilarMoviePage
})(TabMoviePage);
