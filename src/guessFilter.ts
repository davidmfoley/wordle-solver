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
    const chars = word.split('')

    if (dot.some(({ letter, index }) => chars[index] === letter)) return false

    if (unused.some((l) => chars.includes(l.letter))) return false

    if (green.some(({ letter, index }) => chars[index] !== letter)) return false

    return !yellow.some(
      ({ letter, index }) => chars[index] === letter || !chars.includes(letter)
    )
  }
}
