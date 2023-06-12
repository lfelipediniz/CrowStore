import React from "react";
import {
  AddProductContainer,
  AddProduct,
  AddButton,
  ImagePreview,
  InputInfoContainer,
  TitleModal,
  Money,
} from "./ProductModalElements";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { FaPhotoVideo } from "react-icons/fa";
import { colors } from "../../styles/colors";

const ProductModal = ({
  open,
  onClose,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("image")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <AddProductContainer>
          <AddProduct>
            <>
              <AddButton htmlFor="imageUpload">
                {selectedImage ? (
                  <ImagePreview src={selectedImage} alt="Selected" />
                ) : (
                  <>
                    <FaPhotoVideo /> Adicionar Imagem
                  </>
                )}
              </AddButton>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden // Oculta o elemento input
              />
            </>

            <InputInfoContainer>
              <TitleModal>Informações do Produto</TitleModal>
              <TextField
                label="Nome do Produto"
                variant="outlined"
                sx={{ marginBottom: "25px" }}
              />
              <TextField
                label="Estoque"
                variant="outlined"
                sx={{ marginBottom: "25px" }}
                InputProps={{
                  inputProps: { min: 0 },
                }}
                type="number"
              />
              <TextField
                select
                label="Categoria"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                variant="outlined"
                sx={{ marginBottom: "25px" }}
              >
                {categories
                  .filter(
                    (category) =>
                      category !== "Todos" &&
                      category !== "Masculino" &&
                      category !== "Feminino"
                  )
                  .map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                select
                label="Gênero"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                variant="outlined"
                sx={{ marginBottom: "25px" }}
              >
                <MenuItem value="boy">Masculino</MenuItem>
                <MenuItem value="girl">Feminino</MenuItem>
              </TextField>
              <TextField
                label="Preço"
                variant="outlined"
                sx={{ marginBottom: "25px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Money>R$</Money>
                    </InputAdornment>
                  ),
                }}
                type="number"
              />
              <Button variant="contained" onClick={onClose}>
                Adicionar Produto
              </Button>
            </InputInfoContainer>
          </AddProduct>
        </AddProductContainer>
      </Box>
    </Modal>
  );
};

export default ProductModal;
