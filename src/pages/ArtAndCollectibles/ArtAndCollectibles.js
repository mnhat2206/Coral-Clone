import Header from '~/layouts/Header';
import ProductListing from '~/layouts/ProductListing';
import Footer from '~/layouts/Footer';
import { products } from '~/api/product';

function ArtAndCollectibles() {
    return (
        <>
            <Header />
            <ProductListing products={products} titleProducts={`Art & Collectibles`} numberProducts={8000} />
            <Footer />
        </>
    );
}

export default ArtAndCollectibles;
