import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Box} from 'reflexbox';
import 'src/assets/stylesheets/base.scss';
import Demo from './Customer/Demo'
import elasticlunr from 'elasticlunr';
import {data} from './Customer/data'
import _ from 'lodash';
class Root extends React.Component {

  state = {}
  componentDidMount() {
    this.index = this.prepareData();
  }

  render() {
    const { searchString, result } = this.state;
    const onChange = (event) => {
      this.setState({ searchString: event.target.value })
      this.setState({result: this.index.search(event.target.value, {expand: true})})
    }
    return (
      <Flex column auto p={1}>
        <Box auto justify='center' align='center'>
          <h1>Demo App</h1>
        </Box>
        <Box pt={1}>
          <Demo 
            searchString={searchString}
            result={result}
            onChange={onChange}
          />
        </Box>
      </Flex>
    );
  }

  prepareData = () => {
    console.log(data);
    const index = elasticlunr(function () {
      this.addField('number');
      this.addField('insights');
      this.setRef('number');
      this.saveDocument(false);
    });
    _.forEach(data, (item) => index.addDoc(item));
    return index;
  }
};
export default Root;
