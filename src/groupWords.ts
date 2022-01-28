import { wordPriority } from './wordPriority'

const wordsWithFrequencies = (wordLists: string[][]) => {
  const frequencies = {} as Record<string, number>

  wordLists.forEach((l) =>
    l.forEach((word) => {
      frequencies[word] = (frequencies[word] || 0) + 1
    })
  )

  return Object.entries(frequencies).map(([word, frequency]) => ({
    word,
    frequency,
  }))
}

const calculatePriority = ({
  word,
  frequency,
}: {
  word: string
  frequency: number
}) => {
  const basePriority = wordPriority(word)
  const frequencyModifier = 2 * frequency
  const priority = basePriority - frequencyModifier
  return { word, priority }
}

const ensureInitialPoolSizeAtLeast = (
  minInitialGuessPoolSize = 10,
  groups: string[][]
) => {
  while (groups.length > 1 && groups[0].length < minInitialGuessPoolSize) {
    groups[1] = [...groups[0], ...groups[1]]
    groups.shift()
  }
}

export const groupWords = (
  wordLists: string[][],
  minInitialGuessPoolSize = 10
) => {
  const byScore: Record<number, string[]> = {}

  wordsWithFrequencies(wordLists)
    .map(calculatePriority)
    .forEach(({ word, priority }) => {
      byScore[priority] = byScore[priority] || []
      byScore[priority].push(word)
    })

  const entries = Object.entries(byScore)
  entries.sort(([a], [b]) => Number(a) - Number(b))

  const groups = entries.map(([_, words]) => words)

  ensureInitialPoolSizeAtLeast(minInitialGuessPoolSize, groups)

  return groups
}
