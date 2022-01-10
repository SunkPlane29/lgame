import { load } from "js-yaml";
import { promises as fs } from "fs";
import { relative } from "node:path/posix";

interface GameData {
    prompt: Prompt
}

interface Prompt {
    text: string
    choices: ChoiceMap
}

interface ChoiceMap {
    [key: string]: Choice
}

interface Choice {
    text: string
    result: string
    next?: Prompt
}

class LGame {
    gameData!: GameData;
    current: Prompt;

    constructor(gameData: string) {
        this.gameData = load(gameData) as GameData;
        this.current = this.gameData.prompt;
    }

    Prompt(): Prompt {
        return this.current;
    }

    //will return null if there is no next prompt
    Choose(choice: string): Prompt|null {
        const next = this.current?.choices[`-${choice}`].next;
        if (next === undefined) {
            return null;
        }

        this.current = next;
        return this.current;
    }
};

export default LGame;