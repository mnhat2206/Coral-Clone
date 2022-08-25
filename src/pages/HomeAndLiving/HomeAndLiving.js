import Header from '~/layouts/Header';
import ProductListing from '~/layouts/ProductListing';
import Footer from '~/layouts/Footer';
import { products } from '~/api/product';

function HomeAndLiving() {
    return (
        <>
            <Header />
            <ProductListing products={products} titleProducts={`Home & Living`} numberProducts={11000} />
            <Footer />
        </>
    );
}

export default HomeAndLiving;
