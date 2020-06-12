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
import Home from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import People from '@material-ui/icons/People';
import AccountTree from '@material-ui/icons/AccountTree';
import Settings from '@material-ui/icons/Settings';
import Assignment from '@material-ui/icons/Assignment';
import HowToReg from '@material-ui/icons/HowToReg';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import deepPurple from '@material-ui/core/colors/deepPurple';
import orange from '@material-ui/core/colors/orange';
import { connect } from 'react-redux'

import { logoutAction } from "../../Redux/Actions/login";


const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: {
      main: orange.A400,
    },
  },
});


function UserInfo(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    props.handleLogOut();
    setAnchorEl(null);

  };

  if(props.auth)
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
          <MenuItem onClick={handleClose} style={{display: 'none'}}>Profile</MenuItem>
          <MenuItem onClick={handleClose} style={{display: 'none'}}>My account</MenuItem>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
      </div>
    )

    return null
}


class NavBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
             auth: false,
             open: false,
             user: {},
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
                path: "/qas",
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

              {
                title: "Charts",
                path: "/charts",
                icon: <EqualizerIcon />
              }
            ],
            drawerEstimateItems: [
              {
                title: "Import",
                path: "/estimates/import",
                icon: <PublishIcon />
              },
              {
                title: 'Estimates',
                path: '/estimates',
                icon: <AttachMoneyIcon/>

              }
            ]
        }
        this.handleLogOut = this.handleLogOut.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(){

      this.setState((prevState, props) => {
        return {open: !prevState.open};
      });

    }

    componentDidMount() {
      if(localStorage.token) {
        this.setState({
          auth: true,
          user: JSON.parse(localStorage.getItem('user'))
        });
      }
    }

    handleLogOut() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.props.dispatch(logoutAction())
      window.location.replace("/login");
    }

    render() {
        return (
          <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                      <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer}>
                          <MenuIcon/>
                      </IconButton>
                        <Drawer anchor="left" open={this.state.open} ModalProps={{ onBackdropClick: this.toggleDrawer }}>
                        <div>
                          <List>
                            {this.state.drawerItems.map((item) => (
                              <Link className={null} key={item.title} onClick={this.toggleDrawer} to={item.path} style={{color: 'inherit', textDecoration: 'inherit', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>
                              <ListItem button>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                              </ListItem>
                              </Link>
                            ))}
                          </List>
                          <Divider />
                          <Typography variant="h6" align="center">Estimating</Typography>
                          <List>
                          {this.state.drawerEstimateItems.map((item) => (
                              <Link key={item.title} onClick={this.toggleDrawer} to={item.path} style={{color: 'inherit', textDecoration: 'inherit', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>
                              <ListItem button>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />

                              </ListItem>
                              </Link>
                            ))}
                          </List>
                        </div>
                        </Drawer>
                      <div style={{display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>
                        <Typography variant="h6">
                          <Link to="/">
                            <Avatar src="../../brand.ico"/>
                          </Link>
                        </Typography>
                          <UserInfo auth={this.props.user} handleLogOut={this.handleLogOut.bind(this)}/>
                      </div>
                    </Toolbar>
                </AppBar>
          </ThemeProvider>
        )
    }
}

export default connect((state) => ({
  user: state.login.user
}))(NavBar)

