import { solver } from './solver'

solver()
  .then((answer) => {
    console.log(`The answer is: ${answer}`)
    process.exit()
  })
  .catch((e) => {
    console.log(e.message)
    process.exit(1)
  })
