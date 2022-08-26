import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import { QuestionMark } from "@mui/icons-material";

// This is a popup that appears when the user clicks on the question mark icon in the bottom right corner of the screen. The popup will display help information related to the current page.
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
          <Typography variant="h6" style={{ whiteSpace: "pre-line" }}>
            {content.split("\\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })}
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
};
export default HelpPopup;
