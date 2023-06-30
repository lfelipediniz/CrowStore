const mongoose = require("mongoose")

async function main(){

    await mongoose.connect('mongodb://localhost:27017/crowstore')
    console.log("Conectou ao Moogoose!")
}

main().catch((err) => console.log(err))

module.exports = mongoose
