import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TabView from './TabView'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CustomerDialog extends React.Component {
  state = {
    open: false,
    customerNumber: undefined
  };

  open = (customerNumber) => {
    this.setState({ open: true, customerNumber });
  };

  handleRequestClose = () => {
    this.setState({ open: false, customerNumber: undefined });
  };

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          transition={Transition}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>{"Insight"}</DialogTitle>
          <DialogContent>
              <TabView />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomerDialog;