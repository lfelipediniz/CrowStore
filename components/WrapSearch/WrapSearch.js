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
    const filteredItemsWithFilters = filteredItems.filter((item) => {
      const hasAllFilters = filters.every((filter) => {
        return (
          item.productName &&
          item.productName.toLowerCase().includes(filter.toLowerCase())
        );
      });
      return hasAllFilters;
    });
    setFilteredItems(filteredItemsWithFilters);
  }, [filters]);

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

    scrollableContainerRef.current.addEventListener("scroll", handleScroll);
    return () => {
      scrollableContainerRef.current.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <div style={{ backgroundColor: colors.primary }}>
      <Sidebar isOpen={isOpen} toggle={toggle} home />
      <Navbar toggle={toggle} home />
      <SearchBar onChange={modifySearchTerm} />
      <FilterTags onChange={modifyFilters} />
      {searchTerm && (
        <Subtitle id="subtitle">
          {filteredItems.length} resultados para "{searchTerm}"
        </Subtitle>
      )}
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
