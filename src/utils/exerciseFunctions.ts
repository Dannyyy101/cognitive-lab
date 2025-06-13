export const isAnswerCorrect = (userInput: string, answer: string) => {
    const regex = /\/(.*?)\//g
    const matches = []
    let match

    const lowerCaseUserInput = userInput.toLowerCase().replaceAll(' ', '')

    while ((match = regex.exec(answer.replaceAll(' ', ''))) !== null) {
        matches.push(match[1]) // match[1] contains the text between slashes
    }

    if (matches.length === 0) return lowerCaseUserInput === answer.toLowerCase()

    // Compare extracted matches with user input
    return matches.includes(userInput.replaceAll(' ', ''))
}
