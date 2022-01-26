import { test, describe } from 'mocha'
import { expect } from 'chai'
import { wordPriority } from '../src/wordPriority'

describe('wordPriority', () => {
  test('words with no repeated letters are tried first', () => {
    expect(wordPriority('aeiou')).to.be.lt(wordPriority('aaaaa'))
  })

  test('words with more common letters are tried first', () => {
    expect(wordPriority('rates')).to.be.lt(wordPriority('boots'))
  })

  test('words with the same letters have the same priority', () => {
    expect(wordPriority('rates')).to.eq(wordPriority('stare'))
  })
})
