import Header from '~/layouts/Header';
import ProductListing from '~/layouts/ProductListing';
import Footer from '~/layouts/Footer';
import { products } from '~/api/product';

function WeddingAndParty() {
    return (
        <>
            <Header />
            <ProductListing products={products} titleProducts={`Wedding & Party`} numberProducts={6000} />
            <Footer />
        </>
    );
}

export default WeddingAndParty;
