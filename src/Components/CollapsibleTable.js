import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import data from './data.json';
import FullScreenDialog from '../FullScreenDialog';
import AddClearenceRecord from '../Components/AddClearenceRecord';
import axios from 'axios';
import { Skeleton } from '@mui/material';


function Row(props) {
    const { row, handleEdit, handleDelete } = props;
    const [open, setOpen] = useState(false);
    const [clearenceRecord, setClearenceRecord] = useState([]);
    const [editClearenceDialogOpen, setEditClearenceDialogOpen] = useState(false);

    const handleEditClearenceClickOpen = () => {
        setEditClearenceDialogOpen(true);
    };

    const handleEditClearenceClose = () => {
        setEditClearenceDialogOpen(false);
    };

    const handleEditClick = async () => {
        handleEdit(row);
        await setClearenceRecord(row);
        handleEditClearenceClickOpen();
    };

    const handleDeleteClick = () => {
        handleDelete(row);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.fullName}
                </TableCell>
                <TableCell align="right">{row.registrationNumber}</TableCell>
                <TableCell align="right">{row.intake}</TableCell>
                <TableCell align="right">{row.degree}</TableCell>
                <TableCell align="right">
                    <IconButton color="primary" onClick={handleEditClick}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Clearence Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.clearenceDetails.map((clearenceDetailsRow) => (
                                        <TableRow key={clearenceDetailsRow.date}>
                                            <TableCell component="th" scope="row">
                                                {clearenceDetailsRow.date}
                                            </TableCell>
                                            <TableCell>{clearenceDetailsRow.name}</TableCell>
                                            <TableCell align="right">{clearenceDetailsRow.description}</TableCell>
                                            <TableCell align="right">
                                                {clearenceDetailsRow.value}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <FullScreenDialog
                dialogOpen={editClearenceDialogOpen}
                handleClickOpen={handleEditClearenceClickOpen}
                handleClose={handleEditClearenceClose}
                title="Edit Clearence Record"
                contentComponent={<AddClearenceRecord clearenceRecord={clearenceRecord} action="edit" />}
            />
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        registrationNumber: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        intake: PropTypes.string.isRequired,
        clearenceDetails: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                name: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
            }),
        ).isRequired,
        fullName: PropTypes.string.isRequired,
    }).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

function CollapsibleTable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/data')
            .then(function (response) {
                setRows(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleEdit = (editedRow) => {
        const updatedRows = rows.map(row => {
            if (row.registrationNumber === editedRow.registrationNumber) {
                return editedRow;
            }
            return row;
        });
        setRows(updatedRows);
    };

    const handleDelete = (rowToDelete) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete ${rowToDelete.fullName}?`);
        if (isConfirmed) {
            axios.delete(`http://localhost:5000/data/${rowToDelete.id}`)
                .then(response => {
                    console.log(response.data);
                    const updatedRows = rows.filter(row => row.id !== rowToDelete.id);
                    setRows(updatedRows);
                })
                .catch(error => {
                    console.error('Error deleting row:', error);
                });
        }
    };

    if (loading) {
        // Render skeleton while data is loading
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Full Name</TableCell>
                            <TableCell align="right">Registration Number</TableCell>
                            <TableCell align="right">Intake</TableCell>
                            <TableCell align="right">Degree</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Full Name</TableCell>
                        <TableCell align="right">Registration Number</TableCell>
                        <TableCell align="right">Intake</TableCell>
                        <TableCell align="right">Degree</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.fullName} row={row} handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CollapsibleTable;
