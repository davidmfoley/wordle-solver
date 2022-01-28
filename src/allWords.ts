import path from 'path'
import fs from 'fs'

const dicts = ['dictionary.txt', 'dictionary2.txt', 'dictionary3.txt']

export const allWords = () =>
  dicts.map((filename) =>
    fs
      .readFileSync(path.join(__dirname, '../data', filename), 'utf-8')
      .split('\n')
      .map((w) => w.trim())
      .filter(Boolean)
  )
