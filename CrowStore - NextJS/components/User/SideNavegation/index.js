import React from "react";
import styled from "styled-components";

const SideNavContainer = styled.div`
  background-color: #262626;
  width: 200px;
  height: 100%;
`;

const SideNavItem = styled.div`
  padding: 10px;
  color: #fff;
  cursor: pointer;
`;

function SideNavigation({ categories, selectedCategory, onCategoryChange }) {
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
              selectedCategory === category ? "rgba(255, 255, 255, 0.1)" : "transparent",
          }}
        >
          {category}
        </SideNavItem>
      ))}
    </SideNavContainer>
  );
}

export default SideNavigation;
