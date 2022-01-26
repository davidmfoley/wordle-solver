import { wordPool } from './wordPool'
import { allWords } from './allWords'
import { getScore } from './getScore'

const solver = async () => {
  const pool = wordPool(allWords())

  for (let i = 1; i < 6; i++) {
    let guess = pool.getGuess()

    console.log(`${pool.remainingCount()} words remaining`)
    console.log(`My guess is: ${guess}`)

    const score = await getScore()

    if (score === 'X') {
      pool.invalidGuess(guess)
      guess = pool.getGuess()
    }

    if (score === 'GGGGG') {
      console.log(`Got it in ${i}`)
      process.exit(0)
    }

    pool.applyScore(guess, score)
  }
}

solver()
