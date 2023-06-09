import React, { useState } from "react";
import { WrapContent } from "../../ReusedComponents/WrapContent";
import {
  UserContainer,
  RemoveButton,
  ProductContainer,
  ScrollableContainer,
  SearchContainer,
} from "../UserElements";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import ProductCard from "../../ReusedComponents/ProductCard";
import Products from "../../../fakedata/adminContent/products.json";
import SearchBar from "../../SearchBar";
import { Button, Box, Modal, Typography } from "@mui/material";

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

  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <SearchContainer>
        <WrapContent>
          <SearchBar onChange={setSearchTerm} />
        </WrapContent>
      </SearchContainer>

      <UserContainer>
        <WrapContent>
          <Sidebar>
            <Menu iconShape="square">
              {categories.map((category, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                  {category !== "Todos" &&
                    category !== "Masculino" &&
                    category !== "Feminino" &&
                    editingMode && (
                      <RemoveButton onClick={() => handleRemoveCategory(index)}>
                        X
                      </RemoveButton>
                    )}
                </MenuItem>
              ))}
              {editingMode && (
                <MenuItem onClick={handleAddCategory}>
                  {" "}
                  Adicionar Categoria{" "}
                </MenuItem>
              )}
            </Menu>
            <Menu iconShape="square">
              <MenuItem onClick={toggleEditingMode}> Modo Edição </MenuItem>
              {editingMode && (
                <MenuItem onClick={handleOpenModal}>Adicionar Produto</MenuItem>
              )}
            </Menu>
          </Sidebar>
        </WrapContent>

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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Typography variant="h6" component="h2">
            Adicionar Produto
          </Typography>
          <Typography sx={{ mt: 2 }}>
            ...
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Admin;
