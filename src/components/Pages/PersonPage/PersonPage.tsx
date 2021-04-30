import React, {Component} from 'react';
import {AppRootStateType} from '../../../Store/store';
import {connect} from 'react-redux';
import {getPersonDetail} from '../../../Store/personReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {API_KEY_3, API_URL} from '../../../api/api';

type PersonParamsType = {
    personId: string
}
type PersonPagePropsType = RouteComponentProps<PersonParamsType> & MapStateToProps & MapDispatchToProps ;

class PersonPage extends Component<PersonPagePropsType> {
    componentDidMount() {
        const personId = this.props.match.params.personId;
        let url = `${API_URL}/person/${personId}api_key=${API_KEY_3}`;
        this.props.getPersonDetail(url, personId);
    }

    render() {
        return (
            <div className={'container mt-3'}>
                ActorPage
            </div>
        );
    }
}


type MapStateToProps = {
    personDetails: any
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        personDetails: state.personPage.personDetails
    }
}

type MapDispatchToProps = {
    getPersonDetail: (link: string, personId: string) => void
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    getPersonDetail,
})(withRouter(PersonPage));
