const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O phone é obrigatório!" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A password é obrigatória!" });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmpassword é obrigatória!" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: "As senhas precisam ser iguais!" });
      return;
    }

    // check if user exists

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Email já cadastrado!" });
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "Email é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    // check if user exists

    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(422)
        .json({ message: "Não há usuário cadastrado com esse email!" });
      return;
    }

    // check if password match db password

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida!" });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    // to get the user without the password
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;

    // check if user exists

    const token = getToken(req);

    // when I'm using await it stops working, this needs to be analyzed
    const user = getUserByToken(token); 

    const { name, email, phone, password, confirmpassword } = req.body;

    let image = ``;

    //validations

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    //check if email has already taken
    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Email já cadastrado!" });
      return;
    }

    user.email = email;

    if (!phone) {
      res.status(422).json({ message: "O phone é obrigatório!" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A password é obrigatória!" });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmpassword é obrigatória!" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: "As senhas precisam ser iguais!" });
      return;
    }
  }
};
