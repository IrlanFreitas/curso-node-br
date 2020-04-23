const Bcrypt = require('bcrypt')
const { promisify } = require('util')

const hashAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)

const SALT = 3

class PasswordHelper {

    static hash(password) {
        return hashAsync(password, SALT)
    }

    static compare(password, hash) {
        return compareAsync(password, hash)
    }

}

module.exports = PasswordHelper