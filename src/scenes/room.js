import {
  setCameraControls,
  setCameraZones,
  setMapColliders,
} from "./sceneUtils";
import { makePlayer } from "../entities/player";

export function room(k, roomData) {
  k.setCamScale(2.5);

  k.setCamPos(k.width() / 2 - 380, k.height() / 2 - 200);
  // k.setCamPos(k.width() / 2, k.height() / 2);
  k.setGravity(1000);
  const roomLayers = roomData.layers;

  const map = k.add([k.pos(0, 0), k.sprite("room"), k.anchor("topleft")]);
  const colliders = roomLayers[3].objects;
  const positions = roomLayers[4].objects;
  const cameras = roomLayers[5].objects;
  const player = map.add(makePlayer(k));

  setMapColliders(k, map, colliders);
  setCameraZones(k, map, cameras);
  setCameraControls(k, player, map, roomData);

  for (const position of positions) {
    if (position.name === "player") {
      player.setPosition(position.x + 100, position.y - 100);
      player.setControls();
      player.setEvents();
    }
  }
}
