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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCPFChange = (event) => {
    setCpf(event.target.value);
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
    setEmail(event.target.value);
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

  const handlePhoneBlur = () => {
    setIsPhoneFocused(false);
    if (telefone.length < 11) {
      setIsPhoneInvalid(true);
    } else {
      setIsPhoneInvalid(false);
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

  return (
    <>
      <FloatingStack>
        {isPhoneInvalid && !isPhoneFocused && (
          <Alert severity="error">
            O número de telefone deve ter pelo menos 11 dígitos.
          </Alert>
        )}
      </FloatingStack>

      <LoginWrap>
        <UserContainer>
          <WrapContent>
            <LoginContainer style={isCadastrando ? { height: "650px", marginTop: 50 } : {}}>
              {!isCadastrando && <LoginTitle>Login</LoginTitle>}

              <form
                style={isCadastrando ? { marginTop: 10 } : { marginTop: "25%" }}
              >
                <>
                  <TextField
                    label="Email"
                    type="text"
                    value={userN}
                    onChange={handleUsernameChange}
                    variant="standard"
                    fullWidth
                    margin="normal"
                  />
                </>

                <TextField
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={handlePasswordChange}
                  variant="standard"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                      variant="standard"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                      margin="normal"
                    />

                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      variant="standard"
                      fullWidth
                      margin="normal"
                    />

                    <TextField
                      label="CPF"
                      type="text"
                      value={cpf}
                      onChange={handleCPFChange}
                      variant="standard"
                      fullWidth
                      margin="normal"
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
                      margin="normal"
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
                  <Button
                    onClick={isCadastrando ? handleFormsignup : handleFormlogin}
                    variant="contained"
                    color="primary"
                  >
                    {isCadastrando ? "Cadastrar" : "Entrar"}
                  </Button>
                  {!isCadastrando && (
                    <Button
                      onClick={() => setIsCadastrando(true)}
                      variant="outlined"
                      color="primary"
                    >
                      Cadastre-se
                    </Button>
                  )}
                </LoginBtnContainer>
              </form>
            </LoginContainer>
          </WrapContent>
        </UserContainer>
      </LoginWrap>
    </>
  );
};

export default Login;
