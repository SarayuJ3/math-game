import { ModalManager } from "./utils/ModalManager.js";

export class Home extends Phaser.Scene {
  constructor() {
    super("Home");
  }

  preload() {
    this.load.font("title-font", "assets/AlmendraSC-Regular.ttf");
    this.load.image('background', 'assets/title-screen.png')
  }

  create() {
    this.cameras.main.setBackgroundColor('#C1E1C1');
    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;
    this.add.image(cx, cy, 'background');

    this.add.text(cx, 700, "Choose a Game Mode", {
      fontSize: "60px",
      color: "#0000",
      fontFamily: "title-font"
    })
    .setOrigin(0.5)

    //Quick Maths Button, using HTML formatting with dom :D
    const MathBtn = this.add.dom(cx - 320, 800, 'button',
      `
      background: #D6D422; 
      color: #696969; 
      font-size: 50px; 
      font-family: 'title-font'; 
      padding: 20px 30px;  
      border-radius: 15px; 
      border: none;
      cursor: pointer; 
      transition: 0.2s;`,
      'Quick Maths'
    );
    MathBtn.addListener('click');
    MathBtn.on('click', () => this.scene.start("Gameplay", { questionType: "arithmetic" }));
    MathBtn.node.onmouseenter = () => MathBtn.node.style.background = '#BFB51E';
    MathBtn.node.onmouseleave = () => MathBtn.node.style.background = '#D6D422';

    //for rules, layering
    this.modals = new ModalManager(this);
    this.createModals();

     //Algebra Button
    const AlgBtn = this.add.dom(cx, 800, 'button',
      `
      background: #D68522; 
      color: #696969; 
      font-size: 50px; 
      font-family: 'title-font'; 
      padding: 20px 30px;  
      border-radius: 15px; 
      border: none;
      cursor: pointer; 
      transition: 0.2s;`,
      'Algebra'
    );
    AlgBtn.addListener('click');
    AlgBtn.on('click', () => this.scene.start("Gameplay", { questionType: "algebra" }));
    AlgBtn.node.onmouseenter = () => AlgBtn.node.style.background = '#BF751E';
    AlgBtn.node.onmouseleave = () => AlgBtn.node.style.background = '#D68522';

     // Trigonometry Button
    const TrigBtn = this.add.dom(cx + 320, 800, 'button',
      `
      background: #B31C21; 
      color: #696969;
      font-size: 50px; 
      font-family: 'title-font'; 
      padding: 20px 30px; 
      border: none; 
      border-radius: 15px; 
      cursor: pointer; 
      transition: 0.2s;`,
      'Trigonometry'
    );
    TrigBtn.addListener('click');
    TrigBtn.on('click', () => this.scene.start("Gameplay", { questionType: "trig" }));
    TrigBtn.node.onmouseenter = () => TrigBtn.node.style.background = '#9E191D';
    TrigBtn.node.onmouseleave = () => TrigBtn.node.style.background = '#B31C21';

    // RULES BUTTON UNDER START GAME
    const rulesBtn = this.add.dom(cx, 950, 'button',
      `
      background: #696969;
      font-size: 32px;
      color: #D6D422;
      font-family: 'title-font';
      padding: 15px 100px; 
      border: none; 
      border-radius: 15px; 
      cursor: pointer;`,
      'Rules'
    );
    rulesBtn.addListener('click');
    rulesBtn.on('click', () => this.modals.show("rules"));
    rulesBtn.node.onmouseenter = () => rulesBtn.node.style.background = '#e8e8e8';
    rulesBtn.node.onmouseleave = () => rulesBtn.node.style.background = '#696969';
    
  }

  createModals() {
    const cx = this.cameras.main.centerX;
    this.modals.createModal("rules", {
      modalCloseOnInput: true,
      x: cx,
      color: 0xFFF8DC,
      borderRadius: 20, 
      itemsArr: [
        {
          type: "text",
          content: "How to Play",
          fontSize: 42,
          color: "#000000",
          fontFamily: "title-font",
          offsetY: -250,
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
          offsetY: -90,
        },
        {
          type: "text",
          content: "Tap anywhere to close",
          fontSize: 18,
          color: "#555555",
          fontFamily: "title-font",
          offsetY: 120,
        },
      ],
    });
  }
}