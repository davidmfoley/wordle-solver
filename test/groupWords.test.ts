import { test, describe } from 'mocha'
import { expect } from 'chai'
import { groupWords } from '../src/groupWords'
import { allWords } from '../src/allWords'

describe('groupWords', () => {
  test('more common words are grouped before less common', () => {
    const groups = groupWords([['paint', 'fuzzy']], 1)
    expect(groups).to.eql([['paint'], ['fuzzy']])
  })

  test('words that appear in multiple dicts are prioritized', () => {
    const groups = groupWords([['paint'], ['paint', 'pints']], 1)
    expect(groups).to.eql([['paint'], ['pints']])
  })

  test('first group has at least the specified count', () => {
    const realGroups = groupWords(allWords(), 10)
    expect(realGroups[0].length).to.be.gte(10)
  })
})
