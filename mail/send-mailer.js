const mailerSend = require('./mailer.js');
const { generateSalt } = require('../tools/crypto-hash-tool.js')
const opt = require('./mailer-configure.js')
const fs = require('fs')
const chalk = require('chalk');

(async function(){
  try{

    let template = fs.readFileSync("./mail/general.template.html").toString()
    template = template.replace("${captcha}", '' + generateSalt(4))

    let mail = {
      from: `${opt.myEmailTitle} ^_^<${opt.auth.user}>`,
      to: opt.targetEmail,
      subject: `账户安全中心-邮箱验证`,
      html: template
    };

    let mailID = await mailerSend(mail).catch(err => {
      throw err
    });

    console.log(chalk.green(`${mailID} was sent to <${opt.targetEmail}>.`))

  } catch(error){
    console.error(error)
  }
})();