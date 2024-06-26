const jwt = require("jsonwebtoken")

const createUserToken = async (user, req, res) => {

    // create token
    const token = jwt.sign({
        name: user.name,
        id: user._id,
        admin: user.admin // adiciona a propriedade "admin" ao token
      }, "nossosecret");
    // return token
    res.status(200).json({
        message: "Autenticado com sucesso!",
        token: token,
        userId: user._id,
        admin: user.admin // adiciona a propriedade "admin" ao token
    })


}

module.exports = createUserToken 
