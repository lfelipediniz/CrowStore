import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ProductData from "../../fakedata/showcaseContent/products.json";
import SearchBar from "../SearchBar"
import FilterTags from "../FilterTags"
import DisplayOptions from "../DisplayOptions"
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

        items.girlContent.forEach((girlProduct) => {
            const product = {
                productName: girlProduct.productName + " Feminino",
                price: girlProduct.price,
                image: girlProduct.image,
            };
            productList.push(product);
        });

        items.boyContent.forEach((boyProduct) => {
            const product = {
                productName: boyProduct.productName + " Masculino",
                price: boyProduct.price,
                image: boyProduct.image,
            };
            productList.push(product);
        });

        return productList.filter(item => {
            // Check if the item name includes the search term
            const hasSearchTerm =
                item.productName &&
                item.productName.toLowerCase().includes(searchTerm.toLowerCase());

            // Check if the item matches all filters
            const hasAllFilters = filters.every(filter => {
                return (
                    item.productName &&
                    item.productName.toLowerCase().includes(filter.toLowerCase())
                );
            });
            return hasSearchTerm && hasAllFilters;
        });
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
            <DisplayOptions items={filteredItems} />
            <Footer />
        </>
    );
};

export default WrapSearch;
