import React, { useState, useEffect, useRef } from "react";
import {
  AddProductContainer,
  AddProduct,
  AddButton,
  ImagePreview,
  InputInfoContainer,
  TitleModal,
  RemoveButton,
  SaveButton,
  ColorsContainer,
  ColorsTitle,
  AvailableColors,
  ColorsButton,
  ChangeContainer,
} from "./ProductModalElements";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { colors } from "../../styles/colors";
import { FaPhotoVideo, FaTrash, FaPen } from "react-icons/fa";

import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ProductModal = ({ open, onClose, product, onSave, onRemove }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isColorModalOpen, setColorModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isSizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [dense, setDense] = useState(false);
  const [categoriesAll, setCategoriesAll] = useState([]);
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: colors.textBlack,
    color: colors.primary,
  }));
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para armazenar a categoria selecionada

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/categories/ShowCategories")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao buscar categorias");
        }
      })
      .then((data) => {
        setCategoriesAll(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, []);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setImageFile(imageFile);

    if (imageFile && imageFile.type.includes("image")) {
      const imageUrl = URL.createObjectURL(imageFile);
      setImageUrl(imageUrl);
      setSelectedImage(imageUrl);
    }
  };

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      productName: selectedProductData.productName,
      selectedColors: selectedColors,
      selectedSizes: selectedSizes,
      description: selectedDescription, // Inclua a descrição atualizada no objeto do produto
    };
    var Imgfile = new FormData();
    console.log(selectedProductData.productName);

    Imgfile.append("name", selectedProductData.productName);
    Imgfile.append("file", imageFile, `user.png`);

    fetch("http://localhost:5000/imgs", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: Imgfile,
    }).then((response) => {});

    const Newproduto = {
      name: selectedProductData.productName,
      tags: selectedDescription,
      gender: selectedGender,
      price: selectedPrice,
      images: `${selectedProductData.productName}.png`,
      description: selectedDescription,
    };

    fetch("http://localhost:5000/products/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Newproduto),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Produto cadastrado com sucesso");

          return response.json();
        } else {
          throw new Error("Erro ao cadastrar produto");
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Erro:", error);
      });

    onSave(updatedProduct);
    window.location.reload();
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
      productName: product?.productName || "", // Extraindo o nome do produto do objeto `product`
      stock: product?.stock || "",
      // Atualize outras propriedades do produto, se necessário
    });

    // Atualize o estado `selectedImage` com a imagem do produto
    if (product?.image) {
      setSelectedImage(product.image);
    } else {
      setSelectedImage(null);
    }

    // Atualize o estado `selectedProductColors` com as cores do produto
    if (product?.colors) {
      setSelectedProductColors(product.colors);
    } else {
      setSelectedProductColors([]);
    }

    // Atualize o estado `selectedProductSizes` com os tamanhos do produto
    if (product?.sizes) {
      setSelectedProductSizes(product.sizes);
    } else {
      setSelectedProductSizes([]);
    }

    // Atualize o estado `selectedDescription` com a descrição do produto
    if (product?.description) {
      setSelectedDescription(product.description);
    } else {
      setSelectedDescription("");
    }

    // Atualize o estado `selectedPrice` com o preço do produto
    if (product?.price) {
      setSelectedPrice(product.price);
    } else {
      setSelectedPrice("");
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

  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Da seleção de multiplas imagens
  const handleImages = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const allowedTypes = ["image/jpeg", "image/png"];
    const fileList = Array.from(files)
      .slice(0, 4) // Limite de 4 imagens
      .filter((file) => allowedTypes.includes(file.type));

    setSelectedFiles(fileList);

    // Exemplo de como exibir os nomes dos arquivos selecionados
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList[i].name);
    }
  };

  const getFormattedFileName = (fileName) => {
    if (fileName.length > 15) {
      return `${fileName.slice(0, 15)}-${getFileExtension(fileName)}`;
    }
    return fileName;
  };

  const getFileExtension = (fileName) => {
    const extension = fileName.split(".").pop();
    return `.${extension}`;
  };

  const [selectedColor, setSelectedColor] = useState(""); // Estado para armazenar a cor selecionada

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
              <div style={{ height: "30px" }}></div>
            )}
            <SaveButton variant="contained" onClick={handleSave}>
              Salvar
            </SaveButton>
          </ChangeContainer>
          <AddProduct>
            <>
              <></>
              <AddButton htmlFor="imageUpload">
                {selectedImage ? (
                  <ImagePreview src={selectedImage} alt="Selected" />
                ) : (
                  <>
                    <FaPhotoVideo /> Adicionar Imagem Principal
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
                sx={{ marginBottom: "15px" }}
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
                sx={{ marginBottom: "15px" }}
                value={selectedDescription}
                onChange={(e) => setSelectedDescription(e.target.value)}
              />

              <TextField
                label="Preço"
                variant="outlined"
                multiline
                rows={1}
                fullWidth
                sx={{ marginBottom: "15px" }}
                value={selectedPrice} // Vincular o valor da descrição ao estado selecionado
                onChange={
                  (e) => setSelectedPrice(e.target.value) // Atualizar a descrição do produto selecionado
                }
              />
              <TextField
                select
                label="Gênero"
                variant="outlined"
                sx={{ marginBottom: "15px" }}
                value={selectedGender}
                onChange={handleGenderChange}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </TextField>
              <TextField
                select
                label="Categoria"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                variant="outlined"
                sx={{ marginBottom: "15px" }}
              >
                {categoriesAll.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
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
                Available Models
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
                    <ColorsTitle>Seus Modelos</ColorsTitle>
                    <br />
                    <center>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setSizeModalOpen(true)}
                        sx={{ marginBottom: "25px" }}
                      >
                        Adicionar novo Modelo
                      </Button>
                    </center>

                    {/* Vou colocar um front de modelo aqui,mas dai vc vai printar com esse front todos os modelos existentes */}
                    <Demo>
                      <List dense={dense}>
                        <ListItem
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                              <FaTrash color={colors.primary} />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar style={{ colors: colors.secondary }}>
                              <FaPen color={colors.secondary} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Tamanho PP, 6 no estoque"
                            secondary={
                              <p style={{ color: colors.lightGray }}>
                                Cor Tomato
                              </p>
                            }
                          />
                        </ListItem>
                      </List>
                    </Demo>
                  </ColorsContainer>
                </Box>
              </Modal>

              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: "25px" }}
                onClick={handleImages}
              >
                imagens secundárias
              </Button>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {selectedFiles.length > 0 && (
                <div>
                  <center>
                    <p>Imagens selecionadas</p>

                    <br />
                    <ul>
                      {selectedFiles.map((file, index) => (
                        <>
                          <p key={index}>{getFormattedFileName(file.name)}</p>
                        </>
                      ))}
                    </ul>
                  </center>
                </div>
              )}

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
                    <center>
                      <br />
                      <ColorsTitle>
                        Adicionando opção para o cliente
                      </ColorsTitle>
                    </center>
                    <AvailableColors>
                      <form>
                        <TextField
                          select
                          label={
                            <p style={{ color: colors.primary }}>Tamanho</p>
                          }
                          variant="outlined"
                          sx={{
                            color: colors.primary,
                            width: "100%",
                            "& .MuiInputBase-root": {
                              color: "#fff", // Cor do texto
                            },
                            "& .MuiSelect-icon": {
                              color: "#fff", // Cor da seta
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff", // Cor do contorno
                              },
                              "&:hover fieldset": {
                                borderColor: "#fff", // Cor do contorno ao passar o mouse
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#fff", // Cor do contorno quando o campo está em foco
                              },
                            },
                          }}
                        >
                          <MenuItem value="PP">PP</MenuItem>
                          <MenuItem value="P">P</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="G">G</MenuItem>
                          <MenuItem value="XG">XG</MenuItem>
                        </TextField>
                        <br />
                        <br />
                        <TextField
                          select
                          label={
                            <p style={{ color: colors.primary }}>
                              Selecione uma cor
                            </p>
                          }
                          variant="outlined"
                          sx={{
                            color: colors.primary,
                            width: "100%",
                            "& .MuiInputBase-root": {
                              color: "#fff", // cor do texto
                              backgroundColor: selectedColor, // fundo com a cor selecionada
                            },
                            "& .MuiSelect-icon": {
                              color: "#fff", // Cor da seta
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff", // cor do contorno
                              },
                              "&:hover fieldset": {
                                borderColor: "#fff", // cor do contorno ao passar o mouse
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#fff", // cor do contorno quando o campo está em foco
                              },
                            },
                          }}
                          value={selectedColor} // Define o valor selecionado no TextField
                          onChange={(e) => setSelectedColor(e.target.value)} // Atualiza o estado quando o valor muda
                        >
                          <MenuItem value="MidnightBlue">
                            Midnight Blue
                          </MenuItem>
                          <MenuItem value="DarkSlateGray">
                            Dark Slate Gray
                          </MenuItem>
                          <MenuItem value="Goldenrod">Goldenrod</MenuItem>
                          <MenuItem value="Light Sky Blue">
                            Light Sky Blue
                          </MenuItem>
                          <MenuItem value="Light Salmon">Light Salmon</MenuItem>
                          <MenuItem value="Lavender">Lavender</MenuItem>
                          <MenuItem value="Dark Olive Green">
                            Dark Olive Green
                          </MenuItem>
                          <MenuItem value="Tomato">Tomato</MenuItem>
                          <MenuItem value="Steel Blue">Steel Blue</MenuItem>
                          <MenuItem value="Pale Violet Red">
                            Pale Violet Red
                          </MenuItem>
                          <MenuItem value="Medium Sea Green">
                            Medium Sea Green
                          </MenuItem>
                          <MenuItem value="Chocolate">Chocolate</MenuItem>
                          <MenuItem value="Medium Purple">
                            Medium Purple
                          </MenuItem>
                          <MenuItem value="Light Slate Gray">
                            Light Slate Gray
                          </MenuItem>
                          <MenuItem value="Light Coral">Light Coral</MenuItem>
                          <MenuItem value="Dark Sea Green">
                            Dark Sea Green
                          </MenuItem>
                          <MenuItem value="Fire Brick">Fire Brick</MenuItem>
                          <MenuItem value="Cornflower Blue">
                            Cornflower Blue
                          </MenuItem>
                          <MenuItem value="Dim Gray">Dim Gray</MenuItem>
                          <MenuItem value="Light Pink">Light Pink</MenuItem>
                          <MenuItem value="Medium Aquamarine">
                            Medium Aquamarine
                          </MenuItem>
                          <MenuItem value="Sienna">Sienna</MenuItem>
                          <MenuItem value="Blue Violet">Blue Violet</MenuItem>
                          <MenuItem value="Gainsboro">Gainsboro</MenuItem>
                          <MenuItem value="Misty Rose">Misty Rose</MenuItem>
                          <MenuItem value="Light Green">Light Green</MenuItem>
                          <MenuItem value="Dark Goldenrod">
                            Dark Goldenrod
                          </MenuItem>
                          <MenuItem value="Medium Orchid">
                            Medium Orchid
                          </MenuItem>
                          <MenuItem value="Silver">Silver</MenuItem>
                          <MenuItem value="Pale Green">Pale Green</MenuItem>
                          <MenuItem value="Olive Drab">Olive Drab</MenuItem>
                          <MenuItem value="Dark Orchid">Dark Orchid</MenuItem>
                          <MenuItem value="Dark Gray">Dark Gray</MenuItem>
                          <MenuItem value="Coral">Coral</MenuItem>
                          <MenuItem value="Aquamarine">Aquamarine</MenuItem>
                          <MenuItem value="Maroon">Maroon</MenuItem>
                          <MenuItem value="Purple">Purple</MenuItem>
                          <MenuItem value="Light Gray">Light Gray</MenuItem>
                          <MenuItem value="Indian Red">Indian Red</MenuItem>
                          <MenuItem value="Medium Spring Green">
                            Medium Spring Green
                          </MenuItem>
                          <MenuItem value="Brown">Brown</MenuItem>
                          <MenuItem value="Medium Slate Blue">
                            Medium Slate Blue
                          </MenuItem>
                          <MenuItem value="Dark Khaki">Dark Khaki</MenuItem>
                          <MenuItem value="Salmon">Salmon</MenuItem>
                          <MenuItem value="Pale Turquoise">
                            Pale Turquoise
                          </MenuItem>
                          <MenuItem value="Dark Red">Dark Red</MenuItem>
                          <MenuItem value="Slate Blue">Slate Blue</MenuItem>
                          <MenuItem value="Light Slate Grey">
                            Light Slate Grey
                          </MenuItem>
                          <MenuItem value="Light Blue">Light Blue</MenuItem>
                          <MenuItem value="Medium Turquoise">
                            Medium Turquoise
                          </MenuItem>
                          <MenuItem value="Rosy Brown">Rosy Brown</MenuItem>
                          <MenuItem value="Medium Violet Red">
                            Medium Violet Red
                          </MenuItem>
                        </TextField>
                        <br />
                        <br />
                        <TextField
                          label={
                            <p style={{ color: colors.primary }}>
                              Quantidade no estoque
                            </p>
                          }
                          variant="outlined"
                          multiline
                          rows={1}
                          fullWidth
                          onKeyPress={(event) => {
                            const keyCode = event.keyCode || event.which;
                            const keyValue = String.fromCharCode(keyCode);
                            const regex = /[0-9]/;
                            if (!regex.test(keyValue)) {
                              event.preventDefault();
                            }
                          }}
                          inputProps={{
                            pattern: "[0-9]*",
                            inputMode: "numeric",
                            step: "1",
                          }}
                          sx={{
                            color: colors.primary,
                            width: "100%",
                            "& .MuiInputBase-root": {
                              color: "#fff", // Cor do texto
                            },
                            "& .MuiSelect-icon": {
                              color: "#fff", // Cor da seta
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff", // Cor do contorno
                              },
                              "&:hover fieldset": {
                                borderColor: "#fff", // Cor do contorno ao passar o mouse
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#fff", // Cor do contorno quando o campo está em foco
                              },
                            },
                          }}
                        />

                        <br />
                        <br />
                        <br />
                        <center>
                          <SaveButton variant="contained" color="primary">
                            Salvar
                          </SaveButton>
                        </center>
                      </form>
                    </AvailableColors>
                    <ColorsButton></ColorsButton>
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
