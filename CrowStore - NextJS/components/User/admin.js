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
} from "./UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import Products from "../../fakedata/adminContent/products.json";
import SearchBar from "../SearchBar";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import ProductModal from "../ProductModal"; // Importe o componente de modal personalizado

function Admin() {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([
    "Todos",
    "Masculino",
    "Feminino",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showModal, setShowModal] = useState(false); // Novo estado para controlar a visibilidade do modal

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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      <ProductModal
        open={showModal}
        onClose={handleCloseModal}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}

export default Admin;
