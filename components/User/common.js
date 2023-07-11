import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdPerson, MdShoppingCart } from "react-icons/md";
import jwt from "jsonwebtoken";
import axios from "axios";
import Cart from "../Cart";
import { colors } from "../../styles/colors";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";

import { FaEyeSlash, FaEye } from "react-icons/fa";

function CommonUser() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("perfil");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setPassword] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const [userN, setUsername] = useState("");
  const [isCadastrando, setIsCadastrando] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isCPFFocused, setIsCPFFocused] = useState(false);
  const [isCPFInvalid, setIsCPFInvalid] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isConfirmSenhaFocused, setIsConfirmSenhaFocused] = useState(false);

  const [cartData, setCartData] = useState({
    Products: [],
    Quantities: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedUser = {
        name: nome,
        phone: telefone,
        password: senha,
      };

      const token = localStorage.getItem("token");
      const decodedToken = jwt.decode(token);

      if (decodedToken && decodedToken.id) {
        const userId = decodedToken.id;

        const response = await axios.patch(
          `http://localhost:5000/users/edit/${userId}`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Usuário atualizado com sucesso");
          // Atualizar os dados do usuário exibidos no perfil
          fetchUserData(userId);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      // Exibir uma mensagem de erro ao usuário, caso necessário
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = response.data;
      setUserData(userData);

      const cartProducts = userData.shopping.map(async (item) => {
        const productName = item.product.name;
        const productResponse = await axios.get(
          `http://localhost:5000/products/getProductByName/${productName}`
        );
        const productData = productResponse.data;
        const productImage = productData.images[0];
        return {
          ...item.product,
          image: `/CrowStore/imgs/${productImage}`,
        };
      });
      const cartProductsData = await Promise.all(cartProducts);
      const cartQuantities = userData.shopping.map((item) => item.quantity);

      setCartData({
        Products: cartProductsData,
        Quantities: cartQuantities,
      });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCartUpdate = (products, quantities) => {
    setCartData({
      ...cartData,
      Products: products,
      Quantities: quantities,
    });
  };

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
    <div style={{ backgroundColor: colors.primary }}>
      <div className="user-info-container">
        <div className="user-info">
          <Image
            src="/CrowStore/logos/logo-crow-black-512x512.png"
            width={100}
            height={100}
            alt="Imagem CrowStore"
          />
          <h2>Olá, {userData?.name}</h2>
          <br />
          <Button variant="contained" color="primary" onClick={handleModalOpen}>
            Editar Perfil
          </Button>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-tabs">
          <button
            className={activeTab === "perfil" ? "active" : ""}
            onClick={() => handleTabChange("perfil")}
          >
            <MdPerson />
            Perfil
          </button>
          <button
            className={activeTab === "pedidos" ? "active" : ""}
            onClick={() => handleTabChange("pedidos")}
          >
            <MdShoppingCart />
            Pedidos
          </button>
        </div>
        {activeTab === "perfil" && (
          <div className="profile-content">
            <h3>Informações Pessoais</h3>
            <p>Email: {userData?.email}</p>
            <br />
            <p>Telefone: {userData?.phone}</p> <br />
            <p>CPF: {userData?.cpf}</p> <br />
            <Button onClick={handleLogout}>Sair</Button>
          </div>
        )}
        {activeTab === "pedidos" && (
          <div>
            <br />
            <Cart
              products={cartData.Products}
              quantities={cartData.Quantities}
              onCartUpdate={handleCartUpdate}
              isShopCart={false}
              userData={userData}
            />
          </div>
        )}
      </div>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className="modal-container">
          <h2>Editar Perfil</h2>
          <Modal open={isModalOpen} onClose={handleModalClose}>
            <div className="modal-container">
              <h2>Editar Perfil</h2>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Novo Nome"
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
                  label="Novo Telefone"
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
                  label="Nova Senha"
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
                  label="Confirmar Nova Senha"
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
                  >
                    Atualizar Usuário
                  </Button>
                </center>
                <br />
              </form>
            </div>
          </Modal>
        </div>
      </Modal>

      <style jsx>{`
        .user-info-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 100px;
          margin-bottom: 32px;
        }

        .user-info {
          text-align: center;
        }

        .user-info h2 {
          margin-top: 16px;
          margin-bottom: 8px;
        }

        .user-info button {
          margin-top: 16px;
        }

        .profile-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .profile-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .profile-tabs button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border: none;
          background-color: ${colors.primary};
          color: ${colors.gray};
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 30px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        }

        .profile-tabs button.active {
          color: ${colors.primary};
          background-color: ${colors.gray};
        }

        .profile-tabs button:not(:last-child) {
          margin-right: 10px;
        }

        .profile-tabs button svg {
          margin-right: 8px;
        }

        .profile-content {
          margin-top: 16px;
          text-align: center;
        }

        .profile-content h3 {
          margin-bottom: 16px;
        }

        .modal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: ${colors.white};
          padding: 16px;
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default CommonUser;
