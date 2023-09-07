import { createGlobalStyle } from "styled-components";
import NotoSansKR100 from "@assets/fonts/noto-sans-kr-v36-korean_latin-100.woff2";
import NotoSansKR200 from "@assets/fonts/noto-sans-kr-v36-korean_latin-200.woff2";
import NotoSansKR300 from "@assets/fonts/noto-sans-kr-v36-korean_latin-300.woff2";
import NotoSansKR400 from "@assets/fonts/noto-sans-kr-v36-korean_latin-400.woff2";
import NotoSansKR500 from "@assets/fonts/noto-sans-kr-v36-korean_latin-500.woff2";
import NotoSansKR600 from "@assets/fonts/noto-sans-kr-v36-korean_latin-600.woff2";
import NotoSansKR700 from "@assets/fonts/noto-sans-kr-v36-korean_latin-700.woff2";
import NotoSansKR800 from "@assets/fonts/noto-sans-kr-v36-korean_latin-800.woff2";
import NotoSansKR900 from "@assets/fonts/noto-sans-kr-v36-korean_latin-900.woff2";

export const GlobalFonts = createGlobalStyle`
    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 100;
      src: url(${NotoSansKR100}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 200;
      src: url(${NotoSansKR200}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 300;
      src: url(${NotoSansKR300}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 400;
      src: url(${NotoSansKR400}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 500;
      src: url(${NotoSansKR500}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 600;
      src: url(${NotoSansKR600}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 700;
      src: url(${NotoSansKR700}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 800;
      src: url(${NotoSansKR800}) format('woff2'); 
    }

    @font-face {
      font-display: swap; 
      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 900;
      src: url(${NotoSansKR900}) format('woff2'); 
    }    

`;
