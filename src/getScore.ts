import { stdin as input, stdout as output } from 'process'
import readline from 'readline'

const rl = readline.createInterface({ input, output })

const getInputFromStdio = (): Promise<string> =>
  new Promise((resolve) => rl.question('How did I do?\n', resolve))

export const validScore = (score: string) => /^([.YG]{5}|X)$/.test(score)

export const getScore = async (
  inputScore = getInputFromStdio
): Promise<string> => {
  while (true) {
    const score = (await inputScore()).toUpperCase()

    if (validScore(score)) {
      return score
    }

    console.log(
      'Invalid score. Valid scores include .GY and are 5 characters long. Enter X if a word is not recognized'
    )
  }
}
