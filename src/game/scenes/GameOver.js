export class GameOver extends Phaser.Scene {
  constructor() { super('GameOver'); }

  init(final) {
    this.winner = final.winner;
  }
    preload() {
    this.load.image('endbg', 'assets/title-screen.png')
    this.load.image('endmouse', 'assets/mouse_end_scr.png')
    this.load.image('endsnek', 'assets/snake_end_scr.PNG')
    this.load.image('victory', 'assets/victory.png')
  }

  create() {
    this.cameras.main.setBackgroundColor('#C1E1C1');
    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;
    this.add.image(cx, cy, 'endbg');

    if(this.winner == 'Player'){
      this.add.image(cx + 650, 550, 'endmouse').setScale(.5);;
      this.add.image(cx - 500, 300, 'victory').setScale(.3);

      this.add.text(cx - 400, 600, `${this.winner} wins!`, {
      fontSize: "64px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);

    } else if(this.winner == 'Monster'){
      this.add.image(990, 700, 'endsnek');

      this.add.text(cx, 40, "Game Over!", {
      fontSize: "64px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);

        this.add.text(cx, 200, `${this.winner} wins!`, {
      fontSize: "64px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);

    }
      this.escapeBtn = this.add.dom(150, 60, "button", 
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
        "Play Again")
        .setOrigin(0.5)
        .setInteractive();

        this.escapeBtn.node.onmouseenter = () => this.escapeBtn.node.style.backgroundColor = "#555";
        this.escapeBtn.node.onmouseleave = () => this.escapeBtn.node.style.backgroundColor = "#333";
        this.escapeBtn.addListener('click');
        this.escapeBtn.on('click', () => {
        this.scene.start('Home');
    });
  }
}