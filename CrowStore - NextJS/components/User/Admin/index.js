import React, { useState } from "react";
import { WrapContent } from "../../ReusedComponents/WrapContent";
import { UserContainer, RemoveButton } from "../UserElements";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

function Admin() {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState(["Todos", "Documentation", "Calendar"]);

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
    if (categoryToRemove === "Todos") {
      return; // Não remove a categoria "Todos"
    }
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <WrapContent>
      <UserContainer>
        <Sidebar>
          <Menu>
            {categories.map((category, index) => (
              <MenuItem key={index}>
                {category}
                {category !== "Todos" && editingMode && (
                  <RemoveButton onClick={() => handleRemoveCategory(index)}>
                    X
                  </RemoveButton>
                )}
              </MenuItem>
            ))}
            {editingMode && (
              <MenuItem onClick={handleAddCategory}> Adicionar Categoria </MenuItem>
            )}
            <MenuItem onClick={toggleEditingMode}> Modo Edição </MenuItem>
          </Menu>
        </Sidebar>

        
      </UserContainer>
    </WrapContent>
  );
}

export default Admin;