export class ModalManager {
    constructor(scene) {
      this.scene = scene;
      this.modals = {}; // store modal definitions
    }
  
    createModal(key, config) {
      this.modals[key] = config;
    }
  
    show(key) {
      const scene = this.scene;
      const config = this.modals[key];
      if (!config) return;
  
      // Create dark overlay
      //const overlay = scene.add
        //.rectangle(640, 360, 1280, 720, 0x000000, 0.5)
        //.setInteractive()
        //.setDepth(1000);
  
      // Create container for modal elements
      //const modal = scene.add.container(640, 360).setDepth(1001);

      const centerX = scene.game.config.width / 2;
        const centerY = scene.game.config.height / 2;

        // overlay fills the whole screen
        const overlay = scene.add.rectangle(
  centerX,
  centerY,
  scene.game.config.width,
  scene.game.config.height,
  0x000000,
  0.5
        ).setInteractive().setDepth(1000);

        // modal appears centered
        const modal = scene.add.container(centerX, centerY).setDepth(1001);
  
      // Modal background box
      const box = scene.add
        .rectangle(0, 0, 700, 400, 0xffffff)
        .setStrokeStyle(4, 0x000000);
  
      modal.add(box);
  
      // Build items from config.itemsArr
      config.itemsArr.forEach(item => {
        if (item.type === "text") {
          const t = scene.add.text(
            item.offsetX || 0,
            item.offsetY || 0,
            item.content,
            {
              fontSize: item.fontSize || 32,
              color: item.color || "#000",
              fontFamily: item.fontFamily || "Arial",
              align: "center"
            }
          ).setOrigin(0.5);
  
          modal.add(t);
        }
  
        if (item.type === "image") {
          const img = scene.add.image(
            item.offsetX || 0,
            item.offsetY || 0,
            item.content
          ).setOrigin(0.5);
  
          if (item.contentScale) img.setScale(item.contentScale);
  
          if (item.callback)
            img.setInteractive().on("pointerup", item.callback);
  
          modal.add(img);
        }
      });
  
      // Close behavior
      if (config.modalCloseOnInput) {
        overlay.on("pointerup", () => this.hide(modal, overlay));
        box.setInteractive().on("pointerup", () => this.hide(modal, overlay));
      }
  
      // Animate popup (optional)
      modal.setScale(0);
      scene.tweens.add({
        targets: modal,
        scale: 1,
        duration: 250,
        ease: "Back.easeOut"
      });
  
      // Track modal so we can close it
      this.current = { modal, overlay };
    }
  
    hide(modal, overlay) {
      modal.destroy();
      overlay.destroy();
    }
  }