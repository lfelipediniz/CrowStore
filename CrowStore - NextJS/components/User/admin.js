import React, { useState } from "react";
import { WrapContent } from "../ReusedComponents/WrapContent";
import {
  UserContainer,
  RemoveButton,
  ProductContainer,
  ScrollableContainer,
  SearchContainer,
  AddProductContainer,
  SidebarContainer,
  EditButtonCotainer,
  AddProduct,
  AddButton,
  ImagePreview,
  InputInfoContainer,
  TitleModal,
} from "./UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import Products from "../../fakedata/adminContent/products.json";
import SearchBar from "../SearchBar";
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
  InputAdornment,
} from "@mui/material";

import { FaTrashAlt, FaPhotoVideo } from "react-icons/fa";

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

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("image")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

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
                <EditButtonCotainer>
                  <ListItem button onClick={toggleEditingMode}>
                    <ListItemText
                      primary={editingMode ? "Finalizar Edição" : "Modo Edição"}
                    />
                  </ListItem>
                </EditButtonCotainer>

                {/* Adicionar Produto */}
                {editingMode && (
                  <ListItem button onClick={handleOpenModal}>
                    <ListItemText primary="Adicionar Produto" />
                  </ListItem>
                )}

                {/* Adicionar Categoria */}
                {editingMode && (
                  <>
                    <ListItem button onClick={handleAddCategory}>
                      <ListItemText primary="Adicionar Categoria" />
                    </ListItem>
                    <Divider />
                  </>
                )}

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
                        <RemoveButton
                          onClick={() => handleRemoveCategory(index)}
                        >
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AddProductContainer>
            <AddProduct>
              <>
                <AddButton htmlFor="imageUpload">
                  {selectedImage ? (
                    <ImagePreview src={selectedImage} alt="Selected" />
                  ) : (
                    <>
                      <FaPhotoVideo /> Adicionar Imagem
                    </>
                  )}
                </AddButton>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden // Oculta o elemento input
                />
              </>

              <InputInfoContainer>
                <TitleModal>Informações do Produto</TitleModal>
                <TextField
                  label="Estoque"
                  variant="outlined"
                  sx={{ marginBottom: "30px" }}
                  InputProps={{
                    inputProps: {
                      type: "number",
                      min: "0",
                    },
                  }}
                />
                <TextField
                  label="Preço de Venda"
                  variant="outlined"
                  sx={{ marginBottom: "30px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="rs">R$</span>
                      </InputAdornment>
                    ),
                    inputProps: {
                      type: "number",
                      min: "0",
                    },
                  }}
                />
                <TextField
                  select
                  label="Selecionar de Gênero"
                  variant="outlined"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{ marginBottom: "30px" }}
                >
                  {genderOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Selecionar de Categoria"
                  variant="outlined"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{ marginBottom: "65px" }}
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

                <Button variant="contained" href="#contained-buttons">
                  Adicionar
                </Button>
              </InputInfoContainer>
            </AddProduct>
          </AddProductContainer>
        </Box>
      </Modal>
    </>
  );
}

export default Admin;
