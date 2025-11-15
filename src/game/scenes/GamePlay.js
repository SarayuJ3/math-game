export class Gameplay extends Phaser.Scene {
  constructor() { super('Gameplay'); }

  create() {
    //const cx = this.cameras.main.centerX;
    //this.add.text(cx, 40, 'Gameplay', { fontSize: '36px', color: '#ffffff' }).setOrigin(0.5);

    // Battle Heading
    this.add.text(400, 40, "Battle!", {
      fontSize: "32px",
      color: "#fff"
    }).setOrigin(0.5);

    // Simple Player (using a circle for now)
    this.player = this.add.circle(150, 300, 40, 0x00ccff);
    this.playerHP = 100;
    this.cursors = this.input.keyboard.createCursorKeys();

    // Simple Monster (using a square for now?)
    this.monster = this.add.circle(650, 300, 40, 0xff4444);
    this.monsterHP = 100;

    // HP Text
    this.playerHPText = this.add.text(100, 200, "HP: 100", { fontSize: "24px", color: "#fff" });
    this.monsterHPText = this.add.text(600, 200, "HP: 100", { fontSize: "24px", color: "#fff" });

    // Attack button
    this.attackBtn = this.add.text(400, 500, "ATTACK", {
      fontSize: "28px",
      backgroundColor: "#333",
      padding: 10,
      color: "#fff"
    }).setOrigin(0.5).setInteractive();

    this.attackBtn.on("pointerdown", () => {
      this.startMathProblem();
    });

    // For input
    this.input.keyboard.enabled = true;
  }

  // Math Problem

  startMathProblem() {
    const a = Phaser.Math.Between(1, 10);
    const b = Phaser.Math.Between(1, 10);

    this.correctAnswer = a + b;

    // Show problem popup
    this.problemText = this.add.text(400, 400, `${a} + ${b} = ?`, {
      fontSize: "32px",
      backgroundColor: "#000",
      padding: 10,
      color: "#fff"
    }).setOrigin(0.5);

    // Create HTML input 
    this.answerBox = this.add.dom(400, 460, "input", {
      fontSize: "24px",
      width: "120px"
    }).setOrigin(0.9);

    this.answerBox.node.focus();

    // ENTER key submits
    this.enterKey = this.input.keyboard.addKey("ENTER");
    this.enterKey.once("down", () => {
      this.submitAnswer();
    });
  }

  submitAnswer() {
    const userAns = parseInt(this.answerBox.node.value);

    this.answerBox.destroy();
    this.problemText.destroy();

    if (userAns === this.correctAnswer) {
      this.monsterHP -= 20;
      this.monsterHPText.setText("HP: " + this.monsterHP);
      this.flashSprite(this.monster, 0xffaaaa);
    } else {
      this.playerHP -= 20;
      this.playerHPText.setText("HP: " + this.playerHP);
      this.flashSprite(this.player, 0xaaaaff);
    }
  }

  // Simple hit flash effect
  flashSprite(sprite, color) {
    const original = sprite.fillColor;
    sprite.setFillStyle(color);
    this.time.delayedCall(200, () => sprite.setFillStyle(original));
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

    // Prevent player from leaving screen
    this.player.x = Phaser.Math.Clamp(this.player.x, 0, this.game.config.width);
    this.player.y = Phaser.Math.Clamp(this.player.y, 0, this.game.config.height);
  }
}