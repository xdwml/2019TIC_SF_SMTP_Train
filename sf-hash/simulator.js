const Backend = require('./Backend.js')
const Frontend = require('./Frontend.js')
const chalk = require('chalk')

/**
 * Simulation
 * @param {*} formInput User' Form-Input
 */
async function simulator(formInput){
  // >>> Initialize environment >>>
  let frontend = new Frontend()
  let backend = new Backend()
  // <<<Initialize environment <<<

  // >>> Frontend >>>
  frontend.userInput(formInput)
  await frontend.getSalt(backend).catch(err=>{throw err})
  frontend.slowHash()
  await frontend.ajax(backend).catch(err=>{throw err}) // Send data to backend
  //  <<< Frontend <<<

  // >>> Backend >>>
  if(backend.checkDatabase()){
    backend.fastHash()
    backend.updateDatabase()
  } else {
    console.log(chalk.red('Error: Auth-check doesn\'t pass.'))
    process.exit(3)
  }
  // <<< Backend <<<

  return {frontend, backend}
}

module.exports = simulator