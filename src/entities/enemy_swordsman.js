import { enableMultiSpriteMode } from "./multiSpriteUtils.js";
import { spriteConfigs } from "../config/spriteConfig.js";

export function makeBandit(k, initialPos) {
  return k.make(k.pos(initialPos));
}

/**
 * Creates a skeleton foot soldier with AI behavior
 * States: idle -> react -> walk -> attack/hit -> dead
 */
export function makeSkeletonFootSoldier(k, initialPos) {
  const skeleton = k.make([
    k.pos(initialPos.x, initialPos.y),
    k.sprite("skeleton-idle"),
    k.area({ shape: new k.Rect(k.vec2(0, 0), 16, 20) }),
    k.anchor("center"),
    k.body({ mass: 100 }),
    k.health(30),
    "skeleton-enemy",
    {
      // Configuration
      speed: 80,
      activationRange: 150,
      attackRange: 40,
      attackCooldown: 2,
      attackDamage: 10,
      isHit: false,
      isAttacking: false,
      attackTimer: 0,

      // State management
      setState(newState) {
        if (this.currentState === newState) return;
        this.currentState = newState;
        this.handleStateChange(newState);
      },

      handleStateChange(state) {
        switch (state) {
          case "idle":
            this.switchAction("idle");
            break;
          case "react":
            this.switchAction("react");
            break;
          case "walk":
            this.switchAction("walk");
            break;
          case "attack":
            this.switchAction("attack");
            break;
          case "hit":
            this.switchAction("hit");
            break;
          case "dead":
            this.switchAction("dead");
            break;
        }
      },

      enableAI(player) {
        this.player = player;
        this.currentState = "idle";
        this.isActivated = false;

        k.onUpdate(() => {
          if (!this.exists()) return;
          if (this.hp() <= 0) return;

          const distToPlayer = this.pos.dist(player.pos);

          // Check activation range
          if (!this.isActivated && distToPlayer <= this.activationRange) {
            this.isActivated = true;
            this.setState("react");
            this.onAnimEnd(() => {
              if (this.currentState === "react") {
                this.setState("walk");
              }
            });
            return;
          }

          if (!this.isActivated) return;

          // If being hit, don't move
          if (this.isHit) return;

          // Check attack range
          if (distToPlayer <= this.attackRange) {
            if (!this.isAttacking) {
              this.isAttacking = true;
              this.setState("attack");

              // Attack animation ends
              this.onAnimEnd((anim) => {
                if (anim === "attack" && this.isAttacking) {
                  this.isAttacking = false;
                  this.attackTimer = this.attackCooldown;
                  this.setState("walk");
                }
              });
            }
            return;
          }

          // Chase player
          if (this.currentState !== "walk") {
            this.setState("walk");
          }

          // Move towards player
          if (player.pos.x > this.pos.x) {
            this.flipX = false;
            this.move(this.speed, 0);
          } else {
            this.flipX = true;
            this.move(-this.speed, 0);
          }
        });
      },

      onHitByPlayer() {
        if (this.isHit) return;

        this.isHit = true;
        this.setState("hit");

        // Damage the skeleton
        this.hurt(5);

        // Immobilize during hit animation
        this.onAnimEnd((anim) => {
          if (anim === "hit") {
            this.isHit = false;

            // Check if dead
            if (this.hp() <= 0) {
              this.die();
            } else {
              // Resume walking if still activated and player is distant
              if (this.isActivated) {
                this.setState("walk");
              }
            }
          }
        });
      },

      die() {
        this.setState("dead");
        this.isActivated = false;

        this.onAnimEnd((anim) => {
          if (anim === "dead") {
            k.destroy(this);
          }
        });
      },
    },
  ]);

  // Enable multi-sprite mode for skeleton
  enableMultiSpriteMode(skeleton, k, "skeleton", spriteConfigs);

  // Set initial state to idle
  skeleton.setState("idle");

  return skeleton;
}
