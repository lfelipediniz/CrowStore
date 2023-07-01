import React, { useState } from "react";
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
  const [isConfirmSenhaFocused, setIsconfirmSenhaFocused] = useState(false);

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
    if (formattedValue.length < 11) {
      setIsCPFInvalid(true);
    } else {
      setIsCPFInvalid(false);
    }

    setCpf(formattedValue);
  };

  const handleTelefoneChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const formattedValue = formatPhoneNumber(rawValue); // Formata o número de telefone

    // Verifica se o número de telefone possui menos de 11 dígitos
    if (formattedValue.length < 11) {
      setIsPhoneInvalid(true);
    } else {
      setIsPhoneInvalid(false);
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
    event.preventDefault();

    if (isCadastrando) {
      // Lógica para cadastrar o usuário

      // Exemplo de alerta
      alert("Usuário cadastrado com sucesso");

      // Reiniciar o estado do formulário
      setCpf("");
      setTelefone("");
      setEmail("");
      setNome("");
      setConfirmSenha("");
      setIsCadastrando(false);
    } else {
      // Alternar para o modo de cadastro
      setIsCadastrando(true);
    }
  };

  const handlePhoneFocus = () => {
    setIsPhoneFocused(true);
  };

  const handleCPFFocus = () => {
    setIsCPFFocused(true);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleConfirmSenhaFocus = () => {
    setIsconfirmSenhaFocused(true);
  };

  const handleConfirmSenhaBlur = () => {
    setIsconfirmSenhaFocused(false);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePhoneBlur = () => {
    setIsPhoneFocused(false);
    if (telefone.length < 11) {
      setIsPhoneInvalid(true);
    } else {
      setIsPhoneInvalid(false);
    }
  };

  const handleCPFBlur = () => {
    setIsCPFFocused(false);
    if (telefone.length < 11) {
      setIsCPFInvalid(true);
    } else {
      setIsCPFInvalid(false);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Verifica se o número possui mais de 10 dígitos e formata como (XX)XXXXX-XXXX
    if (cleaned.length > 10) {
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match) {
        return `(${match[1]})${match[2]}-${match[3]}`;
      }
    }

    // Retorna o número sem formatação caso não atenda aos critérios acima
    return cleaned;
  };

  const formatCPF = (cpfNumber) => {
    const cleaned = cpfNumber.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Formata o CPF como XXX.XXX.XXX-XX
    if (cleaned.length === 11) {
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
      }
    }

    // Retorna o CPF sem formatação caso não tenha 11 dígitos
    return cleaned;
  };

  const handleLoginLinkClick = (event) => {
    event.preventDefault();
    setIsCadastrando(false);
  };

  return (
    <>
      <FloatingStack>
        {isPhoneInvalid && isPhoneFocused && (
          <Alert severity="error">
            O número de telefone deve ter pelo menos 11 dígitos.
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
              {isCadastrando ? (
                <LoginTitle>Bem vindo!</LoginTitle>
              ) : (
                <LoginTitle style={{ fontSize: 40 }}>Login</LoginTitle>
              )}

              <form
                style={isCadastrando ? { marginTop: 10 } : { marginTop: "25%" }}
              >
                <>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                    variant="standard"
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{ style: { color: colors.primary } }}
                    InputProps={{
                      style: { color: colors.primary },
                      autoComplete: "new-email",
                    }}
                    error={isEmailInvalid}
                  />
                </>

                <TextField
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={handlePasswordChange}
                  variant="standard"
                  fullWidth
                  size="small"
                  margin="normal"
                  InputLabelProps={{ style: { color: colors.primary } }}
                  InputProps={{
                    style: { color: colors.primary },
                    autoComplete: "off",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {!showPassword ? (
                            <FaEyeSlash style={{ color: colors.primary }} />
                          ) : (
                            <FaEye style={{ color: colors.primary }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {isCadastrando && (
                  <>
                    <TextField
                      label="Confirmar Senha"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmSenha}
                      onChange={handleConfirmSenhaChange}
                      onFocus={handleConfirmSenhaFocus}
                      onBlur={handleConfirmSenhaBlur}
                      variant="standard"
                      error={senha !== confirmSenha}
                      fullWidth
                      size="small"
                      margin="normal"
                      InputLabelProps={{ style: { color: colors.primary } }}
                      InputProps={{
                        style: { color: colors.primary },
                        autoComplete: "off",
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {!showConfirmPassword ? (
                                <FaEyeSlash style={{ color: colors.primary }} />
                              ) : (
                                <FaEye style={{ color: colors.primary }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Nome"
                      type="text"
                      value={nome}
                      onChange={handleNomeChange}
                      variant="standard"
                      fullWidth
                      size="small"
                      margin="normal"
                      InputLabelProps={{ style: { color: colors.primary } }}
                      InputProps={{
                        style: { color: colors.primary },
                        autoComplete: "new-name",
                      }}
                    />

                    <TextField
                      label="CPF"
                      type="text"
                      value={cpf}
                      onChange={handleCPFChange}
                      onFocus={handleCPFFocus}
                      onBlur={handleCPFBlur}
                      variant="standard"
                      error={isCPFInvalid}
                      fullWidth
                      size="small"
                      margin="normal"
                      InputLabelProps={{ style: { color: colors.primary } }}
                      InputProps={{
                        style: { color: colors.primary },
                        autoComplete: "new-cpf",
                      }}
                    />

                    <TextField
                      label="Telefone"
                      type="tel"
                      value={telefone}
                      onChange={handleTelefoneChange}
                      onFocus={handlePhoneFocus}
                      onBlur={handlePhoneBlur}
                      error={isPhoneInvalid}
                      variant="standard"
                      fullWidth
                      size="small"
                      margin="normal"
                      InputLabelProps={{ style: { color: colors.primary } }}
                      InputProps={{
                        style: { color: colors.primary },
                        autoComplete: "new-phone",
                      }}
                    />
                  </>
                )}

                <LoginBtnContainer
                  style={
                    isCadastrando
                      ? { justifyContent: "center" }
                      : { justifyContent: "space-between" }
                  }
                >
                  {!isCadastrando && (
                    <p
                      style={{
                        marginTop: 10,
                        textAlign: "center",
                        fontSize: 15,
                      }}
                    >
                      <a
                        href="mailto:contato@meusite.com"
                        style={{ color: colors.primary }}
                      >
                        Esqueci minha senha
                      </a>
                    </p>
                  )}

                  <Button
                    onClick={isCadastrando ? handleFormsignup : handleFormlogin}
                    variant="contained"
                    color="primary"
                  >
                    {isCadastrando ? "Cadastrar" : "Entrar"}
                  </Button>
                </LoginBtnContainer>
              </form>

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
                        style={{ color: colors.primary }}
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

                  <p style={{ marginTop: 10, textAlign: "center" }}>
                    <a
                      href="/"
                      onClick={handleLoginLinkClick}
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
