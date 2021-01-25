import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { selectors, operations } from "../../state/ducks/DataStore";

import "./AddData.css";

class AddData extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }
  componentWillReceiveProps(nextProps) {
    const { fromData } = nextProps;
    this.setState({ ...fromData });
  }
  get initialState() {
    return {
      name: "",
      email: "",
      password: "",
      role: "",
      isEdit: ""
    };
  }
  handleTextFieldChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  SubmitData = e => {
    e.preventDefault();
    const { PostcallForInserUser, callForDataContent } = this.props;
    let dataValue = this.state;
    console.log('test data--->',dataValue );
    PostcallForInserUser(dataValue);
    callForDataContent()
    this.setState(this.initialState);
  };
  EditData = e => {
    e.preventDefault();
    const { PostcallForEditUser,callForDataContent, DataListContent } = this.props;
    const { name, email, role, _id } = this.state;
    console.log('Edit value ==', this.state);
    const dataValue = {
      name, email, role,_id
    };
    PostcallForEditUser(dataValue);
    callForDataContent();
    console.log('Afert Insert-->>>', DataListContent);
    this.setState(this.initialState);
  };
  render() {
    const { name, email, password, role, isEdit } = this.state;
    return (
      <div className="container">
        <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                name="name"
                value={name}
                onChange={this.handleTextFieldChange}
                id="input-with-icon-grid"
                label="name"
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                name="email"
                value={email}
                onChange={this.handleTextFieldChange}
                id="input-with-icon-grid"
                label="email"
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                value={password}
                onChange={this.handleTextFieldChange}
                id="input-with-icon-grid"
                label="password"
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                name="role"
                value={role}
                onChange={this.handleTextFieldChange}
                id="input-with-icon-grid"
                label="role"
              />
            </Grid>
          </Grid>
        </div>
        <div className="buttonDiv">
          <Grid container spacing={1} alignItems="flex-end">
            {isEdit ? (
              <Button
                onClick={this.EditData}
                variant="contained"
                color="primary"
              >
                Edit Data
              </Button>
            ) : (
              <Button
                onClick={this.SubmitData}
                variant="contained"
                color="primary"
              >
                Add Data
              </Button>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

AddData.defaultProps = {
  fromData: {
    name: "",
    email: "",
    password: "",
    role: "",
    isEdit: false
  }
};
AddData.propTypes = {
  PostcallForInserUser: PropTypes.func.isRequired,
  PostcallForEditUser: PropTypes.func.isRequired,
  callForDataContent: PropTypes.func.isRequired,
  fromData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
  })
};

const mapDispatchToProps = dispatch => ({
  PostcallForInserUser: operations.PostcallForInserUser(dispatch),
  PostcallForEditUser: operations.PostcallForEditUser(dispatch),
  callForDataContent: operations.callForDataContent(dispatch),
});

const mapStateToProps = state => ({
  DataListContent: selectors.getUserList(state)
});

const AddDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddData);
export default AddDataContainer;
