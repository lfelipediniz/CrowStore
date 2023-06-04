import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ProductData from "../../fakedata/showcaseContent/products.json";

const WrapSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Update filtered items whenever searchTerm or filters change
    const newFilteredItems = filterItems(ProductData, searchTerm, filters);
    setFilteredItems(newFilteredItems);
  }, [searchTerm, filters]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const modifyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const modifySearchTerm = (newTerm) => {
    setSearchTerm(newTerm);
  };

  // Function to filter items based on searchTerm and filters
  const filterItems = (items, searchTerm, filters) => {
    // Convert items object to an array of values
    const itemArray = Object.values(items);

    return itemArray.filter((item) => {
      // Check if the item name includes the search term
      const hasSearchTerm =
        item.productName &&
        item.productName.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if the item matches all filters
      const hasAllFilters = filters.every((filter) => {
        return (
          item.productName &&
          item.productName.toLowerCase().includes(filter.toLowerCase())
        );
      });

      return hasSearchTerm && hasAllFilters;
    });
  };

  return (
    <>
      {/* Render the Sidebar component */}
      <Sidebar isOpen={isOpen} toggle={toggle} home />

      {/* Render the Navbar component */}
      <Navbar toggle={toggle} home />

      {/* Your JSX content here */}
      <Footer />
    </>
  );
};

export default WrapSearch;
