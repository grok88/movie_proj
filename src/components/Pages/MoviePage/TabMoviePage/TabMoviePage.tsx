import React, {Component} from 'react';
import {Col, Nav, NavItem, NavLink as Link, Row, TabContent, TabPane} from 'reactstrap';
import {NavLink, Route, Switch} from 'react-router-dom'
import ActingPage from './ActingPage/ActingPage';

type TabMoviePagePropsType = {
    movie_id: string
    movieType:string
}

class TabMoviePage extends Component<TabMoviePagePropsType, { activeTab: string }> {
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

    render() {
        return <div>
            <Nav tabs>
                <NavItem>
                    <Link
                        className={this.state.activeTab === '1' ? 'active' : ''}
                        onClick={() => {
                            this.toggle('1');
                        }}
                    >
                        Detail
                    </Link>
                </NavItem>
                <NavItem>
                    <Link
                        className={this.state.activeTab === '2' ? 'active' : ''}
                        onClick={() => {
                            this.toggle('2');
                        }}
                    >
                        Videos
                    </Link>
                </NavItem>
                <NavItem>
                    <Link
                        // to={`movie/${this.props.movie_id}/credits`}
                        className={this.state.activeTab === '3' ? 'active' : ''}
                        onClick={() => {
                            this.toggle('3');
                        }}
                    >
                        <NavLink to={`${this.props.movie_id}/credits`}>
                            Credits
                        </NavLink>
                    </Link
                      >
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <h4>Tab 1 Contents</h4>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <h4>Tab 2 Contents</h4>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            {/*<Route exact path={'/movie/:id/credits'} render={() =><h1>CREDITS</h1>}/>*/}
                           <ActingPage movie_id={this.props.movie_id}/>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    }
}

export default TabMoviePage;