import React, { useState, useEffect } from "react";
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

const Login = () => {
  const [userN, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [isCadastrando, setIsCadastrando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isCPFFocused, setIsCPFFocused] = useState(false);
  const [isCPFInvalid, setIsCPFInvalid] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isConfirmSenhaFocused, setIsConfirmSenhaFocused] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

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

  const handleTelefoneChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const formattedValue = formatPhoneNumber(rawValue); // Formata o número de telefone

    // Verifica se o número de telefone possui pelo menos 11 dígitos
    if (formattedValue.length >= 15) {
      setIsPhoneInvalid(false);
    } else {
      setIsPhoneInvalid(true);
    }

    setTelefone(formattedValue);
  };
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;

    // Verifica se o email é válido usando uma expressão regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(emailValue);

    setIsEmailInvalid(!isValidEmail);
    setEmail(emailValue);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleConfirmSenhaChange = (event) => {
    setConfirmSenha(event.target.value);
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
    // Lógica para fazer login
  };

  const handleFormsignup = (event) => {
    if (
      senha !== confirmSenha ||
      isCPFInvalid ||
      isEmailInvalid ||
      isPhoneInvalid ||
      !cpf ||
      !senha ||
      !confirmSenha ||
      !email ||
      !nome ||
      !telefone
    ) {
      // Alguma informação está faltando ou inválida, não envie o formulário
      return;
    }

    // Resto do código para cadastrar o usuário

    // Exemplo de alerta
    alert("Usuário cadastrado com sucesso");

    // Reiniciar o estado do formulário
    setCpf("");
    setTelefone("");
    setEmail("");
    setNome("");
    setConfirmSenha("");
    setIsCadastrando(false);
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

  const handleEmailFocus = (value) => {
    console.log("ai calica");
  };

  const handlePhoneFocus = () => {
    setIsPhoneFocused(true);
  };

  const handlePhoneBlur = () => {
    setIsPhoneFocused(false);
    if (telefone.length <= 11) {
      setIsPhoneInvalid(true);
    } else {
      setIsPhoneInvalid(false);
    }
  };
  return (
    <>
      <FloatingStack>
        {isPhoneInvalid && isPhoneFocused && (
          <Alert severity="error">
            O telefone celular brasileiro tem 11 digitos!
          </Alert>
        )}

        {isEmailInvalid && isEmailFocused && (
          <Alert severity="error">O email digitado não é válido.</Alert>
        )}

        {isCPFInvalid && isCPFFocused && (
          <Alert severity="error">O CPF digitado não é válido.</Alert>
        )}

        {senha !== confirmSenha && isConfirmSenhaFocused && (
          <Alert severity="error">As senhas não são iguais!</Alert>
        )}
      </FloatingStack>

      <LoginWrap>
        <UserContainer>
          <WrapContent>
            <LoginContainer
              style={isCadastrando ? { height: "650px", marginTop: 50 } : {}}
            >
              <div>
                {isCadastrando ? (
                  <LoginTitle>Bem vindo!</LoginTitle>
                ) : (
                  <LoginTitle>Login</LoginTitle>
                )}
                {isCadastrando ? (
                  <div>
                    <form onSubmit={handleFormsignup}>
                      <TextField
                        label="Nome"
                        required
                        fullWidth
                        value={nome}
                        onChange={handleNomeChange}
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
                        onChange={handleEmailChange}
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
                        onChange={handleCPFChange}
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
                        label="Telefone"
                        required
                        error={isPhoneInvalid}
                        value={telefone}
                        fullWidth
                        onChange={handleTelefoneChange}
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
                        value={senha}
                        onChange={handlePasswordChange}
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
                        label="Confirmar Senha"
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmSenha}
                        onChange={handleConfirmSenhaChange}
                        onFocus={() => setIsConfirmSenhaFocused(true)}
                        onBlur={() => setIsConfirmSenhaFocused(false)}
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
                        value={userN}
                        onChange={handleUsernameChange}
                        InputLabelProps={{ style: { color: colors.primary } }}
                        InputProps={{
                          style: { color: colors.primary },
                          autoComplete: "new-phone",
                        }}
                      />
                      <br />
                      <br />
                      <TextField
                        label="Senha"
                        variant="standard"
                        required
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        value={senha}
                        onChange={handlePasswordChange}
                        InputLabelProps={{ style: { color: colors.primary } }}
                        InputProps={{
                          style: { color: colors.primary },
                          autoComplete: "new-phone",
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
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
                        <Button
                          type="submit"
                          style={{ color: colors.lightGray }}
                        >
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

              {!isCadastrando ? (
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
                        backgroundColor: colors.textBlack,
                        height: 1,
                      }}
                    />
                    <span style={{ color: colors.textBlack, margin: "0 10px" }}>
                      ou
                    </span>
                    <hr
                      style={{
                        flex: "1",
                        backgroundColor: colors.textBlack,
                        height: 1,
                      }}
                    />
                  </div>

                  {!isCadastrando && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 15,
                      }}
                    >
                      <Button
                        onClick={() => setIsCadastrando(true)}
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
                        backgroundColor: colors.textBlack,
                        height: 1,
                      }}
                    />
                    <span style={{ color: colors.textBlack, margin: "0 10px" }}>
                      ou
                    </span>
                    <hr
                      style={{
                        flex: "1",
                        backgroundColor: colors.textBlack,
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
                      onClick={() => setIsCadastrando(false)}
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
