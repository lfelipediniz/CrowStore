import React, { useState, useEffect } from "react";
import { Filter, Title, TagList, Tag, WebButton, MobileFilter, ContainerModal } from "./FilterTagsElements";
import { colors } from "../../styles/colors";
import { Modal, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button } from "@mui/material";
import axios from "axios";

function FilterTags(props) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    props.onChange(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories/ShowCategories");
        const categoryNames = response.data.map((category) => category.name);
        setCategories(["Masculino", "Feminino", ...categoryNames]);
      } catch (error) {
        console.error("Erro ao obter categorias:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleTagClick = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  return (
    <Filter>
      <MobileFilter>
        <Button sx={{ color: colors.cta }} onClick={handleOpenModal}>
          Escolher Filtro
        </Button>
      </MobileFilter>
      <Title>Filtros:</Title>
      <TagList>
        {categories.map((category, index) => (
          <Tag key={index}>
            <WebButton
              type="WebButton"
              className={`option ${selectedTags.includes(category) ? "selected" : ""}`}
              onClick={() => handleTagClick(category)}
            >
              {category}
            </WebButton>
          </Tag>
        ))}
      </TagList>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ContainerModal>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index} button onClick={() => handleCheckboxChange(category)}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    edge="start"
                    checked={selectedTags.includes(category)}
                    tabIndex={-1}
                    disableRipple
                    sx={{
                      color: colors.primary,
                      "&.Mui-checked": {
                        color: colors.cta,
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </ContainerModal>
      </Modal>
    </Filter>
  );
}

export default FilterTags;
