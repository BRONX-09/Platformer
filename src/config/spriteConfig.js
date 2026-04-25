/**
 * Centralized sprite configuration for all characters
 * Each character has multiple action spritesheets that can be loaded separately
 */

export const spriteConfigs = {
  redhood: {
    idle: {
      path: "sprites/redhood/idle and  alter/idle sheet-Sheet.png",
      sliceX: 18,
      sliceY: 1,
      anims: {
        idle: { from: 0, to: 17, loop: true, speed: 10 },
      },
    },
    run: {
      path: "sprites/redhood/idle and  alter/itch run-Sheet sheet.png",
      sliceX: 24,
      sliceY: 1,
      anims: {
        run: { from: 0, to: 23, loop: true, speed: 12 },
      },
    },
    jump: {
      path: "sprites/redhood/idle and  alter/itch jump sheet-Sheet.png",
      sliceX: 18,
      sliceY: 1,
      anims: {
        jump: { from: 0, to: 17, speed: 12 },
      },
    },
    attack: {
      path: "sprites/redhood/idle and  alter/itch light atk sheet-Sheet.png",
      sliceX: 30,
      sliceY: 1,
      anims: {
        attack: { from: 0, to: 29, speed: 18 },
      },
    },
    hurt: {
      path: "sprites/redhood/idle and  alter/itch hurt 2 sheet-Sheet.png",
      sliceX: 6,
      sliceY: 1,
      anims: {
        hurt: { from: 0, to: 5, speed: 10 },
      },
    },
  },
  adventurer: {
    all: {
      path: "sprites/Adventurer/adventurer-Sheet.png",
      sliceX: 7,
      sliceY: 11,
      anims: {
        idle: { from: 0, to: 3, loop: true, speed: 7 },
        idle2: { from: 38, to: 41, loop: true },
        run: { from: 8, to: 13, loop: true },
        crouch: { from: 4, to: 4, speed: 16 },
        cwalk: { from: 4, to: 7, loop: true },
        attack1: { from: 42, to: 46, speed: 25 },
        attack2: { from: 47, to: 53, speed: 16 },
        attack3: { from: 54, to: 59, speed: 16 },
        fall: { from: 22, to: 23, loop: true },
        slide: { from: 24, to: 28, speed: 16 },
        hurt: { from: 59, to: 61, speed: 16 },
        die: { from: 62, to: 68, speed: 16 },
        jump: { from: 69, to: 71, speed: 10 },
      },
    },
  },
};
