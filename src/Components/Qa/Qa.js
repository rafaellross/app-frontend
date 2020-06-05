import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ActivitiesInputs from './ActivitiesInputs';
import 'typeface-roboto';
import * as API from '../../Api';
import SignaturePad from 'react-signature-canvas';
import ModalSignature from '../../utils/ModalSignature';
import { DropzoneArea } from 'material-ui-dropzone';

const styles = theme => ({

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap'

    },
  },
  paper : {
      width: '100%',
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

class Qa extends Component {

    constructor(props) {
        super(props)
        let date = new Date();
        let today = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`
        this.state = {
            isLoading: true,
            title: '',
            description: '',
            update_date: today,
            qa_type: '',
            project: '',

            customer: '',
            site_manager: '',
            revision: '1',
            unit_area: '',
            foreman: '',
            location: '',
            comments: '',
            distribution: '',
            approved_name_1: '',
            approved_company_1: '',
            approved_position_1: '',
            approved_sign_1: '',

            approved_name_2: '',
            approved_company_2: '',
            approved_position_2: '',
            approved_sign_2: '',

            approved_name_3: '',
            approved_company_3: '',
            approved_position_3: '',
            approved_sign_3: '',

            approved_name_4: '',
            approved_company_4: '',
            approved_position_4: '',
            approved_sign_4: '',

            jobs: [],
            foremen: [],
            activities: [],
            trimmedDataURL: null,

            //Modals
            openSignModal: false,
            currentSignature: '',
            open_modal_sign1: false,
            open_modal_sign2: false,
            open_modal_sign3: false,
            open_modal_sign4: false,

            //Photos
            photos: [],
            previewPhotos: undefined
        }
        this.openModal.bind(this)
    }

    sigPad = {}
    openModal(modal = '') {

        this.setState({
            openSignModal: true,
            currentSignature: modal
        });

    }

    closeModal() {
        this.setState({
            openSignModal: false,
            currentSignature: null
        });
    }


    clear = () => {

        this.sigPad.clear()

    }

    trim = () => {
        switch (this.state.currentSignature) {
            case "1":
                this.setState({approved_sign_1: this.sigPad.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            case "2":
                this.setState({approved_sign_2: this.sigPad.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            case "3":
                this.setState({approved_sign_3: this.sigPad.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            case "4":
                this.setState({approved_sign_4: this.sigPad.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            default:
                console.log('None');
                break;
        }
        this.closeModal()
    }


    loadPhotos() {
/*
        let counter = 1
        this.state.photos.map(photo => {
            fetch(photo).then(res => {
                res.arrayBuffer().then(buf => {
                  const file = new File([buf], `image_data_url_${counter}.jpg`, { type: 'image/jpeg' })
                  this.setState((prevState, props) => ({
                    previewPhotos: file
                  }));

                })
              })

        })
*/
        /*
        let photoArr = []
        arrPhotos.map(photo => {
            fetch(photo.qa_photo).then(res => {
                res.arrayBuffer().then(buf => {
                  const file = new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' })
                  //photoArr = [...photoArr, new File([buf], `image_data_url_${photo.id}.jpg`, { type: 'image/jpeg' })]
                })
              })

        })

        this.setState(() => ({
            photos: photoArr
        }))
        */

      }


    componentDidMount() {




        if (this.props.qa_id) {
            API.get('q_a_users/edit', this.props.qa_id)
            .then((data) => {
                this.setState(() => ({
                    activities: data.activities,
                    foremen: data.foremen,
                    jobs: data.jobs,
                    qa_type: data.qa_type.id,
                    approved_company_1: data.qa.approved_company_1,
                    approved_company_2: data.qa.approved_company_2,
                    approved_company_3: data.qa.approved_company_3,
                    approved_company_4: data.qa.approved_company_4,
                    approved_name_1: data.qa.approved_name_1,
                    approved_name_2: data.qa.approved_name_2,
                    approved_name_3: data.qa.approved_name_3,
                    approved_name_4: data.qa.approved_name_4,
                    approved_position_1: data.qa.approved_position_1,
                    approved_position_2: data.qa.approved_position_2,
                    approved_position_3: data.qa.approved_position_3,
                    approved_position_4: data.qa.approved_position_4,
                    approved_sign_1: data.qa.approved_sign_1,
                    approved_sign_2: data.qa.approved_sign_2,
                    approved_sign_3: data.qa.approved_sign_3,
                    approved_sign_4: data.qa.approved_sign_4,
                    comments: data.qa.comments,
                    created_at: data.qa.created_at,
                    customer: data.qa.customer,
                    description: data.qa.description,
                    distribution: data.qa.distribution,
                    foreman: data.qa.foreman,
                    id: data.qa.id,
                    location: data.qa.location,
                    project: data.qa.project,
                    revision: data.qa.revision,
                    site_manager: data.qa.site_manager,
                    title: data.qa.title,
                    unit_area: data.qa.unit_area,
                    update_date: data.qa.update_date,

                    //Photos
                    photos: data.photos ? data.photos.map(photo => photo.qa_photo) : []

                }))

                this.loadPhotos();

            })

        } else {

            API.getAll("q_a_users/add/1")
            .then((data) => {
                this.setState(() => ({
                    activities: data.activities,
                    foremen: data.foremen,
                    jobs: data.jobs,
                    qa_type: data.qa_type.id,
                    description: data.qa_type.description,
                    title: data.qa_type.title,


                }))
            })


        }

    }



    handleChange(event) {

        const { target: { name, value } } = event
        this.setState(() => ({
                [name]: value
            }));
    }


    handleChangeActivity(event) {


            const currId = event.target.id === undefined ? event.target.name.split("-")[0].toString() :event.target.id.toString()
            console.log(currId);
            //Get className
            let className = event.target.id === undefined ? event.target.name.split("-")[1].toString() : event.target.name

            let newActivities = this.state.activities.map((activity) => activity.id.toString() === currId ? Object.assign({}, activity, {[className]: event.target.value}) : activity
            )
            console.log(newActivities)
            this.setState({activities: newActivities}, () => console.log(this.state.activities))

    }

    handleSubmit(e) {
        e.preventDefault()
        API.save('q_a_users', this.state)
        .then((employee) => {
            console.log(employee)
            this.props.history.goBack()
        })

    }


    handleUploadPhoto(acceptedFiles){
        let photosUpload = []


        this.setState((prevState, props) => ({
            photos: []
          }));

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              const binaryStr = reader.result;
              photosUpload.concat(binaryStr);
              this.setState((prevState, props) => ({
                photos: [...prevState.photos, binaryStr]
              }));


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
        <Typography variant="h3" component="h2" className={this.props.classes.paper} style={{textAlign: 'center'}}>
            {this.props.action}
        </Typography>

        { (
            <Paper elevation={3} className={this.props.classes.paper}>
                <form className={this.props.classes.root} noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
                <div>
                    <TextField required label="Type" value={this.state.title} variant="outlined" InputLabelProps={{ shrink: true}} name="title" onChange={(e) => this.handleChange(e)} type="text"/>
                    <TextField required label="Description" value={this.state.description} variant="outlined" InputLabelProps={{ shrink: true}} name="description" onChange={(e) => this.handleChange(e)} type="text"/>
                    <TextField required label="Date Of Update" value={this.state.update_date} variant="outlined" InputLabelProps={{ shrink: true}} name="update_date" onChange={(e) => this.handleChange(e)} type="date"/>
                    <TextField required label="Revision" value={this.state.revision} variant="outlined" InputLabelProps={{ shrink: true}} name="revision" onChange={(e) => this.handleChange(e)} type="number"/>
                    <TextField select required label="Project" value={this.state.project} variant="outlined" name="project" onChange={(e) => this.handleChange(e)}>
                        {this.state.jobs.map(job => (
                            <option key={job.id} value={job.id}>{job.description}</option>
                        ))}
                    </TextField>
                    <TextField required label="Customer" value={this.state.customer} variant="outlined" InputLabelProps={{ shrink: true}} name="customer" onChange={(e) => this.handleChange(e)} type="text"/>
                    <TextField required label="Unit/Area No:" value={this.state.unit_area} variant="outlined" InputLabelProps={{ shrink: true}} name="unit_area" onChange={(e) => this.handleChange(e)} type="text"/>
                    <TextField required label="Site Manager:" value={this.state.site_manager} variant="outlined" InputLabelProps={{ shrink: true}} name="site_manager" onChange={(e) => this.handleChange(e)} type="text"/>
                    <TextField select label="Foreman" value={this.state.foreman} variant="outlined" name="foreman" onChange={(e) => this.handleChange(e)}>
                        {this.state.foremen.map(foreman => (
                            <option key={foreman.id} value={foreman.id}>{foreman.name}</option>
                        ))}

                    </TextField>
                    <TextField select label="Distribution" value={this.state.distribution} variant="outlined" name="distribution" onChange={(e) => this.handleChange(e)}>
                            <option value={'Builder'}>Builder</option>
                            <option value={'Client'}>Client</option>
                            <option value={'Reg Auth.'}>Reg Auth.</option>
                            <option value={'Engineer'}>Engineer</option>
                    </TextField>
                    <TextField required label="Location" value={this.state.location} variant="outlined" InputLabelProps={{ shrink: true}} name="location" onChange={(e) => this.handleChange(e)} type="text"/>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Activity</TableCell>
                                <TableCell>A/T</TableCell>
                                <TableCell>Criteria Requirements</TableCell>
                                <TableCell>Reference</TableCell>
                                <TableCell>Yes/No</TableCell>
                                <TableCell>Installed By</TableCell>
                                <TableCell>Checked  By</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <ActivitiesInputs activities={this.state.activities} handleChange={this.handleChangeActivity.bind(this)}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <Typography variant="h5" style={{textAlign: 'center'}}>
                            COMMENTS
                        </Typography>
                        <TextField size={"medium"} rows={5} multiline={true} required value={this.state.comments} variant="outlined" InputLabelProps={{ shrink: true}} name="comments" onChange={(e) => this.handleChange(e)} type="text"/>
                    </div>
                    <div>
                        <Typography variant="h5" style={{textAlign: 'center'}}>
                            Approved By
                        </Typography>
                    </div>
                    <div>
                        <TextField required label="Name:" value={this.state.approved_name_1} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_name_1" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Company:" value={this.state.approved_company_1} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_company_1" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Position:" value={this.state.approved_position_1} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_position_1" onChange={(e) => this.handleChange(e)} type="text"/>
                        <Button variant="contained" color="secondary" onClick={() => this.openModal("1")}>Sign</Button>
                        {this.state.approved_sign_1
                        ? <img alt="" className={styles.sigImage}
                        src={this.state.approved_sign_1} />
                        : null}
                    </div>

                    <div>
                        <TextField required label="Name:" value={this.state.approved_name_2} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_name_2" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Company:" value={this.state.approved_company_2} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_company_2" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Position:" value={this.state.approved_position_2} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_position_2" onChange={(e) => this.handleChange(e)} type="text"/>
                        <Button variant="contained" color="secondary" onClick={() => this.openModal("2")}>Sign</Button>
                        {this.state.approved_sign_2
                        ? <img alt="" className={styles.sigImage}
                        src={this.state.approved_sign_2} />
                        : null}
                    </div>
                    <div>
                        <TextField required label="Name:" value={this.state.approved_name_3} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_name_3" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Company:" value={this.state.approved_company_3} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_company_3" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Position:" value={this.state.approved_position_3} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_position_3" onChange={(e) => this.handleChange(e)} type="text"/>
                        <Button variant="contained" color="secondary" onClick={() => this.openModal("3")}>Sign</Button>
                        {this.state.approved_sign_3
                        ? <img alt="" className={styles.sigImage}
                        src={this.state.approved_sign_3} />
                        : null}
                    </div>
                    <div>
                        <TextField required label="Name:" value={this.state.approved_name_4} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_name_4" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Company:" value={this.state.approved_company_4} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_company_4" onChange={(e) => this.handleChange(e)} type="text"/>
                        <TextField required label="Position:" value={this.state.approved_position_4} variant="outlined" InputLabelProps={{ shrink: true}} name="approved_position_4" onChange={(e) => this.handleChange(e)} type="text"/>
                        <Button variant="contained" color="secondary" onClick={() => this.openModal("4")}>Sign</Button>
                        {this.state.approved_sign_4
                        ? <img alt="" className={styles.sigImage}
                        src={this.state.approved_sign_4} />
                        : null}
                    </div>
                    <div>
                        <Typography variant="h5" style={{textAlign: 'center'}}>
                            Photos
                        </Typography>
                    </div>
                    {this.state.photos && (
                        this.state.photos.map((photo) =>
                            <img src={photo} style={{maxWidth: '100%'}} alt=""/>
                        )

                    )}
                    <DropzoneArea

                        initialFiles={this.state.previewPhotos}

                        filesLimit={10}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        onChange={this.handleUploadPhoto.bind(this)}
                        onDelete={this.handleDeletePhoto.bind(this)}
                    />

                    <div>
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} component={Link} to={'/qa'}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary" style={{width: '50%', padding: 10}}>Save</Button>
                        </ButtonGroup>
                    </div>
                    </div>
                </form>
            </Paper>

        )}

<ModalSignature
                            open={this.state.openSignModal}
                            onClose={() => this.closeModal()}
                            saveSign={() => this.trim()}
                            body={
                                <SignaturePad
                                    style={{maxWidth: '100%'}}
                                    backgroundColor="grey"
                                    marginLeft
                                    canvasProps={{width: '100%'}}
                                    ref={(ref) => { this.sigPad = ref }} />}
                            />

        </div>
    );
    }
}

export default withRouter(withStyles(styles)(Qa));