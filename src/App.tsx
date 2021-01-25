import React, { useRef, useEffect } from "react";
import main from "./main";

const App = () => {

    const gameRef = useRef(null);
    useEffect(() => {
        main(gameRef.current)
    }, [])


    return (
        <canvas ref={gameRef} />
    )
}

export default App