import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PinnedSubheaderList(Keys: any) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            {Keys.map((item: any) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}