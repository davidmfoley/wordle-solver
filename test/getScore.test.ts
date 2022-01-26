import { describe, test } from 'mocha'
import { expect } from 'chai'
import { getScore, validScore } from '../src/getScore'

describe('getScore', () => {
  test('returns the input score if valid', async () => {
    const fakeInput = () => Promise.resolve('.....')

    expect(await getScore(fakeInput)).to.eq('.....')
  })

  test('ask again and returns on invalid initial input', async () => {
    const values = ['bogus', 'GGY..']
    const fakeInput = () => Promise.resolve(values.shift() as string)
    expect(await getScore(fakeInput)).to.eq('GGY..')
  })

  test('normalizes case', async () => {
    const fakeInput = () => Promise.resolve('ygyg.')
    expect(await getScore(fakeInput)).to.eq('YGYG.')
  })

  describe('validScore', () => {
    test('valid guess', () => {
      expect(validScore('.Y.G.')).to.eq(true)
    })

    test('too long', () => {
      expect(validScore('...G..')).to.eq(false)
    })

    test('too short', () => {
      expect(validScore('GGGG')).to.eq(false)
    })

    test('Not in dictionary', () => {
      expect(validScore('X')).to.eq(true)
    })
  })
})
