import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ProductData from "../../fakedata/showcaseContent/products.json";
import SearchBar from "../SearchBar"
import FilterTags from "../FilterTags"
import { Subtitle } from "./WrapElements.js"

const WrapSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    // Function to filter items based on searchTerm and filters
    const filterItems = (items, searchTerm, filters) => {
        // Convert items object to an array of values

        const productList = [];

        ProductData.girlContent.forEach((product) => {
            productList.push(`${product.productName} Feminino`);
        });

        ProductData.boyContent.forEach((product) => {
            productList.push(`${product.productName} Masculino`);
        });

        const result = productList.filter(item => {
            // Check if the item name includes the search term
            const hasSearchTerm =
                item &&
                item.toLowerCase().includes(searchTerm.toLowerCase());

            // Check if the item matches all filters
            const hasAllFilters = filters.every(filter => {
                return (
                    item &&
                    item.toLowerCase().includes(filter.toLowerCase())
                );
            });
            return hasSearchTerm && hasAllFilters;
        });
        return result;
    };

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
        // Update filtered items whenever searchTerm or filters change
        const newFilteredItems = filterItems(ProductData, searchTerm, filters);
        setFilteredItems(newFilteredItems);
    }, [searchTerm, filters]);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} home />
            <Navbar toggle={toggle} home />
            <SearchBar onChange={modifySearchTerm} />
            <FilterTags onChange={modifyFilters} />
            {searchTerm && <Subtitle>{filteredItems.length} resultados para "{searchTerm}"</Subtitle>}
            {/* <DisplayOptions items={filteredItems} /> */}
            <Footer />
        </>
    );
};

export default WrapSearch;
