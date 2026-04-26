/**
 * Utility functions for managing multi-sprite characters
 * Characters with separate spritesheets for each action can use these helpers
 */

/**
 * Enables multi-sprite support on an entity
 * Allows switching between different action spritesheets dynamically
 */
export function enableMultiSpriteMode(entity, k, characterName, spriteConfigs) {
  entity.currentAction = null;
  entity.spriteConfigs = spriteConfigs[characterName];

  /**
   * Switch to a different action sprite and play its animation
   * @param {string} action - The action key (e.g., 'idle', 'run', 'jump')
   * @param {boolean} force - Force sprite change even if already on this action
   */
  entity.switchAction = function (action, force = false) {
    if (this.currentAction === action && !force) return;

    const spriteData = this.spriteConfigs[action];
    if (!spriteData) {
      console.warn(`Action "${action}" not configured for ${characterName}`);
      return;
    }

    const spriteName = `${characterName}-${action}`;

    // Use kaplay's use() method to swap the sprite component
    this.use(k.sprite(spriteName));

    // Play animation
    const animKey = Object.keys(spriteData.anims)[0];
    this.play(animKey);

    this.currentAction = action;
  };

  // Set initial state (sprite already added during entity creation)
  entity.currentAction = "idle";
}
