import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';

export default function GenerateClearenceReport() {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [clearenceRecords, setClearenceRecords] = useState([]);
    const [openRows, setOpenRows] = useState([]);

    useEffect(() => {
        // Initialize openRows with true for each record
        setOpenRows(new Array(clearenceRecords.length).fill(true));
    }, [clearenceRecords]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Construct the URL with the registration number
            const url = `https://us-central1-clear-flow-9e0f0.cloudfunctions.net/ClearFlow/records`;

            // Send a GET request to the backend using Axios
            const response = await axios.get(url, {
                params: {
                    registrationNumber: registrationNumber
                }
            });

            // Set the clearence records state with the response data
            setClearenceRecords(response.data);
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error.message);
        }

        // Reset the registration number after submission
        setRegistrationNumber('');
    };

    const handleInputChange = (event) => {
        setRegistrationNumber(event.target.value);
    };

    const handleRowClick = (index) => {
        const newOpenRows = [...openRows];
        newOpenRows[index] = !newOpenRows[index];
        setOpenRows(newOpenRows);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            paddingX={2}
            paddingTop={4}
            bgcolor="#f1f3f4"
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                bgcolor="white"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                borderRadius="8px"
                width="100%"
                maxWidth="600px"
                padding={4}
                marginBottom={4}
            >
                <TextField
                    label="Registration Number"
                    variant="outlined"
                    value={registrationNumber}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <Box mr={1}>
                                <SearchIcon />
                            </Box>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    style={{ marginTop: '16px' }}
                >
                    Search
                </Button>
            </Box>

            {/* Display clearance records */}
            <TableContainer component={Paper} style={{ maxWidth: '800px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Degree</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Intake</TableCell>
                            <TableCell>Registration Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clearenceRecords.map((record, index) => (
                            <React.Fragment key={record.id}>
                                <TableRow onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                                    <TableCell>{record.degree}</TableCell>
                                    <TableCell>{record.fullName}</TableCell>
                                    <TableCell>{record.intake}</TableCell>
                                    <TableCell>{record.registrationNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                        <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Clearence Details
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Date</TableCell>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Description</TableCell>
                                                            <TableCell>Place</TableCell>
                                                            <TableCell>Value</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {record.clearenceDetails.map((detail, detailIndex) => (
                                                            <TableRow key={detailIndex}>
                                                                <TableCell>{detail.date}</TableCell>
                                                                <TableCell>{detail.name}</TableCell>
                                                                <TableCell>{detail.description}</TableCell>
                                                                <TableCell>{detail.place}</TableCell>
                                                                <TableCell>{detail.value}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
