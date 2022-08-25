import Header from '~/layouts/Header';
import ProductListing from '~/layouts/ProductListing';
import Footer from '~/layouts/Footer';
import { products } from '~/api/product';

function ClothingAndShoes() {
    return (
        <>
            <Header />
            <ProductListing products={products} titleProducts={`Clothing & Shoes`} numberProducts={20000} />
            <Footer />
        </>
    );
}

export default ClothingAndShoes;
