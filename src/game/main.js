import Phaser, { AUTO, Game } from 'phaser';
import { Home } from './scenes/Home';
import { Gameplay } from './scenes/Gameplay';

const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    dom: {
    createContainer: true
    },

    scene: [
        Home,
        Gameplay,
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;