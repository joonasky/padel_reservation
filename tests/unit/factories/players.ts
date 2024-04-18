import Player from "../../../types/Player";

const createId = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const createPlayer = (name?: string): Player => {
  return {
    id: createId(),
    name: name || createId(),
  };
};
