export class GameOver extends Phaser.Scene {
  constructor() { super('GameOver'); }

  init(final) {
    this.winner = final.winner;
}

  create() {
    this.cameras.main.setBackgroundColor('#C1E1C1');
    
    this.add.text(512, 40, "Game Over!", {
      fontSize: "32px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);

    this.add.text(512, 200, `${this.winner} wins!`, {
      fontSize: "32px",
      color: "#fff",
      fontFamily: 'title-font'
    }).setOrigin(0.5);
}
}