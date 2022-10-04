import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '~/layouts/Header';
import ProductListing from '~/layouts/ProductListing';
import Footer from '~/layouts/Footer';
import { useStore } from '~/hooks';

function CategoryPage() {
    const [categoriesChild, setCategoriesChild] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [productsTotal, setProductsTotal] = useState(0);

    const [state] = useStore();

    const categoryId = state.params.categoryId;

    const { slug } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3002/api/categoriesChild/${categoryId}`)
            .then((res) => res.json())
            .then((data) => {
                setCategoriesChild(data.categoriesChild);
                setAllProducts(data.allProducts);
                setProductsTotal(data.productsTotal);
            });
    }, [categoryId]);

    return (
        <>
            <Header />
            <ProductListing
                products={allProducts}
                titleProducts={slug}
                numberProducts={productsTotal}
                categoriesChild={categoriesChild}
            />
            <Footer />
        </>
    );
}

export default CategoryPage;
