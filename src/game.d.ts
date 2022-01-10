interface GameData {
    prompt: Prompt
    win_text: string
    win_image: string
}

interface Prompt {
    text: string
    image: string
    choices: [Choice]
}

interface Choice {
    id: number
    text: string
    result: string
    result_image: string
    next?: Prompt
}