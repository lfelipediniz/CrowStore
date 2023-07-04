import React, { useState, useEffect } from "react";
import {
  Container,
  SideNav,
  SearchBarContainer,
  Content,
  SidebarContainer,
  EditButtonCotainer,
  ProductContainer,
  ProductCardEdit,
  RemoveButton,
} from "./UserElements";

import ProductCard from "../ReusedComponents/ProductCard";
import Products from "../../fakedata/adminContent/products.json";
import SearchBar from "../SearchBar";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import ProductModal from "../ProductModal";
import { colors } from "../../styles/colors";

const Admin = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([
    "Todos",
    "Masculino",
    "Feminino",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1115 && editingMode) {
        setEditingMode(false);
        setShowModal(false);
        alert(
          "Sua tela tem a largura muito pequena para o modo edição. Largura mínima: 1115px"
        );
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [editingMode]);

  const toggleEditingMode = () => {
    if (window.innerWidth < 1115) {
      alert(
        "Sua tela tem a largura muito pequena para o modo edição. Largura mínima: 1115px"
      );
      return;
    }

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
            (selectedCategory === "Masculino" &&
              product.gender === "masculino") ||
            (selectedCategory === "Feminino" && product.gender === "feminino")
        );

  const [searchTerm, setSearchTerm] = useState("");

  // Filtra os produtos com base no termo de busca
  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (e, product) => {
    if (!editingMode) {
      return; // Se o modo de edição estiver desativado, retorna sem fazer nada
    }
    e.preventDefault();
    if (editingMode) {
      setShowModal(true);
      setSelectedProduct(product);
    }
  };

  const handleOpenModalCreate = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (product) => {
    // Implemente a lógica para salvar ou atualizar o produto no sistema
    console.log("Salvar produto:", product);
    handleCloseModal();
  };

  const handleRemoveProduct = (product) => {
    // Implemente a lógica para remover o produto do sistema
    console.log("Remover produto:", product);
  };

  const handleLogout = () => {
    // Limpar o token do localStorage
    localStorage.removeItem("token");
    window.location.reload(); // Recarrega a página
  };

  return (
    <>
      <Container>
        <SideNav>
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
                <ListItem button onClick={() => handleOpenModalCreate()}>
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
                      <RemoveButton onClick={() => handleRemoveCategory(index)}>
                        <FaTrashAlt />
                      </RemoveButton>
                    )}
                </ListItem>
              ))}
            </List>
            <ListItem
              button
              onClick={handleLogout}
              style={{ backgroundColor: colors.textBlack }}
            >
              <ListItemText>Sair</ListItemText>
            </ListItem>
          </Box>
        </SideNav>
        <SearchBarContainer>
          <SearchBar onChange={setSearchTerm} />
        </SearchBarContainer>
        <Content>
          <ProductContainer>
            {searchFilteredProducts.map((product, index) => (
              <ProductCardEdit
                key={index}
                onClick={(e) => handleOpenModal(e, product)}
                editingMode={editingMode} // Passa a propriedade editingMode para o ProductCardEdit
              >
                <ProductCard
                  img={product.image}
                  productName={product.productName}
                  price={product.price}
                />
                {editingMode && (
                  <div className="edit-icon">
                    <FaEdit />
                  </div>
                )}
              </ProductCardEdit>
            ))}
          </ProductContainer>
        </Content>

        {/* Modal de adicionar/editar produto */}
        <ProductModal
          open={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
          onSave={handleSaveProduct}
          onRemove={handleRemoveProduct}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Container>
    </>
  );
};

export default Admin;
