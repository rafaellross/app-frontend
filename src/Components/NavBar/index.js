import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Home from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import People from '@material-ui/icons/People';
import AccountTree from '@material-ui/icons/AccountTree';
import Settings from '@material-ui/icons/Settings';
import Assignment from '@material-ui/icons/Assignment';
import HowToReg from '@material-ui/icons/HowToReg';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { createStyles, createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import deepPurple from '@material-ui/core/colors/deepPurple';
import orange from '@material-ui/core/colors/orange';



import { Theme } from '@material-ui/core/styles';






import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';







const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: {
      main: orange.A400,
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


function UserInfo(props) {

  
  
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    
    <div>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
    </Menu>
  </div>
     
  )
}


class NavBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
             auth: false,
             open: false,
             drawerItems: [
               {
                title: "Home",
                path: "/",
                icon: <Home />
              },
              {
                title: "Users",
                path: "/users",
                icon: <People />
              },

              {
                title: "Jobs",
                path: "/jobs",
                icon: <AccountTree />
              },
              {
                title: "Employees",
                path: "/employees",
                icon: <HowToReg />
              },

              {
                title: "Quality Assurance (QA)",
                path: "/qa",
                icon: <AssignmentTurnedInIcon />
              },

              {
                title: "Settings",
                path: "/settings",
                icon: <Settings />
              },

              {
                title: "Time Sheets",
                path: "/timesheets",
                icon: <Assignment />
              },



            ]
        }
        //{['Home', 'Users', 'Employees', 'Jobs', 'Parameters', 'Time Sheets'].map((text, index) => (

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(){
      console.log("Toggle")
      this.setState((prevState, props) => {
        return {open: !prevState.open};
      });

    }

    componentDidMount() {
      if(localStorage.session_user) {
        this.setState({
          auth: true
        });        
      }
      
    }
    

    render() {
        const { auth } = this.state.auth;

        return (
          <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                      <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer}>
                          <MenuIcon/>
                      </IconButton>
                        <Drawer anchor="left" open={this.state.open} onClose={console.log("close")} ModalProps={{ onBackdropClick: this.toggleDrawer }}>
                        <div
                          role="presentation"
                          onClick={console.log('click')}
                          onKeyDown={console.log('key down')}
                        >
                          <List>
                            {this.state.drawerItems.map((item) => (
                              <ListItem button key={item.title}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <Link onClick={this.toggleDrawer} to={item.path} style={{color: 'inherit', textDecoration: 'inherit', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>{item.title}</Link>

                              </ListItem>
                            ))}
                          </List>
                          <Divider />
                          <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                              <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                              </ListItem>
                            ))}
                          </List>
                        </div>
                        </Drawer>
                      <Typography variant="h6">
                        <Avatar src="/img/brand.ico"/>
                      </Typography>
                      <div>
                        <UserInfo auth={this.state.auth}/>
                      </div>
                      
                    </Toolbar>
                    
                </AppBar>
          </ThemeProvider>
        )
    }
}

export default NavBar
