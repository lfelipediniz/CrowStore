import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { MdPerson, MdShoppingCart } from "react-icons/md";
import jwt from "jsonwebtoken";
import axios from "axios";
import Cart from "../Cart";
import { colors } from "../../styles/colors";

function CommonUser() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("perfil");
  const [cartData, setCartData] = useState({
    Products: [],
    Quantities: [],
  });

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
          {/* Formulário de edição de perfil */}
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
