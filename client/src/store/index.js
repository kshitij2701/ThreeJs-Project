import {proxy} from 'valtio';

const state = proxy({
    intro: true,
    color: '#1aba6d',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal:'./shirt_logo.png',
    fullDecal:'./shirt_logo.png',
});

export default state;