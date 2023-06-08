import React, { useState } from "react";
import { WrapContent } from "../../ReusedComponents/WrapContent";
import {
  UserContainer,
  RemoveButton,
  ProductContainer,
  ScrollableContainer,
} from "../UserElements";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import ProductCard from "../../ReusedComponents/ProductCard";
import Products from "../../../fakedata/adminContent/products.json";

function Admin() {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([
    "Todos",
    "Masculino",
    "Feminino",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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
      return; // Não remove as categorias "Todos", "Masculino" e "Feminino"
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

  return (
    <WrapContent>
      <UserContainer>
        <Sidebar>
          <Menu>
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
            <MenuItem onClick={toggleEditingMode}> Modo Edição </MenuItem>
          </Menu>
        </Sidebar>

        <ScrollableContainer>
          <ProductContainer>
            {filteredProducts.map((product, index) => (
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
    </WrapContent>
  );
}

export default Admin;
