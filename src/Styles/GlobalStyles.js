import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    *{
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    #root{
        height: 100%;
        width: 100%;
    }
    html {
        width: 100%;
        height: 100%;
        min-height: 100%;
    }
    body{
        height: 100%;
        min-height: 100%;
        overflow: hidden !important;
        font-family: "Nanum Gothic";
        color: ${(props) => props.theme.darkBlue};
    }
    a{
        color: ${(props) => props.theme.darkBlue};
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;
    }
    div{
        -webkit-tap-highlight-color:transparent;
    }
    input:focus{
        outline: none;
    }
`;
