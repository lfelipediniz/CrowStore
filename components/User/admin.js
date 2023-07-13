import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  SideNav,
  SearchBarContainer,
  Content,
  SidebarContainer,
  EditButtonCotainer,
  ProductContainer,
  ProductCardEdit,
  RemoveButton,
  ScrollableContainer,
  Subtitle,
} from "./UserElements";

import ProductCard from "../ReusedComponents/ProductCard";

import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import ProductModal from "../ProductModal";
import { colors } from "../../styles/colors";

// Minhas alterações
import SearchBar from "../SearchBar";
import axios from "axios";

const Admin = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([
    "Todos",
    "Masculino",
    "Feminino",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Minhas alterações

  const [filters, setFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const scrollableContainerRef = useRef(null);
  const [showWidthWarning, setShowWidthWarning] = useState(false); // Novo estado para controlar o aviso de largura mínima
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setShowWidthWarning(window.innerWidth < 1115);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Verifica a largura da tela ao carregar o componente

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleEditingMode = () => {
    setEditingMode(!editingMode);
  };

  const toggleAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  const handleAddCategory = async () => {
    const newCategory = prompt("Digite o nome da nova categoria:");
    if (newCategory) {
      try {
        await axios.post("http://localhost:5000/categories/AddCategory", {
          name: newCategory,
        });
        setCategories([...categories, newCategory]);
      } catch (error) {
        console.error("Erro ao adicionar categoria:", error);
      }
    }
  };

  const handleRemoveCategory = async (index) => {
    const categoryToRemove = categories[index];
    if (
      categoryToRemove === "Todos" ||
      categoryToRemove === "Masculino" ||
      categoryToRemove === "Feminino"
    ) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/categories/${encodeURIComponent(
          categoryToRemove
        )}`
      );
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Erro ao remover categoria:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleOpenModal = (e, product) => {
    if (!editingMode) {
      return;
    }
    e.preventDefault();
    if (editingMode) {
      setShowModal(true);
      setSelectedProduct({
        ...product,
        productName: product.name, // Atualize para selecionar corretamente o nome do produto
        image: `/CrowStore/imgs/${product.images[0]}`,
      });
    }
  };

  const handleOpenModalCreate = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (product) => {
    handleCloseModal();
  };

  const handleRemoveProduct = (product) => {
    // Implemente a lógica para remover o produto do sistema
    console.log("Remover produto:", product);
  };

  const handleLogout = () => {
    // Limpar o token do localStorage
    localStorage.removeItem("token");
    window.location.reload(); // Recarrega a página
  };

  // Minhas alterações

  const modifySearchTerm = (newTerm) => {
    setSearchTerm(newTerm);
  };

  useEffect(() => {
    const fetchFilteredItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/products/filterProducts",
          { name: searchTerm }
        );
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Erro ao filtrar os produtos:", error);
        setFilteredItems([]);
      }
    };

    fetchFilteredItems();
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const subtitle = document.getElementById("subtitle");

      if (subtitle) {
        const scrollY = scrollableContainerRef.current.scrollTop;

        if (scrollY > 0) {
          subtitle.classList.add("hidden");
        } else {
          subtitle.classList.remove("hidden");
        }
      }
    };

    const scrollableContainer = scrollableContainerRef.current;
    if (scrollableContainer) {
      scrollableContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableContainer) {
        scrollableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      {showWidthWarning ? (
        <>
          <div style={{ marginTop: 80 }}>
            <p
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Desculpe, você precisa de uma tela com no mínimo 1115px para
              acessar seus privilégios.
            </p>
          </div>
        </>
      ) : (
        <Container>
          <SideNav>
            <Box>
              <List>
                {/* Modo de edição */}
                <EditButtonCotainer>
                  <ListItem button onClick={toggleEditingMode}>
                    <ListItemText
                      primary={editingMode ? "Finalizar Edição" : "Modo Edição"}
                    />
                  </ListItem>
                </EditButtonCotainer>

                {/* Adicionar Produto */}
                {editingMode && (
                  <ListItem button onClick={() => handleOpenModalCreate()}>
                    <ListItemText primary="Adicionar Produto" />
                  </ListItem>
                )}

                {/* Adicionar Categoria */}
                {editingMode && (
                  <>
                    <ListItem button onClick={handleAddCategory}>
                      <ListItemText primary="Adicionar Categoria" />
                    </ListItem>
                    <Divider />
                  </>
                )}

                {/* Categorias */}
                {categories.map((category, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={selectedCategory === category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <ListItemText primary={category} />
                    {category !== "Todos" &&
                      category !== "Masculino" &&
                      category !== "Feminino" &&
                      editingMode && (
                        <RemoveButton
                          onClick={() => handleRemoveCategory(index)}
                        >
                          <FaTrashAlt />
                        </RemoveButton>
                      )}
                  </ListItem>
                ))}
              </List>
              <ListItem
                button
                onClick={handleLogout}
                style={{ backgroundColor: colors.textBlack }}
              >
                <ListItemText>Sair</ListItemText>
              </ListItem>
            </Box>
          </SideNav>
          <SearchBarContainer>
            <SearchBar onChange={modifySearchTerm} />

            <Subtitle id="subtitle">
              <center>
                {filteredItems.length} resultados para "{searchTerm}"
                <br /> <br /> <br /> <br />
                {editingMode ? (
                  <p>
                    Você está no modo edição, basta clicar no{" "}
                    <strong>Lápis </strong>para editar seu produto
                  </p>
                ) : (
                  <p>
                    {" "}
                    Bem-vindo, Administrador! Abaixo, você encontrará a lista
                    dos produtos armazenados em seu banco de dados.
                  </p>
                )}
              </center>
            </Subtitle>
          </SearchBarContainer>
          <Content>
            <ScrollableContainer
              style={{ marginLeft: 0 }}
              ref={scrollableContainerRef}
            >
              <ProductContainer>
                {filteredItems.map((product, index) => (
                  <ProductCardEdit
                    key={`product-${index}`}
                    onClick={(e) => handleOpenModal(e, product)}
                    editingMode={editingMode} // Passa a propriedade editingMode para o ProductCardEdit
                  >
                    <ProductCard
                      img={`/CrowStore/imgs/${product.images[0]}`}
                      productName={product.name}
                      price={product.price}
                    />

                    {editingMode && (
                      <div className="edit-icon">
                        <FaEdit />
                      </div>
                    )}
                  </ProductCardEdit>
                ))}
              </ProductContainer>
            </ScrollableContainer>
          </Content>

          {/* Modal de adicionar/editar produto */}
          <ProductModal
            open={showModal}
            onClose={handleCloseModal}
            product={selectedProduct} // Certifique-se de que a propriedade `product` esteja corretamente passada
            onSave={handleSaveProduct}
            onRemove={handleRemoveProduct}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Container>
      )}
    </>
  );
};

export default Admin;
