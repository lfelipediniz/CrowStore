import React, { useState } from "react";
import { WrapContent } from "../../ReusedComponents/WrapContent";
import { UserContainer, SideNavContainer, SideNavItem, Button, EditModeContainer, EditModeButton, EditModeOptions, EditModeOption } from "../UserElements";
import SideNavigation from "../SideNavegation";


const categoriesData = [
  { name: "Todos", content: ["Calças", "Moletons", "Acessórios"] },
  { name: "Calças", content: ["Texto: A", "Texto: A"] },
  { name: "Moletons", content: ["Texto: B", "Texto: B"] },
  { name: "Acessórios", content: ["Texto: C", "Texto: C"] },
];

function Admin() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [categories, setCategories] = useState(categoriesData.map((category) => category.name));
  const [editMode, setEditMode] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    const categoryName = prompt("Digite o nome da nova categoria:");
    if (categoryName) {
      setCategories([...categories, categoryName]);
    }
  };

  const handleRemoveCategory = (category) => {
    if (category !== "Todos") {
      const updatedCategories = categories.filter((cat) => cat !== category);
      setCategories(updatedCategories);
      setSelectedCategory("Todos");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const getContent = () => {
    if (selectedCategory === "Todos") {
      return categoriesData
        .filter((category) => category.name !== "Todos")
        .flatMap((category) => category.content);
    }
    const selectedCategoryData = categoriesData.find(
      (category) => category.name === selectedCategory
    );
    return selectedCategoryData ? selectedCategoryData.content : [];
  };

  return (
    <WrapContent>
      <UserContainer>
        <SideNavContainer>
          <SideNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </SideNavContainer>

        <div>
          {getContent().map((content, index) => (
            <h2 key={index}>{content}</h2>
          ))}
        </div>

        <EditModeContainer>
          <EditModeButton onClick={toggleEditMode}>Modo Edição</EditModeButton>
          {editMode && (
            <EditModeOptions>
              <EditModeOption onClick={handleAddCategory}>Adicionar Categoria</EditModeOption>
              <EditModeOption onClick={() => handleRemoveCategory(selectedCategory)}>
                Remover Categoria
              </EditModeOption>
            </EditModeOptions>
          )}
        </EditModeContainer>

        <div>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                {category}{" "}
                {category !== "Todos" && editMode && (
                  <Button onClick={() => handleRemoveCategory(category)}>Remover</Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </UserContainer>
    </WrapContent>
  );
}

export default Admin;
