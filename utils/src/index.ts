'use strict'

import prompt from 'prompt'
import generateMapFilesAction from './generate-map-files'
import generateContinentsFileAction from './generate-continents-file'

prompt.start()

const commands = [
  { name: `Generate map support files`, action: generateMapFilesAction },
  { name: `Generate the list of sub-regions for countries`, action: generateContinentsFileAction },
]

const commandPromptSchema = {
  properties: {
    command: {
      pattern: /\d/,
      message: `Command must be a number`,
      required: true,
    },
  },
}

console.log(`Which command do you want to execute?`)
commands.forEach((command, index) => {
  console.log(`${index + 1} - ${command.name}`)
})

const promptCommand = () => {
  prompt.get(commandPromptSchema, (err, result) => {
    if (!err) {
      const command = parseInt(result.command as string) - 1

      if (command < 0 || command > commands.length - 1) {
        promptCommand()
      }

      commands[command].action()
    }
  })
}

promptCommand()
