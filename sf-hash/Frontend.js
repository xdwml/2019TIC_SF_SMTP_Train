const { generateSalt, hmac } = require('../tools/crypto-hash-tool.js')

/**
 * You should fill `TODO` in
 *  - slowHash()
 */

class Frontend {
  constructor(){
    this.data = {
      account: 'account',
      password: 'password',
      salt: null
    }

    this.result = {/* accout:null, password: null, newPassword: null, newSalt:null */} // Result after slow-hash
  }

  userInput(formInput){
    this.data = formInput
  }

  async getSalt(backend){
    this.data.salt = await new Promise(resolve => {
      setTimeout(
        () => {
          let res = backend.query(this.data.account)
          resolve(res == null ? generateSalt(16) : res.salt)
        },
        500 /* delay 0.5s */
      )
    }).catch(err=>{throw err})
  }
  
  slowHash(){
    /**
     * @input-params this.data
     */
    this.result = {/* TODO */}
  }

  ajax(target){
    return new Promise(resolve => {
      setTimeout(
        () => resolve(target.accept(this.result)),
        500 /* delay 0.5s */
      )
    })
  }
}

module.exports = Frontend;










// ----------------------Answer-----------------------















/**
 * slowHash(){
 *  this.result.account = this.data.account
 *  this.result.password = hmac(this.data.salt, this.data.password, {alg:'sha256', repeat: 100})
 *  this.result.newSalt = generateSalt(16)
 *  this.result.newPassword = hmac(this.result.newSalt, this.data.password, {alg:'sha256', repeat: 100})
 * }
 */