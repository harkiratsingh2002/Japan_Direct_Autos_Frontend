import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";


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

const YourEnquiriesTable = ({ headerCells, rows }) => {
  const [currentRow, setCurrentRow] = React.useState({});
  const [openEnquiryModal, setOpenEnquiryModal] = React.useState(false);
  const openEnquiryModalHandler = () => {
    setOpenEnquiryModal(true);
  };
  const handleCloseEnquiryModal = () => {
    setOpenEnquiryModal(false);
  };
  const navigate = useNavigate()
  const viewCarhandler = (carId) => {
    // open edit car modal
    navigate("/car-details/" + carId);
  };
 
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple user table">
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell) => {
                return <TableCell>{headerCell}</TableCell>;
              })}
              {/* <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell >{(i + 1)}</TableCell> */}
                {/* <TableCell >{row.firstName}</TableCell> */}
                {/* <TableCell>{row.oldOrNew}</TableCell> */}
                <TableCell>{row.enquirySubject}</TableCell>
                {/* <TableCell>{row.role}</TableCell> */}
                <TableCell>
                  <Button
                    m={2}
                    variant="contained"
                    color="primary"
                    startIcon={<PreviewIcon />}
                    onClick={() => {
                      setCurrentRow(row);
                      openEnquiryModalHandler();
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    m={1}
                    variant="contained"
                    color="primary"
                    startIcon={<PreviewIcon />}
                    onClick={() => {
                      viewCarhandler(row.carId);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  {row.completed ? "Completed" : "In Progress"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openEnquiryModal}
        onClose={handleCloseEnquiryModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4">{currentRow.enquirySubject}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">{currentRow.enquiryText}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      
    </>
  );
};

export default YourEnquiriesTable;
