import { PropsWithChildren, useEffect, useState } from "react";
import { load } from "js-yaml";
import "./Game.css";

function isEmpty(obj: Object) {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

interface GameProps {
    gameDataFile: any
}

var gameData = {};

function Game(props: GameProps) {
    const [currentPrompt, setCurrentPrompt] = useState({});
    const [displayText, setDisplayText] = useState("");
    const [choices, setChoices] = useState([<div key="0"></div>]);
    const [image, setImage] = useState(<></>);

    useEffect(() => {
        fetch(props.gameDataFile).then((text) => {
            text.text().then((data) => {
                console.log(data);

                const game = load(data) as GameData;
                gameData = game;
                setCurrentPrompt(game.prompt);
            })
        }).catch((err) => {
            console.log(err)
        });
    }, []);
    
    useEffect(() => {
        const prompt = currentPrompt as Prompt;

        if (!isEmpty(prompt)) {
            setDisplayText(prompt.text);
            if (prompt.image) {
                setImage(<img src={`/${prompt.image}`} />);
            }
            renderButtons(prompt.choices);
        }
    }, [currentPrompt]);

    const displayNext = (choice: Choice) => {
        const nextPrompt = choice.next;

        if (nextPrompt === undefined) {
            handleFinish();
            return
        }

        setCurrentPrompt(choice.next!);
    };

    const renderButtons = (choices: [Choice]) => {
        setChoices(
            choices.map((choice) => {
                return <button key={choice.id} onClick={() => handleChoice(choice.id)}>{choice.text}</button>;
            })
        );
    };

    const handleChoice = (choiceID: number) => {
        const prompt = currentPrompt as Prompt;
        const choice = prompt.choices.find((choice) => choice.id === choiceID)!;

        setDisplayText(choice.result);
        if (choice.result_image) {
            setImage(<img src={`/${choice.result_image}`} />);
        } else {
            setImage(<></>);
        }
        setChoices([<button key="0" onClick={() => {displayNext(choice)}}>Next</button>]);
    };

    const handleFinish = () => {
        const game = gameData as GameData;

        setDisplayText(game.win_text);
        setCurrentPrompt({});
        if (game.win_image) {
            setImage(<img src={`/${game.win_image}`} />);
        } else {
            setImage(<></>);
        }
        setChoices([<button key="0" onClick={() => {setCurrentPrompt(game.prompt)}}>Again</button>]);
    };

    //should absctract into components
    return (
        <div className="game">
            <div className="gameImage">{image}</div>
            <div className="gameData">
                <div className="container align-column">
                    <div className="displayText">
                        <p>{displayText}</p>
                    </div>
                    <div className="promptChoices">
                        {choices}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;