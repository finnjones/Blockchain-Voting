import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import { QuestionMark } from "@mui/icons-material";

const HelpPopup = ({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) => {
  const [helpOpen, setHelpOpen] = React.useState(false);

  const handleClickOpen = () => {
    setHelpOpen(true);
  };

  const handleClose = (reason: string) => {
    console.log(reason);
    setHelpOpen(false);
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<QuestionMark />}
        onClick={handleClickOpen}
      ></SpeedDial>
      <Dialog open={helpOpen} onClose={handleClose}>
        <Typography variant="h6" textAlign="center" sx={{ p: 1 }}>
          {heading}
        </Typography>

        <Box sx={{ p: 4 }}>
          <Typography variant="h6">{content}</Typography>
        </Box>
      </Dialog>
    </div>
  );
};
export default HelpPopup;
