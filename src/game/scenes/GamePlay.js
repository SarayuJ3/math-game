export class Gameplay extends Phaser.Scene {
  constructor() { super('Gameplay'); }

  create() {
    const cx = this.cameras.main.centerX;
    this.add.text(cx, 40, 'Gameplay', { fontSize: '36px', color: '#ffffff' }).setOrigin(0.5);

    // simple player using a circle
    this.player = this.add.circle(512, 384, 20, 0xffcc00);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    const speed = 300 * (delta / 1000);
    if (!this.player) return;

    if (this.cursors.left.isDown) this.player.x -= speed;
    else if (this.cursors.right.isDown) this.player.x += speed;

    if (this.cursors.up.isDown) this.player.y -= speed;
    else if (this.cursors.down.isDown) this.player.y += speed;

    // simple escape back to lobby
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.scene.start('Lobby');
    }
  }
}