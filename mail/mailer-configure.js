const options = { // @See https://www.npmjs.com/package/nodemailer
  // pool: true,
  host: "smtpdm.aliyun.com", // like: "smtpdm.aliyun.com"
  port: 80,
  secure: false, // true for 465(SSL), false for other ports
  auth: {
    user: 'your-smtp-account', // like: "user@example.com"
    pass: 'your-smtp-password' // like: "password"
  },
  targetEmail: 'example@example.com', // which email you wanna send to, like: 'aaa@example.com' 
  myEmailTitle: 'Hello' // Email title
}

module.exports = options