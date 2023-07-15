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

import SearchBar from "../SearchBar";
import axios from "axios";
import AdminCart from "../../public/CrowStore/animations/AdminCart";

const Admin = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filters, setFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const scrollableContainerRef = useRef(null);
  const [showWidthWarning, setShowWidthWarning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/categories/ShowCategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar as categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowWidthWarning(window.innerWidth < 1115);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

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

        window.location.reload();
      } catch (error) {
        console.error("Erro ao adicionar categoria:", error);
      }
    }
  };

  const handleRemoveCategory = async (categoryName) => {
    if (
      categoryName === "Todos" ||
      categoryName === "Masculino" ||
      categoryName === "Feminino"
    ) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/categories/categories/${encodeURIComponent(
          categoryName
        )}`
      );
      const updatedCategories = categories.filter(
        (category) => category.name !== categoryName
      );
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
        productName: product.name,
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
    console.log("Remover produto:", product);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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

  const filterProducts = () => {
    if (selectedCategory === "Todos") {
      setFilteredProducts(filteredItems);
    } else if (selectedCategory === "Masculino") {
      const filtered = filteredItems.filter(
        (product) => product.gender === "Masculino"
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === "Feminino") {
      const filtered = filteredItems.filter(
        (product) => product.gender === "Feminino"
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, filteredItems]);

  return (
    <>
      {showWidthWarning ? (
        <div style={{ backgroundColor: colors.primary }}>
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
            <br />
            <br />
            <br />
            <br />
            <center>
              <AdminCart />
            </center>
          </div>
        </div>
      ) : (
        <Container>
          <SideNav>
            <Box>
              <List>
                <EditButtonCotainer>
                  <ListItem button onClick={toggleEditingMode}>
                    <ListItemText
                      primary={
                        editingMode ? (
                          <center>Finalizar Edição</center>
                        ) : (
                          <center>Modo Edição</center>
                        )
                      }
                    />
                  </ListItem>
                </EditButtonCotainer>

                {editingMode && (
                  <ListItem button onClick={() => handleOpenModalCreate()}>
                    <ListItemText
                      primary={<center>Adicionar Produto</center>}
                    />
                  </ListItem>
                )}

                {editingMode && (
                  <>
                    <ListItem button onClick={handleAddCategory}>
                      <ListItemText
                        primary={<center>Adicionar Categoria</center>}
                      />
                    </ListItem>
                    <Divider />
                  </>
                )}

                <ListItem
                  button
                  onClick={() => handleCategoryClick("Todos")}
                  selected={selectedCategory === "Todos"}
                >
                  <ListItemText primary="Todos" />
                </ListItem>

                <ListItem
                  button
                  onClick={() => handleCategoryClick("Masculino")}
                  selected={selectedCategory === "Masculino"}
                >
                  <ListItemText primary="Masculino" />
                </ListItem>

                <ListItem
                  button
                  onClick={() => handleCategoryClick("Feminino")}
                  selected={selectedCategory === "Feminino"}
                >
                  <ListItemText primary="Feminino" />
                </ListItem>

                <ListItem
                  button
                  onClick={handleLogout}
                  style={{ backgroundColor: colors.textBlack }}
                >
                  <ListItemText>
                    <center>Sair</center>
                  </ListItemText>
                </ListItem>

                <Divider />
                <center>
                  <br />
                  <p>Suas Categorias</p>
                  <br />
                </center>
                <Divider />

                {categories.map((category, index) => (
                  <ListItem
                    key={category._id}
                    button
                    selected={selectedCategory === category.name}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <ListItemText primary={category.name} />
                    {category !== "Todos" &&
                      category !== "Masculino" &&
                      category !== "Feminino" &&
                      editingMode && (
                        <RemoveButton
                          onClick={() => handleRemoveCategory(category.name)}
                        >
                          <FaTrashAlt />
                        </RemoveButton>
                      )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </SideNav>
          <SearchBarContainer>
            <SearchBar onChange={modifySearchTerm} />

            <Subtitle id="subtitle">
              <center>
                {filteredProducts.length} resultados para "{searchTerm}"
                <br /> <br /> <br /> <br />
                {editingMode ? (
                  <p>
                    Você está no modo edição, basta clicar no{" "}
                    <strong>Lápis </strong>para editar seu produto
                  </p>
                ) : (
                  <p>
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
                {filteredProducts.map((product, index) => (
                  <ProductCardEdit
                    key={`product-${index}`}
                    onClick={(e) => handleOpenModal(e, product)}
                    editingMode={editingMode}
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

          <ProductModal
            open={showModal}
            onClose={handleCloseModal}
            product={selectedProduct}
            onSave={handleSaveProduct}
            onRemove={handleRemoveProduct}
          />
        </Container>
      )}
    </>
  );
};

export default Admin;
