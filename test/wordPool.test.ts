import { test, describe } from 'mocha'
import { expect } from 'chai'
import { wordPool } from '../src/wordPool'
import { allWords } from '../src/allWords'

describe('wordPool', () => {
  test('filtering guess scores', () => {
    const pool = wordPool([['wince']])

    pool.applyScore('lions', '.G.Y.')
    expect(pool.remainingCount()).to.eq(1)

    pool.applyScore('nitre', 'YG..G')
    expect(pool.remainingCount()).to.eq(1)

    pool.applyScore('ainee', '.GG.G')
    expect(pool.remainingCount()).to.eq(1)
    expect(pool.remainingWords()).to.eql(['wince'])
  })

  test('integration test with real dicts', () => {
    const pool = wordPool(allWords())

    pool.applyScore('raise', '.....')

    pool.applyScore('pound', '.Y.Y.')

    pool.applyScore('cyton', '...YY')

    expect(pool.hasWord('knoll')).to.eq(true)
  })
})
