import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudGetOne as crudGetOneAction } from '../actions/dataActions';

/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
export class ShowController extends Component {
  componentDidMount() {
    const { navigation, navigationTitle, record } = this.props;

    if (navigation && record) {
      navigation.setParams({title: navigationTitle(record)})

    }
    this.updateData();
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.id !== nextProps.id ||
      nextProps.version !== this.props.version
    ) {
      this.updateData(nextProps.resource, nextProps.id);
    }
  }
  componentDidUpdate(prevProps) {

    const { navigation, navigationTitle, record } = this.props;

    if (navigation && navigationTitle(prevProps.record) !== navigation.getParam('title') ) {
      navigation.setParams({title: navigationTitle(record)})

    }
  }

  updateData(resource = this.props.resource, id = this.props.id) {

    this.props.crudGetOne(resource, id, this.props.basePath);
  }
  render() {
    const {
        //basePath,
        children,
        id,
        isLoading,
        record,
        resource,
        title,
        //translate,
        version,
    } = this.props;

    if (!children) return null;
    return children({
      isLoading,
      title,
      resource,
      record,
    //  translate,
      version,
    });
  }
}


ShowController.propTypes = {
   basePath: PropTypes.string,
  children: PropTypes.func.isRequired,
  crudGetOne: PropTypes.func.isRequired,
  record: PropTypes.object,
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  resource: PropTypes.string.isRequired,
  title: PropTypes.any,
  // translate: PropTypes.func,
  version: PropTypes.number.isRequired,

  navigation: PropTypes.object,
  navigationTitle: PropTypes.string
};

function mapStateToProps(state, props) {
  return {
    id: props.id,
    record: state.entities[props.resource]
        ? state.entities[props.resource].data[props.id]
        : null,
    version: state.ui.viewVersion,
  };
}

export default connect(
    mapStateToProps,
    { crudGetOne: crudGetOneAction }
)(ShowController);
