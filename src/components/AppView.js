import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Box} from 'reflexbox';
import 'src/assets/stylesheets/base.scss';
import Demo from './Customer/Demo'
import elasticlunr from 'elasticlunr';
import {data} from './Customer/data'
import _ from 'lodash';

class AppView extends React.Component {

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
    debugger;
    return (
      <Flex column auto>
        <Demo 
          searchString={searchString}
          result={result}
          onChange={onChange}
        />
      </Flex>
    );
  }

  prepareData = () => {
    console.log(data);
    const index = elasticlunr(function () {
      this.addField('number');
      this.addField('insights');
      this.setRef('number');
    });
    _.forEach(data, (item) => index.addDoc(item));
    return index;
  }
};
export default AppView;
