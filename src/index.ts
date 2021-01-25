import React from "react";
import ReactDOM from 'react-dom'

import App from "./App";

const appElement = document.getElementById("app")


console.log("FIRE")
ReactDOM.render(React.createElement(App), appElement)
