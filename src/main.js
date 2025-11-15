import { Home } from './scenes/Start.js';
import { Gameplay } from './scenes/Gameplay.js';
import { Lobby } from './scenes/Lobby';

const config = {
    type: Phaser.AUTO,
    title: 'HAHAA',
    description: '',
    parent: 'game-container',
    width: 1024,
    height: 768,
    backgroundColor: '#028af8',
    pixelArt: false,

    dom: {
    createContainer: true
    },

    scene: [
        Home,
        Lobby,
        Gameplay
    ],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);