// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Image, Menu } from "semantic-ui-react";
import MainView from "./MainView";
import VoteScreen from "./VoteScreen";
import { useParty } from "@daml/react";
import {
  Typography,
  Box,
  IconButton,
  Toolbar,
  CssBaseline,
  Drawer,
  Divider,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
} from "@mui/material";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Ballot, Poll, Logout } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
type Props = {
  onLogout: () => void;
};

/**
 * React component for the main screen of the `App`.
 */

const MainScreen: React.FC<Props> = ({ onLogout }) => {
  // console.log(useParty)
  // username.indexOf("VoteKey")
  const drawerWidth = 240;

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const username = useParty();
  console.log(username);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  if (username.includes("VoteKey")) {
    return (
      <>
        <Menu icon borderless>
          <Menu.Item>
            <Image
              as="a"
              href="https://www.daml.com/"
              target="_blank"
              src="/daml.svg"
              alt="Daml Logo"
              size="mini"
            />
          </Menu.Item>
          <Menu.Menu position="right" className="test-select-main-menu">
            <Menu.Item position="right">
              You are logged in as {username}.
            </Menu.Item>
            <Menu.Item
              position="right"
              active={false}
              className="test-select-log-out"
              onClick={onLogout}
              icon="log out"
            />
          </Menu.Menu>
        </Menu>
        <VoteScreen />
      </>
    );
  } else {
    return (
      // Create app bar with menu button
      // Create ui drawer with menu button

      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
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

              <Typography
                variant="h5"
                sx={{ flexGrow: 1 }}
                onClick={onLogout}
                noWrap
              >
                Blockvote
              </Typography>
              {/* <Typography variant="h6">
                You are logged in as {username}
              </Typography> */}

              {/* create a logout button */}
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Logout />}
                onClick={onLogout}
              >
                Log Out
              </Button>

              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box p={2} width="250px" textAlign="center" role="presentation">
            <Typography variant="h6" component="div">
              Menu
            </Typography>
            <List>
              <ListItem
                button
                component={Link}
                to="/"
                className="test-select-list-item"
              >
                <ListItemIcon>
                  <Ballot />
                </ListItemIcon>
                <ListItemText primary="Vote" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/VoteAnalitics"
                className="test-select-list-item"
              >
                <ListItemIcon>
                  <Poll />
                </ListItemIcon>
                <ListItemText primary="Analitics" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <MainView />
      </>
    );
  }
};

export default MainScreen;
