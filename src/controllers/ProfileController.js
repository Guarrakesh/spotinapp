import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { profileGetInfo as profileGetInfoAction } from '../actions/profile';



export class ProfileController extends Component {

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    const { token, profile } = this.props;
    if (profile && token)
      this.props.profileGetInfo(profile._id);
  }

  render() {
    const { loggedIn, token, profile, isLoading, children} = this.props;
    console.log(profile);
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
  profileGetInfo: profileGetInfoAction
})(ProfileController);