import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from '@mui/icons-material/Delete';
import FullScreenDialog from './FullScreenDialog';
import AddClearenceRecord from './Components/AddClearenceRecord';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [addClearencedialogOpen, setAddClearenceDialogOpen] = React.useState(false);
    const [removeClearencedialogOpen, setRemoveClearenceDialogOpen] = React.useState(false);
    const [updateClearencedialogOpen, setUpdateClearenceDialogOpen] = React.useState(false);
    const [viewClearencedialogOpen, setViewClearenceDialogOpen] = React.useState(false);

    const handleAddClearanceClickOpen = () => {
        setAddClearenceDialogOpen(true);
    };

    const handleAddClearanceClose = () => {
        setAddClearenceDialogOpen(false);
    };

    const handleRemoveClearanceClickOpen = () => {
        setRemoveClearenceDialogOpen(true)
    };

    const handleRemoveClearanceClose = () => {
        setRemoveClearenceDialogOpen(false)
    };

    const handleUpdateClearanceClickOpen = () => {
        setUpdateClearenceDialogOpen(true)
    };

    const handleUpdateClearanceClose = () => {
        setUpdateClearenceDialogOpen(false)
    };

    const handleViewClearanceClickOpen = () => {
        setViewClearenceDialogOpen(true)
    };

    const handleViewClearanceClose = () => {
        setViewClearenceDialogOpen(false)
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Clear Flow
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Toolbar />
                    <Box textAlign="center">
                        <Typography variant="h3" component="h1">
                            Publication
                        </Typography>
                    </Box>
                    <Grid container justifyContent="center" alignItems="center" sx={{ gap: 2, height: '100vh' }}>
                        <Grid item xs={12} md={5} lg={5} style={{ height: '16vw' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#2196f3', // Primary button color
                                    color: 'white', // Text color
                                    width: '100%', // Ensure full width
                                    height: '100%',
                                    textAlign: 'center', // Center text
                                }}
                                onClick={handleAddClearanceClickOpen}
                            >
                                <AddIcon style={{ fill: 'white', width: '40px', height: '40px' }} />
                                <span style={{ marginLeft: '10px', fontSize: '30px' }}>Add Clearance Record</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5} lg={5} style={{ height: '16vw' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#f44336', // Secondary button color
                                    color: 'white', // Text color
                                    width: '100%', // Ensure full width
                                    height: '100%',
                                    textAlign: 'center', // Center text
                                }}
                                onClick={handleRemoveClearanceClickOpen}

                            >
                                <DeleteIcon style={{ fill: 'white', width: '40px', height: '40px' }} />
                                <span style={{ marginLeft: '10px', fontSize: '30px' }}>Remove Clearance Record</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5} lg={5} style={{ height: '16vw' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#4caf50', // Info button color
                                    color: 'white', // Text color
                                    width: '100%', // Ensure full width
                                    height: '100%',
                                    textAlign: 'center', // Center text
                                }}
                                onClick={handleUpdateClearanceClickOpen}

                            >
                                <UpdateIcon style={{ fill: 'white', width: '40px', height: '40px' }} />
                                <span style={{ marginLeft: '10px', fontSize: '30px' }}>Update Clearance Record</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5} lg={5} style={{ height: '16vw' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#ff9800', // Warning button color
                                    color: 'white', // Text color
                                    width: '100%', // Ensure full width
                                    height: '100%',
                                    textAlign: 'center', // Center text
                                }}
                                onClick={handleViewClearanceClickOpen}

                            >
                                <ViewListIcon style={{ fill: 'white', width: '40px', height: '40px' }} />
                                <span style={{ marginLeft: '10px', fontSize: '30px' }}>View Clearance Records</span>
                            </div>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
            <FullScreenDialog
                dialogOpen={addClearencedialogOpen}
                handleClickOpen={handleAddClearanceClickOpen}
                handleClose={handleAddClearanceClose}
                title="Add Clearence Record"
                contentComponent={<AddClearenceRecord />}
            />

            <FullScreenDialog
                dialogOpen={removeClearencedialogOpen}
                handleClickOpen={handleRemoveClearanceClickOpen}
                handleClose={handleRemoveClearanceClose}
                title="Remove Clearance Record"
            />

            <FullScreenDialog
                dialogOpen={updateClearencedialogOpen}
                handleClickOpen={handleUpdateClearanceClickOpen}
                handleClose={handleUpdateClearanceClose}
                title="Update Clearance Record"
            />

            <FullScreenDialog
                dialogOpen={viewClearencedialogOpen}
                handleClickOpen={handleViewClearanceClickOpen}
                handleClose={handleViewClearanceClose}
                title="View Clearance Records"
            />

        </ThemeProvider>
    );
}