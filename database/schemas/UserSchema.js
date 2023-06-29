import { Schema, model, models } from "mongoose";

const UserSchema = Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    active: {type: Boolean, default: true}
})

const User = models.User || model("User", UserSchema)

export default User