import PlayerSave from "./PlayerSave";

type Player = PlayerSave & {
  id: string;
  name: string;
};

export default Player;
