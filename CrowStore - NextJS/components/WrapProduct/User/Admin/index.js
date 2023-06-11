import React, { useState } from "react";
import { WrapContent } from "../../ReusedComponents/WrapContent";
import {
  UserContainer,
  RemoveButton,
  ProductContainer,
  ScrollableContainer,
  SearchContainer,
  AddProductContainer,
  SidebarContainer
} from "../UserElements";
import ProductCard from "../../ReusedComponents/ProductCard";
import Products from "../../../fakedata/adminContent/products.json";
import SearchBar from "../../SearchBar";
import {
  Box,
  Modal,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";


import { FaTrashAlt } from "react-icons/fa";

function Admin() {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([
    "Todos",
    "Masculino",
    "Feminino",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [openModal, setOpenModal] = useState(false);

  const toggleEditingMode = () => {
    setEditingMode(!editingMode);
  };

  const toggleAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Digite o nome da nova categoria:");
    if (newCategory) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleRemoveCategory = (index) => {
    const categoryToRemove = categories[index];
    if (
      categoryToRemove === "Todos" ||
      categoryToRemove === "Masculino" ||
      categoryToRemove === "Feminino"
    ) {
      return;
    }
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filtra os produtos com base na categoria selecionada
  const filteredProducts =
    selectedCategory === "Todos"
      ? Products
      : Products.filter(
          (product) =>
            product.category === selectedCategory ||
            (selectedCategory === "Masculino" && product.gender === "boy") ||
            (selectedCategory === "Feminino" && product.gender === "girl")
        );

  const [searchTerm, setSearchTerm] = useState("");

  // Filtra os produtos com base no termo de busca
  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const genderOptions = [
    { value: "boy", label: "Masculino" },
    { value: "girl", label: "Feminino" },
  ];

  return (
    <>
      {/* Container de pesquisa */}
      <SearchContainer>
        <WrapContent>
          <SearchBar onChange={setSearchTerm} />
        </WrapContent>
      </SearchContainer>

      <UserContainer>
        <WrapContent>
          <SidebarContainer>
            {/* Sidebar */}
            <Box>
              <List>
                {/* Modo de edição */}
                <ListItem button onClick={toggleEditingMode}>
                  <ListItemText
                    primary={editingMode ? "Finalizar Edição" : "Modo Edição"}
                  />
                </ListItem>
                <Divider />

                {/* Adicionar Produto */}
                {editingMode && (
                  <ListItem button onClick={handleOpenModal}>
                    <ListItemText primary="Adicionar Produto" />
                  </ListItem>
                )}

                {/* Adicionar Categoria */}
                {editingMode && (
                  <ListItem button onClick={handleAddCategory}>
                    <ListItemText primary="Adicionar Categoria" />
                  </ListItem>
                )}
                <Divider />

                {/* Categorias */}
                {categories.map((category, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={selectedCategory === category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <ListItemText primary={category} />
                    {category !== "Todos" &&
                      category !== "Masculino" &&
                      category !== "Feminino" &&
                      editingMode && (
                        <RemoveButton onClick={() => handleRemoveCategory(index)}>
                          <FaTrashAlt />
                        </RemoveButton>
                      )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </SidebarContainer>
        </WrapContent>

        {/* Container de produtos */}
        <ScrollableContainer>
          <ProductContainer>
            {searchFilteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                img={product.image}
                productName={product.productName}
                price={product.price}
              />
            ))}
          </ProductContainer>
        </ScrollableContainer>
      </UserContainer>

      {/* Modal de adicionar produto */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AddProductContainer>
            <Typography variant="h6" component="h2">
              Informações do Produto
            </Typography>
            <TextField label="Estoque Disponível" variant="outlined" />
            <TextField label="Preço de Venda" variant="outlined" />
            <TextField
              select
              label="Seletor de Gênero"
              variant="outlined"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {genderOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Seletor de Categoria"
              variant="outlined"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories
                .filter(
                  (category) =>
                    category !== "Todos" &&
                    category !== "Masculino" &&
                    category !== "Feminino"
                )
                .map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" component="label">
              Adicionar Imagem
              <input type="file" hidden />
            </Button>
          </AddProductContainer>
        </Box>
      </Modal>
    </>
  );
}

export default Admin;