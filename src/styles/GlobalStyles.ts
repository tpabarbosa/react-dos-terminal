import { createGlobalStyle } from "styled-components";
//import VGA from '../fonts/WebPlus_IBM_VGA_9x16.woff';

const VGA = require('../assets/WebPlus_IBM_VGA_9x16.woff')

const GlobalStyles =  createGlobalStyle`
    @font-face {
        font-family: 'IBM VGA 9x16';
        src: url(${VGA}) format('woff');
        font-weight: normal;
        font-style: normal;
    }
`

export default GlobalStyles;
