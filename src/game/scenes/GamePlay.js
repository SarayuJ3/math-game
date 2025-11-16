export class Gameplay extends Phaser.Scene {
  constructor() { super('Gameplay'); }

  init(data){
    this.questionType = data.questionType || 'arithmetic' //default is basic quick maths
  }

  preload() {
    this.load.image('background1', 'assets/battle-bg.png')
    this.load.image('mouse', 'assets/Mouse.png')
    this.load.image('snek', 'assets/Snek.png')
    this.load.image('birb', 'assets/Bird.png')
    this.load.image('lizarb', 'assets/lizard-wizard.png')
  }
  
  create() {
    this.cameras.main.setBackgroundColor('#C1E1C1');
    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;
    this.add.image(cx, cy, 'background1');

    const titles = {
      arithmetic: "Quick Maths Battle!",
      algebra: "Algebra Battle!",
      trig: "Trig Battle!"
    };

    this.add.text(cx, 100, titles[this.questionType], {
      fontSize: "80px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);

    const spacing = 700; // distance between the two circles
    
    //set characters based on game mode
    this.setupChars(cx, cy, spacing);
    
    this.playerHP = 100;
    this.monsterHP = 250;

    const playerHP = "Player HP: 100"
    const monsterHP = "Monster HP: 250"
    this.playerHPText = this.add.text(cx - spacing/2, 200, playerHP, { fontSize: "50px", color: "#fff", fontFamily: 'title-font'}).setOrigin(0.5);
    this.monsterHPText = this.add.text(cx + spacing/2, 200, monsterHP, { fontSize: "50px", color: "#fff", fontFamily: 'title-font' }).setOrigin(0.5);

    this.escapeBtn = this.add.dom(100, 60, "button", 
      `
        font-size: 50px;
        background-color: #333;
        color: #fff;
        font-family: 'title-font';
        padding: 10px 20px;
        border-radius: 10px;
        border: 2px solid #000;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        cursor: pointer;
        user-select: none;
        `, 
        "Quit")
    .setOrigin(0.5)
    .setInteractive();

    this.escapeBtn.node.onmouseenter = () => this.escapeBtn.node.style.backgroundColor = "#555";
    this.escapeBtn.node.onmouseleave = () => this.escapeBtn.node.style.backgroundColor = "#333";
    this.escapeBtn.addListener('click');
    this.escapeBtn.on('click', () => {
        this.scene.start('Home'); 
    });

    this.attackBtn = this.add.dom(cx, 900, "button", {
      fontSize: "45px",
      backgroundColor: "#333",
      padding: "20px 40px",
      color: "#fff",
      fontFamily: "title-font",
      borderRadius: "20px",
      border: "3px solid #000",
      boxShadow: "0 2px 0 #000",
      cursor: "pointer",
      userSelect: "none",
      outline: "none"
    }, "START BATTLE")
    .setOrigin(0.5)
    .setInteractive();

    this.attackBtn.on("pointerdown", () => {
      this.attackBtn.destroy(); //only rly for vibes idk
      this.startMathProblem();
      if(this.questionType === 'arithmetic'){
        this.startQuickMathsTimer();
      }
    });

    // for input
    this.input.keyboard.enabled = true;

  }

  setupChars(cx, cy, spacing){
    if(this.questionType == 'arithmetic'){
      this.player = this.add.image(cx - spacing/2, cy + 60, 'birb').setScale(0.07);
    } else if (this.questionType == 'trig'){
      this.player = this.add.image(cx - spacing/2, cy + 60, 'mouse').setScale(0.06);
    } else {
      this.player = this.add.image(cx - spacing/2, cy + 60, 'lizarb').setScale(0.2);
    }
    this.monster = this.add.image(cx + spacing/2, cy, 'snek').setScale(0.07);

  }

  startQuickMathsTimer() {
    this.timeLeft = 60;
    this.timerText = this.add.text(this.cameras.main.centerX + 800, 50, `Time: ${this.timeLeft}`, {
      fontSize: "50px",
      color: "#fff",
      fontFamily: "title-font"
    }).setOrigin(0.5);

    this.quickMathsTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--;
        this.timerText.setText(`Time: ${this.timeLeft}`);
        if (this.timeLeft <= 0) {
          this.endQuickMathsSession();
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  endQuickMathsSession() {
    this.quickMathsTimer.remove(); // stop timer
    if (this.timerText) this.timerText.destroy();

    // Only win if monster HP is 0
    if (this.monsterHP <= 0) {
      this.scene.start('GameOver', { winner: 'Player', playerHP: this.playerHP, monsterHP: this.monsterHP });
    } else {
      this.scene.start('GameOver', { winner: 'Monster', playerHP: this.playerHP, monsterHP: this.monsterHP });
    }
  }

  startMathProblem() {
    if (this.playerHP <= 0 || this.monsterHP <= 0) {
      this.gameOver();
      return;
    }

    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;
    
    let question, answer, displayAns, choices;

    switch(this.questionType) {
      case 'arithmetic':
        ({ question, answer } = this.generateArithmetic());
        break;
      case 'algebra':
        ({ question, answer } = this.generateAlgebra());
        break;
      case 'trig':
        ({ question, answer, choices } = this.generateTrig());
        break;
    }
    
    this.correctAnswer = answer;

    this.problemText = this.add.dom(cx, 725, "div", {
      fontSize: "40px",
      backgroundColor: "#A7C7E7",
      padding: "15px 20px",
      color: "#fff",
      fontFamily: "title-font",
      textAlign: "center",
      borderRadius: "20px",
      border: "1px solid #000"
    }, question).setOrigin(0.5);

    if (this.questionType == 'trig'){
      this.createMC(choices, cx, cy);
      
    } else {
      this.answerBox = this.add.dom(cx, 825, "input", {
        type: "number",
        step: "1",
        fontSize: "24px",
        width: "120px",
        textAlign: "center",
        padding: "15px 40px",
        borderRadius: "10px"
      }).setOrigin(0.5);

      this.answerBox.node.focus();

      this.enterKey = this.input.keyboard.addKey("ENTER");
      this.enterKey.once("down", () => {
      this.submitAnswer();
      });
    };
  }

  generateArithmetic(){
    const a = Phaser.Math.Between(1, 10);
    const b = Phaser.Math.Between(1, 10);
    const ops = ['+', '-', '*'];
    const op = Phaser.Utils.Array.GetRandom(ops);

    let answer;
    switch(op){
      case "+": answer = a + b; break;
      case "-": answer = a - b; break;
      case "*": answer = a * b; break;
    }

    return{
      question: `${a} ${op} ${b} = ?`,
      answer: answer
    };
  };

  generateAlgebra(){
    const a = Phaser.Math.Between(1, 10);
    const x = Phaser.Math.Between(1, 10);
    const b = Phaser.Math.Between(1, 10);
    const c = a * x + b;

    return{
      question: `solve for x: ${a}x + ${b} = ${c}`,
      answer: x
    };

  };

  generateTrig(){
    const unitCircle = [
      { degrees: 0, radians: '0', sin: '0', cos: '1', tan: '0' },
      { degrees: 30, radians: 'π/6', sin: '1/2', cos: '√3/2', tan: '√3/3' },
      { degrees: 45, radians: 'π/4', sin: '√2/2', cos: '√2/2', tan: '1' },
      { degrees: 60, radians: 'π/3', sin: '√3/2', cos: '1/2', tan: '√3' },
      { degrees: 90, radians: 'π/2', sin: '1', cos: '0', tan: 'undefined' },
      { degrees: 120, radians: '2π/3', sin: '√3/2', cos: '-1/2', tan: '-√3' },
      { degrees: 135, radians: '3π/4', sin: '√2/2', cos: '-√2/2', tan: '-1' },
      { degrees: 150, radians: '5π/6', sin: '1/2', cos: '-√3/2', tan: '-√3/3' },
      { degrees: 180, radians: 'π', sin: '0', cos: '-1', tan: '0' },
      { degrees: 210, radians: '7π/6', sin: '-1/2', cos: '-√3/2', tan: '√3/3' },
      { degrees: 225, radians: '5π/4', sin: '-√2/2', cos: '-√2/2', tan: '1' },
      { degrees: 240, radians: '4π/3', sin: '-√3/2', cos: '-1/2', tan: '√3' },
      { degrees: 270, radians: '3π/2', sin: '-1', cos: '0', tan: 'undefined' },
      { degrees: 300, radians: '5π/3', sin: '-√3/2', cos: '1/2', tan: '-√3' },
      { degrees: 315, radians: '7π/4', sin: '-√2/2', cos: '√2/2', tan: '-1' },
      { degrees: 330, radians: '11π/6', sin: '-1/2', cos: '√3/2', tan: '-√3/3' }
    ];

    const angle = Phaser.Utils.Array.GetRandom(unitCircle);
    const functions = ['sin', 'cos', 'tan'];
    const func = Phaser.Utils.Array.GetRandom(functions);

    const useDegrees = Phaser.Math.Between(0, 1) == 0; 
    const angleShown = useDegrees? `${angle.degrees}°` : `${angle.radians}`;

    const corrAns = angle[func];

    let otherAns = unitCircle
      .map(a => a[func])
      .filter (b => b!== corrAns)

    const uniqueAns = [...new Set(otherAns)] ///remove dups
    
    // 3 choices
    const wrong1 = Phaser.Utils.Array.GetRandom(uniqueAns);
    uniqueAns.splice(uniqueAns.indexOf(wrong1), 1); //remove after
    
    const wrong2 = Phaser.Utils.Array.GetRandom(uniqueAns);
    uniqueAns.splice(uniqueAns.indexOf(wrong2), 1);
    
    const wrong3 = Phaser.Utils.Array.GetRandom(uniqueAns);

    const choices = Phaser.Utils.Array.Shuffle([
      {display: corrAns, correct: true},
      {display: wrong1, correct: false},
      {display: wrong2, correct: false},
      {display: wrong3, correct: false},
    ])

    return {
      question: `${func}(${angleShown}) = ?`,
      answer: corrAns,
      choices: choices
    };
  };

  createMC(choices, cx, cy){
    this.choiceButtons = [];

    //want a grid of buttons
    const positions = [
      {x: cx - 120, y: cy + 300 },
      { x: cx + 120, y: cy + 300 },
      { x: cx - 120, y: cy + 400 },
      { x: cx + 120, y: cy + 400 }
    ];

    for (let i = 0; i < 4; i++){
      const button = this.add.dom(positions[i].x, positions[i].y, 'button', 
        `
        background: #A7C7E7;
        color: #000000;
        font-size: 40px;
        font-family: 'title-font';
        padding: 15px 30px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.2s;
        min-width: 150px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `,
        choices[i].display
      );

    button.addListener('click');
    button.on('click', () => this.submitMCAnswer(choices[i].correct));

    button.node.onmouseenter = () => button.node.style.background = '#ffffff';
    button.node.onmouseleave = () => button.node.style.background = '#A7C7E7';

    this.choiceButtons.push(button); //to delete before next q
    }
  };

  // BASIC impact effect and projectile firing

  impactEffect(x, y) {
    const flash = this.add.circle(x, y, 20, 0xffff55);
    flash.setAlpha(0.8);
  
    this.tweens.add({
      targets: flash,
      scale: 2,
      alpha: 0,
      duration: 200,
      onComplete: () => flash.destroy()
    });
  }

  fireProjectile() {
    // Starting position: the player's cannon
    const startX = this.player.x + 100; // adjust depending on cannon position
    const startY = this.player.y - 15;
  
    // Create projectile (change to sprite?)
    const projectile = this.add.circle(startX, startY, 10, 0x808080 );
    projectile.setDepth(5);
  
    // Target position: snake
    const targetX = this.monster.x - 40; // slightly before the monster
    const targetY = this.monster.y;
  
    // Animation
    this.tweens.add({
      targets: projectile,
      x: targetX,
      y: targetY,
      duration: 300,
      ease: "Power1",
      onComplete: () => {
        this.impactEffect(targetX, targetY);
        projectile.destroy();
      }
    });
  }


  submitAnswer() {
    const userAns = parseInt(this.answerBox.node.value);

    this.answerBox.destroy();
    this.problemText.destroy();

    if (userAns === this.correctAnswer) {
      this.tweens.add({
      targets: this.player,
      x: this.player.x + 50,
      duration: 300,
      yoyo: true,

      onComplete: () => {
        this.fireProjectile(); // fires projectile and impact effect on snek
        this.monsterHP -= 20;
        this.monsterHPText.setText("Monster HP: " + this.monsterHP);
        this.checkGameOver();
      }})
    } else {
      this.tweens.add({
      targets: this.monster,
      x: this.monster.x - 100,
      duration: 300,
      yoyo: true,
      onComplete: () => {
      this.playerHP -= 20;
      this.playerHPText.setText("Player HP: " + this.playerHP);
      this.checkGameOver();
      }})

    }
  }

  submitMCAnswer(isCorrect){
    this.choiceButtons.forEach(btn => btn.destroy());
    this.choiceButtons = [];

    if (this.problemText) this.problemText.destroy(); //just to be safe make sure this goes away too
    
    if (isCorrect){
      this.tweens.add({
        targets: this.player,
        x: this.player.x + 50,
        duration: 300,
        yoyo: true,
        onComplete: () => {
          if(this.questionType == "algebra"){
            this.fireProjectile(); // fires projectile and impact effect on snek
          }
          this.monsterHP -= 20;
          this.monsterHPText.setText("Monster HP: " + this.monsterHP);
          this.checkGameOver();
        }
      });
    } else {
      this.tweens.add({
      targets: this.monster,
      x: this.monster.x - 100,
      duration: 300,
      yoyo: true,
      onComplete: () => {
      this.playerHP -= 20;
      this.playerHPText.setText("Player HP: " + this.playerHP);
      this.checkGameOver();
      }})
    }

    
  }

  checkGameOver() {
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