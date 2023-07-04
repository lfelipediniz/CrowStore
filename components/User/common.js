import React, { useState, useEffect } from "react";
import ProductCard from "../ReusedComponents/ProductCard";
import Products from "../../fakedata/adminContent/products.json";
import SearchBar from "../SearchBar";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import { colors } from "../../styles/colors";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Image from "next/image";
import Cart from "../Cart";
import { MdPerson, MdShoppingCart } from "react-icons/md";

import jwt from "jsonwebtoken";
import axios from "axios";

function CommonUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("perfil", "pedidos"); // Adicionado estado para controlar a guia ativa

  const [userN, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
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

  const [userData, setUserData] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = response.data;
      setUserData(userData);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.id) {
        fetchUserData(decodedToken.id);
      }
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados enviados:", {
      name,
      email,
      avatar,
      address,
      phone,
      cpf,
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogout = () => {
    // Limpar o token do localStorage
    localStorage.removeItem("token");
    window.location.reload(); // Recarrega a página
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

  const [cartData, setCartData] = useState({
    Products: [],
    Quantities: [],
    TotalPrice: 0,
  });

  const handleCartUpdate = (products, quantities, totalPrice) => {
    setCartData({
      ...cartData,
      Products: products,
      Quantities: quantities,
      TotalPrice: totalPrice,
    });
  };

  return (
    <div style={{ backgroundColor: colors.primary }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "100px",
          }}
        >
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: activeTab === "perfil" ? "#F44336" : "#E0E0E0",
              color: activeTab === "perfil" ? "#FFFFFF" : "#000000",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={() => handleTabChange("perfil")}
            startIcon={<MdPerson />}
          >
            Meu Perfil
          </Button>

          <Button
            style={{
              backgroundColor: activeTab === "pedidos" ? "#F44336" : "#E0E0E0",
              color: activeTab === "pedidos" ? "#FFFFFF" : "#000000",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={() => handleTabChange("pedidos")}
            startIcon={<MdShoppingCart />}
          >
            Pedidos
          </Button>
        </div>

        {activeTab === "perfil" && (
          <div style={{ padding: 100 }}>
            <center>
              <Image
                src="/CrowStore/logos/logo-crow-black-512x512.png"
                width={100}
                height={100}
                alt="Imagem CrowStore"
              />
            </center>
            <br />
            {userData && (
              <>
                <h3>CPF: {userData.cpf}</h3>
                <br />
                <h3>Email: {userData.email}</h3>
                <br />
                </>
            )}
            <form>
              <TextField
                label="Nome"
                required
                fullWidth
                value={nome}
                onChange={handleNomeChange}
                variant="standard"
                size="small"
                InputProps={{
                  autoComplete: "new-name",
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
                InputProps={{
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
                  autoComplete: "new-password",
                }}
              />
              <br />
              <br />
              <center>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: colors.cta,
                    color: "white",
                  }}
                  disabled={
                    isEmailInvalid ||
                    isCPFInvalid ||
                    isPhoneInvalid ||
                    senha !== confirmSenha
                  }
                >
                  Atualizar Usuário
                </Button>
              </center>
              <br />
            </form>

            <center>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: colors.textBlack,
                  color: "white",
                }}
                onClick={handleLogout}
              >
                Sair
              </Button>
            </center>

            <center>
              <br /> <br />
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: colors.gray,
                  color: "white",
                }}
              >
                Excluir Conta
              </Button>
            </center>
          </div>
        )}

        {activeTab === "pedidos" && (
          <div>
            <center>
              {" "}
              <br />
              <br />
              <Cart onCartUpdate={handleCartUpdate} isShopCart={false} />
            </center>
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
}

export default CommonUser;
