import * as React from "react";
import Player from "../../types/Player";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PlayerSelect = ({
  players,
  onChange,
}: {
  players: Player[];
  onChange: (playerId: string) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel data-testid={"playerSelectTitle"}>Select player</InputLabel>
      <Select
        defaultValue=""
        onChange={(event) => onChange(event.target.value)}
        data-testid={"playerSelect"}
        role="listbox"
      >
        {players.map((player) => {
          return (
            <MenuItem
              key={player.id}
              value={player.id}
              data-testid={"playerNameSelectValue" + player.name}
            >
              {player.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default PlayerSelect;
