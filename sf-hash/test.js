const { generateSalt, hmac } = require('../tools/crypto-hash-tool.js')
const simulator = require('./simulator.js')
const formInput = require('./configure.js')
const chalk = require('chalk')

function checkFrontend(index, frontend){
  if(Object.keys(frontend.result).length <= 0){
    console.warn(chalk.yellow('Compelete Frontend.slowHash(), plz!'))
    process.exit(1)
  }

  assert(`[${index}]Frontend check slow-hash [password]`, 
    frontend.result.password, 
    hmac(frontend.data.salt, frontend.data.password, {alg:'sha256', repeat: 100})
  )

  assert(`[${index}]Frontend check slow-hash [new-password]`, 
    frontend.result.newPassword, 
    hmac(frontend.result.newSalt, frontend.data.password, {alg:'sha256', repeat: 100})
  )
}

function checkBackend(index, backend){
  if(Object.keys(backend.result).length <= 0){
    console.warn(chalk.yellow('Compelete Backend.fastHash(), plz!'))
    process.exit(2)
  }

  let res = backend.query(backend.data.account)

  assert(`[${index}]Backend check update [salt]`, 
    res.salt, 
    backend.data.newSalt
  )

  assert(`[${index}]Backend check fast-hash/update [password]`, 
    res.password, 
    hmac(backend.serverSalt, backend.data.newPassword, {alg:'md5', repeat: 1})
  )

}

function assert(tag, a, b){
  if( a !== b){
    console.warn(chalk.red(`===${tag}: Not Equal To===\n\t${a}\n\t${b}`))
    process.exit(0)
  }
}

(async function(){
  try {
    for(let i=0; i<6; i++){
      let entity = await simulator(formInput).catch(err=>{throw err})
      
      checkFrontend(i, entity.frontend)
      checkBackend(i, entity.backend)

      console.log(chalk.green(`===[${i}]check pass!===`))
      let res = entity.backend.query(formInput.account)
      console.log(chalk.blue(`\tnew salt:${res.salt}\n\tnew password:${res.password}`))
    }
  } catch(err){
    console.error(chalk.red(err.message))
    throw err
  }
})();