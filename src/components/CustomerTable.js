import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import OpenInNew from 'material-ui-icons/OpenInNew';
import CustomerDialog from './Dialog/CustomerDialog';
import fetch from 'node-fetch'


let counter = 0;
function createData(number, name, email, insights) {
  counter += 1;
  return { id: counter, number, name, email, insights };
}

const columnData = [
  { id: 'number', numeric: false, disablePadding: false, label: 'Phone Number' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'insights', numeric: false, disablePadding: false, label: 'Insights' },
];

class CustomerTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                {column.label}
              </TableCell>
            );
          }, this)}
          <TableCell padding="checkbox"/>
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100,
        }
      : {
          color: theme.palette.secondary.A100,
          backgroundColor: theme.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomerTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleClick = (event, id) => {
    console.log(id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  

  componentDidMount() {
    fetch('http://localhost:8088/getinsights')
    .then(res => res.text())
    .then(data => this.setState({data: JSON.parse(data)}));
  }

  render() { 
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const bindDialog = (ref) => this.dialog = ref;
    const openDialog = () => this.dialog.open();

    return (
      <Paper className={classes.root}>
        <CustomerDialog ref={bindDialog}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <CustomerTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                  >
                    <TableCell padding="default">{n.number}</TableCell>
                    <TableCell padding="default">{n.name}</TableCell>
                    <TableCell padding="default">{n.email}</TableCell>
                    <TableCell padding="default">{_.join(n.insights, ' - ')}</TableCell>
                    <TableCell padding="checkbox">
                      <IconButton
                        onClick={openDialog}
                      >
                        <OpenInNew />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomerTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerTable);