import Phaser, { AUTO, Game } from 'phaser';
import { Home } from './scenes/Home';
import { Gameplay } from './scenes/Gameplay';
import { GameOver } from './scenes/GameOver.js';

const config = {
    type: AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#4E3021',
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
        GameOver
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;