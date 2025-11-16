export class Home extends Phaser.Scene {
  constructor() { super('Home'); }

  preload() {
    this.load.font('title-font', 'assets/AlmendraSC-Regular.ttf', 'truetype')
  }

  create() {
    this.cameras.main.setBackgroundColor('#ffd6e8');

    const cx = this.cameras.main.centerX;
    this.add.text(cx, 140, 'BATTLE START', { fontSize: '48px', color: '#000000', fontFamily: 'title-font' }).setOrigin(0.5);

    const btn = this.add.text(cx, 320, 'Start Game', { fontSize: '28px', color: '#000', fontFamily: 'title-font'})
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#ffffff' })
      .setInteractive();

    btn.on('pointerup', () => {
      this.scene.start('Lobby');
    });
  }
}