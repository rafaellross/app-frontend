import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddMultiplePenetrations() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>
        Add Multiple Penetrations
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <form className={""} noValidate autoComplete="off">
                <div>
                    <TextField required label="Fire Seal Reference" value={""} variant="outlined" InputLabelProps={{ shrink: true}} name="fire_seal_ref" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Drawing" value={""} variant="outlined" InputLabelProps={{ shrink: true}} name="drawing" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Fire Resistance Level (FRL)" value={""} variant="outlined" InputLabelProps={{ shrink: true}} name="fire_resist_level" onChange={(e) => this.handleChange(e)}/>
                    <TextField type="date" required label="Installed Date" value={""} variant="outlined" InputLabelProps={{ shrink: true}} name="install_dt" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Installed By" value={""} variant="outlined" InputLabelProps={{ shrink: true}} name="install_by" onChange={(e) => this.handleChange(e)}/>
                    <TextField required label="Manufacturer" value={""} variant="outlined" InputLabelProps={{ shrink: true}} name="manufacturer" onChange={(e) => this.handleChange(e)}/>
                    <Divider light />
                    <div style={{marginTop: 20}}>
                        <ButtonGroup aria-label="outlined primary button group" style={{width: '80%', marginLeft: '10%'}}>
                            <Button variant="contained" color="secondary" style={{width: '50%', padding: '10px'}} onClick={() => 'props.history.goBack()'}>Cancel</Button>
                            <Button variant="contained" color="primary" style={{width: '50%', padding: 10}} onClick={() => console.log('this.handleSave(this.state)')}>Save</Button>
                        </ButtonGroup>
                    </div>
                </div>
                </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
