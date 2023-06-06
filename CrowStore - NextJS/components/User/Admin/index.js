import React, { useState } from "react";
import { WrapContent } from "../../ReusedComponents/WrapContent";
import { UserContainer, SideNavContainer, SideNavItem } from "../UserElements";
import SideNavigation from "../SideNavegation";

const categoriesData = [
  { name: "Todos", content: ["Calças", "Moletons", "Acessórios"] },
  { name: "Calças", content: ["Texto: A"] },
  { name: "Moletons", content: ["Texto: B"] },
  { name: "Acessórios", content: ["Texto: C"] },
];

function Admin() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const categories = categoriesData.map((category) => category.name);

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
      </UserContainer>
    </WrapContent>
  );
}

export default Admin;
