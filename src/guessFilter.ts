export const guessFilter = (guess: string, score: string) => {
  const scores = score.split('')

  const letters = guess
    .split('')
    .map((letter, index) => ({ letter, index, score: scores[index] }))

  const yellow = letters.filter(({ score }) => score === 'Y')
  const green = letters.filter(({ score }) => score === 'G')
  const dot = letters.filter(({ score }) => score === '.')

  const allUsed = [...yellow, ...green]

  const unused = dot.filter(
    (l) => !allUsed.some(({ letter }) => letter === l.letter)
  )

  return (word: string) => {
    if (dot.some(({ letter, index }) => word[index] === letter)) return false
    if (unused.some(({ letter }) => word.includes(letter))) return false
    if (green.some(({ letter, index }) => word[index] !== letter)) return false

    if (
      yellow.some(
        ({ letter, index }) => word[index] === letter || !word.includes(letter)
      )
    )
      return false

    return true
  }
}
