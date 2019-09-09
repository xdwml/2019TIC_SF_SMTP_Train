const { hmac } = require('../tools/crypto-hash-tool.js')

/**
 * You should fill `TODO` in
 *  - fastHash()
 *  - checkDatabase()
 *  - updateDatabase()
 */

class Backend {
  constructor(){
    this.data = {/* accout:null, password: null, newPassword: null, newSalt:null */} // Data from frontend

    this.result = {/* accout:null, password: null */} // Result after fast-hash

    this.store = {/* 'accout':{passord: null, salt: null} */  } // As a database

    this.serverSalt = 'test'; // Server Private Key
  }

  accept(data){
    this.data = data
  }

  fastHash(){
    /**
     * @input-params this.data
     * @input-params this.serverSalt
     * @modify-params this.result
     */
    this.result = {/* TODO */}
  }

  checkDatabase(){
    /**
     * @input-params this.result
     * @output-params Boolean: (you shold call updateDatabase() if auth-check passed, which is `return true`
     */
    let res = this.query(this.data.account)
    let checkFlag = false
    if(res != null){
      checkFlag = null /* TODO */
    } else {
      // If acount doesn't exist, create a new account
      this.register()
      checkFlag = true
    }
    return checkFlag
  }

  updateDatabase(){
    /**
     * @modify-params this.result
     */
    let account = this.result.account

    this.store[account].password = null /* TODO */
    this.store[account].salt = null /* TODO */
  }

  query(account){
    return Object.keys(this.store).indexOf(account) < 0 ? null : this.store[account]
  }

  register(){
    let account = this.data.account
    let password = hmac(this.serverSalt, this.data.password, {alg:'md5', repeat: 1})
    let salt = this.data.newSalt

    // Create new acount
    this.store[account] = {
      account,
      password,
      salt
    } 
  }

}

module.exports = Backend;









// ----------------------Answer-----------------------











/**
 * checkDatabase(){
 *  ...
 *    checkFlag = res.password === hmac(this.serverSalt, this.data.password, {alg:'md5', repeat: 1})
 *  ...
 * }
 */


/**
 * updateDatabase(){
 *  ...
 *    this.store[account].password = this.result.password
 *    this.store[account].salt = this.data.newSalt
 *  ...
 * }
 */


/**
 * fastHash(){
 *  this.result.account = this.data.account
 *  this.result.password = hmac(this.serverSalt, this.data.newPassword, {alg:'md5', repeat: 1})
 *}
 */