import { ModalManager } from "./utils/ModalManager.js";

export class Home extends Phaser.Scene {
  constructor() {
    super("Home");
  }

  preload() {
    this.load.font("title-font", "assets/AlmendraSC-Regular.ttf");
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffd6e8");

    // CENTER X
    const cx = this.cameras.main.centerX;

    // TITLE
    this.add
      .text(cx, 140, "BATTLE START", {
        fontSize: "64px",
        color: "#000",
        fontFamily: "title-font",
      })
      .setOrigin(0.5);

    // START BUTTON
    const startBtn = this.add
      .text(cx, 300, "Start Game", {
        fontSize: "36px",
        color: "#000",
        fontFamily: "title-font",
      })
      .setOrigin(0.5)
      .setPadding(15)
      .setStyle({ backgroundColor: "#ffffff" })
      .setInteractive();

    startBtn.on("pointerup", () => {
      this.scene.start("Gameplay");
    });

    // RULES BUTTON UNDER START GAME
    const rulesBtn = this.add
      .text(cx, 380, "Rules", {
        fontSize: "32px",
        color: "#000",
        fontFamily: "title-font",
      })
      .setOrigin(0.5)
      .setPadding(12)
      .setStyle({ backgroundColor: "#ffffff" })
      .setInteractive();

    rulesBtn.on("pointerup", () => {
      this.modals.show("rules");
    });

    // CREATE MODAL MANAGER
    this.modals = new ModalManager(this);
    this.createModals();
  }

  createModals() {
    const cx = this.cameras.main.centerX;
    this.modals.createModal("rules", {
      modalCloseOnInput: true,
      x: cx,
      itemsArr: [
        {
          type: "text",
          content: "How to Play",
          fontSize: 42,
          color: "#000000",
          fontFamily: "title-font",
          offsetY: -130,
        },
        {
          type: "text",
          content:
            "• Solve math problems to attack.\n\n" +
            "• Wrong answers cause *you* to take damage.\n\n" +
            "• Reduce the monster’s HP to win!",
          fontSize: 26,
          color: "#000000",
          fontFamily: "title-font",
          offsetY: 0,
        },
        {
          type: "text",
          content: "Tap anywhere to close",
          fontSize: 18,
          color: "#555555",
          fontFamily: "title-font",
          offsetY: 140,
        },
      ],
    });
  }
}