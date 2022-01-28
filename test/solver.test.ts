import { test, describe } from 'mocha'
import { expect } from 'chai'

import { solver } from '../src/solver'
import { wordPool } from '../src/wordPool'
import { WordScore } from '../src/getScore'

const noOp = () => {}

const foreverWordPool = wordPool([['guess']], () => () => true)

describe('solver', () => {
  test('lucky first guess', async () => {
    const pool = wordPool([['wimpy']])
    const result = await solver(pool, () => Promise.resolve('GGGGG'), noOp)
    expect(result).to.eq('wimpy')
  })

  test('solved on 3rd try', async () => {
    const pool = foreverWordPool

    const scores: WordScore[] = ['.Y.G.', '.GGG.', 'GGGGG']

    const solvedOnThirdTry = async (): Promise<WordScore> => {
      return scores.pop()
    }

    expect(await solver(pool, solvedOnThirdTry, noOp)).to.eq('guess')
  })

  test('gives up after 6 tries', async () => {
    const pool = foreverWordPool
    let count = 0

    const countInvocations = async (): Promise<WordScore> => {
      count++
      return '.....'
    }

    try {
      await solver(pool, countInvocations, noOp)
    } catch (e) {
      expect(count).to.eq(6)
      return
    }

    throw new Error('expected failure but got success')
  })
})
