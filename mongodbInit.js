const { connect } = require('mongoose')

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env

/**
 *
 * @param {string} dbName name of database collections group
 * @returns {Promise}
 */
module.exports = dbName =>
  connect(
    `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.jdepz.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
