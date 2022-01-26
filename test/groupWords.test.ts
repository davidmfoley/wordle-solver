import { test, describe } from 'mocha'
import { expect } from 'chai'
import { groupWords } from '../src/groupWords'
import { allWords } from '../src/allWords'

describe('groupWords', () => {
  test('more common words are grouped before less common', () => {
    const groups = groupWords(1, ['paint', 'fuzzy'])
    expect(groups).to.eql([['paint'], ['fuzzy']])
  })

  test('words that appear in multiple dicts are prioritized', () => {
    const groups = groupWords(1, ['paint'], ['paint', 'pints'])
    expect(groups).to.eql([['paint'], ['pints']])
  })

  test('first group has at least the specified count', () => {
    const realGroups = groupWords(10, ...allWords())
    expect(realGroups[0].length).to.be.gte(10)
  })
})
