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
        async validator(email) {
          return isEmail(email) && !(await User.findOne({ email }))
        },
        message: props => `Received invalid or existing email ${props.value}`
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
        validator: v => ['doctor', 'nurse', 'patient', 'administrative', 'dev'].includes(v),
        message: props => `unexpecte role type: ${props.value}`
      }
    }
  },
  { versionKey: false }
)

UserSchema.method('encrypt', async function () {
  const salt = await bcrypt.genSalt(8)
  this.password = bcrypt.hash(this.password, salt)
})

UserSchema.method('sign', function () {
  return jwt.sign(JSON.stringify(this), JWT_PASSWORD)
})

UserSchema.method('verifyPassword', async function (pw) {
  return pw === this.password || (await bcrypt.compare(pw, this.password))
})

UserSchema.pre('save', async function (next) {
  try {
    await this.validate()
    await this.encrypt()
    //
  } catch (e) {
    next(e)
  }
})

const User = model('User', UserSchema) // important, User is used at email verification
module.exports = User // important
