// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Image, Menu } from "semantic-ui-react";
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
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Ballot, Poll, Logout } from "@mui/icons-material";
import { useStreamFetchByKeys, useParty } from "@daml/react";
import { Voting } from "@daml.js/create-daml-app";

type Props = {
  onLogout: () => void;
};

const MainScreen: React.FC<Props> = ({ onLogout }) => {
  const username = useParty();
  console.log(username);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const myUserResult = useStreamFetchByKeys(Voting.User, () => [username], [
    username,
  ]);
  const myUser = myUserResult.contracts[0]?.payload;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // use the url to tell if user is voter or creating vote
  if (window.location.pathname === "/") {
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
              Current vote key in use, {username}
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
      </>
    );
  } else {
    return (
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

              <Typography variant="h5" sx={{ flexGrow: 1 }} noWrap>
                Blockvote
              </Typography>

              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Logout />}
                onClick={onLogout}
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
          {myUser ? `Welcome, ${myUser.username}!` : "Loading..."}
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
            </List>
          </Box>
        </Drawer>
      </>
    );
  }
};

export default MainScreen;
