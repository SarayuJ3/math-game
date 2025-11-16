export class ModalManager {
    constructor(scene) {
      this.scene = scene;
      this.modals = {};
    }
  
    createModal(key, config) {
      this.modals[key] = config;
    }
  
    show(key) {
      const scene = this.scene;
      const config = this.modals[key];
      if (!config) return;
  
      const cx = scene.game.config.width / 2;
      const cy = scene.game.config.height / 2;

      // Dark overlay
      const overlay = scene.add.rectangle(cx, cy, scene.game.config.width, scene.game.config.height, 0x000000, 0.6)
        .setInteractive()
        .setDepth(1000);

      // Modal container
      const modal = scene.add.container(cx, cy-20).setDepth(1001);
  
      // Rounded background box
      const box = scene.add.graphics();
      box.fillStyle(0xF2F3F5, 1);
      box.fillRoundedRect(-440, -330, 900, 500, 20); 
      box.lineStyle(3, 0x696969);
      box.strokeRoundedRect(-440, -330, 900, 500, 20); 
      modal.add(box);
  
      // Add text items
      config.itemsArr.forEach(item => {
        if (item.type === "text") {
          const t = scene.add.text(item.offsetX || 0, item.offsetY || 0, item.content, {
            fontSize: item.fontSize || 32,
            color: item.color || "#696969",
            fontFamily: item.fontFamily,
            align: "center"
          }).setOrigin(0.5);
          modal.add(t);
        }
      });
  
      // Close on click
      overlay.on("pointerup", () => {
        modal.destroy();
        overlay.destroy();
      });
  
      // Popup animation
      modal.setScale(0);
      scene.tweens.add({
        targets: modal,
        scale: 1,
        duration: 250,
        ease: "Back.easeOut"
      });
    }
  }