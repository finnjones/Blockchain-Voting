import React from "react";
import {
  Typography,
  Box,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
} from "@mui/material";

import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Ballot,
  Poll,
  Logout,
  PublishedWithChanges,
} from "@mui/icons-material";

import { usernameExport } from "./LoginScreen";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  onLogout: () => void;
};
// Mainscreen component is the container of the app and contains the navigation bar and drawer to access the different pages
const MainScreen: React.FC<Props> = ({ onLogout }) => {
  const { logout } = useAuth0();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Handle logout button
  const LogoutCall = () => {
    logout({
      returnTo: window.location.origin,
    });
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <AppBar position="static" sx={{ borderRadius: "16px" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerOpen}
              className="menu-button"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h5">Votencrypt</Typography>

            <Typography sx={{ flexGrow: 1 }} noWrap></Typography>

            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Logout />}
              onClick={LogoutCall}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography
        variant="h3"
        textAlign="center"
        color="primary"
        sx={{ padding: 3 }}
      >
        Welcome, {usernameExport}
      </Typography>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Menu
          </Typography>
          <List>
            <ListItem
              button
              component={Link}
              to="/CreateVote"
              className="test-select-list-item"
            >
              <ListItemIcon>
                <Ballot />
              </ListItemIcon>
              <ListItemText primary="Create Vote" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/VoteAnalytics"
              className="test-select-list-item"
            >
              <ListItemIcon>
                <Poll />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/VoteManagement"
              className="test-select-list-item"
            >
              <ListItemIcon>
                <PublishedWithChanges />
              </ListItemIcon>
              <ListItemText primary="Vote Management" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MainScreen;
