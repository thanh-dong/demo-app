/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import InsightTable from './InsightTable'
import Typography from 'material-ui/Typography';
import PaperView from './PaperView'

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class TabView extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: '#2196f3'}}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Insight" />
            <Tab label="RawData" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
          <InsightTable />
        </TabContainer>}
        {value === 1 && <TabContainer>
          <Typography type="body1" component="p">
            <PaperView />
          </Typography>
        </TabContainer>}
      </div>
    );
  }
}

TabView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabView);