type WordPredicate = (word: string) => boolean

type GetPredicate = (letter: string, index: number) => WordPredicate

interface GuessLetter {
  score: string
  letter: string
  index: number
}

const lettersWithScores = (guess: string, score: string): GuessLetter[] =>
  guess
    .split('')
    .map((letter, index) => ({ letter, index, score: score[index] }))

const predicates: Record<string, GetPredicate> = {
  '.': (letter, index) => (word) => word[index] !== letter,
  G: (letter, index) => (word) => word[index] === letter,
  Y: (letter, index) => (word) =>
    word[index] !== letter && word.includes(letter),
}

const getLetterPredicate = ({ score, letter, index }: GuessLetter) => {
  const predicate = predicates[score]
  if (!predicate) throw new Error('invalid score')
  return predicate(letter, index)
}

const unusedPredicate = (letters: GuessLetter[]) => {
  const dot = letters.filter(({ score }) => score === '.')
  const allUsed = letters.filter(({ score }) => score !== '.')
  const unused = dot.filter(
    (l) => !allUsed.some(({ letter }) => letter === l.letter)
  )

  return (word: string) => !unused.some(({ letter }) => word.includes(letter))
}

export const guessFilter = (guess: string, score: string) => {
  const letters = lettersWithScores(guess, score)

  const predicates = [
    ...letters.map(getLetterPredicate),
    unusedPredicate(letters),
  ]

  return (word: string) => !predicates.some((p) => !p(word))
}
