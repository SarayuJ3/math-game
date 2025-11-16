export class Gameplay extends Phaser.Scene {
  constructor() { super('Gameplay'); }

  preload() {
    this.load.image('background1', 'assets/battle-bg.png')
    this.load.image('mouse', 'assets/Mouse.png')
    this.load.image('snek', 'assets/Snek.png')
  }
  
  create() {
    this.cameras.main.setBackgroundColor('#C1E1C1');
    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;
    this.add.image(cx, cy, 'background1');
    
    this.add.text(cx, 100, "Battle!", {
      fontSize: "80px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);

    const spacing = 700; // Distance between the two circles
    
    this.player = this.add.image(cx - spacing/2, cy + 60, 'mouse').setScale(0.05);
    this.playerHP = 100;

    this.monster = this.add.image(cx + spacing/2, cy, 'snek').setScale(0.07);
    this.monsterHP = 250;

    const playerHP = "Player HP: 100"
    const monsterHP = "Monster HP: 250"
    this.playerHPText = this.add.text(cx - spacing/2, 200, playerHP, { fontSize: "50px", color: "#fff", fontFamily: 'title-font'}).setOrigin(0.5);
    this.monsterHPText = this.add.text(cx + spacing/2, 200, monsterHP, { fontSize: "50px", color: "#fff", fontFamily: 'title-font' }).setOrigin(0.5);

    // Attack button (only shown at beginning)
    this.attackBtn = this.add.text(cx, 800, "START BATTLE", {
      fontSize: "45px",
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
    if (this.playerHP <= 0 || this.monsterHP <= 0) {
      this.gameOver();
      return;
    }

    const a = Phaser.Math.Between(1, 10);
    const b = Phaser.Math.Between(1, 10);

    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;

    this.correctAnswer = a + b;

    this.problemText = this.add.text(cx, 750, `${a} + ${b} = ?`, {
      fontSize: "32px",
      backgroundColor: "#A7C7E7",
      padding: { x: 40, y: 20 },
      margin: { x: 0, y: 10 },
      color: "#fff"
    }).setOrigin(0.5);

    // Create HTML input 
    this.answerBox = this.add.dom(cx, 820, "input", {
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
      this.tweens.add({
      targets: this.player,
      x: this.player.x + 150,
      duration: 300,
      yoyo: true,
      onComplete: () => {
        this.monsterHP -= 20;
        this.monsterHPText.setText("Monster HP: " + this.monsterHP);
      }})
    } else {
      this.tweens.add({
      targets: this.monster,
      x: this.monster.x - 150,
      duration: 300,
      yoyo: true,
      onComplete: () => {
      this.playerHP -= 20;
      this.playerHPText.setText("Player HP: " + this.playerHP);
      }})

    }

    if (this.playerHP <= 0 || this.monsterHP <= 0) {
      this.time.delayedCall(500, () => {
        this.gameOver();
      });
    } else {
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
}