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
          {categoriesData.map((category) => {
            if (selectedCategory === "Todos" && category.name === "Todos") {
              return category.content.flatMap((content, index) => (
                <h2 key={index}>{content}</h2>
              ));
            }
            if (selectedCategory === category.name) {
              return category.content.map((content, index) => (
                <h2 key={index}>{content}</h2>
              ));
            }
            return null;
          })}
        </div>
      </UserContainer>
    </WrapContent>
  );
}

export default Admin;
