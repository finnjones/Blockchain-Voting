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

import { Voting } from "@daml.js/votencrypt";

import { PublishedWithChanges } from "@mui/icons-material";
import HelpPopup from "./HelpPopup";

const VoteManagement: React.FC = () => {
  const ledger = useLedger();

  /* A react hook that is used to query the ledger for all contracts of type Voting.Voting. */
  const assets = useStreamQueries(Voting.Voting);

  /**
   * It archives the contract with the key `Voting.Voting` and the signatory
   * `assets.contracts[0]?.signatories[0]`
   */
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
            {assets.contracts[0]?.payload?.subject ?? "No Active Vote"}
            <Divider sx={{ pt: 2 }} />
            <Typography variant="h6" sx={{ pt: 2 }}>
              Vote Options
            </Typography>
            <List>
              {assets.contracts[0]?.payload?.options.map(
                (item, currentItem) => (
                  <ListItem key={item}>
                    <ListItemText primary={currentItem + 1 + ". " + item} />
                  </ListItem>
                )
              ) ?? "No Active Vote"}
            </List>
            <Divider sx={{ pt: 2 }} />

            {/* Number of voters */}
            <Typography variant="h6" sx={{ pt: 2 }}>
              Number of voters
            </Typography>
            {assets.contracts[0]?.payload?.voters.length ?? "No Active Vote"}
          </Paper>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={buttonHandler}
              className="button"
              name="Arcive Vote"
              sx={{ m: 2, alignItems: "center" }}
            >
              End Vote
            </Button>
          </Box>
        </Paper>
      </Box>
      <HelpPopup
        heading="Vote Management Help"
        content="
          This page allows you to view the details of the current active vote. \n
          You can end the vote by clicking the button at the bottom of the page. \n
          By ending a vote, users will no longer be able to cast any more votes. \n
          Once vote has been ended you will be able to create a new vote.
        "
      ></HelpPopup>
    </Container>
  );
};

export default VoteManagement;
