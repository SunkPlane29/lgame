import { load } from "js-yaml";
import { promises as fs } from "fs";

interface GameData {
    prompt: Prompt
}

interface Prompt {
    text: string
    choices: Choice
}

interface Choice {
    text: string
    result: string
    next?: Prompt
}

class LGame {
    baseFile: string;
    gameData!: GameData;

    constructor(filepath: string) {
        this.baseFile = filepath;

        try {
            fs.readFile(filepath, "utf-8").then((file) => {
                this.gameData = load(file) as GameData;
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
};

export default LGame;