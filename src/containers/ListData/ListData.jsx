import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddData from "../AddData/AddData";
import { operations, selectors } from "../../state/ducks/DataStore";
import Data from "../../Data.json";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const header = [
  { id: 1, value: "Name" },
  { id: 2, value: "Email" },
  { id: 3, value: "Role" },
  { id: 4, value: "Edit" },
  { id: 5, value: "Delete" }
];

class ListData extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      walletData: {},
      renderFrom: false,
    };
  }
  componentDidMount() {
    console.log('trst tigger 1str');
    const { callForDataContent } = this.props;
    callForDataContent();
  }
  // componentDidUpdate() {
  //   console.log('test updated');
  //   const { callForDataContent } = this.props;
  //   callForDataContent();
  // }
  onEditClick = (e, row) => {
    e.preventDefault();
    const walletData = { ...row, isEdit: true };
    this.setState({ walletData, renderFrom: true });
  };
  onDeleteClick = (e, row) => {
    e.preventDefault();
    const { PostcallForDeleteUser, callForDataContent } = this.props;
    PostcallForDeleteUser(row._id);
    callForDataContent();
  };
  render() {
    const { renderFrom, walletData } = this.state;
    const { DataListContent } = this.props;
    console.log('test ListData-->>', DataListContent);
    return (
      <>
        <div>
          {renderFrom ? <AddData fromData={walletData} /> : <AddData />}
        </div>
        <TableContainer component={Paper}>
          <Table className="tablestyle" aria-label="customized table">
            <TableHead>
              <TableRow>
                {header.map(headerValue => (
                  <StyledTableCell key={headerValue.id}>
                    {headerValue.value}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {DataListContent &&
                DataListContent.map(row => (
                  <TableRow key={row._id}>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                    <StyledTableCell align="left">
                      <button
                        onClick={(e) => {
                          this.onEditClick(e, row);
                        }}
                      >
                        <i class="fa fa-edit" />
                      </button>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <button
                        onClick={(e) => {
                          this.onDeleteClick(e, row);
                        }}
                      >
                        <i class="fa fa-trash" />
                      </button>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

      </>
    );
  }
}

ListData.propTypes = {
  callForDataContent: PropTypes.func.isRequired,
  PostcallForDeleteUser: PropTypes.func.isRequired,
  fromData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
  })
};

const mapStateToProps = state => ({
  DataListContent: selectors.getUserList(state)
});

const mapDispatchToProps = dispatch => ({
  callForDataContent: operations.callForDataContent(dispatch),
  PostcallForDeleteUser: operations.PostcallForDeleteUser(dispatch),
});

const ListDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListData);
export default ListDataContainer;
