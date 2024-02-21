import * as React from 'react';
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

function createData(fullName, registrationNumber, intake, degree, price) {
    return {
        fullName,
        registrationNumber,
        intake,
        degree,
        clearenceDetails: [
            {
                date: '2020-01-05',
                name: 'Printer',
                description: 'Offset Printer',
                value: 50000
            },
            {
                date: '2020-01-02',
                name: 'Anonymous',
                description: 1,
                value: 60
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

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
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        registrationNumber: PropTypes.number.isRequired,
        degree: PropTypes.number.isRequired,
        intake: PropTypes.number.isRequired,
        clearenceDetails: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        fullName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Vinodi Nikeshani', 'D/BIT/22/0007', 'Intake 39', 'Information Technology'),
    createData('John Doe', 'D/BIT/22/0008', 'Intake 39', 'Information Technology'),
    createData('Jane Smith', 'D/BIT/22/0009', 'Intake 39', 'Information Technology'),
    createData('David Brown', 'D/BIT/22/0010', 'Intake 39', 'Information Technology'),
    createData('Emily Johnson', 'D/BIT/22/0011', 'Intake 39', 'Information Technology'),
    createData('Michael Lee', 'D/BIT/22/0012', 'Intake 39', 'Information Technology'),
    createData('Sarah Garcia', 'D/BIT/22/0013', 'Intake 39', 'Information Technology'),
    createData('Christopher Martinez', 'D/BIT/22/0014', 'Intake 39', 'Information Technology'),
    createData('Amanda Rodriguez', 'D/BIT/22/0015', 'Intake 39', 'Information Technology'),
    createData('Daniel Hernandez', 'D/BIT/22/0016', 'Intake 39', 'Information Technology'),
    createData('Jennifer Wilson', 'D/BIT/22/0017', 'Intake 39', 'Information Technology'),
    createData('Eva Gonzalez', 'D/SVS/22/0018', 'Intake 39', 'Survey Science'),
    createData('Matthew Anderson', 'D/BIS/22/0019', 'Intake 39', 'Information Systems'),
    createData('Linda Moore', 'D/BARC/22/0020', 'Intake 39', 'Architecture'),
    createData('William Taylor', 'D/BQS/22/0021', 'Intake 39', 'Quantity Survey'),
    createData('Olivia Thomas', 'D/SVS/22/0022', 'Intake 39', 'Survey Science'),

];

export default function CollapsibleTable() {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.fullName} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
