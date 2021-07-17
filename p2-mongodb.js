const mongoose = require('mongoose')
require('dotenv').config()

const { MONGO_USR, MONGO_PW, MONGO_DBNAME } = process.env

// construir una uri con los datos de mongo db
const uri = `mongodb+srv://${MONGO_USR}:${MONGO_PW}@cluster0.jdepz.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`

// diseñar un schema (interfaz)
const schema = new mongoose.Schema({ name: 'string', size: 'string' })
const Tank = mongoose.model('Tank', schema)

async function main() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('db ready')

    await Tank.create({ size: 'medium' })
    console.log('doc created')

    await Tank.insertMany([{ size: 'extra-small' }, { size: 'large' }])
    console.log('docs created')

    const tanks = await Tank.find()
    console.log(tanks)
  } catch (err) {
    console.error(err)
  }
}

main()
