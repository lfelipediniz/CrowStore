import React from "react";
import { SideNavContainer, SideNavItem } from "../UserElements";
import { colors } from "../../../styles/colors";

function SideNavigation({ categories, selectedCategory, onCategoryChange, editMode }) {
  const handleItemClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <SideNavContainer>
      {categories.map((category) => (
        <SideNavItem
          key={category}
          onClick={() => handleItemClick(category)}
          style={{
            backgroundColor:
              selectedCategory === category ? colors.textBlack : "transparent",
          }}
        >
          {category}
          {editMode && (
            <button onClick={() => handleRemoveCategory(category)}>Remover</button>
          )}
        </SideNavItem>
      ))}
    </SideNavContainer>
  );
}

export default SideNavigation;
