import { test, describe } from 'mocha'
import { expect } from 'chai'
import { guessFilter } from '../src/guessFilter'

describe('guessFilter', () => {
  describe('all dots', () => {
    const filter = guessFilter('abcde', '.....')
    test('any matching chars', () => {
      expect(filter('acdef')).to.eq(false)
    })
    test('no matching chars', () => {
      expect(filter('fghik')).to.eq(true)
    })
  })

  describe('yellow guesses', () => {
    const filter = guessFilter('abcde', 'YYYYY')
    test('all chars present in defferent positions', () => {
      expect(filter('bcdea')).to.eq(true)
    })

    test('is false if char in exact position', () => {
      expect(filter('aedcb')).to.eq(false)
    })

    test('is false if char missing', () => {
      expect(filter('bedcf')).to.eq(false)
    })
  })

  describe('green guesses', () => {
    const filter = guessFilter('abcde', '..G..')
    test('char present in correct position', () => {
      expect(filter('zzczz')).to.eq(true)
    })

    test('char not present in correct position', () => {
      expect(filter('zczzz')).to.eq(false)
    })

    test('matching char duplicated', () => {
      expect(filter('zcczz')).to.eq(true)
    })
  })

  describe('repeated letters', () => {
    test('same letter is green and dot', () => {
      const filter = guessFilter('annal', 'Y.GGG')
      expect(filter('banal')).to.eq(true)
    })

    test('same letter is yellow and dot', () => {
      const filter = guessFilter('stalk', '..YY.')
      expect(filter('banal')).to.eq(true)
      expect(filter('talls')).to.eq(false)
    })

    test('repeated letters with one non-match exact word', () => {
      const filter = guessFilter('perry', 'GGG.G')
      expect(filter('perry')).to.eq(false)
    })

    test('repeated letters with one non-match candidate', () => {
      const filter = guessFilter('perry', 'GGG.G')
      expect(filter('perky')).to.eq(true)
    })
  })
})
