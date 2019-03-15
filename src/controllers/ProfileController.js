import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { profileGetInfo as profileGetInfoAction } from '../actions/profile';

export class ProfileController extends Component {

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.props.getInfo();
  }

  shouldComponentUpdate(nextProps){
    if (nextProps.token !== this.props.token ||
      nextProps.profile !== this.props.profile ||
      nextProps.loggedIn !== this.props.loggedIn ||
      nextProps.isLoading !== this.props.isLoading ||
      nextProps.profile.updated_at !== this.props.profile.updated_at
    ) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(newProps) {

    if (
      newProps.token !== this.props.token ||
      newProps.profile.updated_at !== this.props.profile.updated_at

    ) {
      this.fetchProfile();
    }
  }

  render() {
    const { profile, isLoading, children} = this.props;
    if (!children) return null;
    return children({
      isLoading: Object.keys(profile).length > 0 && isLoading,
      loggedIn: Object.keys(profile).length > 0,

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
  const { isLoading, profile } = state.auth;
  return {
    isLoading,
    profile,
  };
}

export default connect(mapStateToProps, {
  getInfo: profileGetInfoAction
})(ProfileController);