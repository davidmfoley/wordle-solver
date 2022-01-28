import { wordPool } from './wordPool'
import { allWords } from './allWords'
import { getScore } from './getScore'

export const solver = async (
  pool = wordPool(allWords()),
  getGuessScore = getScore,
  print = console.log
) => {
  let guesses = 1
  let guess = pool.getGuess()

  while (true) {
    print(`${pool.remainingCount()} words remaining`)
    print(`My guess is: ${guess}`)

    const score = await getGuessScore()

    if (score === 'P') {
      print('Remaining words:')
      print(pool.remainingWords().join(', '))
      continue
    }

    if (score === 'X') {
      pool.invalidGuess(guess)
      guess = pool.getGuess()
      continue
    }

    if (score === 'GGGGG') {
      print(`Got it in ${guesses}!`)
      return guess
    }

    if (guesses === 6) throw new Error(`I couldn't figure it out!`)

    pool.applyScore(guess, score)
    guesses++
    guess = pool.getGuess()
  }
}
