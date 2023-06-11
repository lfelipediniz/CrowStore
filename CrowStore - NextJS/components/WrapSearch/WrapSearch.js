import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ProductData from "../../fakedata/showcaseContent/products.json";
import SearchBar from "../SearchBar";
import FilterTags from "../FilterTags";
import {
    ProductContainer,
    ScrollableContainer,
} from "../User/UserElements";
import ProductCard from "../ReusedComponents/ProductCard";
import { Subtitle } from "./WrapElements.js";

const WrapSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    // Function to filter items based on searchTerm and filters
    const filterItems = (items, searchTerm, filters) => {
        const productList = items.map((product) => {
            const updatedProduct = {
                productName: product.productName + " " + product.gender,
                price: product.price,
                image: product.image,
            };
            return updatedProduct;
        });

        return productList.filter((item) => {
            const hasSearchTerm =
                item.productName &&
                item.productName.toLowerCase().includes(searchTerm.toLowerCase());

            const hasAllFilters = filters.every((filter) => {
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
        const newFilteredItems = filterItems(ProductData, searchTerm, filters);
        setFilteredItems(newFilteredItems);
    }, [searchTerm, filters]);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} home />
            <Navbar toggle={toggle} home />
            <SearchBar onChange={modifySearchTerm} />
            <FilterTags onChange={modifyFilters} />
            {searchTerm && (
                <Subtitle>
                    {filteredItems.length} resultados para "{searchTerm}"
                </Subtitle>
            )}
            <ScrollableContainer style={{ marginLeft: 0 }}>
                <ProductContainer>
                    {filteredItems.map((product, index) => (
                        <ProductCard
                            key={index}
                            img={product.image}
                            productName={product.productName}
                            price={product.price}
                        />
                    ))}
                </ProductContainer>
            </ScrollableContainer >
            <Footer />
        </>
    );
};

export default WrapSearch;
