import kaplay from "kaplay";
import { room } from "./scenes/room.js";
import { setBackgroundColor } from "./scenes/sceneUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";
const scale = 2;
const k = kaplay({
  width: 640 * scale,
  height: 360 * scale,
  scale,
  letterbox: true,
  global: false,
});

k.loadRoot("./");
k.loadSprite("adventurer", "sprites/Adventurer/adventurer-Sheet.png", {
  sliceX: 7,
  sliceY: 11,
  anims: {
    idle: { from: 0, to: 3, loop: true },
    idle2: { from: 38, to: 41, loop: true },
    run: { from: 8, to: 13, loop: true },
    crouch: { from: 4, to: 4, speed: 16 },
    cwalk: { from: 4, to: 7, loop: true },
    attack1: { from: 42, to: 46, speed: 16 },
    attack2: { from: 47, to: 53, speed: 16 },
    attack3: { from: 54, to: 59, speed: 16 },
    fall: { from: 22, to: 23, loop: true },
    slide: { from: 24, to: 28, speed: 16 },
    hurt: { from: 59, to: 61, speed: 16 },
    die: { from: 62, to: 68, speed: 16 },
  },
});

async function main() {
  const roomData = await (await fetch("/map/Map.json")).json();
  k.scene("room", () => {
    room(k);
  });
}

main();

k.scene("intro", () => {
  setBackgroundColor(k, "#20214a");
  k.add(
    makeNotificationBox(
      k,
      "Escape the factory!\nUse arrow keys to move, x to jump, z to attack.\nPress Enter to start!",
    ),
  );
  k.onKeyPress("enter", () => {
    // const context = new AudioContext();
    // context.resume();
    k.go("room", { exitName: null });
  });
});

k.go("intro");
