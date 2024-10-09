import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import links from '../assets/util/links';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",  // Adjust width to be responsive
  maxWidth: 400, // Max width for larger screens
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserManagementTable = ({ headerCells, rows, deleteRow }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const editUserhandler = (userId) => {
    navigate('/Dashboard/add-user?edit=true&userId=' + userId);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState('');
  const [currentViewRow, setCurrentViewRow] = useState({});
  const openDeleteModalHandler = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const dispatch = useDispatch();
  const deleteUserHandler = (userId) => {
    dispatch(startLoader());
    axios.post(links.backendUrl + '/delete-user', {
      userId: userId
    })
      .then(response => {
        dispatch(endLoader());
        if (response.status < 200 || response.status > 299) {
          let newError = {
            message: response.data.message
          };
          throw newError;
        } else {
          Swal.fire({
            title: 'Deleted',
            text: 'Deleted Successfully.',
            icon: 'success'
          });
        }
      })
      .catch(err => {
        dispatch(endLoader());
        console.log('error while deleting user', err);
      });
    deleteRow(userId);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="simple user table">
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell) => (
                <TableCell key={headerCell}>{headerCell}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Button onClick={() => { setCurrentViewRow(row); handleOpen(); }} color="primary" variant="contained">
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    m={1}
                    variant="contained"
                    color="primary"
                    startIcon={<PreviewIcon />}
                    onClick={() => editUserhandler(row._id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setCurrentDeleteId(row._id);
                      openDeleteModalHandler();
                    }}
                    m={1}
                  >
                    Delete
                  </Button>{" "}
                  <Link
                    to="#"
                    onClick={(e) => {
                      window.location.href = 'mailto:' + row.email;
                      e.preventDefault();
                    }}
                  >
                    <Button
                      m={1}
                      variant="contained"
                      color="primary"
                      startIcon={<NotificationsActiveIcon />}
                    >
                      Send Notification
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography textAlign="center" variant="h5">
                Are you Sure you want to Delete this user?
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={5}>
                <Button onClick={handleCloseDeleteModal} variant="contained" color="warning">
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={5} textAlign="end">
                <Button onClick={() => { deleteUserHandler(currentDeleteId); handleCloseDeleteModal(); }} variant="contained" color="error">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item xs={4}>
              First Name:
            </Grid>
            <Grid item xs={8}>
              {currentViewRow.firstName}
            </Grid>
            <Grid item xs={4}>
              Last Name:
            </Grid>
            <Grid item xs={8}>
              {currentViewRow.lastName}
            </Grid>
            <Grid item xs={4}>
              Email:
            </Grid>
            <Grid item xs={8}>
              {currentViewRow.email}
            </Grid>
            <Grid item xs={4}>
              Role:
            </Grid>
            <Grid item xs={8}>
              {currentViewRow.role}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default UserManagementTable;
