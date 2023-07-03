const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword, cpf } = req.body;

        // Validations

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        }
        if (!email) {
            res.status(422).json({ message: "O email é obrigatório!" });
            return;
        }
        if (!phone) {
            res.status(422).json({ message: "O telefone é obrigatório!" });
            return;
        }
        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória!" });
            return;
        }
        if (!confirmpassword) {
            res.status(422).json({ message: "A confirmação da senha é obrigatória!" });
            return;
        }
        if (!cpf) {
            res.status(422).json({ message: "O cpf é obrigatório!" });
            return;
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: "As duas senhas precisam ser iguais!" });
            return;
        }

        // Check if user exists

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            res.status(422).json({ message: "Email já cadastrado!" });
            return;
        }

        // Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a user

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
            cpf,
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

        // Check if user exists

        const user = await User.findOne({ email: email });

        if (!user) {
            res
                .status(422)
                .json({ message: "Não há usuário cadastrado com esse email!" });
            return;
        }

        // Check if password matches db password

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(422).json({ message: "Senha inválida!" });
            return;
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
        const { id } = req.params;

        try {
            const user = await User.findById(id).select("-password");
            res.status(200).send(user);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuário por ID" });
        }
    }

    static async editUser(req, res) {
        const { id } = req.params;
        const { name, email, phone, cpf } = req.body;

        let image;

        if (req.file) {
            image = req.file.filename
        }

        try {
            const user = await User.findByIdAndUpdate(
                id,
                { name, email, phone, cpf },
                { new: true }
            );

            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao editar usuário" });
        }
    }
}

module.exports = UserController;
