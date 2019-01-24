const { readdirSync, readFileSync } = require('fs')
const { join } = require('path')

const SECRETS_DIR = '/run/secrets'

if (!global.secrets && fs.existsSync(SECRETS_DIR)) {
  global.secrets = {}
  readdirSync(SECRETS_DIR).forEach(file => {
    global.secrets[file] = readFileSync(join(SECRETS_DIR, file), 'utf8').toString().trim()
  })
}

module.exports = {
  secret (key, def) {
    return process.env.NODE_ENV === 'production' ? (global.secrets || {})[key.toLowerCase()] : (process.env[key] || def)
  }
}
