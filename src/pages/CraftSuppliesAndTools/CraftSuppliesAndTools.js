import Header from '~/layouts/Header';
import ProductListing from '~/layouts/ProductListing';
import Footer from '~/layouts/Footer';
import { products } from '~/api/product';

function CraftSuppliesAndTools() {
    return (
        <>
            <Header />
            <ProductListing products={products} titleProducts={`Craft Supplies & Tools`} numberProducts={66} />
            <Footer />
        </>
    );
}

export default CraftSuppliesAndTools;
