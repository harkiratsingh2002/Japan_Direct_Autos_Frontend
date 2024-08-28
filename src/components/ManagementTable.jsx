import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import links from '../assets/util/links';
import Swal from 'sweetalert2';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ManagementTable = ({headerCells, rows, deleteRow})=>{

  const navigate = useNavigate()

  const viewCarhandler = (carId)=>{
    // open edit car modal
    navigate('/car-details/'+ carId)
    
  }

  const carDeleteHandler = (carId)=>{
    axios.post(links.backendUrl + '/delete-car',{
      carId: carId
    })
    .then((response)=>{

      if(response.status<200 || response.status>299){
        Swal.fire({
          title: "error",
          text: response.data.message,
          icon: "error",
        })
      }
      else{
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: 'success'
        })
        // window.location.reload();
        deleteRow(carId)
        
      }
    })
  }
  const openDeleteModalHandler = ()=>{
    setOpenDeleteModal(true)
  }
  const handleCloseDeleteModal = ()=>{
    setOpenDeleteModal(false)
  }
  const [openDeleteModal,setOpenDeleteModal] = React.useState(false)
  const [currentDeleteId,setCurrentDeleteId] = React.useState('')
    return (
      <>
      
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell)=>{
                return  <TableCell>{headerCell}</TableCell>
                 
              })}
              {/* <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <TableRow
              key={row.carId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              
                
                <TableCell >{(i + 1)}</TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell>{row.oldOrNew}</TableCell>
                <TableCell >{row.adminEmail ? row.adminEmail.email : row.adminId.email}</TableCell>
                <TableCell ><Button m={1} variant='contained' color='primary' startIcon={<PreviewIcon />} onClick={()=>{
                    viewCarhandler(row.carId)
                }}>View</Button> <Button variant='contained'  color='error' startIcon={<DeleteIcon />} onClick={()=>{
                  setCurrentDeleteId(row.carId)
                  openDeleteModalHandler()

                }} m={1}>Delete</Button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
                  open={openDeleteModal}
                  onClose={handleCloseDeleteModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Grid container xs={12}>
                      <Grid item xs={12}>

                      <Typography textAlign={'center'} variant="h5">
                        Are you Sure you want to Delete this user ?
                      </Typography>
                      </Grid>
                      <Grid container justifyContent={'space-between'}>
                        <Grid item xs={5}>

                        <Button onClick={handleCloseDeleteModal} variant="contained" color="warning">
                          Cancel
                        </Button>
                        </Grid>
                        <Grid textAlign={'end'} item xs={5}>

                        <Button onClick={()=>{
                          carDeleteHandler(currentDeleteId);
                          handleCloseDeleteModal()
                        }}variant="contained" color="error">
                          Delete
                        </Button>
                        </Grid>

                      </Grid>
                    </Grid>
                  </Box>
      </Modal>
      </>
      
    )
}


export default ManagementTable;