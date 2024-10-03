import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableComponent = ({ data }) => {
  if (!data || !data.headers || !data.rows) {
    return <div>No tabular data found.</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {data.headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const parseTableData = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 3) return null; // Not enough lines for a table

  const headers = lines[0].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
  const rows = lines.slice(2).map(line =>
    line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
  );

  return { headers, rows };
};

export default TableComponent;