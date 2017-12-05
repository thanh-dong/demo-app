import React from 'react';
import PropTypes from 'prop-types';
import {Box} from 'reflexbox';

import 'src/assets/stylesheets/base.scss';


function App({ name }) {
  return (
    <Box flex auto justify='center' align='center'>
      <h1>Hello, {name}!</h1>
    </Box>


  );
};

App.propTypes = {
  name: PropTypes.string,
};

export default App;
