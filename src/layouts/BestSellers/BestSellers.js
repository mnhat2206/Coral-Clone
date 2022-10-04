import { useEffect, useState } from 'react';

import ProductTemplate from '~/layouts/components/ProductTemplate';

function BestSellers() {
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        fetch(`https://json-server-coral.herokuapp.com/api/products/navbar?isNew=true&isBestSeller=true`)
            .then((res) => res.json())
            .then((data) => {
                setNewProducts(data.data.filter((product, index) => index < 4));
            });
    }, []);

    return <ProductTemplate btnShowAll={true} titleName="Best Seller" products={newProducts} />;
}

export default BestSellers;
