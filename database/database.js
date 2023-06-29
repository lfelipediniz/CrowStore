import mongoose from "mongoose";

mongoose.set("strictQuery", true)

const dbname = "mongoapp"
const url = `mongodb+srv://crowstore:${process.env.DB_PWD}@crowbd.wdtfqcd.mongodb.net/${dbname}?retryWrites=true&w=majority`

const connect = async () => {
    return await mongoose.connect(url)
}

const disconnect = async () => {
    return await mongoose.disconnect()
}

const database = {
    connect,
    disconnect
}

export default database