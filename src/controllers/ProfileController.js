import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { profileGetInfo as profileGetInfoAction } from '../actions/profile';



export class ProfileController extends Component {

  componentDidMount() {
    const { token  } = this.props;
    if (token)
      this.fetchProfile(token);
  }

  fetchProfile() {
    this.props.getInfo();
  }
  shouldComponentUpdate(nextProps){
    if (nextProps.token !== this.props.token ||
      nextProps.profile !== this.props.profile ||
      nextProps.loggedIn !== this.props.loggedIn ||
      nextProps.isLoading !== this.props.isLoading) {
      return true;
    }
    return false;
  }
  componentWillReceiveProps(newProps) {

    if (newProps.token !== this.props.token) {
      this.fetchProfile();
    }
  }

  render() {
    const { loggedIn, token, profile, isLoading, children} = this.props;
    if (!children) return null;

    return children({
      isLoading,
      loggedIn,
      token,
      profile

    });

  }
}

ProfileController.propTypes = {
  profileGetInfo: PropTypes.func,
  token: PropTypes.object,
  profile: PropTypes.object,
  isLoading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  children: PropTypes.func,


};

function mapStateToProps(state) {
  const { loggedIn, token, profile } = state.auth;
  return {
    loggedIn,
    token,
    profile,
    isLoading: state.loading > 0
  };
}

export default connect(mapStateToProps, {
  getInfo: profileGetInfoAction
})(ProfileController);