import React from "react";
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
} from "./ProductModalElements";
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { FaPhotoVideo, FaTrash } from "react-icons/fa";
import { colors } from "../../styles/colors";

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
  const [selectedImage, setSelectedImage] = React.useState(null);

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
    };
    onSave(updatedProduct);
  };

  const handleRemove = () => {
    onRemove(product);
  };

  const [selectedProductData, setSelectedProductData] = React.useState({
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

    // Verifica se há uma imagem de produto selecionada
    if (product?.image) {
      setSelectedImage(product.image);
    } else {
      setSelectedImage(null);
    }
  }, [product]);

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
          {product && (
            <RemoveButton variant="contained" onClick={handleRemove}>
              <FaTrash />
              Remover Produto
            </RemoveButton>
          )}
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
            
            <>
            <TitleModal></TitleModal>
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
                  onChange={(e) =>
                    setSelectedProductData({
                      ...selectedProductData,
                      price: e.target.value,
                    })
                  }
                />
                {product && (
                  <TextField
                    select
                    label="Cores"
                    variant="outlined"
                    sx={{ marginBottom: "25px" }}
                    value={selectedProductData.selectedColor}
                    onChange={(e) =>
                      setSelectedProductData({
                        ...selectedProductData,
                        selectedColor: e.target.value,
                      })
                    }
                  >
                    {product.colors.map((color, index) => (
                      <MenuItem key={index} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                {product && (
                  <TextField
                    select
                    label="Tamanho"
                    variant="outlined"
                    sx={{ marginBottom: "25px" }}
                    value={selectedProductData.selectedSize}
                    onChange={(e) =>
                      setSelectedProductData({
                        ...selectedProductData,
                        selectedSize: e.target.value,
                      })
                    }
                  >
                    {product.size.map((size, index) => (
                      <MenuItem key={index} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </TextField>
                )}

                <SaveButton
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  {product ? "Salvar Produto" : "Adicionar Produto"}
                </SaveButton>
              </>
            </InputInfoContainer>
          </AddProduct>
        </AddProductContainer>
      </Box>
    </Modal>
  );
};

export default ProductModal;
