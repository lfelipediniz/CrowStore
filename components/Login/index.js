import React, { useState, useEffect, useContext } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import {
    LoginWrap,
    UserContainer,
    LoginContainer,
    LoginTitle,
    LoginBtnContainer,
    FloatingStack,
} from "../Login/LoginElements";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { colors } from "../../styles/colors";
import Alert from "@mui/material/Alert";

// contexts

import { Context } from "../../context/UserContext";

const Login = () => {
    const [isSingup, setIsSingup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [pass, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setphone] = useState("");
    const [email, setEmail] = useState("");
    const [name, setname] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [isSinguping, setIsSinguping] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isCPFFocused, setIsCPFFocused] = useState(false);
    const [isCPFInvalid, setIsCPFInvalid] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isConfirmpassFocused, setIsConfirmpassFocused] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCPFChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
        const formattedValue = formatCPF(rawValue); // Formata o CPF

        // Verifica se o CPF possui 11 dígitos
        if (formattedValue.length < 14) {
            setIsCPFInvalid(true);
        } else {
            setIsCPFInvalid(false);
        }

        setCpf(formattedValue);
    };

    const handlephoneChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
        const formattedValue = formatPhoneNumber(rawValue); // Formata o número de phone

        // Verifica se o número de phone possui pelo menos 11 dígitos
        if (formattedValue.length >= 15) {
            setIsPhoneInvalid(false);
        } else {
            setIsPhoneInvalid(true);
        }

        setphone(formattedValue);
    };
    const handleEmailChange = (event) => {
        const emailValue = event.target.value;

        // Verifica se o email é válido usando uma expressão regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(emailValue);

        setIsEmailInvalid(!isValidEmail);
        setEmail(emailValue);
    };

    const handlenameChange = (event) => {
        setname(event.target.value);
    };

    const handleConfirmpassChange = (event) => {
        setConfirmpass(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleFormlogin = (event) => {
        event.preventDefault();
        if (!email) return;

        const user = {
            email,
            password: pass,
        };

        fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    // O cadastro foi realizado com sucesso
                    console.log("Login realizado com sucesso");
                    return response.json(); // Converte a resposta para JSON
                } else {
                    throw new Error("Erro ao logar");
                }
            })
            .then((data) => {
                // Exibe as informações retornadas no console
                console.log("Mensagem:", data.message);
                console.log("Token:", data.token);
                console.log("ID do usuário:", data.userId);

                // Salvar o token no localStorage
                localStorage.setItem("token", data.token);

                setIsLogin(true);

                setTimeout(() => {
                    window.location.reload(); // Recarrega a página após 2 segundos
                }, 1000);
            })
            .catch((error) => {
                console.error("Erro:", error);
            });
    };

    const handleFormSignUp = (event) => {
        if (
            pass !== confirmpass ||
            isCPFInvalid ||
            isEmailInvalid ||
            isPhoneInvalid ||
            !cpf ||
            !pass ||
            !confirmpass ||
            !email ||
            !name ||
            !phone
        ) {
            // Alguma informação está faltando ou inválida, não envie o formulário
            return;
        }
        event.preventDefault();

        const user = {
            name,
            email,
            cpf,
            phone,
            password: pass,
            confirmpassword: confirmpass,
        };

        fetch("http://localhost:5000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    // O cadastro foi realizado com sucesso
                    console.log("Cadastro realizado com sucesso");
                    return response.json(); // Converte a resposta para JSON
                } else {
                    throw new Error("Erro ao cadastrar");
                }
            })
            .then((data) => {
                // Exibe as informações retornadas no console
                console.log("Mensagem:", data.message);
                console.log("Token:", data.token);
                console.log("ID do usuário:", data.userId);
                // Salvar o token no localStorage
                localStorage.setItem("token", data.token);
                setIsSingup(true);

                setTimeout(() => {
                    window.location.reload(); // Recarrega a página após 2 segundos
                }, 1000);
            })
            .catch((error) => {
                console.error("Erro:", error);
            });
    };

    const handleChange = (event) => {
        // setUser({...userSingUP, [event.target.name]: event.target.value})
    };

    const formatCPF = (value) => {
        // Implemente a lógica de formatação do CPF aqui, por exemplo:
        const cpfRegex = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/;
        const match = value.match(cpfRegex);

        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }

        return value; 
    };

    const formatPhoneNumber = (value) => {
        const phoneRegex = /^(\d{0,2})(\d{0,5})(\d{0,4})$/;
        const match = value.match(phoneRegex);

        if (match) {
            if (match[1] && match[2] && match[3]) {
                return `(${match[1]}) ${match[2]}-${match[3]}`;
            } else if (match[1] && match[2]) {
                return `(${match[1]}) ${match[2]}`;
            } else if (match[1]) {
                return `(${match[1]}`;
            }
        }

        return value;
    };

    return (
        <>
            <FloatingStack>
                {isPhoneInvalid && isPhoneFocused && (
                    <Alert severity="error">O celular brasileiro tem 11 digitos!</Alert>
                )}

                {isEmailInvalid && isEmailFocused && (
                    <Alert severity="error">O email digitado não é válido.</Alert>
                )}

                {isCPFInvalid && isCPFFocused && (
                    <Alert severity="error">O CPF digitado não é válido.</Alert>
                )}

                {pass !== confirmpass && isConfirmpassFocused && (
                    <Alert severity="error">As passs não são iguais!</Alert>
                )}

                {isSingup && <Alert severity="success">Usuário Cadastrado!</Alert>}

                {isLogin && <Alert severity="success">Usuário Logado!</Alert>}
            </FloatingStack>

            <LoginWrap>
                <UserContainer>
                    <WrapContent>
                        <LoginContainer
                            style={isSinguping ? { height: "650px", marginTop: 50 } : {}}
                        >
                            <div>
                                {isSinguping ? (
                                    <LoginTitle style={{ marginTop: 50 }}>Bem vindo!</LoginTitle>
                                ) : (
                                    <LoginTitle>Login</LoginTitle>
                                )}
                                {isSinguping ? (
                                    <div>
                                        <form onSubmit={handleFormSignUp}>
                                            <TextField
                                                label="Nome"
                                                required
                                                fullWidth
                                                value={name}
                                                onChange={(event) => {
                                                    handlenameChange(event);
                                                    handleChange(event);
                                                }}
                                                variant="standard"
                                                size="small"
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-name",
                                                }}
                                            />{" "}
                                            <br /> <br />
                                            <TextField
                                                label="Email"
                                                required
                                                error={isEmailInvalid}
                                                value={email}
                                                onChange={(event) => {
                                                    handleEmailChange(event);
                                                    handleChange(event);
                                                }}
                                                onFocus={() => setIsEmailFocused(true)}
                                                onBlur={() => setIsEmailFocused(false)}
                                                variant="standard"
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-email",
                                                }}
                                            />{" "}
                                            <br /> <br />
                                            <TextField
                                                label="CPF"
                                                required
                                                error={isCPFInvalid}
                                                value={cpf}
                                                fullWidth
                                                onChange={(event) => {
                                                    handleCPFChange(event);
                                                    handleChange(event);
                                                }}
                                                onFocus={() => setIsCPFFocused(true)}
                                                onBlur={() => setIsCPFFocused(false)}
                                                variant="standard"
                                                size="small"
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-cpf",
                                                    inputProps: {
                                                        maxLength: 14,
                                                    },
                                                }}
                                            />{" "}
                                            <br /> <br />
                                            <TextField
                                                label="Celular"
                                                required
                                                error={isPhoneInvalid}
                                                value={phone}
                                                fullWidth
                                                onChange={(event) => {
                                                    handlephoneChange(event);
                                                    handleChange(event);
                                                }}
                                                onFocus={() => setIsPhoneFocused(true)}
                                                onBlur={() => setIsPhoneFocused(false)}
                                                variant="standard"
                                                size="small"
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-phone",
                                                    inputProps: { maxLength: 15 }, // Define o máximo de caracteres como 11
                                                }}
                                            />
                                            <br /> <br />
                                            <TextField
                                                label="Senha"
                                                required
                                                type={showPassword ? "text" : "password"}
                                                value={pass}
                                                onChange={(event) => {
                                                    handlePasswordChange(event);
                                                    handleChange(event);
                                                }}
                                                variant="standard"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <Button
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {!showPassword ? (
                                                                <FaEyeSlash style={{ color: colors.primary }} />
                                                            ) : (
                                                                <FaEye style={{ color: colors.primary }} />
                                                            )}
                                                        </Button>
                                                    ),
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-password",
                                                }}
                                            />
                                            <br />
                                            <br />
                                            <TextField
                                                label="Confirmar senha"
                                                required
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmpass}
                                                onChange={(event) => {
                                                    handleConfirmpassChange(event);
                                                    handleChange(event);
                                                }}
                                                onFocus={() => setIsConfirmpassFocused(true)}
                                                onBlur={() => setIsConfirmpassFocused(false)}
                                                variant="standard"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <Button onClick={handleClickShowConfirmPassword}>
                                                            {!showConfirmPassword ? (
                                                                <FaEyeSlash style={{ color: colors.primary }} />
                                                            ) : (
                                                                <FaEye style={{ color: colors.primary }} />
                                                            )}
                                                        </Button>
                                                    ),
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-password",
                                                }}
                                            />
                                            <br />
                                            <br />
                                            <br />
                                            <center>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: colors.ctaBlack,
                                                        color: "black",
                                                    }}
                                                    disabled={
                                                        isEmailInvalid ||
                                                        isCPFInvalid ||
                                                        isPhoneInvalid ||
                                                        pass !== confirmpass
                                                    }
                                                >
                                                    Cadastrar
                                                </Button>
                                            </center>
                                            <br />
                                        </form>
                                    </div>
                                ) : (
                                    <div>
                                        <form onSubmit={handleFormlogin}>
                                            <br />
                                            <br />
                                            <TextField
                                                label="Email do usuário"
                                                variant="standard"
                                                fullWidth
                                                required
                                                value={email}
                                                onChange={handleEmailChange}
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-email",
                                                }}
                                            />
                                            <br />
                                            <br />

                                            <TextField
                                                label="Senha"
                                                variant="standard"
                                                fullWidth
                                                required
                                                type={showPassword ? "text" : "password"}
                                                value={pass}
                                                onChange={handlePasswordChange}
                                                InputLabelProps={{ style: { color: colors.primary } }}
                                                InputProps={{
                                                    style: { color: colors.primary },
                                                    autoComplete: "new-email",
                                                    endAdornment: (
                                                        <Button
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {!showPassword ? (
                                                                <FaEyeSlash style={{ color: colors.primary }} />
                                                            ) : (
                                                                <FaEye style={{ color: colors.primary }} />
                                                            )}
                                                        </Button>
                                                    ),
                                                }}
                                            />

                                            <br />
                                            <br />
                                            <br />
                                            <LoginBtnContainer>
                                                <Button type="" style={{ color: colors.lightGray }}>
                                                    Esqueci a senha
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: colors.ctaBlack,
                                                        color: "black",
                                                    }}
                                                >
                                                    Entrar
                                                </Button>
                                            </LoginBtnContainer>
                                        </form>
                                        <br />
                                    </div>
                                )}
                            </div>

                            {!isSinguping ? (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <hr
                                            style={{
                                                flex: "1",
                                                backgroundColor: colors.white,
                                                height: 1,
                                            }}
                                        />
                                        <span style={{ color: colors.white, margin: "0 10px" }}>
                                            ou
                                        </span>
                                        <hr
                                            style={{
                                                flex: "1",
                                                backgroundColor: colors.white,
                                                height: 1,
                                            }}
                                        />
                                    </div>

                                    {!isSinguping && (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: 15,
                                            }}
                                        >
                                            <Button
                                                onClick={() => setIsSinguping(true)}
                                                variant="outlined"
                                                color="primary"
                                                style={{
                                                    color: colors.primary,
                                                    borderColor: colors.ctaBlack,
                                                }}
                                            >
                                                Cadastre-se
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <hr
                                            style={{
                                                flex: "1",
                                                backgroundColor: colors.white,
                                                height: 1,
                                            }}
                                        />
                                        <span style={{ color: colors.white, margin: "0 10px" }}>
                                            ou
                                        </span>
                                        <hr
                                            style={{
                                                flex: "1",
                                                backgroundColor: colors.white,
                                                height: 1,
                                            }}
                                        />
                                    </div>

                                    <p
                                        style={{
                                            marginTop: 10,
                                            textAlign: "center",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <a
                                            onClick={() => setIsSinguping(false)}
                                            style={{ color: colors.primary }}
                                        >
                                            Já tem uma conta? Faça login aqui!
                                        </a>
                                    </p>
                                </>
                            )}
                        </LoginContainer>
                    </WrapContent>
                </UserContainer>
            </LoginWrap>
        </>
    );
};

export default Login;
