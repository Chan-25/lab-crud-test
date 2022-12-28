import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";


const NavBar = () => {
    return(
        <div>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" style={style}>
                        React User Application
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const style = {
    flexGrow: 1
}

export default NavBar;