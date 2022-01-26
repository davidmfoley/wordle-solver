export const guessFilter = (guess: string, score: string) => {
  const letters = guess
    .split('')
    .map<[string, number]>((letter, index) => [letter, index])

  const scores = score.split('')
  const wrongPlace = letters.filter(([_, i]) => scores[i] === 'Y')
  const rightPlace = letters.filter(([_, i]) => scores[i] === 'G')
  const allUsed = [...wrongPlace, ...rightPlace].map(([l]) => l)

  const unused = letters
    .filter((_, i) => scores[i] === '.')
    .map(([l]) => l)
    .filter((l) => !allUsed.includes(l))

  return (word: string) => {
    if (unused.some((l) => word.includes(l))) return false
    if (rightPlace.some(([l, i]) => word.charAt(i) !== l)) return false

    return !wrongPlace.some(
      ([l, i]) => word.charAt(i) === l || !word.includes(l)
    )
  }
}
