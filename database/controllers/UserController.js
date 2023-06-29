import User from "../schemas/UserSchema"
import database from "../database"

//crud
//CREAT

const saveUser = async (queryUser) => {

    if(!database.connect()) return false
    const newUser = new User(queryUser)
    return await newUser.save()

    database.disconnect()
}
//READ
//UPDATE
//ACTIVATE
//DESACTIVATE

const UserController = {
    saveUser
}

export default UserController