import React, { useState } from "react";
import {
  AddProductContainer,
  AddProduct,
  AddButton,
  ImagePreview,
  InputInfoContainer,
  TitleModal,
  Money,
  RemoveButton,
  SaveButton,
  ColorsContainer,
  ColorsTitle,
  AvailableColors,
  ColorsButton,
  AvailableSizes,
  ChangeContainer,
} from "./ProductModalElements";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { FaPhotoVideo, FaTrash } from "react-icons/fa";
import { WrapContent } from "../ReusedComponents/WrapContent";

import availableColors from "../../fakedata/adminContent/colors.json";
import availableSizes from "../../fakedata/adminContent/sizes.json";

const ProductModal = ({
  open,
  onClose,
  product,
  onSave,
  onRemove,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isColorModalOpen, setColorModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isSizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(""); // Estado para armazenar a descrição do produto selecionado

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("image")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      productName: selectedProductData.productName,
      selectedColors: selectedColors,
      selectedSizes: selectedSizes,
    };
    onSave(updatedProduct);
  };

  const handleRemove = () => {
    onRemove(product);
  };

  const [selectedProductData, setSelectedProductData] = useState({
    productName: product?.productName || "",
    stock: product?.stock || "",
    selectedColor: "",
    selectedSize: "",
  });

  React.useEffect(() => {
    setSelectedProductData({
      productName: product?.productName || "",
      stock: product?.stock || "",
      selectedColor: "",
      selectedSize: "",
    });

    if (product?.image) {
      setSelectedImage(product.image);
    } else {
      setSelectedImage(null);
    }

    if (product?.colors) {
      setSelectedProductColors(product.colors);
    } else {
      setSelectedProductColors([]);
    }

    if (product?.sizes) {
      setSelectedProductSizes(product.sizes);
    } else {
      setSelectedProductSizes([]);
    }

    if (product?.description) {
      setSelectedDescription(product.description); // Define a descrição personalizada do produto selecionado
    } else {
      setSelectedDescription(""); // Limpa a descrição personalizada
    }
  }, [product]);

  const handleColorToggle = (color) => () => {
    const currentIndex = selectedColors.indexOf(color);
    const newSelectedColors = [...selectedColors];

    if (currentIndex === -1) {
      newSelectedColors.push(color);
    } else {
      newSelectedColors.splice(currentIndex, 1);
    }

    setSelectedColors(newSelectedColors);
  };

  const handleColorSelectAll = () => {
    if (selectedColors.length === availableColors.length) {
      setSelectedColors([]);
    } else {
      setSelectedColors(availableColors);
    }
  };

  const isColorSelected = (color) =>
    selectedColors.indexOf(color) !== -1 ||
    selectedProductColors.includes(color);

  const handleSizeToggle = (size) => () => {
    const currentIndex = selectedSizes.indexOf(size);
    const newSelectedSizes = [...selectedSizes];

    if (currentIndex === -1) {
      newSelectedSizes.push(size);
    } else {
      newSelectedSizes.splice(currentIndex, 1);
    }

    setSelectedSizes(newSelectedSizes);
  };

  const handleSizeSelectAll = () => {
    if (selectedSizes.length === availableSizes.length) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes(availableSizes);
    }
  };

  const isSizeSelected = (size) =>
    selectedSizes.indexOf(size) !== -1 || selectedProductSizes.includes(size);

  const [selectedProductColors, setSelectedProductColors] = useState([]);
  const [selectedProductSizes, setSelectedProductSizes] = useState([]);

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
          <ChangeContainer>
            {product ? (
              <RemoveButton variant="contained" onClick={handleRemove}>
                <FaTrash />
                Remover Produto
              </RemoveButton>
            ) : (
              <div style={{ height: "40px" }}></div>
            )}
            <SaveButton variant="contained" onClick={handleSave}>
              Salvar
            </SaveButton>
          </ChangeContainer>
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
                hidden
              />
            </>

            <InputInfoContainer>
              <TitleModal>Informações do Produto</TitleModal>
              <TextField
                label="Nome do Produto"
                variant="outlined"
                sx={{ marginBottom: "25px" }}
                value={selectedProductData.productName}
                onChange={(e) =>
                  setSelectedProductData({
                    ...selectedProductData,
                    productName: e.target.value,
                  })
                }
              />

              <TextField
                label="Descrição"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{ marginBottom: "25px" }}
                value={selectedDescription} // Define o valor do campo Descrição como a descrição personalizada
                onChange={(e) => setSelectedDescription(e.target.value)} // Atualiza a descrição personalizada quando o valor do campo é alterado
              />

              <TextField
                label="Estoque"
                variant="outlined"
                sx={{ marginBottom: "25px" }}
                InputProps={{
                  inputProps: { min: 0 },
                }}
                type="number"
                value={selectedProductData.stock}
                onChange={(e) =>
                  setSelectedProductData({
                    ...selectedProductData,
                    stock: e.target.value,
                  })
                }
              />
              <TextField
                select
                label="Gênero"
                variant="outlined"
                sx={{ marginBottom: "25px" }}
              >
                <MenuItem value="boy">Masculino</MenuItem>
                <MenuItem value="girl">Feminino</MenuItem>
              </TextField>
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
            </InputInfoContainer>
            <InputInfoContainer>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setColorModalOpen(true)}
                sx={{ marginBottom: "25px" }}
              >
                Cores Disponíveis
              </Button>

              <Modal
                open={isColorModalOpen}
                onClose={() => setColorModalOpen(false)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <ColorsContainer>
                    <ColorsTitle>Cores Disponíveis</ColorsTitle>
                    <AvailableColors>
                      <List sx={{ width: "300px" }}>
                        <ListItem
                          button
                          onClick={handleColorSelectAll}
                          key="all"
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={
                                selectedColors.length === availableColors.length
                              }
                              indeterminate={
                                selectedColors.length > 0 &&
                                selectedColors.length < availableColors.length
                              }
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary="Selecionar Todos" />
                        </ListItem>
                        {availableColors.map((color) => (
                          <ListItem
                            button
                            onClick={handleColorToggle(color)}
                            key={color}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={isColorSelected(color)}
                                disableRipple
                              />
                            </ListItemIcon>
                            <ListItemText primary={color} />
                          </ListItem>
                        ))}
                      </List>
                    </AvailableColors>
                    <ColorsTitle>Cores Selecionadas</ColorsTitle>
                    <AvailableColors>
                      <WrapContent>
                        {selectedColors.map((color) => (
                          <div key={color} style={{ marginTop: "15px" }}>
                            {color}
                          </div>
                        ))}
                      </WrapContent>
                    </AvailableColors>
                    <ColorsButton>
                      <SaveButton variant="contained" color="primary">
                        Salvar
                      </SaveButton>
                    </ColorsButton>
                  </ColorsContainer>
                </Box>
              </Modal>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setSizeModalOpen(true)}
                sx={{ marginBottom: "25px" }}
              >
                Tamanhos Disponíveis
              </Button>

              <Modal
                open={isSizeModalOpen}
                onClose={() => setSizeModalOpen(false)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <ColorsContainer>
                    <ColorsTitle>Tamanhos Disponíveis</ColorsTitle>
                    <AvailableColors>
                      <List sx={{ width: "300px" }}>
                        <ListItem
                          button
                          onClick={handleSizeSelectAll}
                          key="all"
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={
                                selectedSizes.length === availableSizes.length
                              }
                              indeterminate={
                                selectedSizes.length > 0 &&
                                selectedSizes.length < availableSizes.length
                              }
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary="Selecionar Todos" />
                        </ListItem>
                        {availableSizes.map((size) => (
                          <ListItem
                            button
                            onClick={handleSizeToggle(size)}
                            key={size}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={isSizeSelected(size)}
                                disableRipple
                              />
                            </ListItemIcon>
                            <ListItemText primary={size} />
                          </ListItem>
                        ))}
                      </List>
                    </AvailableColors>
                    <ColorsTitle>Tamanhos Selecionados</ColorsTitle>
                    <AvailableSizes>
                      <WrapContent>
                        {selectedSizes.map((size) => (
                          <div key={size} style={{ marginTop: "15px" }}>
                            {size}
                          </div>
                        ))}
                      </WrapContent>
                    </AvailableSizes>
                    <ColorsButton>
                      <SaveButton variant="contained" color="primary">
                        Salvar
                      </SaveButton>
                    </ColorsButton>
                  </ColorsContainer>
                </Box>
              </Modal>
            </InputInfoContainer>
          </AddProduct>
        </AddProductContainer>
      </Box>
    </Modal>
  );
};

export default ProductModal;
