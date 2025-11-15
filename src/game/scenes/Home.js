export class Home extends Phaser.Scene {
  constructor() { super('Home'); }

  preload() {
    // load any UI assets if needed
  }

  create() {
    const cx = this.cameras.main.centerX;
    this.add.text(cx, 140, 'Welcome', { fontSize: '48px', color: '#ffffff' }).setOrigin(0.5);

    const btn = this.add.text(cx, 320, 'Enter Lobby', { fontSize: '28px', color: '#000' })
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#ffffff' })
      .setInteractive();

    btn.on('pointerup', () => {
      this.scene.start('Lobby');
    });
  }
}