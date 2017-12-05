import React from 'react';
import {Flex, Box} from 'reflexbox';

import _ from 'lodash';

class Demo extends React.Component {
  render() {
    const { onChange, result, searchString } = this.props;
    return (
      <Flex auto column>
        <input type="text" label="Search" onChange={onChange}/>
        <Box py={1}>
          {_.map(result, (item, index) => (<Box key={index}> {JSON.stringify(item)}</Box>))}
        </Box>
      </Flex>
    );
  }
};
export default Demo;
