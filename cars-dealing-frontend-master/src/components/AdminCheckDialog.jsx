
// import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';


function AdminCheckDialog(props) {
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

    let navigate = useNavigate();
    let goToHome = ()=>{
        navigate('/');
    }
    let goToLogin = ()=>{
        navigate('/login');
    }

  return (
    <>
    
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"You are not authorized to intract with this page"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This Dashboard Page belongs to Admin only, so you are not authorized to view this page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={goToHome}>Home</Button>
          <Button onClick={goToLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
    
  );
}

export default AdminCheckDialog;