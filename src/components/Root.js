import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Box} from 'reflexbox';
import 'src/assets/stylesheets/base.scss';
import Demo from './Customer/Demo'
import elasticlunr from 'elasticlunr';
import {data} from './Customer/data'
import _ from 'lodash';
import MainView from './MainView'

class Root extends React.Component {
  render() {
    return (
      <Box flex auto>
        <MainView />
      </Box>
    );
  }
};
export default Root;
