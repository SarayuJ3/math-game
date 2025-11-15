export class Lobby extends Phaser.Scene {
  constructor() { super('Lobby'); }

  create() {
    const cx = this.cameras.main.centerX;
    this.add.text(cx, 100, 'Lobby', { fontSize: '42px', color: '#ffffff' }).setOrigin(0.5);

    // Example: start game button
    const start = this.add.text(cx, 240, 'Start Game', { fontSize: '28px', color: '#000' })
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#a3e635' })
      .setInteractive();

    start.on('pointerup', () => this.scene.start('Gameplay'));

    // Example: back to home
    const back = this.add.text(cx, 320, 'Back', { fontSize: '20px', color: '#000' })
      .setOrigin(0.5)
      .setPadding(8)
      .setStyle({ backgroundColor: '#ffffff' })
      .setInteractive();

    back.on('pointerup', () => this.scene.start('Home'));
  }
}