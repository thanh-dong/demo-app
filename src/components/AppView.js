import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import 'src/assets/stylesheets/base.scss';
import Demo from './Customer/Demo'
import elasticlunr from 'elasticlunr';
import { data } from './Customer/data'
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
      this.setState({
        result: this.index.search(event.target.value, {
          fields: {
            insight_string: { boost: 2 },
          },
          boolean: 'OR', 
          expand: true
        })
      })
    }
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
      this.addField('insight_string');
      this.setRef('number');
    });
    _.forEach(data, (item) => {
      const insight_string = _.join(_.map(item.insights, 'name'), ';');
      item.insight_string = insight_string;
      index.addDoc(item)
    });
    return index;
  }
};
export default AppView;
