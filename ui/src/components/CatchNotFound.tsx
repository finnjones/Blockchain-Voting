import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, Paper, Typography } from "@mui/material";

type Props = {
  onLogout: () => void;
};

export const LogoutConfirm: React.FC<Props> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    // are you sure you want to logout screen
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        style={{ height: "100vh" }}
      >
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <Typography variant="h5" sx={{ flexGrow: 1 }} noWrap>
            Are you sure you want to logout?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            onClick={onLogout}
            sx={{ m: 2 }}
          >
            Log Out
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(1)}
            sx={{ m: 2 }}
          >
            Take me back
          </Button>
        </Paper>
      </Box>
    </>
  );
};

// Create a page not found screen
export const PageNotFound = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        style={{ height: "100vh" }}
      >
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <Typography variant="h5" sx={{ flexGrow: 1 }} noWrap>
            Oops! Page not found.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ m: 2 }}
          >
            Go to home page
          </Button>
        </Paper>
      </Box>
    </>
  );
};
