const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Schema, model } = require('mongoose')
const isEmail = require('email-validator').validate

const { JWT_PASSWORD } = process.env

const UserSchema = new Schema(
  {
    /**
     * simple validation
     */
    name: { type: String, required: true, min: 4, max: 30 },

    /**
     * custom validation
     */
    email: {
      type: String,
      required: [true, 'No email provided'],
      validate: {
        validator: isEmail,
        message: props => `Received invalid email ${props.value}`
      }
    },

    /**
     * error messages
     */
    password: {
      type: String,
      required: [true, 'No password provided'],
      min: [9, 'Password must be at least 9'],
      max: 20
    },

    /**
     * No validation
     */
    role: {
      type: String,
      validate: {
        validator: v => ['doctor', 'nurse', 'patient', 'administrative'].includes(v),
        message: props => `unexpecte role type: ${props.value}`
      }
    }
  },
  { versionKey: false }
)

module.exports = model('User', UserSchema)

module.exports.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(8)
  return bcrypt.hash(password, salt)
}

module.exports.generateToken = user => jwt.sign(JSON.stringify(user), JWT_PASSWORD)
