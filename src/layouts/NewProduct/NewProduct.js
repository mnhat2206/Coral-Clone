import { useEffect, useState } from 'react';

import ProductTemplate from '~/layouts/components/ProductTemplate';

function NewProduct() {
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        fetch(`https://coral-server.onrender.com/api/products/navbar?isNew=true`)
            .then((res) => res.json())
            .then((data) => {
                setNewProducts(data.data.filter((product, index) => index < 4));
            });
    }, []);

    return <ProductTemplate btnShowAll={true} titleName="New Product" products={newProducts} />;
}

export default NewProduct;
