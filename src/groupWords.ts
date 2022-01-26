import { wordPriority } from './wordPriority'

export const groupWords = (
  wordLists: string[][],
  minInitialGuessPoolSize = 10
) => {
  const byScore: Record<number, string[]> = {}
  const frequencies = {} as Record<string, number>

  wordLists.forEach((l) =>
    l.forEach((word) => {
      frequencies[word] = (frequencies[word] || 0) + 1
    })
  )

  Object.entries(frequencies).forEach(([word, freq]) => {
    const basePriority = wordPriority(word)
    const frequencyModifier = 2 * freq
    const priority = basePriority - frequencyModifier

    byScore[priority] = byScore[priority] || []
    byScore[priority].push(word)
  })

  const entries = Object.entries(byScore)
  entries.sort(([a], [b]) => Number(a) - Number(b))

  const groups = entries.map(([_, words]) => words)

  while (groups.length > 1 && groups[0].length < minInitialGuessPoolSize) {
    groups[1] = [...groups[0], ...groups[1]]
    groups.shift()
  }

  return groups
}
