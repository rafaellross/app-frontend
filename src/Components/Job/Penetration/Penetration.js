import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import { Typography, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withRouter } from "react-router-dom";
import {DropzoneArea} from 'material-ui-dropzone'
import Image from 'material-ui-image';


import * as API from '../../../Api';

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
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 40,      
      marginBottom: 40
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



class Penetration extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: true,
            id: null,
            drawing: '',
            fire_seal_ref: '',
            fire_resist_level: '',            
            install_by: '',
            install_dt: '',
            job_id: '',
            fire_photo: '',
            manufacturer: ''
        }
    }
        
    componentDidMount() {
        
        

        const peno_id = this.props.match.params.id;
        const job_id = this.props.match.params.job;

        
        if (peno_id) {
            
            API.get('fire_identifications/show', peno_id)
            .then((penetration) => {            
                this.setState(() => ({
                    id: penetration.id,
                    drawing: penetration.drawing,
                    fire_seal_ref: penetration.fire_seal_ref,
                    fire_resist_level: penetration.fire_resist_level,            
                    install_by: penetration.install_by,
                    install_dt: penetration.install_dt,
                    job_id: penetration.job_id,
                    manufacturer: penetration.manufacturer,
                    fire_photo: penetration.fire_photo,
                    //Loading
                    isLoading: false
        
                }))                    
            })    
    
        } else {
            this.setState(() => ({
                isLoading: false,
                job_id: this.props.match.params.job
            }))
                
            
        }
        
    }
    

    handleSave(state) {
            
            API.save('fire_identifications', state)
            .then((penetration) => {            
                console.log(penetration)
                this.props.history.goBack()
            })
            
    }

    handleChange(event) {
        
        const { target: { name, value } } = event
        this.setState(() => ({
                [name]: value
            }));        
        
    
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
                          fire_photo: binaryStr
                      }));        
          
                      console.log(binaryStr)
                    }
                    reader.readAsDataURL(file)
                  })
    
                       
      }    


      handleDeletePhoto() {
        this.setState(() => ({
            fire_photo: null
        }));        

      }


    render () {
    
    return (
        <div>            
        <Typography variant="h3" component="h2" style={{textAlign: 'center', marginTop: 20, marginBottom: 10}}>
            {this.props.action}
        </Typography>

        { (
            <Paper elevation={3} className={this.props.classes.paper}>
                <form className={this.props.classes.root} noValidate autoComplete="off">
                <div>
                    <TextField required label="Fire Seal Reference" value={this.state.fire_seal_ref} variant="outlined" InputLabelProps={{ shrink: true}} name="fire_seal_ref" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Drawing" value={this.state.drawing} variant="outlined" InputLabelProps={{ shrink: true}} name="drawing" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Fire Resistance Level (FRL)" value={this.state.fire_resist_level} variant="outlined" InputLabelProps={{ shrink: true}} name="fire_resist_level" onChange={(e) => this.handleChange(e)}/>                    
                    <TextField type="date" required label="Installed Date" value={this.state.install_dt} variant="outlined" InputLabelProps={{ shrink: true}} name="install_dt" onChange={(e) => this.handleChange(e)}/>                    
                    <TextField required label="Installed By" value={this.state.install_by} variant="outlined" InputLabelProps={{ shrink: true}} name="install_by" onChange={(e) => this.handleChange(e)}/>                                                            
                    <TextField required label="Manufacturer" value={this.state.manufacturer} variant="outlined" InputLabelProps={{ shrink: true}} name="manufacturer" onChange={(e) => this.handleChange(e)}/>                                                            
                    <Divider light />
                    <div>
                        <img src={this.state.fire_photo} style={{maxWidth: '100%'}}/>
                    </div>                    
                    <DropzoneArea
                        filesLimit={1}
                        onChange={this.handleUploadPhoto.bind(this)}
                        onDelete={this.handleDeletePhoto.bind(this)}
                    />
                    
                    <div style={{marginTop: 20}}>
                        
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} onClick={() => this.props.history.goBack()}>Cancel</Button>                    
                            <Button variant="contained" color="primary" style={{width: '50%', padding: 10}} onClick={() => this.handleSave(this.state)}>Save</Button>
                        </ButtonGroup>
                    </div>
                </div>
                </form>
            </Paper> 
            
        )}
    
            
        </div>
    );
    }
}

export default withRouter(withStyles(styles)(Penetration));