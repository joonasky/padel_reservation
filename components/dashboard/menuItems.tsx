import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

export const menuItems = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText data-testid="menuPadelGames" primary="Events" />
    </ListItemButton>
    <ListItemButton href="/players">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText data-testid="menuPlayers" primary="Players" />
    </ListItemButton>
  </React.Fragment>
);
