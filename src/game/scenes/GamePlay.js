export class Gameplay extends Phaser.Scene {
  constructor() { super('Gameplay'); }

  create() {
    this.cameras.main.setBackgroundColor('#C1E1C1');
    
    this.add.text(512, 40, "Battle!", {
      fontSize: "32px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);

    const cx = this.cameras.main.centerX; 
    const cy = this.cameras.main.centerY; 
    const spacing = 700; // Distance between the two circles
    
    this.player = this.add.circle(cx - spacing/2, cy - 75, 40, 0x00ccff);
    this.playerHP = 100;

    this.monster = this.add.circle(cx + spacing/2, cy - 75, 40, 0xff4444);
    this.monsterHP = 100;

    const playerHP = "Player HP: 100"
    const monsterHP = "Monster HP: 100"
    this.playerHPText = this.add.text(cx - spacing/2, 200, playerHP, { fontSize: "24px", color: "#fff", fontFamily: 'title-font'}).setOrigin(0.5);
    this.monsterHPText = this.add.text(cx + spacing/2, 200, monsterHP, { fontSize: "24px", color: "#fff", fontFamily: 'title-font' }).setOrigin(0.5);

    // Attack button (only shown at beginning)
    this.attackBtn = this.add.text(512, 500, "START BATTLE", {
      fontSize: "28px",
      backgroundColor: "#333",
      padding: { x: 20, y: 10 },
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5).setInteractive();

    this.attackBtn.on("pointerdown", () => {
      this.attackBtn.destroy(); // Remove button after first click
      this.startMathProblem();
    });

    // For input
    this.input.keyboard.enabled = true;
    
    // Battle started flag
    this.battleStarted = false;
  }

  startMathProblem() {
    // Check if game is over
    if (this.playerHP <= 0 || this.monsterHP <= 0) {
      this.gameOver();
      return;
    }

    const a = Phaser.Math.Between(1, 10);
    const b = Phaser.Math.Between(1, 10);

    this.correctAnswer = a + b;

    this.problemText = this.add.text(512, 400, `${a} + ${b} = ?`, {
      fontSize: "32px",
      backgroundColor: "#A7C7E7",
      padding: { x: 20, y: 10 },
      color: "#fff"
    }).setOrigin(0.5);

    // Create HTML input 
    this.answerBox = this.add.dom(512, 460, "input", {
      type: "text",
      fontSize: "24px",
      width: "120px",
      textAlign: "center"
    }).setOrigin(0.5);

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
      this.monsterHPText.setText("Monster HP: " + this.monsterHP);
      this.flashSprite(this.monster, 0xffaaaa);
    } else {
      this.playerHP -= 20;
      this.playerHPText.setText("Player HP: " + this.playerHP);
      this.flashSprite(this.player, 0xaaaaff);
    }

    if (this.playerHP <= 0 || this.monsterHP <= 0) {
      this.time.delayedCall(500, () => {
        this.gameOver();
      });
    } else {
      // Small delay before next question
      this.time.delayedCall(800, () => {
        this.startMathProblem();
      });
    }
  }

  gameOver() {
    const winner = this.playerHP > 0 ? 'Player' : 'Monster';
    
    this.scene.start('GameOver', { 
      winner: winner,
      playerHP: this.playerHP,
      monsterHP: this.monsterHP
    });
  }

  // Simple hit flash effect
  flashSprite(sprite, color) {
    const original = sprite.fillColor;
    sprite.setFillStyle(color);
    this.time.delayedCall(200, () => sprite.setFillStyle(original));
  }
}