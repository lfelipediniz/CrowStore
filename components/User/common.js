import React, { useState } from "react";
import {
  Container,
  SideNav,
  ScrollableContainer,
  Hi,
  Form,
  AvatarContainer,
  UploadButton
} from "./UserElements";

import ProductCard from "../ReusedComponents/ProductCard";
import Products from "../../fakedata/adminContent/products.json";
import SearchBar from "../SearchBar";
import { Box, Divider, List, ListItem, ListItemText, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';

import { FaTrashAlt, FaEdit } from "react-icons/fa";

function CommonUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("perfil"); // Adicionado estado para controlar a guia ativa

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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

  return (
    <>
      <Container>
        <SideNav>
          <Box>
            <Hi>Olá, Fulano!</Hi>
            <List>
              <ListItem button onClick={() => handleTabChange("perfil")}>
                <ListItemText primary="Perfil" />
              </ListItem>
              <ListItem button onClick={() => handleTabChange("pedidos")}>
                <ListItemText primary="Pedidos" />
              </ListItem>
              <ListItem button onClick={() => handleTabChange("compras")}>
                <ListItemText primary="Minhas Compras" />
              </ListItem>
            </List>
          </Box>
        </SideNav>

        <ScrollableContainer>
          {activeTab === "perfil" && (
            <Form onSubmit={handleSubmit}>
              {/* Perfil */}
              <TextField
                label="Nome"
                value={name}
                onChange={handleNameChange}
                variant="outlined"
              />
              <TextField
                label="Email"
                value={email}
                onChange={handleEmailChange}
                variant="outlined"
              />
              <AvatarContainer>
                <Avatar src={avatar} alt="Avatar" />
                <UploadButton onClick={handleOpenModal}>
                  Alterar Avatar
                </UploadButton>
              </AvatarContainer>
              <TextField
                label="Endereço"
                value={address}
                onChange={handleAddressChange}
                variant="outlined"
              />
              <TextField
                label="Telefone"
                value={phone}
                onChange={handlePhoneChange}
                variant="outlined"
              />
              <TextField
                label="CPF"
                value={cpf}
                onChange={handleCpfChange}
                variant="outlined"
              />
              <Button type="submit" variant="contained" color="primary">
                Salvar
              </Button>

              <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <h2>Alterar Avatar</h2>
                  {/* Componente de upload de imagem */}
                  <Button onClick={handleCloseModal}>Fechar</Button>
                </Box>
              </Modal>
            </Form>
          )}

          {activeTab === "pedidos" && (
            <h1>Ainda não tem nenhum pedido</h1>
          )}

          {activeTab === "compras" && (
            <h1>Ainda não tem nenhuma compra</h1>
          )}
        </ScrollableContainer>
      </Container>
    </>
  );
}

export default CommonUser;
