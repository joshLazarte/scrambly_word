import React, { useEffect } from 'react';
import axios from 'axios';


const Game = () => {
    useEffect(() => {
        (async() => {
            const options = await axios.get('https://localhost:8080/options/hello');
            console.log(options);
        })();
    }, []);


    return (
        <div className="Game">
     Game
    </div>
    );
};

export default Game;
