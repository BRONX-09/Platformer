import kaplay from "kaplay";
import { room } from "./scenes/room.js";
import { setBackgroundColor } from "./scenes/sceneUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";
import { spriteConfigs } from "./config/spriteConfig.js";

const scale = 2;
const k = kaplay({
  width: 640 * scale,
  height: 360 * scale,
  scale,
  letterbox: true,
  global: false,
});

k.loadRoot("./");

// Load sprites using centralized configuration
function loadSpritesFromConfig(config) {
  Object.entries(config).forEach(([character, actions]) => {
    Object.entries(actions).forEach(([action, spriteData]) => {
      const spriteName =
        action === "all" ? character : `${character}-${action}`;
      k.loadSprite(spriteName, spriteData.path, {
        sliceX: spriteData.sliceX,
        sliceY: spriteData.sliceY,
        anims: spriteData.anims,
      });
    });
  });
}

loadSpritesFromConfig(spriteConfigs);

k.loadSprite("room", "map/map.png");

async function main() {
  const roomData = await (await fetch("/map/map.json")).json();

  k.scene("room", () => {
    room(k, roomData);
  });

  k.scene("intro", () => {
    setBackgroundColor(k, "#1b8a74");
    k.add(
      makeNotificationBox(
        k,
        "Use aswd keys to move, space to jump, e to attack.\nPress Enter to start!",
      ),
    );
    k.onKeyPress("enter", () => {
      k.go("room");
    });
  });

  k.go("intro");
}

main();
