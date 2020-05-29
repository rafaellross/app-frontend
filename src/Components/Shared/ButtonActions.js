import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'




import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Record"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.deleteAction(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => props.deleteAction(true)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



export default function ButtonActions(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

const handleDelete = () => {
    setOpenConfirmation(true);
    handleClose()

}

const deleteAction = (result) => {
    console.log("Result", result)
    setOpenConfirmation(false);
}

  return (
    <div>
        <AlertDialog open={openConfirmation} deleteAction={deleteAction}/>
      <Button variant="contained" onClick={handleClick}>
        Actions
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

            <Link to={props.linkToPrint} style={{textDecoration: 'inherit'}}>
                <MenuItem onClick={handleClose}>Print</MenuItem>
            </Link>
            <Link to={props.linkToEdit} style={{textDecoration: 'inherit'}}>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
            </Link>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}