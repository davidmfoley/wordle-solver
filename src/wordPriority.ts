const values = {
  a: 1,
  b: 4,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 3,
  h: 3,
  i: 1,
  j: 5,
  k: 4,
  l: 2,
  m: 3,
  n: 2,
  o: 1,
  p: 3,
  q: 6,
  r: 2,
  s: 2,
  t: 2,
  u: 1,
  v: 4,
  w: 3,
  x: 6,
  y: 4,
  z: 6,
}

export const wordPriority = (word: string) => {
  const letters = word.split('')
  const frequency = letters.reduce(
    (sum, letter) => sum + (values[letter] || 1),
    0
  )
  const letterCount = new Set(letters).size
  return frequency - 2 * letterCount
}
