import React from 'react';
import { connect } from 'react-redux';
import { getAllSports, getFavoriteSports } from '../actions/sports';
import SportList from '../components/SpotComponents/SportList';


class SportScreen extends React.Component {

    componentDidMount() {

        this.props.dispatch(getAllSports());

    }
    render() {

        const { sports } = this.props;

        return (
            <SportList sports={sports} />
        )
    }
}





const mapStateToProps = state => {
    return({
        sports: state.entities.sports,
        loggedIn: state.auth.loggedIn
    })
};

export default connect(mapStateToProps)(SportScreen)