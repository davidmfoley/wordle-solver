import { groupWords } from './groupWords'
import { guessFilter } from './guessFilter'

export const wordPool = (wordLists: string[][]) => {
  let groups = groupWords(wordLists)

  return {
    getGuess: () => {
      if (groups.length === 0) throw new Error('No words left')
      const [words] = groups
      return words[Math.floor(Math.random() * words.length)]
    },
    invalidGuess: (word: string) => {
      groups[0] = groups[0].filter((w) => w !== word)
      groups = groups.filter((g) => g.length)
    },
    remainingCount: () => groups.reduce((sum, group) => sum + group.length, 0),
    applyScore: (guess: string, score: string) => {
      groups = groups
        .map((words) => words.filter(guessFilter(guess, score)))
        .filter((g) => g.length)
    },
    hasWord: (word: string) => groups.some((g) => g.includes(word)),
  }
}
