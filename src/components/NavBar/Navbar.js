import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {makeStyles} from '@material-ui/core/styles'
import { textAlign } from "@mui/system";



const useStyles = makeStyles(theme => ({
    root:{
        flexGrow : 1,
        
    },
    menuButton:{
        marginRight: theme.spacing()
    },
    title :{
        flexGrow : 1,
        textAlign : "left"
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
}));

function NavBar(){
    const classes = useStyles();
    let userId = 1;
    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  className={classes.title}>
          <Link to = "/" className={classes.link}> Home </Link>
    
          </Typography>
          <Typography variant="h6"  >
          
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
        </div>
    );
    }
    export default NavBar;