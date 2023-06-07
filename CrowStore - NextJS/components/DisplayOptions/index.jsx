import React, { useState, useEffect } from 'react';

const DisplayOptions = ({ items }) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const updateItemsPerPage = () => {
        const screenWidth = window.innerWidth;
        let newItemsPerPage = 5;

        if (screenWidth < 570) {
            newItemsPerPage = 1;
        } else if (screenWidth < 808) {
            newItemsPerPage = 2;
        } else if (screenWidth < 1050) {
            newItemsPerPage = 3;
        } else if (screenWidth < 1340) {
            newItemsPerPage = 4;
        }

        setItemsPerPage(newItemsPerPage);
    };

    useEffect(() => {
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const productRows = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
        const row = [];
        for (let j = i; j < i + itemsPerPage; j++) {
            if (j < items.length) {
                const product = items[j];
                row.push(
                    <a href="" key={j}>
                        <div className="suggestion" style={{ backgroundImage: `url(../../../${product.image})` }}></div>
                        <p className="name">{product.productName}</p>
                        <p className="price">{product.price}</p>
                    </a>
                );
            } else {
                break;
            }
        }
        productRows.push(
            <div className="row" key={i} style={{ clear: 'both' }}> {row} </div>
        );
    }

    return <nav id="carousel">{productRows}</nav>;
};

export default DisplayOptions;
