import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import FilterTags from "../FilterTags";
import { ProductContainer, ScrollableContainer } from "../User/UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import { Subtitle } from "./WrapElements";
import { colors } from "../../styles/colors";

const WrapSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const scrollableContainerRef = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const modifyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const modifySearchTerm = (newTerm) => {
    setSearchTerm(newTerm);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          "/products/filterProducts",
          { name: searchTerm }
        );
        setOriginalItems(response.data);
      } catch (error) {
        console.error("Erro ao filtrar os produtos:", error);
        setOriginalItems([]);
      }
    };

    fetchItems();
  }, [searchTerm]);

  useEffect(() => {
    const filteredItemsWithFilters = originalItems.filter((item) => {
      const hasAllFilters = filters.every((filter) => {
        if (filter === "Masculino" || filter === "Feminino") {
          return (
            item.gender && item.gender.toLowerCase() === filter.toLowerCase()
          );
        } else {
          return item.tags && item.tags.includes(filter);
        }
      });
      return hasAllFilters;
    });
    setFilteredItems(filteredItemsWithFilters);
  }, [filters, originalItems]);

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
    <div style={{ backgroundColor: colors.primary }}>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />
      <SearchBar onChange={modifySearchTerm} />
      <FilterTags onChange={modifyFilters} selectedTags={filters} />
      <Subtitle id="subtitle">
        <center>
          <br />
          <br />
          Desbrave o universo de possibilidades na Crow Store!
          <br /> <br />
          {searchTerm ? (
            <>
              {filteredItems.length} resultados para "{searchTerm}"
            </>
          ) : (
            <>Faça sua pesquisa e desvende tesouros ocultos</>
          )}
        </center>
      </Subtitle>

      <ScrollableContainer
        style={{ marginLeft: 0 }}
        ref={scrollableContainerRef}
      >
        <ProductContainer>
          {filteredItems.map((product, index) => (
            <ProductCard
              key={`product-${index}`}
              img={`/CrowStore/imgs/${product.images[0]}`}
              productName={product.name}
              price={product.price}
            />
          ))}
        </ProductContainer>
      </ScrollableContainer>
      <Footer />
    </div>
  );
};

export default WrapSearch;
