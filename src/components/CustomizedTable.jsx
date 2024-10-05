import React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
    padding: theme.spacing(2),
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: theme.spacing(1.5),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function camelToSentence(text) {
  return text
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function CustomizedTable({ headerCols, rows }) {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 2 }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {headerCols.map((headCol, i) => (
              <StyledTableCell key={i} align="left">
                {headCol}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            const fieldName = Object.keys(row)[0];
            const fieldValue = row[fieldName];
            return (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {camelToSentence(fieldName)}
                </StyledTableCell>
                <StyledTableCell>{fieldValue}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTable;
