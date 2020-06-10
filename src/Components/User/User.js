import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import {
    handleUpdateUser,
    handleAddUser
 } from "../../Redux/Actions/users";
 import {DropzoneArea} from 'material-ui-dropzone'

const styles = theme => ({

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap'

    },
  },
  paper : {
      width: '40%',
      marginLeft: '30%',
      padding: 10
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },

});



class User extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            id: null,
            name: '',
            email: '',
            administrator: false,
            password: '',
            password_confirmation: '',
            enabled: true,
            user_photo: ''
        }
    }

    componentDidMount() {
        if (this.props.type === "edit") {
            const user = this.props.user
            this.setState(() => ({
                id: user.id,
                name: user.name,
                email: user.email,
                administrator: user.administrator,
                password: user.password,
                password_confirmation: user.password,
                enabled: user.enabled,
            }))
        }
    }

    handleUploadPhoto(acceptedFiles){

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              const binaryStr = reader.result
              this.setState(() => ({
                  user_photo: binaryStr
              }));

              console.log(binaryStr)
            }
            reader.readAsDataURL(file)
          })
    }


    handleDeletePhoto() {
        this.setState(() => ({
            user_photo: null
        }));

      }

    handleSave(state) {
        if (this.props.type === "edit") {
            this.props.dispatch(handleUpdateUser(state))
        } else {
            this.props.dispatch(handleAddUser(state))
        }
        this.props.history.goBack()
    }

    handleChange(event) {
        const { target: { name, value } } = event
        this.setState(() => ({
                [name]: value
        }));
    }

    render () {
        return (
            <div>
            <Typography variant="h3" component="h2" className={this.props.classes.paper} style={{textAlign: 'center'}}>
                {this.props.action}
            </Typography>
                <Paper elevation={3} className={this.props.classes.paper}>
                    <form className={this.props.classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField required label="Name" value={this.state.name} variant="outlined" InputLabelProps={{ shrink: true}} name="name" onChange={(e) => this.handleChange(e)}/>
                        <TextField required label="E-mail" value={this.state.email} variant="outlined" InputLabelProps={{ shrink: true}} name="email" onChange={(e) => this.handleChange(e)} disabled={this.props.user_id ? true : false}/>
                        <TextField id="adminsitrator" select label="User Type" value={this.state.inactive? '1' : '0'}
                        variant="outlined" name="enabled" onChange={(e) => this.handleChange(e)}>
                            <option key={'1'} value={'1'}>Administrator</option>
                            <option key={'0'} value={'0'}>Normal</option>
                        </TextField>

                        <TextField required label="Password" type="password" value={this.state.password} variant="outlined" InputLabelProps={{ shrink: true}} name="password" onChange={(e) => this.handleChange(e)}/>
                        <TextField required label="Confirm Password" type="password" value={this.state.password_confirmation} variant="outlined" InputLabelProps={{ shrink: true}} name="password_confirmation" onChange={(e) => this.handleChange(e)}/>
                        <DropzoneArea
                            filesLimit={1}
                            onChange={this.handleUploadPhoto.bind(this)}
                            onDelete={this.handleDeletePhoto.bind(this)}
                        />

                        <div>
                            <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                                <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} component={Link} to={'/users'}>Cancel</Button>
                                <Button variant="contained" color="primary" style={{width: '50%', padding: 10}} onClick={() => this.handleSave(this.state)}>Save</Button>
                            </ButtonGroup>
                        </div>
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default connect()(withRouter(withStyles(styles)(User)))