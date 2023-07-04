const mongoose = require('mongoose')

mongoose.set("strictQuery", true)
async function main() {
  await mongoose.connect('mongodb+srv://crowstore:P8NcKDXy@crowbd.wdtfqcd.mongodb.net/')
  console.log("Conectou ao Mongoose")
}

main().catch((err) => console.log(err))

module.exports = mongoose
