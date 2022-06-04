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
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Ballot, Poll, Logout } from "@mui/icons-material";
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

  // const openedMixin = (theme: Theme): CSSObject => ({
  //   width: drawerWidth,
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.easeInOut,
  //     duration: 10,
  //   }),
  //   overflowX: "hidden",
  // });

  // const closedMixin = (theme: Theme): CSSObject => ({
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   overflowX: "hidden",
  //   width: `calc(${theme.spacing(7)} + 1px)`,
  //   [theme.breakpoints.up("sm")]: {
  //     width: `calc(${theme.spacing(8)} + 1px)`,
  //   },
  // });

  // const DrawerHeader = styled("div")(({ theme }) => ({
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   padding: theme.spacing(0, 1),
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  // }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  // const AppBar = styled(MuiAppBar, {
  //   shouldForwardProp: (prop) => prop !== "open",
  // })<AppBarProps>(({ theme, open }) => ({
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   ...(open && {
  //     marginLeft: drawerWidth,
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     transition: theme.transitions.create(["width", "margin"], {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.enteringScreen,
  //     }),
  //   }),
  // }));

  // const Drawer = styled(MuiDrawer, {
  //   shouldForwardProp: (prop) => prop !== "open",
  // })(({ theme, open }) => ({
  //   width: drawerWidth,
  //   flexShrink: 0,
  //   whiteSpace: "nowrap",
  //   boxSizing: "border-box",
  //   ...(open && {
  //     ...openedMixin(theme),
  //     "& .MuiDrawer-paper": openedMixin(theme),
  //   }),
  //   ...(!open && {
  //     ...closedMixin(theme),
  //     "& .MuiDrawer-paper": closedMixin(theme),
  //   }),
  // }));

  const username = useParty();
  console.log(username);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleButton = () => {};

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
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* <Menu icon borderless>
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
          </Menu> */}
          {/* <AppBar position="fixed" open={open}> */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              You are logged in as {username}.
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Logout"
              onClick={onLogout}
              // sx={{ textAlign: "center" }}
              // icon="log out"
            >
              <Logout />
            </IconButton>
          </Toolbar>
          {/* </AppBar> */}
          <Drawer variant="permanent" open={open}>
            {/* <DrawerHeader> */}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            {/* </DrawerHeader> */}
            <Divider />
            <List>
              {["Create Vote", "Analitics"].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={handleButton}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index % 2 === 0 ? <Ballot /> : <Poll />}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>

        <MainView />
      </>
    );
  }
};

export default MainScreen;
