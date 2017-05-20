module.exports = {
  title: 'Hulk Mailer Demo Service',
  email_providers: [
    {
      name: "ironman",
      provider: "mailgun",
      apiKey: "key-imagined",
      domain: "sandboxed.domain.mailgun.org"
    },
    {
      name: "thor",
      provider: "mandrill",
      apiKey: "sandboxedkey"
    },
    {
      name: "hawkeye",
      provider: "sendgrid",
      username: "sandboxed",
      password: "sandboxedkey"
    },
    {
      name: "captainamerica",
      provider: "ses",
      accessKeyId: "sandboxedkey",
      secretAccessKey: "sandboxedAccesskey",
      region: "us-east-1"
    }
  ]
}
