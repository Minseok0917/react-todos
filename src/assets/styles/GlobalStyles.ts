import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }

    body{
        color: #282c37;
    }

    input{
        border: 0;
        outline: 0;
    }

    button{
        background: transparent;
        border: 0;
        outline: 0;
        font-weight: inherit;
    }
`;
