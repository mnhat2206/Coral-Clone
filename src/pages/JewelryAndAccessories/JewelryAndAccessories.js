import Header from '~/layouts/Header';
import ProductListing from '~/layouts/ProductListing';
import Footer from '~/layouts/Footer';
import { products } from '~/api/product';

function JewelryAndAccessories() {
    return (
        <>
            <Header />
            <ProductListing products={products} titleProducts={`Jewelry & Accessories`} numberProducts={12000} />
            <Footer />
        </>
    );
}

export default JewelryAndAccessories;
