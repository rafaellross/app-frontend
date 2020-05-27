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

        this.state = {
            isLoading: true,
            title: '',
            description: '',
            qa_type: '',
            job: '',
            customer: '',
            site_manager: '',
            revision: '',
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
            open_modal_sign1: false,
            open_modal_sign2: false,
            open_modal_sign3: false,
            open_modal_sign4: false

        }
        this.openModal.bind(this)
    }

    sigPad1 = {}
    sigPad2 = {}
    sigPad3 = {}
    sigPad4 = {}
    openModal(modal = '') {
        switch (modal) {
            case "1":
                this.setState({open_modal_sign1: true});
            case "2":
                this.setState({open_modal_sign2: true});
            case "3":
                this.setState({open_modal_sign2: true});
            case "4":
                this.setState({open_modal_sign2: true});
            default:
                console.log('None');
        }

    }

    closeModal(modal = '') {
        switch (modal) {
            case "1":
                this.setState({open_modal_sign1: false});
            case "2":
                this.setState({open_modal_sign2: false});
            case "3":
                this.setState({open_modal_sign2: false});
            case "4":
                this.setState({open_modal_sign2: false});
            default:
                console.log('None');
        }

    }


    clear = () => {
        this.sigPad.clear()
      }

      trim = (modal) => {
        switch (modal) {
            case "1":
                this.setState({approved_sign_1: this.sigPad1.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            case "2":
                this.setState({approved_sign_2: this.sigPad2.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            case "3":
                this.setState({approved_sign_3: this.sigPad3.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            case "4":
                this.setState({approved_sign_4: this.sigPad4.getTrimmedCanvas()
                    .toDataURL('image/png')})
                break;
            default:
                console.log('None');
                break;
        }

      }

    componentDidMount() {


          API.getAll("q_a_users/add/1")
        .then((data) => {
            this.setState(() => ({
                activities: data.activities,
                foremen: data.foremen,
                jobs: data.jobs,
                qa_type: data.qa_type.id,
                description: data.qa_type.description,
                title: data.qa_type.title


            }))
        })


        if (this.props.qa_id) {
            API.get('q_a_users', this.props.user_id)
            .then((user) => {
                this.setState(() => ({
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    administrator: user.administrator,
                    password: user.password,
                    password_confirmation: user.password,
                    enabled: user.enabled,
                    //Loading
                    isLoading: false

                }))
            })

        } else {
            this.setState(() => ({
                isLoading: false
            }))


        }

    }



    handleChange(event) {

        const { target: { name, value } } = event
        this.setState(() => ({
                [name]: value
            }));
    }


    handleChangeActivity(event) {


            //Get className
            let className = event.target.name.split("[")[0]

            let newActivities = this.state.activities.map((activity) => activity.id == event.target.id ? Object.assign({}, activity, {[className]: event.target.value}) : activity
            )

            this.setState({activities: newActivities}, () => console.log(this.state.activities))

    }

    handleSubmit(e) {
        e.preventDefault()
        API.save('q_a_users', this.state)
        .then((employee) => {
            console.log(employee)
            //this.props.history.goBack()
        })

    }

    render () {
        let {trimmedDataURL} = this.state
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
                    <TextField select label="Project" value={this.state.job} variant="outlined" name="job" onChange={(e) => this.handleChange(e)}>
                        <option value={''}>-</option>
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
                        <ModalSignature
                            key={"modal1"}
                            open={this.state.open_modal_sign1}
                            onClose={() => this.closeModal("1")}
                            saveSign={() => this.trim("1")}
                            body={
                                <SignaturePad
                                    style={{maxWidth: '100%'}}
                                    backgroundColor="grey"
                                    marginLeft
                                    canvasProps={{maxWidth: '100%', width: '100%'}}
                                    ref={(ref) => { this.sigPad1 = ref }} />}
                            />
                        {this.state.approved_sign_1
                        ? <img className={styles.sigImage}
                        src={this.state.approved_sign_1} />
                        : null}

                         <Button variant="contained" color="secondary" onClick={this.clear}>Clear</Button>
                         <Button variant="contained" color="primary" onClick={this.trim}>Save</Button>
                    </div>


                    <div>
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} component={Link} to={'/users'}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary" style={{width: '50%', padding: 10}}>Save</Button>
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

export default withRouter(withStyles(styles)(Qa));