import React from "react";

import {
  Paper,
  Typography,
  Container,
  Grid,
  Divider,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { useLedger, useStreamQueries } from "@daml/react";

import { Voting } from "@daml.js/create-daml-app";

import { PublishedWithChanges } from "@mui/icons-material";
import HelpPopup from "./HelpPopup";

const VoteManagement: React.FC = () => {
  const ledger = useLedger();

  const assets = useStreamQueries(Voting.Voting);
  const buttonHandler = async () => {
    await ledger.archiveByKey(
      Voting.Voting,
      assets.contracts[0]?.signatories[0]
    );
  };
  return (
    <Container>
      <Box sx={{ p: 1 }}>
        <Paper sx={{ p: 3, borderRadius: "16px" }} elevation={2}>
          <Grid container spacing={0}>
            <Grid item>
              <PublishedWithChanges sx={{ fontSize: 50 }} color="primary" />
            </Grid>

            <Grid item>
              <Grid item>
                <Typography variant="h5" display="block">
                  Vote Management
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  display="block"
                  style={{ lineHeight: "15px" }}
                >
                  Manage active vote
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Paper sx={{ px: 5, pb: 3, borderRadius: "16px" }} variant="outlined">
            <Typography variant="h6" sx={{ pt: 2 }}>
              Vote Description
            </Typography>
            {assets.contracts[0]?.payload?.subject ?? "Loading..."}
            <Divider sx={{ pt: 2 }} />
            <Typography variant="h6" sx={{ pt: 2 }}>
              Vote Candidates
            </Typography>
            <List>
              {assets.contracts[0]?.payload?.candidates.map(
                (item, currentItem) => (
                  <ListItem key={item}>
                    <ListItemText primary={currentItem + 1 + ". " + item} />
                  </ListItem>
                )
              )}
            </List>
            <Divider sx={{ pt: 2 }} />

            {/* Number of voters */}
            <Typography variant="h6" sx={{ pt: 2 }}>
              Number of voters
            </Typography>
            {assets.contracts[0]?.payload?.voters.length}
          </Paper>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={buttonHandler}
              className="button"
              name="Arcive Vote"
              sx={{ m: 2, alignItems: "center" }}
            >
              Archive Vote
            </Button>
          </Box>
        </Paper>
      </Box>
      <HelpPopup
        heading="Vote Management Help"
        content="
          This page allows you to view the details of the current active vote. 
          You can archive the vote by clicking the button at the bottom of the page. 
          By archiving a vote, users will no longer be able to cast any more votes.
          Once vote is archived you will be able to create a new vote.
        "
      ></HelpPopup>
    </Container>
  );
};

export default VoteManagement;
