import React, { useState, useEffect } from "react";
import { Filter, Title, TagList, Tag, WebButton, MobileFilter, ContainerModal} from "./FilterTagsElements";
import tagsData from "./tagsData.json";
import { colors } from "../../styles/colors";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
} from "@mui/material";


function FilterTags(props) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    props.onChange(selectedTags);
  }, [selectedTags]);

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
        {tagsData.filters.map((tag, index) => (
          <Tag key={index}>
            <WebButton
              type="WebButton"
              className={`option ${selectedTags.includes(tag.value) ? "selected" : ""}`}
              onClick={() => handleTagClick(tag.value)}
            >
              {tag.label}
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
            {tagsData.filters.map((tag, index) => (
              <ListItem key={index} button onClick={() => handleCheckboxChange(tag.value)}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    edge="start"
                    checked={selectedTags.includes(tag.value)}
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
                <ListItemText primary={tag.label} />
              </ListItem>
            ))}
          </List>
        </ContainerModal>
      </Modal>
    </Filter>
  );
}

export default FilterTags;
