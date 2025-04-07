// Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Home, Settings, AccountCircle } from '@mui/icons-material';

const Sidebar: React.FC = () => (
  <Drawer
    sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        backgroundColor: '#121212',
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <List>
        <ListItem component="button">
        <Home sx={{ color: '#6200ea' }} />
        <ListItemText primary="Dashboard" sx={{ color: '#ffffff' }} />
      </ListItem>
      <Divider />
      <ListItem component="button">
        <Settings sx={{ color: '#6200ea' }} />
        <ListItemText primary="Settings" sx={{ color: '#ffffff' }} />
      </ListItem>
      <ListItem component="button">
        <AccountCircle sx={{ color: '#6200ea' }} />
        <ListItemText primary="Profile" sx={{ color: '#ffffff' }} />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
